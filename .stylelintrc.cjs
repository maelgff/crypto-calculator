module.exports = {
	"extends": "stylelint-config-standard-scss",
	rules: {
	  'string-quotes': 'single',
	  'color-function-notation': 'legacy',
	  // @TODO: This rule is important we should consider it asap
	  'no-descending-specificity': null,
	  // @TODO: BEM rule, but require a lot of refactoring
	  'selector-class-pattern': null,
	  // 'selector-class-pattern': [
	  //   '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
	  //   {
	  //     /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
	  //     resolveNestedSelectors: true,
	  //     /** Custom message */
	  //     message: function expected(selectorValue) {
	  //       return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
	  //     },
	  //   },
	  // ],
	},
  }