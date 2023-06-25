import { useState } from 'react'
import './App.css'
import { Card, CardBody } from '@chakra-ui/react'
import FormPart from './components/FormPart'
import { useCalculator } from './hooks/useCalculator'
import SidebarWithHeader from './components/Sidebar'

const App = () => {
	const [resultFormat, setResultFormat] = useState<string>('eur')
	const { errors } = useCalculator({ resultFormat })

	console.log(errors)
	console.log(resultFormat)
	return (
		<>
			<SidebarWithHeader>
				<Card width='600px'>
					<CardBody>
						<FormPart resultFormat={resultFormat} setResultFormat={setResultFormat} />
					</CardBody>
				</Card>
			</SidebarWithHeader>
		</>
	)
}

export default App
