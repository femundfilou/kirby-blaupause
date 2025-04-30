<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Site $site
 */

$kirby->response()->code(404);
echo $site->errorPage()->render();
