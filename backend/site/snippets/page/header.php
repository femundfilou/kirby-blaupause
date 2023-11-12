<a href="#page" class="skip-link"><?= t('button.skip-menu') ?></a>

<header class="section" id="page-header">
	<div class="container">
		<div class="columns">
			<div class="column">
				<label class="button is-hidden-mobile">
					<input type="checkbox" class="is-hidden" id="menutrigger" />
					<?= t('button.menu') ?> <span>&times;</span>
				</label>
				<?php if ($menu = $pages->listed()) : ?>
					<nav aria-label=" <?= $site->title() ?>">
						<ul class="menu" role="menubar" aria-label="<?= $site->title() ?>">
							<?php foreach ($menu as $p) : ?>
								<li role="none" <?php e($p->isOpen(), 'class="is-active"') ?> data-pid="<?= $p->uid() ?>">
									<a role="menuitem" href="<?= $p->url() ?>">
										<?= $p->title() ?>
									</a>
								</li>
							<?php endforeach; ?>
						</ul>
					</nav>
				<?php endif; ?>
			</div>
		</div>
	</div>
</header>