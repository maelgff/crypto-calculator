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
import { useValidator } from './hooks/useValidator'
import { AlertBanner } from './components/AlertBanner'
import { supportedVsCurrencies } from './constants/supportedVsCurrencies'
import { useCalculator } from './hooks/useCalculator'

function App() {
	const [resultFormat, setResultFormat] = useState<string>('eur')
	const { input, setInput } = useValidator()
	const { result, errors, isCalculationLoading, calculateResult } = useCalculator({ resultFormat })

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
					isLoading={isCalculationLoading}
					loadingText='Calculating'
					onClick={() => calculateResult(input)}
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
