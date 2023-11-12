<?php

/**
 * @var Kirby\Cms\Blocks $layouts
 * @var Kirby\Cms\Block $layout
 */
?>
<?php if (isset($layouts)) : ?>
	<?php foreach ($layouts->toBlocks() as $layout) : ?>
		<section class="section" data-layout="<?= $layout->type() ?>" data-layout-width="<?= $layout->width()->or('default') ?>">
			<div class="container">
				<?= $layout ?>
			</div>
		</section>
	<?php endforeach; ?>
<?php endif; ?>