<?php

use Kirby\Cms\App;
use Dotenv\Dotenv;

$base = __DIR__;
$storage = dirname(__DIR__) . '/storage/kirby-blaupause.test';
$backend = dirname(__DIR__) . '/backend';
require $backend . '/kirby/bootstrap.php';
$dotenv = Dotenv::createImmutable($backend);
$dotenv->safeLoad();

/**
 * Use Staticache location
 * You can remove this, if you alter your webservers configuration
 * Make sure to add header support in htacess (when using Apache) as well
 * See: https://github.com/getkirby/staticache
 */
(function /* staticache */ () {
	$root = __DIR__ . '/cache';

	// check if a cache for this domain exists
	$root .= '/' . $_SERVER['SERVER_NAME'] . '/pages';
	if (is_dir($root) !== true) {
		return;
	}

	// determine the exact file to use
	$path = $root . '/' . ltrim($_SERVER['REQUEST_URI'] ?? '', '/');
	if (is_file($path . '/index.html') === true) {
		// a HTML representation exists in the cache
		$path = $path . '/index.html';
	} elseif (is_file($path) !== true) {
		// neither a HTML representation nor a custom
		// representation exists in the cache
		return;
	}

	// split the file into headers (before two line breaks) and body
	$file    = file_get_contents($path);
	$divide  = mb_strpos($file, "\n\n");
	$headers = mb_substr($file, 0, $divide);
	$body    = mb_substr($file, $divide + 2);

	foreach (explode("\n", $headers) as $header) {
		if (mb_substr($header, 0, 7) === 'Status:') {
			http_response_code((int)trim(mb_substr($header, 8)));
		} else {
			header($header);
		}
	}

	die($body);
})();

echo (new App([
	'roots' => [
		'index'     => $base,
		'media'     => $base . '/media',
		'site'      => $backend . '/site',
		'content'   => $storage . '/content',
		'accounts'  => $storage . '/accounts',
		'cache' 	=> $base . '/cache',
		'sessions'  => $storage . '/sessions',
		'logs'  	=> $storage . '/logs',
		'license'   => $storage . '/license/.license',
		'redirects' => $storage . '/redirects/retour.yml'
	]
]))->render();
