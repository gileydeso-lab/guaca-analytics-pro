export const calculateAccuracy = (predictions, results) => {
  if (predictions.length === 0) return 0
  const correctPredictions = predictions.filter((pred) =>
    results.some((result) => result.number === pred.number)
  )
  return Math.round((correctPredictions.length / predictions.length) * 100)
}

export const calculateWinRate = (predictions) => {
  if (predictions.length === 0) return 0
  const winningPredictions = predictions.filter((pred) => pred.result === 'Ganancia')
  return Math.round((winningPredictions.length / predictions.length) * 100)
}

export const getTotalWinnings = (predictions) => {
  return predictions.reduce((total, pred) => total + (pred.winnings || 0), 0)
}

export const getAnimalFrequency = (predictions) => {
  const frequency = {}
  predictions.forEach((pred) => {
    if (pred.animal) {
      frequency[pred.animal] = (frequency[pred.animal] || 0) + 1
    }
  })
  return frequency
}

export const getNumberFrequency = (predictions) => {
  const frequency = {}
  predictions.forEach((pred) => {
    if (pred.number) {
      pred.number.split('').forEach((digit) => {
        frequency[digit] = (frequency[digit] || 0) + 1
      })
    }
  })
  return frequency
}

export const analyzeTrends = (predictions, days = 7) => {
  const now = new Date()
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  const trends = {}
  predictions.forEach((pred) => {
    const predDate = new Date(pred.date)
    if (predDate >= pastDate) {
      const dateKey = predDate.toISOString().split('T')[0]
      trends[dateKey] = (trends[dateKey] || 0) + 1
    }
  })
  return trends
}

export const predictNextNumbers = (predictions, count = 3) => {
  const numberFreq = getNumberFrequency(predictions)
  const sorted = Object.entries(numberFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map((entry) => entry[0])
  return sorted.join('')
}