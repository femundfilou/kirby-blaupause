#!/bin/sh

# Exit on error, undefined vars, and pipe failures
set -euo pipefail

# Required environment variables
: "${PREFIX:?'PREFIX must be set'}"
: "${COMMIT:?'COMMIT must be set'}"
: "${HOME_DIR:?'HOME_DIR must be set'}"
: "${BASE_DIR:?'BASE_DIR must be set'}"
: "${ROOT_DIR:?'ROOT_DIR must be set'}"
: "${RELEASE_DIR:?'RELEASE_DIR must be set'}"
: "${PUBLIC_FOLDER:?'PUBLIC_FOLDER must be set'}"

RELEASE_NAME="${PREFIX}-${COMMIT}"
DOCUMENT_ROOT="${HOME_DIR}/${BASE_DIR}/${ROOT_DIR}"
TARGET_DIR="${HOME_DIR}/${BASE_DIR}/${RELEASE_DIR}/${RELEASE_NAME}"
CLEANUP_DRY_RUN="${CLEANUP_DRY_RUN:-1}"  # Default to 1 if not set

echo "Starting deployment for release: ${RELEASE_NAME}"

# Generate release folder
if ! mkdir -p "${TARGET_DIR}"; then
    echo "Error creating release directory, exiting."
    exit 1
fi

# Unzip tar
if ! tar -xf "${HOME_DIR}/package-${COMMIT}.tar.gz" -C "${TARGET_DIR}/"; then
    echo "Error unzipping package, exiting."
    exit 1
fi

# Validate public folder exists
if [ ! -d "${TARGET_DIR}/${PUBLIC_FOLDER}" ]; then
    echo "Public folder ${PUBLIC_FOLDER} not found in release, exiting."
    exit 1
fi

# Fix rights
if ! chmod -R u+rwX,go+rX,go-w "${TARGET_DIR}"; then
    echo "Error setting permissions, exiting."
    exit 1
fi

# Set symlink for document root (atomic swap)
if ! ln -sfn "${TARGET_DIR}/${PUBLIC_FOLDER}" "${DOCUMENT_ROOT}.new"; then
    echo "Error creating temporary symlink, exiting."
    exit 1
fi

if ! mv -T "${DOCUMENT_ROOT}.new" "${DOCUMENT_ROOT}"; then
    echo "Error performing atomic symlink swap, exiting."
    exit 1
fi

# Move index file
if [ -f "${DOCUMENT_ROOT}/index.${PREFIX}.php" ]; then
    if ! mv "${DOCUMENT_ROOT}/index.${PREFIX}.php" "${DOCUMENT_ROOT}/index.php"; then
        echo "Error moving index.php, exiting."
        exit 1
    fi
else
    echo "Warning: index.${PREFIX}.php not found"
fi

# .htaccess configuration
if [ "${ENABLE_HTACCESS_CONFIG:-0}" -eq 1 ]; then
    HTACCESS_FILE="${DOCUMENT_ROOT}/.htaccess.${PREFIX}"

    if [ ! -f "${HTACCESS_FILE}" ]; then
        echo "Error: ${HTACCESS_FILE} not found"
        exit 1
    fi

    if ! sed -i "s~?BASE_DIR?~${BASE_DIR}~g" "${HTACCESS_FILE}"; then
        echo "Error configuring .htaccess (BASE_DIR), exiting."
        exit 1
    fi

    if ! sed -i "s~?DOCUMENT_ROOT?~${DOCUMENT_ROOT}~g" "${HTACCESS_FILE}"; then
        echo "Error configuring .htaccess (DOCUMENT_ROOT), exiting."
        exit 1
    fi

    if ! mv "${HTACCESS_FILE}" "${DOCUMENT_ROOT}/.htaccess"; then
        echo "Error moving .htaccess, exiting."
        exit 1
    fi

    echo ".htaccess configuration completed."
else
    echo ".htaccess configuration skipped."
fi

# Clean up package
if ! rm "${HOME_DIR}/package-${COMMIT}.tar.gz"; then
    echo "Warning: Could not remove package file"
fi

# Cleanup old releases
CURRENT_RELEASE=$(readlink -f "${DOCUMENT_ROOT}")
FOLDERS_TO_REMOVE=$(find "${HOME_DIR}/${BASE_DIR}/${RELEASE_DIR}/" -mindepth 1 -maxdepth 1 -type d ! -name "$(basename "${CURRENT_RELEASE}")" -printf '%T+ %p\n' | sort | head -n -2 | cut -d' ' -f2-)

if [ "${CLEANUP_DRY_RUN}" -eq 1 ]; then
    echo "Dry run enabled. The following folders would be removed:"
    echo "${FOLDERS_TO_REMOVE}"
else
    if [ -n "${FOLDERS_TO_REMOVE}" ]; then
        echo "Removing old release folders..."
        echo "${FOLDERS_TO_REMOVE}" | xargs rm -rf
        echo "Old release folders removed."
    else
        echo "No old release folders to remove."
    fi
fi

echo "Deployment successful!"
