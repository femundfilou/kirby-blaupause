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
	]
];
