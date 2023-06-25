import { useState } from 'react'
import './App.css'
import { FormControl, FormLabel, Switch } from '@chakra-ui/react'
import FormPart from './components/FormPart'
import SidebarWithHeader from './components/Sidebar'

const App = () => {
	const [resultFormat, setResultFormat] = useState<string>('eur')

	return (
		<>
			<SidebarWithHeader>
				<FormControl display='flex' alignItems='top' justifyContent='flex-end'>
					<FormLabel htmlFor='isChecked'>Change to button mode</FormLabel>
					<Switch id='changeMode' isDisabled colorScheme='teal' size='lg' />
				</FormControl>
				<FormPart resultFormat={resultFormat} setResultFormat={setResultFormat} />
			</SidebarWithHeader>
		</>
	)
}

export default App
