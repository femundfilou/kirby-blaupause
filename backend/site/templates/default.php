<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Site $site
 * @var Kirby\Cms\Page $page
 */
?>
<?php snippet('layout/default', slots: true) ?>
<?php snippet('page/layouts', ['layouts' => $page->main()]); ?>
<?php endsnippet(); ?>