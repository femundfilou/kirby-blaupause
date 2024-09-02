<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Site $site
 * @var Kirby\Cms\Page $page
 */
?>
<!DOCTYPE html>
<html lang="<?= $kirby->language()->code() ?>" class="no-js">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php snippet('seo/head'); ?>
	<?= vite(['frontend/index.ts']) ?>
</head>

<body data-template="<?= $page->intendedTemplate() ?>">
	<?php snippet('page/header') ?>

	<main id="page" class="transition-fade content">
		<?php if ($page->hero()->isNotEmpty()) : ?>
			<?php snippet('page/blocks', ['blocks' => $page->hero()]); ?>
		<?php endif; ?>
		<?= $slot ?>
	</main>

	<?php snippet('page/footer'); ?>
	<?php snippet('seo/schemas'); ?>

</body>

</html>