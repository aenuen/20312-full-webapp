import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const dateDist = (date) => {
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) { // 超过7天，显示日期
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    return dayjs(date).from(dayjs()) // 1小前，xx小时前，X天前
    // return dayjs().to(dayjs(date)) // 2种方式都可以
  }
}

const hourDist = (date) => {
  if (dayjs(date).isBefore(dayjs(dayjs().format('YYYY-MM-DD 00:00:00')))) { // 超过1天，显示日期
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    return dayjs(date).format('HH:mm:ss') // 1天内
  }
}

export default {
  dateDist,
  hourDist
}
