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

		$cli->success('All done. Ready to roll!');
	}
];
