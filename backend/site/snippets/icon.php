<?php

use Kirby\Toolkit\Str;

$name = $name ?? "phone";
$size = $size ?? "1em";
if (!Str::endsWith($size, 'rem') && !Str::endsWith($size, 'em') && !Str::endsWith($size, 'px')) {
	$size = $size . "rem";
}
?>
<i class="i" style="--size: <?= $size ?>" data-icon="<?= $name ?>">
	<svg aria-hidden>
		<use xlink:href="<?= $kirby->url() ?>/icons.svg#symbol-<?= $name ?>" />
	</svg>
</i>
