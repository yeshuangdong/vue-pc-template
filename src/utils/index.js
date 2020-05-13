// common方法定义在这里
const urlRegExp = /^((https?:)?\/\/)/

/**
 * 生成uuid，以作临时id用
 * @param {生成的uuid的长度} len
 * @param {随机的字符范围}} radix
 * @returns 返回uuid字符串
 */
export const uuid = (len, radix) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i = 0
  let r = 0
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
/**
 * 深拷贝数组
 * @param {原对象} source
 * @returns 新的深度拷贝对象
 */
export const deepClone = source => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export const padStart = (sourceString, targetLength, padString = ' ') => {
  padString = typeof padString === 'string' ? padString : String(padString)
  targetLength = targetLength >> 0
  if (sourceString.length > targetLength) {
    return sourceString
  } else {
    targetLength = targetLength - sourceString.length
    if (targetLength > padString.length) {
      padString += stringRepeat(padString, targetLength / padString.length)
    }
    return padString.slice(0, targetLength) + sourceString
  }
}

export const padEnd = (sourceString, targetLength, padString = ' ') => {
  padString = typeof padString === 'string' ? padString : String(padString)
  targetLength = targetLength >> 0
  if (sourceString.length > targetLength) {
    return sourceString
  } else {
    targetLength = targetLength - sourceString.length
    if (targetLength > padString.length) {
      padString += stringRepeat(padString, targetLength / padString.length)
    }
    return sourceString + padString.slice(0, targetLength)
  }
}

/**
 * 显示折扣
 * 0.85就是85折 0.8就是8折
 */

export const generateDiscount = val => {
  let clearZeroOfSuffix = numStr => {
    if (numStr && numStr.length > 0 && numStr[numStr.length - 1] === '0') {
      numStr = numStr.substr(0, numStr.length - 1)
      if (numStr[numStr.length - 1] === '.') {
        numStr = numStr.substr(0, numStr.length - 1)
      }
      return clearZeroOfSuffix(numStr)
    } else {
      return numStr
    }
  }
  return clearZeroOfSuffix(val + '')
}

/**
 * 加载图片promise版本
 * @param {加载图片的url地址} url
 * @returns 返回promise对象
 */
export const preloadImg = url => {
  return new Promise(resolve => {
    let img = new Image()
    img.src = url
    img.onload = () => {
      resolve()
    }
  })
}

/**
 * 转换querystring为对象并返回该对象
 */
export const getUrlParams = () => {
  let query = ''
  if (location.hash.split('?')[1]) {
    query = location.hash.split('?')[1]
  }
  let queryObj = {}
  if (query) {
    let splitArr = query.split('&')
    if (splitArr.length) {
      for (let queryStr of splitArr) {
        let strArr = queryStr.split('=')
        if (strArr[0] !== undefined && strArr[0] !== null) {
          queryObj[strArr[0]] = strArr[1] || ''
        }
      }
    }
  }
  return queryObj
}
/**
 * 将对象转换为queryString
 * @param {要转换为queryString的对象} obj
 */
export const createSearch = obj => {
  let search = ''
  if (typeof obj === 'object' && !(obj instanceof Array)) {
    let array = []
    for (let key of Object.keys(obj)) {
      array.push({
        key: key,
        value: obj[key],
      })
    }
    if (array.length === 0) {
      return search
    }
    for (let i = 0; i < array.length; i++) {
      let str = i === 0 ? '?' : '&'
      search += str + array[i].key + '=' + encodeURIComponent(array[i].value)
    }
  }
  return search
}

/**
 * 判断值是否为空
 * @param {要判断的值} val
 * @param {0是否为空}} isZeroNull
 * @returns Boolean
 */
export const isEmpty = (val, isZeroNull = false) => {
  return val === '' || val === null || val === undefined || (isZeroNull && val === 0)
}
/**
 * 判断对象是否非空
 * @param {要判断的值} val
 * @param {0是否为空} isZeroNull
 */
export const isNotEmpty = (val, isZeroNull = false) => {
  return !isEmpty(val, isZeroNull)
}

/**
 * 判断变量是否为对象
 * @param {变量} val
 */
export const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

/**
 * 判断变量是否为数组
 * @param {变量} val
 */
export const isArray = val => {
  return Object.prototype.toString.call(val) === '[object Array]'
}

/**
 * 判断变量是否为数字
 * @param {变量} val
 */
export const isNumber = val => {
  return Object.prototype.toString.call(val) === '[object Number]'
}

/**
 * 判断变量是否为undefined
 * @param {变量} val
 */
export const isUndefined = val => {
  return Object.prototype.toString.call(val) === '[object Undefined]'
}

/**
 * 判断变量是否为字符串
 * @param {变量} val
 */
export const isString = val => {
  return Object.prototype.toString.call(val) === '[object String]'
}

/**
 * 判断变量是否为函数
 * @param {变量} val
 */
export const isFunction = val => {
  return Object.prototype.toString.call(val) === '[object Function]'
}

/**
 * 判断变量是否为正则表达式
 * @param {变量} val
 */
export const isRegExp = val => {
  return Object.prototype.toString.call(val) === '[object RegExp]'
}

/**
 * 判断变量是否为boolean类型
 * @param {变量} val
 */
export const isBoolean = val => {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

/**
 * 判断字符串是否为合法的url
 * @param {url字符串} str
 */
export const isValidUrl = str => {
  return urlRegExp.test(str)
}

// 处理sessionStorage OR loaclStorage 处理浏览器本利存储
export const storageSet = (storgeType, key, val) => {
  if (storgeType === 'session') {
    window.sessionStorage && window.sessionStorage.setItem(key, JSON.stringify(val))
  } else if (storgeType === 'local') {
    window.localStorage && window.localStorage.setItem(key, JSON.stringify(val))
  }
}

export const storageGet = (storgeType, key) => {
  if (storgeType === 'session') {
    if (window.sessionStorage) {
      let tempValue = window.sessionStorage.getItem(key)
      return JSON.parse(tempValue)
    }
  } else if (storgeType === 'local') {
    if (window.localStorage) {
      let tempValue = window.localStorage.getItem(key)
      return JSON.parse(tempValue)
    }
  }
}

// 不区分大小写字符串比较 String compare
export const caseInsensitiveStringCompare = (compareA, compareB) => {
  return (compareA + '').toLowerCase() === (compareB + '').toLowerCase()
}

// 获取cookie
export const getCookie = name => {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr != null) {
    return unescape(arr[2])
  } else {
    return null
  }
}
