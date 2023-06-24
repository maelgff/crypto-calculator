import { parseInputString } from '../utils/parserUtils'

describe('parseInputString', () => {
	it('should handle simple operation', () => {
		const input = '$ETH'
		const expectedOutput = ['ETH']
		const result = parseInputString(input)
		expect(result).toEqual(expectedOutput)
	})

	it('should parse the input string and return an array of tokens', () => {
		const input = '2 * $ETH + 3 * (4 - 1) * $BTC'
		const expectedOutput = ['2', '*', 'ETH', '+', '3', '*', '(', '4', '-', '1', ')', '*', 'BTC']
		const result = parseInputString(input)
		expect(result).toEqual(expectedOutput)
	})

	it('should handle input without $', () => {
		const input = 'BTC * (2 + 3)'
		const expectedOutput = ['BTC', '*', '(', '2', '+', '3', ')']
		const result = parseInputString(input)
		expect(result).toEqual(expectedOutput)
	})

	it('should handle expressions without currencies', () => {
		const input = '3.14 * (7 - 2) + square(4)'
		const expectedOutput = ['3.14', '*', '(', '7', '-', '2', ')', '+', 'square', '(', '4', ')']
		const result = parseInputString(input)
		expect(result).toEqual(expectedOutput)
	})

	it('should work with empty input', () => {
		const input = ''
		const expectedOutput: Array<string> = []
		const result = parseInputString(input)
		expect(result).toEqual(expectedOutput)
	})
})
