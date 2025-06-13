import dayjs from 'dayjs'

export const currentDate = (format = 'YYYY-MM-DD') => {
  return dayjs().format(format)
}

export const subtractDays = (days, format = 'YYYY-MM-DD') => {
  return dayjs().subtract(days, 'day').format(format)
}

export const addDays = (days, format = 'YYYY-MM-DD') => {
  return dayjs().add(days, 'day').format(format)
}

export const formatDate = (date, current_format = 'MMM DD YYYY', format = 'YYYY-MM-DD') => {
  return date instanceof Date
    ? dayjs(date).format(format)
    : dayjs(date, current_format).format(format).replace('.', '')
}
