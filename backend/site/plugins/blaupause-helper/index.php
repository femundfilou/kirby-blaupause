<?php
Kirby\Filesystem\F::loadClasses([
	'femundfilou\\menu\\menu' => 'lib/Menu.php'
], __DIR__);

Kirby\Cms\App::plugin('femundfilou/blaupause-helper', []);
