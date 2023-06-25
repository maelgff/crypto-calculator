import {
	Button,
	FormControl,
	Input,
	Text,
	Select,
	Box,
	Heading,
	Flex,
	Stack,
	Code,
	Stat,
	StatHelpText,
	StatNumber
} from '@chakra-ui/react'
import { useValidator } from './../hooks/useValidator'
import { supportedVsCurrencies } from './../constants/supportedVsCurrencies'
import { useCalculator } from './../hooks/useCalculator'
import { AlertBanner } from './AlertBanner'
import { useMemo } from 'react'

interface Props {
	resultFormat: string
	setResultFormat: (value: string) => void
}

export const FormPart = ({ resultFormat, setResultFormat }: Props) => {
	const { input, setInput } = useValidator()
	const { result, errors, isCalculationLoading, calculateResult } = useCalculator({ resultFormat })

	const recentErrors = useMemo(() => {
		return [...errors].reverse()
	}, [errors])

	return (
		<>
			<Box>
				<Heading as='h4' size='md'>
					Calculate with crypto currencies
				</Heading>
				<Text fontSize='md'>
					Try for example : <Code colorScheme='red' children='3*$ETH+$BTC' />
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
				fontFamily={'heading'}
				bgGradient='linear(to-r, red.400,pink.400)'
				color={'white'}
				_hover={{
					bgGradient: 'linear(to-r, red.400,pink.400)',
					boxShadow: 'xl'
				}}
			>
				Validate
			</Button>
			{result && (
				<Stat>
					<StatNumber>
						{result} {resultFormat}
					</StatNumber>
					<StatHelpText>{new Date().toLocaleString()}</StatHelpText>
				</Stat>
			)}
			<Stack spacing={3}>
				{recentErrors.map((e: string, idx: number) => (
					<AlertBanner key={`error-${idx}`} content={e} />
				))}
			</Stack>
		</>
	)
}

export default FormPart
