module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		"next",
		"next/core-web-vitals",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
		"plugin:mdx/recommended"
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'react-hooks',
		'react',
		'mdx',
		'prettier'
	],
	"rules": {
		"prefer-const": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-explicit-any": "error",
		"prettier/prettier": "error"
	}
};
