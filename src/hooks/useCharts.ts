import { useState } from 'react'
import { Coin, findCoin, getCoinHistory } from '../api/coinsApi'
import { parseInputString } from '../utils/parserUtils'

interface Props {
	resultFormat: string
}

export interface CoinData {
	[key: string]: number[][]
  }

export const useCharts = ({ resultFormat }: Props) => {
	const [dataPoints, setDataPoints] = useState<Array<CoinData>>([])
	
	const createGraphs = (input: string) => {
		setDataPoints([])
		if (input) {
			const arrayOfCalculationParameters = parseInputString(input)
			const onlyCryptoCurrenciesUniqueArray = [
				...new Set(arrayOfCalculationParameters.filter((str) => /^[A-Za-z]+$/.test(str)))
			]
			const formattedCoins: Coin[] = []
			onlyCryptoCurrenciesUniqueArray.map((c: string) => {
				const couinFound = findCoin(c)
				if (!couinFound) {
					return
				}
				formattedCoins.push(couinFound)
				getCoinHistory(couinFound, resultFormat).then((res) => {
					setDataPoints((prevDataPoints) => [
						...prevDataPoints,
						{ [couinFound.id]: res.data.prices }
					  ])
				})
			})
		}
	}

	return {
		dataPoints,
		createGraphs
	}
}
