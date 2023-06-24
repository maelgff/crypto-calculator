import { Coin } from "../api/coinsApi"

/**
 * The goal here is to simply add the API returned coin currency to our coins list
 * @param data 
 * @param values 
 * @returns 
 */
export const addCurrencyValueToCoinsList = (data: Array<Coin>, values: { [x: string]: { eur: number } }) => {
	return data.map(item => {
		const value = values[item.id]?.eur || 0
		return {
			...item,
			value
		}
	})
}
