import axios from 'axios'
import allCoins from '../mocks/coins.json'

export interface Coin {
	id: string
    symbol: string
    name: string
    platforms: {}
    value?: number
}

const coingeckoFetch = async (coins: Array<Coin>, resultCurrency: string = 'eur')=> {
	const coinsGetParameters = coins.map((c:Coin) => c.id).join(',')
	return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinsGetParameters}&vs_currencies=${resultCurrency}`)
}

export const findCoin = (coin: string): Coin | undefined => {
	return allCoins.find((c: Coin) => c.symbol === coin.toLowerCase())
}

export const getCoinsValue = (coins: Array<Coin>, currencyOfResult: string) => {
	return coingeckoFetch(coins, currencyOfResult)
}