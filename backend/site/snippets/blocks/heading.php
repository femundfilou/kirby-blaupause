<?php

/**
 *  @var \Kirby\Cms\Block $block
 *  @var \Femundfilou\AssetManager\AssetManager $assetManager
 * 
 */
$assetManager->add('css', vite()->asset('frontend/styles/blocks/heading.css'));

?>
<<?= $level = $block->level()->or('h2') ?>><?= $block->text() ?></<?= $level ?>>