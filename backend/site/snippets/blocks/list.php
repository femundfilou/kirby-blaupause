<?php

/** @var \Kirby\Cms\Block $block */

$styles = [
	'large' => 'has-size-5',
	'default' => 'has-size-6',
	'small' => 'has-size-7'
];

$styleValue = $block->style()->value();
$style = $styles[$styleValue] ?? $styles['default'];

?>
<div class="text <?= $style ?>">
	<?= $block->text()->addListAnimation(); ?>
</div>