import React from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(...registerables)

interface PriceGraphProps {
	prices: number[][]
	title: string
}

const PriceGraph: React.FC<PriceGraphProps> = ({ prices, title }) => {
	// Extracting timestamp and values from the prices array
	const timestamps = prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString())
	const values = prices.map(([, value]) => value)

	// Chart.js data and options configurations
	const data = {
		labels: timestamps,
		datasets: [
			{
				label: 'Price',
				data: values,
				fill: false,
				borderColor: 'rgba(75,192,192,1)',
				tension: 0.1
			}
		]
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const
			},
			title: {
				display: true,
				text: `${title} Line Chart`
			}
		}
	}

	return <Line data={data} options={options} />
}

export default PriceGraph
