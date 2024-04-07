export const calculateDifferenceTime = (target: Date | string | null) => {
  if (target) {
    let temp = null
    if (typeof target !== 'string') {
      temp = target
    }
    else {
      temp = new Date(target)
    }
    const today = new Date()
    const diffYear = today.getFullYear() - temp.getFullYear()
    if (diffYear > 0) {
      return `${diffYear} năm trước`
    }
    const diffMonth = today.getMonth() - temp.getMonth()
    if (diffMonth > 0) {
      return `${diffMonth} tháng trước`
    }
    const diffDay = today.getDay() - temp.getDay()
    if (diffMonth > 0) {
      return `${diffDay} ngày trước`
    }
    const diffHour = today.getHours() - temp.getHours()
    if (diffHour > 0) {
      return `${diffHour} giờ trước`
    }
    const diffMinute = today.getMinutes() - temp.getMinutes()
    if (diffMinute > 0) {
      return `${diffMinute} phút trước`
    }
    return 'Ngay tức thì'
  }
  else {
    return 'Không có thông tin'
  }
}