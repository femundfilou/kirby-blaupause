<?php

namespace Femundfilou\Menu;

use Closure;
use Kirby\Cms\App;

class Menu
{
	public static array $pages = [];

	public static string $path;

	public static function path(): string
	{
		return static::$path ??= App::instance()->request()->path()->toString();
	}

	public static function page(string $label, string $icon = null, string $link = null, Closure|bool $current = null): array
	{
		return static::$pages[] = [
			'label'   => $label,
			'link'    => $link,
			'icon'    => $icon,
			'current' => $current ?? fn () =>
			str_contains(static::path(), $link)
		];
	}

	public static function site(string $label, string $icon = 'dashboard'): array
	{
		return [
			'label'   => $label,
			'icon'    => $icon,
			'current' => function (string $id = null) {
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
