import { Button, FormControl, Input, Text, Select, Box, Heading, Flex } from '@chakra-ui/react'
import { useValidator } from './../hooks/useValidator'
import { supportedVsCurrencies } from './../constants/supportedVsCurrencies'
import { useCalculator } from './../hooks/useCalculator'

interface Props {
	resultFormat: string
	setResultFormat: (value: string) => void
}

export const FormPart = ({ resultFormat, setResultFormat }: Props) => {
	const { input, setInput } = useValidator()
	const { result, errors, isCalculationLoading, calculateResult } = useCalculator({ resultFormat })

	console.log(errors)

	return (
		<>
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
		</>
	)
}

export default FormPart
