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
	<?php snippet('plausible') ?>
	<?= vite(['frontend/index.ts']) ?>
</head>

<body data-template="<?= $page->intendedTemplate() ?>">
	<div data-taxi>
		<div data-taxi-view>
			<?php snippet('page/header') ?>

			<main id="page" class="content">
				<?php if ($page->hero()->isNotEmpty()) : ?>
					<?php snippet('page/blocks', ['blocks' => $page->hero()]); ?>
				<?php endif; ?>
				<?= $slot ?>
			</main>

			<?php snippet('page/footer'); ?>
		</div>
	</div>
	<?php snippet('seo/schemas'); ?>
	<script>
		console.info('%cv<?= option('version') ?> | developed by femundfilou.de', 'font-size: 12px; font-weight: bold; color: #025BFF; margin: 8px 0;')
	</script>

</body>

</html>