<footer class="section" id="page-footer">
	<div class="container">
		<div class="columns">
			<div class="column">
				<?php if ($menu = $site->footermenu()->toPages()) : ?>
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
</footer>