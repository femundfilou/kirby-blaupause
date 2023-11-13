<?php

return [
	"cache" => [
		"pages" => [
			"active" => true,
			"ignore" => function ($page) {
				return in_array($page->intendedTemplate()->name(), ["thanks", "error"]);
			},
		],
	],
	"date"  => [
		"handler" => "intl"
	],
	"distantnative.retour.config" => fn () => kirby()->root('redirects'),
	"debug" => false,
	"languages" => true,
	"ready" => fn () => [
		"panel" => [
			"css" => vite("frontend/panel.css"),
			"favicon" => vite()->asset("frontend/assets/panel/favicon-dev.svg"),
			'menu' => [
				'site' => \Femundfilou\Menu\Menu::site('Dashboard', 'dashboard'),
				'-',
				'retour',
				'-',
				'users',
				'languages',
				'system'
			],
		],
	],
	"routes" => [
		/*
		* Route for translations
		* Intended to be used with svelte-i18n
		[
			"pattern" => "/v1/translations/(:alpha)",
			"method" => "GET",
			"action" => function ($lang) {
				try {
					$translations = kirby()->language($lang)?->translations();
					if (!$translations) throw new Exception("No translations found for "$lang".", 404);
					return Response::json(
						$translations,
						200
					);
				} catch (Exception $e) {
					return Response::json(
						$e->getMessage(),
						$e->getCode()
					);
				}
			},
		],
	*/],
	'tobimori.seo' => [
		'robots.indicator' => false
	]
];
