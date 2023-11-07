<?php

use Kirby\Data\Yaml;
use Kirby\Filesystem\F;

return [
	'code' => 'de',
	'default' => true,
	'direction' => 'ltr',
	'locale' => [
		'LC_ALL' => 'de_DE'
	],
	'name' => 'Deutsch',
	'translations' => Yaml::decode(
		F::read(kirby()->root('languages') . '/vars/de.yml')
	),
	'url' => '/'
];
