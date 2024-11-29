<?php

use Kirby\Template\Snippet;

Kirby\Filesystem\F::loadClasses([
	'femundfilou\\menu\\menu' => 'lib/Menu.php'
], __DIR__);

/**
 * Returns the icon snippet
 * @param string $name Name of the icon
 * @param string $size Size of the icon
 * @return Snippet|string|null
 */
function icon(string $name, string $size = '1em')
{
	return snippet('icon', ['name' => $name, 'size' => $size], true);
}

Kirby\Cms\App::plugin('femundfilou/blaupause-helper', []);
