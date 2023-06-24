import { Coin } from "../api/coinsApi"

export const addCurrencyValueToCoinsList = (data: Array<Coin>, values: { [x: string]: { eur: number } }) => {
	return data.map(item => {
		const value = values[item.id]?.eur || 0
		return {
			...item,
			value
		}
	})
}
