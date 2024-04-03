export const numberWithDots = (input: number | string) => {
  if (typeof input === 'number') {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  return (parseInt(input.replace(/\D/g, '')) | 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}