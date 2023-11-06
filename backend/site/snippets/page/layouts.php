<?php

/**
 * @var Kirby\Cms\Blocks $layouts
 * @var Kirby\Cms\Block $block
 */
?>
<?php if (isset($layouts)) : ?>
  <?php foreach ($layouts->toBlocks() as $block) : ?>    
      <?= $block; ?>
  <?php endforeach; ?>
<?php endif; ?>