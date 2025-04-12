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
];
