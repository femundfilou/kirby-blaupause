<?php

/**
 * @var \Femundfilou\AssetManager\AssetManager $assetManager
 */

$assetManager->add('js', vite()->asset('frontend/snippets/header.ts'), ['type' => 'module', 'data-taxi-reload']);
?>
<a href="#page" class="skip-link"><?= t('button.skip-menu') ?></a>

<scroll-header class="grid-reset" id="page-header">
	<div class="span-full flow-row has-items-center has-px-m-l">
		<label class="button is-hidden:m has-ml-a">
			<input type="checkbox" class="is-hidden" id="menutrigger" />
			<?= t('button.menu') ?> <?= icon('close', '1.25em') ?>
		</label>
		<?php if ($menu = $site->mainmenu()->toPages()) : ?>
			<nav aria-label="<?= $site->title() ?>">
				<ul class="menu" role="menubar" aria-label="<?= $site->title() ?>">
					<?php foreach ($menu as $p) : ?>
						<?php $hasChildren = $p->hasListedChildren(); ?>
						<li role="none"
							class="<?php e($hasChildren, 'has-submenu') ?> <?php e($p->isOpen(), 'is-active') ?>"
							data-pid="<?= $p->uid() ?>">
							<a role="menuitem"
								href="<?= $p->url() ?>"
								data-text="<?= $p->title() ?>"
								<?php e($hasChildren, 'tabindex="0"') ?>>
								<span><?= $p->title() ?></span>
							</a>
							<?php if ($hasChildren) : ?>
								<ul class="submenu" role="menu" aria-label="<?= $p->title() ?>">
									<?php foreach ($p->children()->listed() as $child) : ?>
										<li role="none" <?php e($child->isOpen(), 'class="is-active"') ?>>
											<a role="menuitem" href="<?= $child->url() ?>" data-text="<?= $child->title() ?>">
												<span><?= $child->title() ?></span>
											</a>
										</li>
									<?php endforeach; ?>
								</ul>
							<?php endif; ?>
						</li>
					<?php endforeach; ?>
				</ul>
			</nav>
		<?php endif; ?>
	</div>
</scroll-header>