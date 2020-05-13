// 全局filter定义在这里
import Vue from 'vue'
import { isEmpty, padStart, generateDiscount } from '@/utils'

/**
 * 日期格式化，传入毫秒格式化
 */
Vue.filter('dateFormat', formatDate)

/**
 * 日期格式化，传入秒格式化
 */
Vue.filter('dateFormatS', (val, format) => {
  return formatDate(val * 1000, format)
})

function formatDate(val, format) {
  var deFormat, theDate, month, year, date, hours, mins, seconds
  var formats = {
    LLLL: function () {
      return `${year}年${month}月${date}日  ${hours}:${mins}`
    },
    LLL: function () {
      return `${year}年${month}月${date}日`
    },
    llll: function () {
      return `${year}.${month}.${date}  ${hours}:${mins}`
    },
    lll: function () {
      return `${year}.${month}.${date}`
    },
    LL: function () {
      return `${month}月${date}日`
    },
    mm: function () {
      return `${hours}:${mins}`
    },
    Lll: function () {
      return `${year}-${month}-${date}`
    },
    Ll: function () {
      return `${year}-${month}`
    },
    Llls: function () {
      return `${year}/${month}/${date}`
    },
    Lllss: function () {
      return `${year}/${month}/${date} ${hours}:${mins}:${seconds}`
    },
    Lllmm: function () {
      return `${year}-${month}-${date}  ${hours}:${mins}`
    },
    hhmm: function () {
      return `${hours}:${mins}`
    },
  }
  if (!val && typeof val !== 'number') {
    return ''
  }
  deFormat = format || 'LLL'
  theDate = new Date(val)
  year = theDate.getFullYear()
  month = padStart(String(theDate.getMonth() + 1), 2, '0')
  date = padStart(String(theDate.getDate()), 2, '0')
  hours = padStart(String(theDate.getHours()), 2, '0')
  mins = padStart(String(theDate.getMinutes()), 2, '0')
  seconds = padStart(String(theDate.getSeconds()), 2, '0')
  return formats[deFormat]()
}

// 处理返回值为空的情况【'' , null】
Vue.filter('dealEmpty', (val, replaceMent = '--', suffix = '', withZero = false) => {
  if (withZero) {
    return val === '' || val === 0 || val === null || val === undefined ? replaceMent : val + suffix
  } else {
    return val === '' || val === null || val === undefined ? replaceMent : val + suffix
  }
})

// 超长截断
Vue.filter('limitIn', (val, limitLength = 20, ellipsis = '...', nullReplacer = '***') => {
  if (val === '' || val === null || val === undefined) {
    return nullReplacer
  } else if (val.length > limitLength) {
    return val.substring(0, limitLength - 1) + ellipsis
  }
  return val
})

// 手机号部分隐藏
Vue.filter('shodowStr', (val, front = 4, behind = 3, replaceStr = '***') => {
  if (isEmpty(val)) {
    return ''
  } else if (val.length <= front + behind) {
    return val
  } else {
    return val.substr(0, front) + replaceStr + val.substr(-behind)
  }
})

/**
 *显示折扣
 0.85就是85折 0.8就是8折
 */
Vue.filter('generateDiscount', generateDiscount)
