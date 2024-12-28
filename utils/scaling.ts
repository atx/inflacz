// Scale factor for maximum slider value (120% of highest value)
const SCALE_FACTOR = 1.2

export function calculateMaxValue(values: Record<string, number>): number {
  const maxValue = Math.min(Math.max(...Object.values(values), 10000), 100000)
  return Math.ceil(maxValue * SCALE_FACTOR / 1000) * 1000 // Round to nearest thousand
}