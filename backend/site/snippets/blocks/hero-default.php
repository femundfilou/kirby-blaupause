<?php

/**
 * @var \Kirby\Cms\Block $block
 * @var \Femundfilou\AssetManager\AssetManager $assetManager
 */

$assetManager->add('css', vite()->asset('frontend/styles/blocks/hero-default.css'));
?>

<section class="section has-background my-0 py-1">
	<div class="container">
		<div class="columns">
			<div class="column">
				<h1 class="title has-size-1" data-animation-prepare="split-words" data-animation="words-up"><?= $block->heading(); ?></h1>
			</div>
		</div>
	</div>
</section>