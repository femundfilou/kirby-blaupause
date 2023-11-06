<?php

use Kirby\Filesystem\Dir;
use Kirby\Filesystem\F;
use Kirby\Toolkit\Str;
use Kirby\Data\Data;

return [
	'description' => 'Initialize Kirby Blaupause',
	'args' => [],
	'command' => static function ($cli): void {
		$name = $cli->prompt('Please enter a name for your project (preferably the final domain):');
		$projectRoot = dirname(kirby()->root());

		// Rename storage folder
		$input = $cli->confirm('Rename storage folder?');
		if ($input->confirmed()) {
			if (Dir::exists(dirname(kirby()->root()) . "/storage/kirby-blaupause.test")) {
				Dir::move($projectRoot . "/storage/kirby-blaupause.test", $projectRoot . "/storage/" . $name);
				$cli->out("Moved storage folder.");
			}
			$index = F::read($projectRoot . "/public/index.php");
			$index = Str::replace($index, "kirby-blaupause.test", $name);
			F::write($projectRoot . "/public/index.php", $index);
			$cli->out("Renamed storage folder in public/index.php");
		}

		// Update composer.json
		$input = $cli->confirm('Rename project in composer.json?');
		if ($input->confirmed()) {
			$composerFile = Data::read($projectRoot . "/composer.json");
			$composerFile["name"] = "femundfilou/" . $name;
			Data::write($projectRoot . "/composer.json", $composerFile);
			$cli->out("Updated name in composer.json");
		}

		// Update package.json
		$input = $cli->confirm('Rename project in package.json?');
		if ($input->confirmed()) {
			$packageFile =  Data::read($projectRoot . "/package.json");
			$packageFile["name"] = $name;
			Data::write($projectRoot . "/package.json", $packageFile);
			$cli->out("Updated name in package.json");
		}

		// Update .env
		$input = $cli->confirm('Update APP_URL in .env?');
		if ($input->confirmed()) {
			if (!F::exists($projectRoot . "/.env")) {
				$cli->out("Copy .env.example to .env");
				F::copy($projectRoot . "/.env.example", $projectRoot . "/.env");
			}
			$domain = $cli->prompt('Please enter the domain used in development e.g. your valet domain:');
			// Check if the user input starts with 'http://' or 'https://'
			if (!preg_match('/^(http:\/\/|https:\/\/)/', $domain)) {
				$domain = 'http://' . $domain; // Prepend 'http://' if missing
			}
			$envFile =  F::read($projectRoot . "/.env");
			$envFile = preg_replace('/^APP_URL=.*$/m', "APP_URL=" . $domain, $envFile);
			F::write($projectRoot . "/.env", $envFile);
			$cli->out("Updated APP_URL in .env");
		}

		// Update config
		$input = $cli->confirm('Update config.php to use local domain?');
		if ($input->confirmed()) {
			if (!isset($domain) || !$domain) {
				$domain = $cli->prompt('Please enter the domain used in development e.g. your valet domain:');
				// Remove 'http://' or 'https://' from the beginning of the domain if present
				$domain = preg_replace('/^(http:\/\/|https:\/\/)/', '', $domain);
				F::move($projectRoot . "/backend/site/config/config.kirby-blaupause.test.php", $projectRoot . "/backend/site/config/config." . $domain . ".php");
			}
		}

		$cli->success('All done. Ready to roll!');
	}
];
