<footer class="span-content has-pt-2xl-3xl has-pb-m flow-row has-items-end" id="page-footer">
	<p class="has-size-7">
		© <?= date('Y') ?> <?= $site->title() ?>
	</p>
	<?php if ($menu = $site->footermenu()->toPages()) : ?>
		<nav class="has-ml-a">
			<ul class="menu" role="menubar">
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
</footer>
