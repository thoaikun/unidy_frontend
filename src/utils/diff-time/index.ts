export const calculateDifferenceTime = (target: Date) => {
  const today = new Date()
  const diffYear = today.getFullYear() - target.getFullYear()
  if (diffYear > 0) {
    return `${diffYear} năm trước`
  }
  const diffMonth = today.getMonth() - target.getMonth()
  if (diffMonth > 0) {
    return `${diffMonth} tháng trước`
  }
  const diffDay = today.getDay() - target.getDay()
  if (diffMonth > 0) {
    return `${diffDay} ngày trước`
  }
  const diffHour = today.getHours() - target.getHours()
  if (diffHour > 0) {
    return `${diffHour} giờ trước`
  }
  const diffMinute = today.getMinutes() - target.getMinutes()
  if (diffMinute > 0) {
    return `${diffMinute} phút trước`
  }
  return 'Ngay tức thì'
}