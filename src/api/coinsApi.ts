import axios, { AxiosResponse } from 'axios'
import allCoins from '../mocks/coins.json'

export interface Coin {
	id: string
	symbol: string
	name: string
	platforms: {}
	value?: number
}

export interface CoinDetail {
	image: { large: string; small: string }
	description: { en: string; fr: string }
	id: string
	symbol: string
	name: string
	genesis_date: string
}

export const findCoin = (coin: string): Coin | undefined => {
	return allCoins.find((c: Coin) => c.symbol === coin.toLowerCase())
}

export const getCoinsValue = (
	coins: Array<Coin>,
	currencyOfResult = 'eur'
): Promise<AxiosResponse<{ [x: string]: { eur: number } }>> => {
	const coinsGetParameters = coins.map((c: Coin) => c.id).join(',')
	return axios.get(
		`https://api.coingecko.com/api/v3/simple/price?ids=${coinsGetParameters}&vs_currencies=${currencyOfResult}`
	)
}

export const getCoinHistory = (
	coin: Coin,
	currencyOfResult = 'eur'
): Promise<AxiosResponse<{ prices: number[][] }>> => {
	return axios.get(
		`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?&vs_currency=${currencyOfResult}&days=365`
	)
}

export const getCoinInfo = (coin: Coin): Promise<AxiosResponse<CoinDetail>> => {
	return axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}`)
}
