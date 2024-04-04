<?php

$assetManager->add('js', vite()->asset('frontend/blocks/matomo-optout.ts'), ['data-swup-script']);
?>
<?php snippet('page/blocks', ['blocks' => $block->blocks()]) ?>
<div class="checkbox matomo-optout" data-label-opted-out="<?= $block->optedoutlabel() ?>" data-label-opted-in="<?= $block->optedinlabel() ?>">
	<label for="optout">
		<input type="checkbox" id="optout" />
		<span id="optout__label"><?= $block->optedoutlabel() ?></span>
	</label>
</div>