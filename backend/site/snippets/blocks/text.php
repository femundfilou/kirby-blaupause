<?php

/** @var \Kirby\Cms\Block $block */

$styles = [
	'large' => 'has-size-5',
	'default' => 'has-size-6',
	'small' => 'has-size-7'
];

$styleValue = $block->style()->value();
$style = $styles[$styleValue] ?? $styles['default'];
$alignment = $block->alignment()->value() ?? 'left';

?>
<div class="text <?= $style ?> <?= "has-text-" . $alignment ?>">
	<?= $block->text(); ?>
</div>