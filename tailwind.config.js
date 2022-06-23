/** @type {import('tailwindcss').Config} */

module.exports = {
	// need to redefine .ts file here — so the bg class stored in constanst file will be rendered
	content: ['./utils/**/*.ts'],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [],
}
