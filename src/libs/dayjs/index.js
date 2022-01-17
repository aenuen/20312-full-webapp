import dayjs from 'dayjs'

/**
 * 获取日期的日份
 * @param date
 * @returns {number}
 */
export const getDateDay = (date) => {
  return Number(dayjs(date).format('d'))
}

/**
 * 超过7天显示年月日，否则以“多少时间前”显示
 * @param date 要比较的日期
 * @param {boolean} needFormat 无视超出天数，强制显示年月日
 * @returns {string}
 */
export const senvenDayShow = (date, needFormat) => {
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days')) || needFormat) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    return dayjs(date).fromNow()
  }
}
/**
 * 两个日期相差天数
 * @param date
 * @returns {number}
 */
export const diffNumberDays = (date) => {
  const today = dayjs().format('YYYY-MM-DD')
  return dayjs(today).diff(dayjs(date).format('YYYY-MM-DD'), 'days')
}
