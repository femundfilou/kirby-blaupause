module.exports = {
	content: [
		'./frontend/**/*.js',
		'./frontend/**/*.ts',
		'./frontend/**/*.svelte',
		'./backend/site/**/*.php',
		'./backend/site/**/**/*.php',
	],
	css: ["public/build/assets/!(panel*).css"],
	output: ["public/build/assets/"],
	fontFace: false, // Remove unused @font-face
	keyframes: true, // Remove unused @keyframes
	rejected: false, // Activate to see which css has been removed
	variables: false, // Remove unused css variables
	dynamicAttributes: ["data-layout", "data-theme", "data-layout-spacebottom", "data-layout-spacetop", "data-layout-width", "data-style", "data-layout-verticalalign", "data-animation"],
	safelist: {
		standard: [/^block/, /^layout/, /^\[data-/, /^has-size-/, /^has-text-/],
		deep: [],
		greedy: [],
		keyframes: [],
		variables: []
	}
}
