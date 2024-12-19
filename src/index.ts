import tablemark from 'tablemark'
import asciichart from 'asciichart'
import simulation from './simulation.ts'

const result: unknown[] = []

for (let i = 1; i <= 30; i++) {
  result.push({ numberOfStations: i, ...simulation(i) })
}

const table = tablemark(result)
const chartData = result.map(({ concurrencyFactor }) => concurrencyFactor)

const chart = asciichart.plot(chartData, { height: 30 })
console.log(table)
console.log(chart)
