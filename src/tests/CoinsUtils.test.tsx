import { Coin } from '../api/coinsApi'
import { addCurrencyValueToCoinsList } from '../utils/coinsUtils'

describe('addCurrencyValueToCoinsList', () => {
	const mockData: Coin[] = [
		{ id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', platforms: {} },
		{ id: 'ethereum', symbol: 'ETH', name: 'Ethereum', platforms: {} },
		{ id: 'ripple', symbol: 'XRP', name: 'Ripple', platforms: {} }
	]

	const mockValues = {
		bitcoin: { eur: 50000 },
		ethereum: { eur: 3000 }
	}

	it('should add currency values to the coins list', () => {
		const expectedOutput: Coin[] = [
			{ id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', platforms: {}, value: 50000 },
			{ id: 'ethereum', symbol: 'ETH', name: 'Ethereum', platforms: {}, value: 3000 },
			{ id: 'ripple', symbol: 'XRP', name: 'Ripple', platforms: {}, value: 0 }
		]

		const result = addCurrencyValueToCoinsList(mockData, mockValues)
		expect(result).toEqual(expectedOutput)
	})

	it('should handle missing currency values', () => {
		const expectedOutput: Coin[] = [
			{ id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', platforms: {}, value: 0 },
			{ id: 'ethereum', symbol: 'ETH', name: 'Ethereum', platforms: {}, value: 0 },
			{ id: 'ripple', symbol: 'XRP', name: 'Ripple', platforms: {}, value: 0 }
		]

		const result = addCurrencyValueToCoinsList(mockData, {})
		expect(result).toEqual(expectedOutput)
	})

	it('should handle coins without matching values', () => {
		const expectedOutput: Coin[] = [
			{ id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', platforms: {}, value: 50000 },
			{ id: 'ethereum', symbol: 'ETH', name: 'Ethereum', platforms: {}, value: 3000 },
			{ id: 'ripple', symbol: 'XRP', name: 'Ripple', platforms: {}, value: 0 },
			{ id: 'litecoin', symbol: 'LTC', name: 'Litecoin', platforms: {}, value: 0 }
		]

		const result = addCurrencyValueToCoinsList(
			mockData.concat({ id: 'litecoin', symbol: 'LTC', name: 'Litecoin', platforms: {} }),
			mockValues
		)
		expect(result).toEqual(expectedOutput)
	})
})
