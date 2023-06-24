import { Coin } from "./api/coinsApi"

export const evaluateExpression = (arrayOfCalculationParameters: Array<string>, coinsListWithPrices: Array<Coin>) => {
	// Define operator priorities
	const priorities = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
	}
  
	// Helper functions for evaluating operators
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
  
	const evaluate = (tokens: Array<string>) => {
		const values: any[] = []
		const operators = []
  
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
  
	// Replace token names with their respective prices
	const replacedTokens = arrayOfCalculationParameters.map((token: string) => {
		const matchingCoin = coinsListWithPrices.find((c:Coin) => c.symbol.toUpperCase() === token)
		if (matchingCoin) {
			return matchingCoin.value ?? token
		}
		return token
	})
	return evaluate(replacedTokens)
}
