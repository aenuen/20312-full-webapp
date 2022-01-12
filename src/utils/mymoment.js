import dayjs from 'dayjs'

// 取得星期几，星期天返回0
export const getDay = (_date) => {
  return Number(dayjs(_date).format('d'))
}

export const fromNow = (date, needFormat) => {
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days')) || needFormat) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    return dayjs(date).fromNow()
  }
}

export const getDiffFromNow = (_date) => {
  const today = dayjs().format('YYYY-MM-DD')
  return dayjs(today).diff(dayjs(_date).format('YYYY-MM-DD'), 'days')
}
