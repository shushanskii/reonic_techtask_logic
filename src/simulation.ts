import { Chance } from 'chance'

const CHARGING_POWER = 11 // kW per station
const INTERVALS_PER_HOUR = 4 // 15-minute intervals
const NUM_TICKS = 24 * 365 * INTERVALS_PER_HOUR // Total simulation steps

// Probability distributions
const PROBABILITY_ARRIVAL = {
  '00:00-01:00': 0.0094,
  '01:00-02:00': 0.0094,
  '02:00-03:00': 0.0094,
  '03:00-04:00': 0.0094,
  '04:00-05:00': 0.0094,
  '05:00-06:00': 0.0094,
  '06:00-07:00': 0.0094,
  '07:00-08:00': 0.0094,
  '08:00-09:00': 0.0283,
  '09:00-10:00': 0.0283,
  '10:00-11:00': 0.0566,
  '11:00-12:00': 0.0566,
  '12:00-13:00': 0.0566,
  '13:00-14:00': 0.0755,
  '14:00-15:00': 0.0755,
  '15:00-16:00': 0.0755,
  '16:00-17:00': 0.1038,
  '17:00-18:00': 0.1038,
  '18:00-19:00': 0.1038,
  '19:00-20:00': 0.0472,
  '20:00-21:00': 0.0472,
  '21:00-22:00': 0.0472,
  '22:00-23:00': 0.0094,
  '23:00-24:00': 0.0094,
}

const CHARGING_NEEDS = [
  { probability: 0.3431, range: 0 },
  { probability: 0.049, range: 5 },
  { probability: 0.098, range: 10 },
  { probability: 0.1176, range: 20 },
  { probability: 0.0882, range: 30 },
  { probability: 0.1176, range: 50 },
  { probability: 0.1078, range: 100 },
  { probability: 0.049, range: 200 },
  { probability: 0.0294, range: 300 },
]

const chance = new Chance('seed')

// Helper functions
function getProbabilityForHour(hour: number) {
  const hourString = `${hour.toString().padStart(2, '0')}:00`
  for (const [interval, probability] of Object.entries(PROBABILITY_ARRIVAL)) {
    const [start, end] = interval.split('-')
    if (hourString >= start && hourString < end) {
      return probability
    }
  }
  return 0
}

function getChargingNeedRange() {
  const rand = chance.floating({ min: 0, max: 1 })
  let cumulative = 0
  for (const { probability, range } of CHARGING_NEEDS) {
    cumulative += probability
    if (rand <= cumulative) {
      return range
    }
  }
  return 0
}

function calculateIntervals(decimalHours: number) {
  const minutes = decimalHours * 60 // Convert hours to minutes
  return Math.ceil(minutes / 15) // Calculate the number of 15-minute intervals, rounded up
}

export interface Result {
  totalEnergy: number
  theoreticalMaxPower: number
  maxPower: number
  concurrencyFactor: number
}

function simulation(numStations: number): Result {
  if (numStations < 1) {
    throw new Error('Wrong number of stations')
  }

  const stations: number[] = Array(numStations).fill(0) // Track remaining charging time for each station
  const results: number[] = []

  for (let tick = 0; tick < NUM_TICKS; tick++) {
    // Update station timers
    for (let i = 0; i < stations.length; i++) {
      if (stations[i] > 0) {
        stations[i] = stations[i] - 1
      }
    }

    const probability = getProbabilityForHour(
      Math.floor(tick / INTERVALS_PER_HOUR) % 24,
    )

    // Check for new arrivals
    // if (true) {
    if (chance.floating({ min: 0, max: 1 }) <= probability) {
      const chargingNeedRange = getChargingNeedRange()
      const freeStation = stations.findIndex(time => time === 0)

      if (freeStation > -1 && chargingNeedRange > 0) {
        const needPower = (18 * chargingNeedRange) / 100
        stations[freeStation] = calculateIntervals(needPower / CHARGING_POWER)
      }
    }

    // Record total power consumption
    const totalPower = stations.filter(time => time > 0).length * CHARGING_POWER

    results.push(totalPower)
  }

  // Calculate metrics
  const totalEnergy =
    results.reduce((sum, power) => sum + power, 0) / INTERVALS_PER_HOUR // Total energy in kWh
  const maxPower = Math.max(...results) // Maximum power demand in kW
  const theoreticalMaxPower = numStations * CHARGING_POWER // Theoretical maximum power
  const concurrencyFactor = +((maxPower / theoreticalMaxPower) * 100).toFixed(1)

  return {
    totalEnergy,
    theoreticalMaxPower,
    maxPower,
    concurrencyFactor,
  }
}

export default simulation
