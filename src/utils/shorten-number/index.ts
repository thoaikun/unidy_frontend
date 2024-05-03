export const shortenNumber = (input: number | null, unit?: string) => {
  if (input !== null) {
    if (input > 1e6) {
      return `${Math.round(input / 1e6)} triệu${unit ? ` ${unit}` : ''}`
    }
    if (input > 1e3) {
      return `${Math.round(input / 1e3)} nghìn${unit ? ` ${unit}` : ''}`
    }
    return `${Math.round(input)}${unit ? ` ${unit}` : ''}`
  }
  else {
    return 'Không có'
  }
}