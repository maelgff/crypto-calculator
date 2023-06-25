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
			return false
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
				// Integers are allowed
				if (!isNaN(parseInt(prevChar))) {
					// Number follows a number
					return false
				}
				if (wordRegex.test(prevChar)) {
					return false
				}
				prevChar = currChar
				continue
			} else if (wordRegex.test(currChar)) {
				if (!isNaN(parseInt(prevChar))) {
					// Number follows a letter
					return false
				}
				prevChar = currChar
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
