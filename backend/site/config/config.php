<?php

return [
	"cache" => [
		"pages" => [
			"active" => json_decode(env('ENABLE_CACHE', 'true')),
			"type"   => "static",
			"headers" => true,
			"ignore" => function ($page) {
				return in_array($page->intendedTemplate()->name(), ["error"]);
			},
		],
	],
	"date"  => [
		"handler" => "intl"
	],
	"distantnative.retour.config" => fn() => kirby()->root('redirects'),
	"debug" => json_decode(env('ENABLE_DEBUG', 'false')),
	"johannschopplich.plausible" => [
		'sharedLink' => env('PLAUSIBLE_SHARED_LINK', '')
		// Only needed if the frontend URL differs from the index URL of the Kirby instance
		// 'domain' => '<your-frontend-domain>'
	],
	"languages" => true,
	"ready" => fn() => [
		"panel" => [
			"css" => vite("frontend/panel.css"),
			"favicon" => vite()->asset("frontend/assets/panel/favicon-dev.svg"),
			'menu' => [
				'site' => \Femundfilou\Menu\Menu::site('Dashboard', 'dashboard'),
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
	'routes' => require_once __DIR__ . '/routes.php',
	'tobimori.seo' => [
		'files.template' => 'image',
		'sitemap' =>  [
			'active' => true,
			'excludeTemplates' => ['error']
		],
		'robots' => [
			'indicator' => false,
			'active' => true,
			'content' => [
				'*' => [
					'Allow' => ['/'],
					'Disallow' => ['/kirby', '/panel', '/content']
				]
			]
		]
	]
];
