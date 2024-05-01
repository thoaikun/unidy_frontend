export const calculateRemainingTime = (target: Date | string | null) => {
  if (target) {
    let temp
    if (typeof target !== 'string') {
      temp = target
    }
    else {
      temp = new Date(target)
    }
    const today = new Date()
    const remainingYear = temp.getFullYear() - today.getUTCFullYear()
    if (remainingYear > 0) {
      return `${remainingYear} năm`
    }
    const remainingMonth = temp.getMonth() - today.getUTCMonth()
    if (remainingMonth > 0) {
      return `${remainingMonth} tháng`
    }
    const remainingDay = temp.getDate() - today.getUTCDate()
    if (remainingDay > 0) {
      return `${remainingDay} ngày`
    }
    const remainingHour = temp.getHours() - today.getUTCHours()
    if (remainingHour > 0) {
      return `${remainingHour} giờ`
    }
    const remainingMinute = temp.getMinutes() - today.getUTCMinutes()
    if (remainingMinute > 0) {
      return `${remainingMinute} phút`
    }
    return 'Sắp kết thúc'
  }
  else {
    return 'Không có thông tin'
  }
}