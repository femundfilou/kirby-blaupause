<?php

use Kirby\Toolkit\A;

return [
	"cache" => [
		"pages" => [
			"active" => false
		]
	],
	"debug" => true,
	"email" => [
		// Config for mailhog (https://github.com/mailhog/MailHog)
		"transport" => [
			"type" => "smtp",
			"host" => "localhost",
			"port" => 1025,
			"security" => false
		]
	],
	"ready" => fn () => [
		"panel" => [
			"favicon" => vite()->asset("frontend/assets/panel/favicon-dev.svg"),
			"css" => vite("frontend/panel.css"),
		]
	],
];
