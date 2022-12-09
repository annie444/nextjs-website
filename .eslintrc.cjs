module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		"next",
		"next/core-web-vitals",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended"
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'react-hooks',
		'react'
	],
	root: true,
};
