import { useState } from 'react'
import './App.css'
import {
	Alert,
	AlertIcon,
	Button,
	Card,
	CardBody,
	FormControl,
	Input,
	Spinner,
	Stack,
	Text,
	Select,
	Box,
	Heading,
	Flex
} from '@chakra-ui/react'
import { findCoin, getCoinValue } from './api/coinsApi'
import { parseInputString } from './utils/parserUtils'
import { useValidator } from './hooks/useValidator'
import { AlertBanner } from './components/AlertBanner'
import { supportedVsCurrencies } from './constants/supportedVsCurrencies'

function App() {
	const startingPattern = '${'
	const endingPattern = '}'
	const [result, setResult] = useState<string>('')
	const [resultFormat, setResultFormat] = useState<string>('eur')
	const [errors, setErrors] = useState<Array<string>>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { input, setInput, validateInputString } = useValidator()

	const calculateResult = () => {
		// setIsLoading(true)
		if (input) {
			const isInputValid = validateInputString(input)
			if (!isInputValid) {
				setErrors([...errors, `Input not valid`])
				return
			}
			console.log(parseInputString(input))
			return
			// verif authorized char
			// extract the crypto currency
			const startingCharInput = input.indexOf(startingPattern)
			const lastCharInput = input.indexOf(endingPattern)
			const inputCoin = input.substring(startingCharInput + startingPattern.length, lastCharInput)
			const couinFound = findCoin(inputCoin)
			if (!couinFound) {
				setErrors([...errors, `Coin ${couinFound} not found`])
				return
			}
			const coinValue = getCoinValue(couinFound.id, resultFormat)
			setIsLoading(false)
		}
	}

	return (
		<Card width='500px'>
			<CardBody>
				<Box>
					<Heading as='h3' size='lg'>
						Calculate with crypto currencies
					</Heading>
					<Text fontSize='md'>
						Try for example : <Text as='i'>3*$ETH+$BTC</Text>
					</Text>
					<Flex>
						<FormControl isInvalid={errors.length > 0}>
							<Input type='text' onChange={(e) => setInput(e.target.value)} />
						</FormControl>
						<Select
							maxWidth='150px'
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
