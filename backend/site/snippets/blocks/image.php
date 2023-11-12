<?php

use Kirby\Toolkit\Str;

/** @var \Kirby\Cms\Block $block */

$assetManager->add('css',  vite()->asset('frontend/styles/blocks/image.css'));

$caption 		= $block->caption();
$crop   	 	= $block->crop()->isTrue();
$link    		= $block->link();
$ratio   		= $block->ratio()->or('auto');
$cropFactor = 0;
$maxWidth 	= $block->maxwidth()->toInt();
$alignment 	= $block->alignment()->or('left');

// Check if ratio is set
if ($ratio != 'auto' && $crop) {
	// Split string to array and reverse it, e.g. "16/9" => [9,16]
	$ratioArray = array_reverse($ratio->split('/'));
	// Use first item of array as initial value
	$initialValue = array_shift($ratioArray);
	// Reduce array by division to get a crop factor, e.g. 0.5625
	$cropFactor = array_reduce($ratioArray, fn ($r, $v) => $v == 0 ? $r : ($r / $v), $initialValue);
}

?>
<?php if ($image = $block->image()->toFile()) : ?>
	<figure class="has-text-<?= $alignment ?>" style="--aspect-ratio: <?= $ratio ?>; <?= $crop ? '--object-fit: cover;' : '--object-fit: contain;'; ?> --max-width: <?= $maxWidth ? $maxWidth . 'px' : 'none' ?>;">
		<?php if ($link->isNotEmpty()) : ?>
			<a href="<?= Str::esc($link->toUrl()) ?>">
				<?php snippet('image', ['image' => $image, 'ratio' => $cropFactor]) ?>
			</a>
		<?php else : ?>
			<?php snippet('image', ['image' => $image, 'ratio' => $cropFactor]) ?>
		<?php endif ?>

		<?php if ($caption->isNotEmpty()) : ?>
			<figcaption>
				<?= $caption ?>
			</figcaption>
		<?php endif ?>
		<?php snippet('image/copyright', ['copyright' => $image->copyright()]); ?>
	</figure>
<?php endif ?>