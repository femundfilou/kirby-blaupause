<?php

use Kirby\Cms\App;
use Dotenv\Dotenv;

$base = __DIR__;
$storage = dirname(__DIR__) . '/storage/kirby-blaupause.test';
$backend = dirname(__DIR__) . '/backend';
require $backend . '/kirby/bootstrap.php';
$dotenv = Dotenv::createImmutable($backend);
$dotenv->safeLoad();


echo (new App([
	'roots' => [
		'index'     => $base,
		'media'     => $base . '/media',
		'site'      => $backend . '/site',
		'content'   => $storage . '/content',
		'accounts'  => $storage . '/accounts',
		'cache' 	=> $storage . '/cache',
		'sessions'  => $storage . '/sessions',
		'logs'  	=> $storage . '/logs',
		'license'   => $storage . '/license/.license',
		'redirects' => $storage . '/redirects/retour.yml'
	]
]))->render();
