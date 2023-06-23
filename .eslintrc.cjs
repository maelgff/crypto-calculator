module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
    "no-tabs": ["error", {"allowIndentationTabs": true}],
		"quotes": "off",
		"indent": "off",
		"@typescript-eslint/indent": "off",
		"linebreak-style": [
			"error",
			"unix"
		],
		"semi": [
			"error",
			"never"
		],
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"react/prop-types": [0],
		"@typescript-eslint/no-var-requires": "off",
		"no-mixed-spaces-and-tabs": "off"
	}
}
