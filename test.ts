function evaluateExpression(expression, tokenPrices) {
	// Split the expression into tokens
	const tokens = expression.split(' ');
  
	// Define operator priorities
	const priorities = {
	  '+': 1,
	  '-': 1,
	  '*': 2,
	  '/': 2,
	};
  
	// Helper functions for evaluating operators
	const applyOperator = (operator, operand1, operand2) => {
	  switch (operator) {
		case '+':
		  return operand1 + operand2;
		case '-':
		  return operand1 - operand2;
		case '*':
		  return operand1 * operand2;
		case '/':
		  return operand1 / operand2;
		default:
		  return 0;
	  }
	};
  
	const evaluate = () => {
	  const values = [];
	  const operators = [];
  
	  for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
  
		if (token === '(') {
		// @ts-ignore
		  operators.push(token);
		} else if (!isNaN(token)) {
		// @ts-ignore
		  values.push(parseFloat(token));
		} else if (token === ')') {
		  while (
			operators.length > 0 &&
			operators[operators.length - 1] !== '('
		  ) {
			const operator = operators.pop();
			const operand2 = values.pop();
			const operand1 = values.pop();
			// @ts-ignore
			values.push(applyOperator(operator, operand1, operand2));
		  }
		  operators.pop();
		} else {
		  while (
			operators.length > 0 &&
			priorities[operators[operators.length - 1]] >= priorities[token]
		  ) {
			const operator = operators.pop();
			const operand2 = values.pop();
			const operand1 = values.pop();
			// @ts-ignore
			values.push(applyOperator(operator, operand1, operand2));
		  }
		  // @ts-ignore
		  operators.push(token);
		}
	  }
  
	  while (operators.length > 0) {
		const operator = operators.pop();
		const operand2 = values.pop();
		const operand1 = values.pop();
		// @ts-ignore
		values.push(applyOperator(operator, operand1, operand2));
	  }
  
	  return values[0];
	};
  
	// Replace token names with their respective prices
	const replacedTokens = tokens.map((token) => {
	  if (tokenPrices[token]) {
		return tokenPrices[token];
	  }
	  return token;
	});
	// @ts-ignore
	const evaluatedValue = evaluate(replacedTokens);
  
	return evaluatedValue;
  }
  