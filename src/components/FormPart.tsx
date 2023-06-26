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
	StatNumber,
	Card,
	CardBody
} from '@chakra-ui/react'
import { useValidator } from './../hooks/useValidator'
import { supportedVsCurrencies } from './../constants/supportedVsCurrencies'
import { useCalculator } from './../hooks/useCalculator'
import { AlertBanner } from './AlertBanner'
import { useEffect, useMemo, useState } from 'react'
import PriceGraph from './PriceGraph'
import { CoinData, useCharts } from '../hooks/useCharts'

interface Props {
	resultFormat: string
	setResultFormat: (value: string) => void
}

export const FormPart = ({ resultFormat, setResultFormat }: Props) => {
	const [showGraphs, setShowGraphs] = useState<boolean>(false)
	const { input, setInput } = useValidator()
	const { result, errors, isCalculationLoading, calculateResult, currentCoinsList } = useCalculator(
		{ resultFormat }
	)
	const { createGraphs, dataPoints } = useCharts({ resultFormat })

	const recentErrors = useMemo(() => {
		return [...errors].reverse()
	}, [errors])

	const getGraphs = () => {
		setShowGraphs(true)
		createGraphs(input)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			calculateResult(input)
		}
	}

	useEffect(() => {
		setShowGraphs(false)
	}, [result])

	return (
		<>
			<Card maxW='600px'>
				<CardBody>
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
							<FormControl isInvalid={errors.length > 0 && result === ''}>
								<Input
									id='calculation-input'
									type='text'
									onKeyDown={handleKeyDown}
									onChange={(e) => setInput(e.target.value)}
								/>
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
						id='validate-input'
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
						<>
							<Stat>
								<StatNumber id='result-computed'>
									{result} {resultFormat}
								</StatNumber>
								<StatHelpText>{new Date().toLocaleString()}</StatHelpText>
							</Stat>
							{!showGraphs && <Button onClick={() => getGraphs()}>Show graphs</Button>}
						</>
					)}
				</CardBody>
			</Card>
			<>
				{showGraphs &&
					dataPoints &&
					dataPoints.map((d: CoinData) => {
						return Object.entries(d).map(([coinId, data]) => {
							return <PriceGraph key={coinId} prices={data} title={coinId} />
						})
					})}
			</>
			<Stack spacing={3} mt='3' maxH='460px' overflowY='auto'>
				{recentErrors.map((e: string, idx: number) => (
					<AlertBanner key={`error-${idx}`} content={e} />
				))}
			</Stack>
		</>
	)
}

export default FormPart
