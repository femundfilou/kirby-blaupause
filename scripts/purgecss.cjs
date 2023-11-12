const fs = require('fs');
const { exec } = require('child_process');
const glob = require('glob');
const path = require('path');

// Import PurgeCSS configuration
const purgeCSSConfig = require('../purgecss.config.cjs');

// Function to get file size in KB
const getFileSizeInKB = (filePath) => {
	const stats = fs.statSync(filePath);
	return stats.size / 1024;
};

// Function to format size to a string with 2 decimal places
const formatSize = (size) => `${size.toFixed(2)} kB`;

// Function to log size differences with dynamic padding
const logSizeDifferences = (originalSizes, files, maxPathLength, maxSizeLength) => {
	files.forEach(file => {
		const originalSize = originalSizes[file];
		const newSize = getFileSizeInKB(file);
		const fileName = path.basename(file);
		const filePath = file.replace(fileName, `\x1b[35m${fileName}\x1b[0m`);
		console.log(`${filePath.padEnd(maxPathLength)}${formatSize(originalSize).padStart(maxSizeLength + 2)} │ \x1b[1;32m🧹 ${formatSize(newSize)}\x1b[0m`);
	});
};

// Function to get all CSS files from the config, find the longest file path, and calculate the max size length
const getCSSFilesFromConfig = () => {
	let cssFiles = [];
	let maxPathLength = 0;
	let maxSizeLength = 0;
	purgeCSSConfig.css.forEach(pattern => {
		const files = glob.sync(pattern);
		cssFiles.push(...files);
		files.forEach(file => {
			maxPathLength = Math.max(maxPathLength, file.length);
			const sizeLength = formatSize(getFileSizeInKB(file)).length;
			maxSizeLength = Math.max(maxSizeLength, sizeLength);
		});
	});
	return { cssFiles, maxPathLength, maxSizeLength };
};

const { cssFiles, maxPathLength, maxSizeLength } = getCSSFilesFromConfig();

// Store original sizes in KB
let originalSizes = {};
cssFiles.forEach(file => {
	originalSizes[file] = getFileSizeInKB(file);
});

// Run PurgeCSS
exec('purgecss --config ./purgecss.config.cjs', (error, stdout, stderr) => {
	if (error) {
		console.error(`\x1b[31mError running PurgeCSS: ${error.message}\x1b[0m`);
		return;
	}
	if (stderr) {
		console.error(`\x1b[31mError: ${stderr}\x1b[0m`);
		return;
	}

	// Log output and size differences
	console.log(stdout);
	console.log(`\x1b[35mPurgeCSS\x1b[0m`);
	logSizeDifferences(originalSizes, cssFiles, maxPathLength, maxSizeLength);
});
