<?php

/**
 * @var Kirby\Cms\Blocks $layouts
 * @var Kirby\Cms\Block $layout
 */
?>
<?php if (isset($layouts)) : ?>
	<?php foreach ($layouts->toBlocks() as $layout) : ?>
		<section class="subgrid span-full <?= $layout->getSpaceBottomClass() ?> <?= $layout->getSpaceTopClass() ?>" data-layout="<?= $layout->type() ?>">
			<?= $layout ?>
		</section>
	<?php endforeach; ?>
<?php endif; ?>