import { priorities } from "../constants/calculationPriorities"

const applyOperator = (operator: string, operand1: number, operand2: number) => {
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

export const evaluateMathExpression = (tokens: Array<string | number>) => {
	const values = []
	const operators = []
	console.log(tokens)
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i]
		if (token === '(') {
			operators.push(token)
		} else if (!isNaN(parseInt(token))) {
			values.push(parseFloat(token))
		} else if (token === ')') {
			while ( operators.length > 0 && operators[operators.length - 1] !== '(') {
				const operator = operators.pop()
				const operand2 = values.pop()
				const operand1 = values.pop()
				values.push(applyOperator(operator, operand1, operand2))
			}
			operators.pop()
		} else {
			while (operators.length > 0 && priorities[operators[operators.length - 1]] >= priorities[token]) {
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