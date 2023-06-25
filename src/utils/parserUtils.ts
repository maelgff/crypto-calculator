/**
 * This function parse the input string to return an array separating all parameters
 * @param input
 * @returns an array separating all parameters
 */
export const parseInputString = (input: string) => {
	const tokens = []
	let currentToken = ''

	for (let i = 0; i < input.length; i++) {
		const char = input[i]
		// Check for numbers
		if (!isNaN(parseInt(char)) || char === '.') {
			currentToken += char
		} else {
			// Add the current number token if exists
			if (currentToken !== '') {
				tokens.push(currentToken)
				currentToken = ''
			}
			// Check for operators, parentheses, and words
			if (char === '+' || char === '-' || char === '*' || char === '/') {
				tokens.push(char)
			} else if (char === '(' || char === ')') {
				tokens.push(char)
			} else if (/[a-zA-Z]/.test(char)) {
				let word = char
				// Build the word token
				while (i + 1 < input.length && /[a-zA-Z]/.test(input[i + 1])) {
					i++
					word += input[i]
				}
				tokens.push(word)
			}
		}
	}
	// Add the last number token if exists
	if (currentToken !== '') {
		tokens.push(currentToken)
	}
	return tokens
}
