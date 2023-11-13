<?php

/**
 *  @var \Kirby\Cms\Block $block
 *  @var \Femundfilou\AssetManager\AssetManager $assetManager
 * 
 */

$assetManager->add('css', vite()->asset('frontend/styles/blocks/heading.css'));

$styles = [
	'h1' => 'has-size-1',
	'h2' => 'has-size-2',
	'h3' => 'has-size-3',
	'h4' => 'has-size-4',
	'h5' => 'has-size-5',
	'h6' => 'has-size-6',
];

$styleValue = $block->style()->value();
$style = $styles[$styleValue] ?? $styles['h2'];

?>
<<?= $level = $block->level()->or('h2') ?> class="<?= $style ?>"><?= $block->text() ?></<?= $level ?>>