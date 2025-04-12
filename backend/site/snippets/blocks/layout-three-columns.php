<div class="subgrid span-content">
	<div class="flow span-full span-4:m <?= $block->getVerticalAlignClass() ?>">
		<?php snippet('page/blocks', ['blocks' => $block->blocksleft()]); ?>
	</div>
	<div class="flow span-full span-4:m <?= $block->getVerticalAlignClass() ?>">
		<?php snippet('page/blocks', ['blocks' => $block->blockscenter()]); ?>
	</div>
	<div class="flow span-full span-4:m <?= $block->getVerticalAlignClass() ?>">
		<?php snippet('page/blocks', ['blocks' => $block->blocksright()]); ?>
	</div>
</div>