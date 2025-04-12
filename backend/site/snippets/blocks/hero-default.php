<?php

/**
 * @var \Kirby\Cms\Block $block
 * @var \Femundfilou\AssetManager\AssetManager $assetManager
 */

$assetManager->add('css', vite()->asset('frontend/styles/blocks/hero-default.css'));
?>
<div class="subgrid span-full hero-default">
	<div class="span-content flow">
		<h1 class="title has-size-1" data-animation="fade-in-up">
			<?= $block->heading()->convertShy(); ?>
		</h1>
		<?php snippet('page/blocks', ['blocks' => $block->text()]); ?>
	</div>
</div>