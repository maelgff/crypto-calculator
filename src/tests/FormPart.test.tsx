/** @jest-environment jsdom */
import { act, fireEvent, render } from '@testing-library/react'
import FormPart from '../components/FormPart'
import { ChakraProvider } from '@chakra-ui/provider'
import mockResultBitcoin from '../mocks/result-bitcoin.json'
import mockResultEtherBitcoin from '../mocks/result.ethereum-bitcoin.json'
import mockAxios from '../__mocks__/axios'

describe('Form part tests', () => {
	const format = 'eur'
	const setup = () => {
		// Render the Form component
		const { baseElement, container, getByRole } = render(
			<ChakraProvider>
				<FormPart setResultFormat={jest.fn} resultFormat={format} />
			</ChakraProvider>
		)
		return {
			container,
			baseElement,
			getByRole
		}
	}

	test('button validate should be disabled without an input', async () => {
		const { getByRole } = setup()
		const validateButton = getByRole('button', { name: 'Validate' })
		expect(validateButton).toHaveProperty('disabled', true)
	})

	test('should display a valid result for a simple operation : $BTC', async () => {
		const { container, getByRole } = setup()

		const calculInput = container.querySelector('#calculation-input')
		calculInput && fireEvent.change(calculInput, { target: { value: '$BTC' } })

		const validateButton = getByRole('button', { name: 'Validate' })
		fireEvent.click(validateButton)
		act(() => mockAxios.mockResponse({ status: 200, data: mockResultBitcoin }))

		const result = container.querySelector('#result-computed')
		expect(result?.innerHTML).toBe(`${mockResultBitcoin.bitcoin.eur} ${format}`)
	})

	test('should display a valid result for a more complex operation : 3*($ETH+$BTC)', async () => {
		const { container, getByRole } = setup()

		const calculInput = container.querySelector('#calculation-input')
		calculInput && fireEvent.change(calculInput, { target: { value: '3*($ETH+$BTC)' } })

		const validateButton = getByRole('button', { name: 'Validate' })
		fireEvent.click(validateButton)
		act(() => mockAxios.mockResponse({ status: 200, data: mockResultEtherBitcoin }))

		const result = container.querySelector('#result-computed')
		const expectedResult =
			(mockResultEtherBitcoin.bitcoin.eur + mockResultEtherBitcoin.ethereum.eur) * 3
		expect(result?.innerHTML).toBe(`${expectedResult} ${format}`)
	})
})
