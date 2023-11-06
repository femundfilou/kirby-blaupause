<?php

/**
 * @var Kirby\Cms\App $kirby
 * @var Kirby\Cms\Site $site
 * @var Kirby\Cms\Page $page
 */
?>
<!DOCTYPE html>
<html lang="<?= $kirby->language()->code() ?>">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php snippet('seo/head'); ?>
	<?= vite(['frontend/index.ts']) ?>
</head>

<body data-template="<?= $page->intendedTemplate() ?>">
	<?php snippet('page/header') ?>
	<?php
	$herotype =  $page->choosehero()->value();
	$herofield = 'hero' . $herotype;
	if ($hero = $page->$herofield()->toObject()) :
		snippet("hero/" . $herotype, ['hero' => $hero]);
	endif;	?>
	<main>
		<?= $slot ?>
	</main>
	<?php snippet('page/footer'); ?>
	<?php snippet('seo/schemas'); ?>

</body>

</html>