<?php

use \Femundfilou\Menu\Menu;

return [
	"ready" => fn() => [
		"panel" => [
			"css" => vite("frontend/panel.css"),
			"favicon" => vite()->asset("frontend/assets/panel/favicon-dev.svg"),
			'menu' => [
				'site' => Menu::site('Dashboard', 'dashboard'),
				'page' => Menu::page('Media', 'images', 'page://globalmedia'),
				'-',
				'plausible',
				'retour',
				'-',
				'users',
				'languages',
				'system'
			],
		],
	],
];
