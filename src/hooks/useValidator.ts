import { useState } from 'react'

// Define the regular expressions for validation
const operatorRegex = /[+\-*/]/
const integerRegex = /^\d+$/
const wordRegex = /^\$?[A-Z]+$/
const hasNoLetters = /^[^a-zA-Z]+$/

export const useValidator = () => {
	const [input, setInput] = useState('')

	function validateInputString(input: string) {
		let prevChar = ''
		let currChar = ''
		// Remove spaces from the input string
		const trimmedInput = input.replace(/\s/g, '')
		// Early return if we don't have a currency
		if (hasNoLetters.test(trimmedInput)) {
			return { isInputValid: false, inputError: 'No crypto currency detected' }
		}
		for (let i = 0; i < trimmedInput.length; i++) {
			currChar = trimmedInput[i]
			if (currChar === '(' || currChar === ')') {
				// Parentheses are allowed
				prevChar = currChar
				continue
			} else if (operatorRegex.test(currChar)) {
				// Operators are allowed
				prevChar = currChar
				continue
			} else if (currChar === '$') {
				// '$' are allowed
				prevChar = currChar
				continue
			} else if (integerRegex.test(currChar)) {
				if (wordRegex.test(prevChar)) {
					return { isInputValid: false, inputError: 'A number follow a letter' }
				}
				prevChar = currChar
				continue
			} else if (wordRegex.test(currChar)) {
				if (!isNaN(parseInt(prevChar))) {
					// Number follows a letter
					return { isInputValid: false, inputError: 'A letter follow a number' }
				}
				prevChar = currChar
				continue
			} else {
				// Invalid character found
				return { isInputValid: false, inputError: 'An invalid character found' }
			}
		}
		return { isInputValid: true, inputError: '' }
	}

	return {
		input,
		setInput,
		validateInputString
	}
}
