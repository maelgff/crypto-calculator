import { evaluateMathExpression } from '../utils/calculatorUtils'

describe('evaluateMathExpression', () => {
	const mockTokens: (string | number)[] = ['(', 2, '+', 3, ')', '*', 4]

	it('should evaluate the math expression and return the result', () => {
		const result = evaluateMathExpression(mockTokens)
		expect(result).toEqual(20)
	})

	it('should handle expressions with different priorities', () => {
		const customTokens: (string | number)[] = ['(', 2, '+', 3, ')', '*', 4, '-', 5]
		const result = evaluateMathExpression(customTokens)
		expect(result).toEqual(15)
	})

	it('should handle expressions with decimals', () => {
		const customTokens: (string | number)[] = [1.5, '*', 2.5]
		const result = evaluateMathExpression(customTokens)
		expect(result).toEqual(3.75)
	})

	it('should handle expressions with division', () => {
		const customTokens: (string | number)[] = [10, '/', 2]
		const result = evaluateMathExpression(customTokens)
		expect(result).toEqual(5)
	})
})
