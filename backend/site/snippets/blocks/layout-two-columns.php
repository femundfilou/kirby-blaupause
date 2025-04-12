<?php
$width = $block->getWidthClass();
$isFullWidth = $width === 'span-full';
$spanClass = $isFullWidth ? 'span-7:m' : 'span-6:m';
?>

<div class="subgrid <?= $width ?>">
	<div class="flow span-full start-1:m <?= $spanClass ?> <?= $block->getVerticalAlignClass() ?>">
		<?php snippet('page/blocks', ['blocks' => $block->blocksleft()]); ?>
	</div>
	<div class="flow span-full <?= $spanClass ?> <?= $block->getVerticalAlignClass() ?>">
		<?php snippet('page/blocks', ['blocks' => $block->blocksright()]); ?>
	</div>
</div>