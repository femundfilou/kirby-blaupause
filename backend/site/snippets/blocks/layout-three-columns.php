<?php
$columnsReverse = $block->columnsreverse()->toBool();
?>
<div class="columns<?= e($columnsReverse, ' columns--reversed') ?>">
	<div class="column column-12-tablet-only">
		<?php snippet('page/blocks', ['blocks' => $block->blocksleft()]); ?>
	</div>
	<div class="column column-12-tablet-only">
		<?php snippet('page/blocks', ['blocks' => $block->blockscenter()]); ?>
	</div>
	<div class="column column-12-tablet-only">
		<?php snippet('page/blocks', ['blocks' => $block->blocksright()]); ?>
	</div>
</div>