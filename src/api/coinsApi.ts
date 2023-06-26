import axios from 'axios'
import allCoins from '../mocks/coins.json'

export interface Coin {
	id: string
	symbol: string
	name: string
	platforms: {}
	value?: number
}

export interface CoinDetail {
	image: string
	description: string
	id: string
	symbol: string
	name: string
	genesis_date: string
}



export const findCoin = (coin: string): Coin | undefined => {
	return allCoins.find((c: Coin) => c.symbol === coin.toLowerCase())
}

export const getCoinsValue = (coins: Array<Coin>, currencyOfResult: string = 'eur') => {
	const coinsGetParameters = coins.map((c: Coin) => c.id).join(',')
	return axios.get(
		`https://api.coingecko.com/api/v3/simple/price?ids=${coinsGetParameters}&vs_currencies=${currencyOfResult}`
	)
}

export const getCoinHistory = (coin: Coin, currencyOfResult: string = 'eur') => {
	return axios.get(
		`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?&vs_currency=${currencyOfResult}&days=365`
	)
}

export const getCoinInfo = (coin: Coin) => {
	return axios.get(
		`https://api.coingecko.com/api/v3/coins/${coin.id}`
	)
}