<?php

/**
 * @var Kirby\Cms\Blocks $layouts
 * @var Kirby\Cms\Block $layout
 */
?>
<?php if (isset($layouts)) : ?>
	<?php foreach ($layouts->toBlocks() as $layout) : ?>
		<section class="section<?php e($layout->textalign()->value() === 'justify', ' has-text-justified-desktop')  ?>" data-layout="<?= $layout->type() ?>" data-layout-width="<?= $layout->width()->or('default') ?>" data-layout-textalign="<?= $layout->textalign()->or('left') ?>" data-layout-verticalalign="<?= $layout->verticalalign()->or('top') ?>" data-layout-spacetop="<?= $layout->spacetop()->or('default') ?>" data-layout-spacebottom="<?= $layout->spacebottom()->or('default') ?>">
			<div class="container">
				<?= $layout ?>
			</div>
		</section>
	<?php endforeach; ?>
<?php endif; ?>