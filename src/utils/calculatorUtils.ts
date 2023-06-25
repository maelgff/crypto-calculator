import { priorities } from '../constants/calculationPriorities'

const applyOperator = (
	operator: string | number | undefined,
	operand1: number | undefined,
	operand2: number | undefined
) => {
	if (!operand1 || !operand2) {
		return 0
	}
	switch (operator) {
		case '+':
			return operand1 + operand2
		case '-':
			return operand1 - operand2
		case '*':
			return operand1 * operand2
		case '/':
			return operand1 / operand2
		default:
			return 0
	}
}

export const evaluateMathExpression = (tokens: Array<string | number>): number => {
	const values: Array<number> = []
	const operators = []
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i]
		if (token === '(') {
			operators.push(token)
		} else if (
			(typeof token === 'string' && !isNaN(parseInt(token))) ||
			(typeof token === 'number' && !isNaN(token))
		) {
			if (typeof token === 'string') {
				values.push(parseFloat(token))
			} else values.push(token)
		} else if (token === ')') {
			while (operators.length > 0 && operators[operators.length - 1] !== '(') {
				const operator = operators.pop()
				const operand2 = values.pop()
				const operand1 = values.pop()
				values.push(applyOperator(operator, operand1, operand2))
			}
			operators.pop()
		} else {
			while (
				operators.length > 0 &&
				priorities[operators[operators.length - 1]] >= priorities[token]
			) {
				const operator = operators.pop()
				const operand2 = values.pop()
				const operand1 = values.pop()
				values.push(applyOperator(operator, operand1, operand2))
			}
			operators.push(token)
		}
	}

	while (operators.length > 0) {
		const operator = operators.pop()
		const operand2 = values.pop()
		const operand1 = values.pop()
		values.push(applyOperator(operator, operand1, operand2))
	}
	return values[0]
}
