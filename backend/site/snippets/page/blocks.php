<?php

/**
 * @var Kirby\Cms\Blocks $blocks
 * @var Kirby\Cms\Block $block
 */
?>
<?php if (isset($blocks)) : ?>
	<div class="flow">
		<?php foreach ($blocks->toBlocks() as $block) : ?>
			<div class="block block-type-<?= $block->type() ?>">
				<?= $block; ?>
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>