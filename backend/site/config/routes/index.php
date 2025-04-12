<?php
return [
	[
		"pattern" => "/globalmedia",
		"method" => "GET",
		"action" => function () {
			return;
		}
	]
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
	]**/
];
