import { useState } from 'react'
import './App.css'
import { Card, CardBody, Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react'
import FormPart from './components/FormPart'
import SidebarWithHeader from './components/Sidebar'

const App = () => {
	const [resultFormat, setResultFormat] = useState<string>('eur')

	return (
		<>
			<SidebarWithHeader>
				<Flex justify='space-between' padding='10px'>
					<Card width='600px'>
						<CardBody>
							<FormPart resultFormat={resultFormat} setResultFormat={setResultFormat} />
						</CardBody>
					</Card>
					<FormControl display='flex' alignItems='top' justifyContent='flex-end'>
						<FormLabel htmlFor='isChecked'>Change to button mode</FormLabel>
						<Switch id='changeMode' isDisabled colorScheme='teal' size='lg' />
					</FormControl>
				</Flex>
			</SidebarWithHeader>
		</>
	)
}

export default App
