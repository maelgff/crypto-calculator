import { useState } from 'react'
import './App.css'
import {
	Button,
	Card,
	CardBody,
	FormControl,
	Input,
	Stack,
	Text,
	Select,
	Box,
	Heading,
	Flex
} from '@chakra-ui/react'
import { Coin, findCoin, getCoinsValue } from './api/coinsApi'
import { parseInputString } from './utils/parserUtils'
import { useValidator } from './hooks/useValidator'
import { AlertBanner } from './components/AlertBanner'
import { supportedVsCurrencies } from './constants/supportedVsCurrencies'
import { evaluateExpression } from './test'
import { addCurrencyValueToCoinsList } from './utils/coinsUtils'

function App() {
	const [result, setResult] = useState<string>('')
	const [resultFormat, setResultFormat] = useState<string>('eur')
	const [errors, setErrors] = useState<Array<string>>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { input, setInput, validateInputString } = useValidator()

	const calculateResult = () => {
		// setIsLoading(true)
		if (input) {
			// We validate the input
			const isInputValid = validateInputString(input)
			if (!isInputValid) {
				setErrors([...errors, `Input not valid`])
				setIsLoading(false)
				return
			}
			// We parse the input
			const arrayOfCalculationParameters = parseInputString(input)
			// We replace coins by their value
			const onlyCryptoCurrenciesUniqueArray = [
				...new Set(arrayOfCalculationParameters.filter((str) => /^[A-Za-z]+$/.test(str)))
			]
			// We build an array of cryptos with theirs values
			const formattedCoins: Coin[] = []
			onlyCryptoCurrenciesUniqueArray.map((c: string) => {
				const couinFound = findCoin(c)
				if (!couinFound) {
					setErrors([...errors, `You wrote a crypto currency (${couinFound}) not supported`])
					return
				}
				formattedCoins.push(couinFound)
			})
			getCoinsValue(formattedCoins, resultFormat).then((res) => {
				const currenciesValues = res.data
				// here we need to use the returned currencies values and add it on our coins array
				const coinsArrayWithValues = addCurrencyValueToCoinsList(formattedCoins, currenciesValues)
				const calculatorFinalResult = evaluateExpression(
					arrayOfCalculationParameters,
					coinsArrayWithValues
				)
				if (isNaN(calculatorFinalResult)) {
					setErrors([...errors, `An error happend during calculations`])
					setIsLoading(false)
					return
				}
				setResult(calculatorFinalResult)
			})
			setIsLoading(false)
		}
	}

	return (
		<Card width='600px'>
			<CardBody>
				<Box>
					<Heading as='h4' size='md'>
						Calculate with crypto currencies
					</Heading>
					<Text fontSize='md'>
						Try for example : <Text as='i'>3*$ETH+$BTC</Text>
					</Text>
					<Text fontSize='md' color='orange'>
						Please only use uppercase for the currencies
					</Text>
					<Flex>
						<FormControl isInvalid={errors.length > 0}>
							<Input type='text' onChange={(e) => setInput(e.target.value)} />
						</FormControl>
						<Select
							maxWidth='100px'
							placeholder='Select format'
							defaultValue={resultFormat}
							onChange={(e) => setResultFormat(e.target.value)}
						>
							{supportedVsCurrencies.map((curr: string) => {
								return (
									<option key={curr} value={curr}>
										{curr}
									</option>
								)
							})}
						</Select>
					</Flex>
				</Box>
				<Button
					mt='1'
					isDisabled={input === ''}
					isLoading={isLoading}
					loadingText='Calculating'
					onClick={() => calculateResult()}
				>
					Validate
				</Button>
				{result && (
					<Text>
						{result} {resultFormat}
					</Text>
				)}
				<Stack spacing={3}>
					{errors.map((e: string, idx: number) => (
						<AlertBanner key={`error-${idx}`} content={e} />
					))}
				</Stack>
			</CardBody>
		</Card>
	)
}

export default App
