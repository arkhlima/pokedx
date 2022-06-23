/** @type {import('tailwindcss').Config} */

module.exports = {
	// need to redefine .ts file here — so the tailwindcss class will be rendered
	content: ['./utils/**/*.ts', './static/**/*.svg'],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [],
}
