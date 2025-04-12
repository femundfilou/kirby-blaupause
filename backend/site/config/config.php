<?php

return [

	// Core configurations
	...require __DIR__ . '/config/cache.php',
	...require __DIR__ . '/config/date.php',
	...require __DIR__ . '/config/debug.php',
	...require __DIR__ . '/config/languages.php',
	...require __DIR__ . '/config/panel.php',

	// Plugin configurations
	...require __DIR__ . '/plugins/distantnative.retour.php',
	...require __DIR__ . '/plugins/johannschopplich.plausible.php',
	...require __DIR__ . '/plugins/tobimori.seo.php',

	// Routes
	'routes' => require __DIR__ . '/routes/index.php',
];
