import { useEffect, useState } from 'react'
import { Coin, findCoin, getCoinsValue } from '../api/coinsApi'
import { useValidator } from './useValidator'
import { addCurrencyValueToCoinsList } from '../utils/coinsUtils'
import { parseInputString } from '../utils/parserUtils'
import { evaluateMathExpression } from '../utils/calculatorUtils'
import { AxiosError } from 'axios'

interface Props {
	resultFormat: string
}

export const useCalculator = ({ resultFormat }: Props) => {
	const [result, setResult] = useState<string>('')
	const [errors, setErrors] = useState<Array<string>>([])
	const [isCalculationLoading, setIsCalculationLoading] = useState<boolean>(false)

	const { validateInputString } = useValidator()

	const calculateResult = (input: string) => {
		if (input) {
			setIsCalculationLoading(true)
			// We validate the input
			const { isInputValid, inputError } = validateInputString(input)
			if (!isInputValid) {
				setErrors([...errors, `Input not valid : ${inputError}`])
				return
			}
			// We parse the input
			const arrayOfCalculationParameters = parseInputString(input)
			// We export only the currencies
			const onlyCryptoCurrenciesUniqueArray = [
				...new Set(arrayOfCalculationParameters.filter((str) => /^[A-Za-z]+$/.test(str)))
			]
			// We build an array of cryptos with theirs values
			const formattedCoins: Coin[] = []
			onlyCryptoCurrenciesUniqueArray.map((c: string) => {
				const couinFound = findCoin(c)
				if (!couinFound) {
					setErrors([...errors, `You wrote a crypto currency (${c}) not supported`])
					return
				}
				formattedCoins.push(couinFound)
			})
			// if we don't have found all the currency or if the array is empty => save api call
			if (
				formattedCoins.length !== onlyCryptoCurrenciesUniqueArray.length ||
				formattedCoins.length === 0
			) {
				setErrors([...errors, `We don't find all the crypto currency you wrote`])
				return
			}
			getCoinsValue(formattedCoins, resultFormat)
				.then((res) => {
					// here we need to use the returned currencies values and add it on our coins array
					const coinsArrayWithValues = addCurrencyValueToCoinsList(formattedCoins, res.data)
					const calculatorFinalResult = replaceCurrenciesAndCalculate(
						arrayOfCalculationParameters,
						coinsArrayWithValues
					)
					if (isNaN(calculatorFinalResult)) {
						setErrors([...errors, `An error happend during calculations`])
						return
					}
					setResult(calculatorFinalResult.toString())
					setIsCalculationLoading(false)
				})
				.catch((e: AxiosError) => {
					setErrors([
						...errors,
						`An error happend during API call and calcultations : ${e.message}`
					])
					return
				})
		}
	}

	const replaceCurrenciesAndCalculate = (
		arrayOfCalculationParameters: Array<string>,
		coinsListWithPrices: Array<Coin>
	) => {
		// Replace token names with their respective prices
		// Here I sent 'null' to produces a NaN => we don't want to show a wrong result
		const replacedTokens = arrayOfCalculationParameters.map((token: string) => {
			const matchingCoin = coinsListWithPrices.find((c: Coin) => c.symbol.toUpperCase() === token)
			if (matchingCoin) {
				return matchingCoin.value ?? 'null'
			}
			return token
		})
		return evaluateMathExpression(replacedTokens)
	}

	useEffect(() => {
		if (errors.length) {
			setIsCalculationLoading(false)
			setResult('')
		}
	}, [errors])

	return {
		result,
		errors,
		isCalculationLoading,
		calculateResult
	}
}
