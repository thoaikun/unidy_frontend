export const numberToVND = (input: number | null) => {
  if (input) {
    if (input > 1e6) {
      return `${Math.round(input / 1e6)} triệu đồng`
    }
    if (input > 1e3) {
      return `${Math.round(input / 1e3)} ngàn đồng`
    }
    return `${Math.round(input)} đồng`
  }
  else {
    return 'Không có'
  }
}