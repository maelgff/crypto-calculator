import { useState } from 'react'
import './App.css'
import { Card, CardBody, Stack } from '@chakra-ui/react'
import { AlertBanner } from './components/AlertBanner'
import FormPart from './components/FormPart'
import { useCalculator } from './hooks/useCalculator'

const App = () => {
	const [resultFormat, setResultFormat] = useState<string>('eur')
	const { errors } = useCalculator({ resultFormat })

	return (
		<Card width='600px'>
			<CardBody>
				<FormPart resultFormat={resultFormat} setResultFormat={setResultFormat} />
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
