<?php

/**
 *  @var \Kirby\Cms\Block $block
 *
 */


$styles = [
	'h1' => 'has-size-1',
	'h2' => 'has-size-2',
	'h3' => 'has-size-3',
	'h4' => 'has-size-4',
	'h5' => 'has-size-5',
	'h6' => 'has-size-6',
];

$alignments = [
	'default' => '',
	'left' => 'has-text-left',
	'center' => 'has-text-center',
	'right' => 'has-text-right',
];


$styleValue = $block->style()->value();
$style = $styles[$styleValue] ?? $styles['h2'];

$alignmentValue = $block->alignment()->value() ?? 'default';
$alignment = $alignments[$alignmentValue] ?? $alignments['default'];

?>
<<?= $level = $block->level()->or('h2') ?> class="title <?= $style ?> <?= $alignment ?>"><?= $block->text()->convertShy() ?></<?= $level ?>>