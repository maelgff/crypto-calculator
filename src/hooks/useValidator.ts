import { useState } from "react"

// Define the regular expressions for validation
const operatorRegex = /[+\-*/]/
const integerRegex = /^\d+$/
const wordRegex = /^\$?[a-zA-Z]+$/;

export const useValidator = () => {
	const [input, setInput] = useState('')

	function validateInputString(input: string) {
		// Remove spaces from the input string
		const trimmedInput = input.replace(/\s/g, '')
		for (let i = 0; i < trimmedInput.length; i++) {
			const char = trimmedInput[i]
			if (char === '(' || char === ')') {
				// Parentheses are allowed
				continue
			} else if (operatorRegex.test(char)) {
				// Operators are allowed
				continue
			} else if (char === '$') {
				// '$' are allowed
				continue
			} else if (integerRegex.test(char)) {
				// Integers are allowed
				continue
			} else if (wordRegex.test(char)) {
				// Words preceded by $ are allowed
				continue
			} else {
				// Invalid character found
				return false
			}
		}
		return true
	}

	return {
		input,
		setInput,
		validateInputString
	}
}