<?php

/**
 * Button block template
 * @var \Kirby\Cms\Block $block
 * @var \Femundfilou\AssetManager\AssetManager $assetManager
 */

$assetManager->add('css', vite()->asset('frontend/styles/blocks/button.css'));

// Basic settings
$alignment = $block->alignment()->value() ?? 'left';
$styleValue = $block->style()->value() ?? 'default';
$styles = [
	'default' => 'button',
	'text' => 'button button--text'
];
$style = $styles[$styleValue] ?? $styles['default'];
$sizeValue = $block->size()->value() ?? 'default';
$sizes = [
	'default' => '',
	'large' => 'has-size-5'
];
$size = $sizes[$sizeValue] ?? $sizes['default'];
$input = $block->link()->toUrl();

// Link type detection
$isUrl = filter_var($input, FILTER_VALIDATE_URL);
$isPhone = strpos($input, 'tel:') === 0;
$isEmail = strpos($input, 'mailto:') === 0;
$isExternal = strpos($input, $kirby->url()) === false && strpos($input, '#') !== 0;

// Download detection
$url = parse_url($input, PHP_URL_PATH);
$fileExtension = $url ? pathinfo($url, PATHINFO_EXTENSION) : "";
$commonExtensions = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'gif', 'mp3', 'mp4'];
$isDownload = in_array($fileExtension, $commonExtensions);
?>
<div class="<?= $size ?>">
	<a class="<?= $style ?>"
		data-alignment="<?= $alignment ?>"
		href="<?= $input ?>"
		<?php e($isDownload || $isExternal, 'target="_blank"') ?>>
		<?php if ($isEmail): ?>
			<?php snippet('icon', ['name' => 'mail', 'size' => '1.25em']); ?>
		<?php endif; ?>

		<?php if ($isPhone): ?>
			<?php snippet('icon', ['name' => 'phone', 'size' => '1.25em']); ?>
		<?php endif; ?>

		<?= $block->text()->html() ?>

		<?php if ($isDownload): ?>
			<?php snippet('icon', ['name' => 'download', 'size' => '1.25em']); ?>
		<?php endif; ?>

		<?php if ($isExternal): ?>
			<?php snippet('icon', ['name' => 'external', 'size' => '1.25em']); ?>
		<?php endif; ?>
	</a>
</div>