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
	fontFace: true, // Remove unused @font-face
	keyframes: true, // Remove unused @keyframes
	rejected: false, // Activate to see which css has been removed
	variables: true, // Remove unused css variables
	safelist: {
		standard: [/^block/, /^layout/, /^\[data-/, /^has-size-/],
		deep: [],
		greedy: [],
		keyframes: [],
		variables: []
	}
}
