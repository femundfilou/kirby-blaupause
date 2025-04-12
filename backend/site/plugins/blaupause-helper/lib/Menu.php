<?php

namespace Femundfilou\Menu;

use Kirby\Cms\App;
use Kirby\Toolkit\Str;

class Menu
{
	public static array $pages = [];

	public static string $path;

	public static function path(): string
	{
		return static::$path ??= App::instance()->request()->path()->toString();
	}

	public static function page(string $label, string|null $icon, string|null $link): array
	{

		$panelLink = Str::startsWith($link, 'page://') ? page($link)->panel()->url(true) : $link;

		return static::$pages[] = [
			'label'   => $label,
			'link'    => $panelLink,
			'icon'    => $icon,
			'current' => str_contains(static::path(), $panelLink)
		];
	}

	public static function site(string $label, string $icon = 'dashboard'): array
	{
		return [
			'label'   => $label,
			'icon'    => $icon,
			'current' => function (string|null $id) {
				if ($id !== 'site') {
					return false;
				}

				foreach (static::$pages as &$page) {
					if (str_contains(static::path(), $page['link'])) {
						return false;
					}
				}

				return true;
			},
		];
	}
}
