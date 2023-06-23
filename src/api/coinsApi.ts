import allCoins from '../mocks/coins.json'

interface Coin {
	id: string
    symbol: string
    name: string
    platforms: any
}

// send several coin ids=bitcoin%2Cethereum
const coingeckoFetch = async (coin: string, resultCurrency: string = 'eur')=> {
	fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${resultCurrency}`).then((response) =>
		response.json().then((jsonData) => {
			console.log(jsonData)
			return jsonData
		})
	).catch((e) => {
		console.log(e)
	})
}

export const findCoin = (coin: string): Coin | undefined => {
	return allCoins.find((c: Coin) => c.symbol === coin.toLowerCase())
}

export const getCoinValue = (coin: string, currencyOfResult: string) => {
	return coingeckoFetch(coin, currencyOfResult)
}