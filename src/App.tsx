import { useState } from 'react'
import './App.css'
import { Card, CardBody } from '@chakra-ui/react'
import FormPart from './components/FormPart'
import { useCalculator } from './hooks/useCalculator'

const App = () => {
	const [resultFormat, setResultFormat] = useState<string>('eur')
	const { errors } = useCalculator({ resultFormat })

	console.log(errors)
	console.log(resultFormat)
	return (
		<Card width='600px'>
			<CardBody>
				<FormPart resultFormat={resultFormat} setResultFormat={setResultFormat} />
			</CardBody>
		</Card>
	)
}

export default App
