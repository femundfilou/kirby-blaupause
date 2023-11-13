<?php if (!$block->isHidden()) :

	// Download
	$isDownload = false;

	// Your URL string
	$input = $block->link()->toUrl();

	$url = parse_url($input, PHP_URL_PATH);

	// Get the file extension from the URL
	$fileExtension = $url ? pathinfo($url, PATHINFO_EXTENSION) : "";

	// List of common file extensions you want to check against
	$commonExtensions = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'gif', 'mp3', 'mp4'];

	// Check if the input string is a URL
	$isUrl = filter_var($input, FILTER_VALIDATE_URL);

	// Check if the input string starts with "tel:"
	$isPhone = strpos($input, 'tel:') === 0;

	// Check if the input string starts with "mailto:"
	$isEmail = strpos($input, 'mailto:') === 0;

	// Check if the file extension is in the list of common extensions
	if (in_array($fileExtension, $commonExtensions)) {
		$isDownload = true;
	} else {
		$isDownload = false;
	}
?>
	<a class="<?php e(!$block->style()->is('text'), 'button ', '') ?><?= 'is-' . $block->style() ?>" href="<?= $input ?>" <?php e($isDownload, 'target="_blank"') ?>>
		<?php if ($isEmail) : ?>
			<?php snippet('icon', ['name' => 'mail', 'size' => '1.25em']); ?>
		<?php endif; ?>
		<?php if ($isPhone) : ?>
			<?php snippet('icon', ['name' => 'phone', 'size' => '1.25em']); ?>
		<?php endif; ?>
		<?= $block->text()->html() ?>
		<?php
		if ($isDownload) : ?>
			<?php snippet('icon', ['name' => 'download', 'size' => '1.25em']); ?>
		<?php endif; ?>
	</a>
<?php endif; ?>