<?php

$heightsMap = [
	1 => "var(--space-s)",
	2 => "var(--space-s-m)",
	3 => "var(--space-m-l)",
	4 => "var(--space-l-xl)",
	5 => "var(--space-xl-2xl)",
	6 => "var(--space-2xl-3xl)",
	7 => "var(--space-3xl-4xl)"
];
$height = $block->height()->value() ?? 1;
$heightStyle = $heightsMap[$height] ?? $heightsMap[1];
?>
<div style="height: <?= $heightStyle; ?>"></div>