let sha1 = require('js-sha1')
let md5 = require('js-md5')

/**
 *
 * @param {buffer}} buffer
 */
const ab2hex = function(buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}

export const sign = (toSign, key) => {
  const MAX_SIGN_KEYS = 19
  const CHARARCTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let md5edKey = md5.array(key)
  let sha1edToSign = sha1.array(toSign)
  let rightTwo = key.charCodeAt(key.length - 2)
  let rightOne = key[key.length - 1]
  let index = CHARARCTERS.indexOf(rightOne)
  let remain = rightTwo % MAX_SIGN_KEYS
  let keyIndex = index - MAX_SIGN_KEYS + remain
  let concated = [...md5edKey, ...sha1edToSign]
  for (let i = 0; i < concated.length; i = i + 2) {
    concated[i] = (concated[i] & 0xff) ^ 42
  }
  let signBates = md5.array(concated)
  let signed = [...signBates, Math.floor(Math.random() * 12) * MAX_SIGN_KEYS + keyIndex]
  return ab2hex(signed)
}
// 排序对象
function sortObj(obj) {
  var keysArr = Object.keys(obj).sort((a, b) => {
    return a.localeCompare(b, 'zh-CN')
  })
  // console.log(keysArr);
  var sortObj = {}
  for (var i in keysArr) {
    sortObj[keysArr[i]] = encodeURIComponent(obj[keysArr[i]])
  }
  return sortObj
}

export const getParamsUrl = (url, params, sortVal) => {
  let lastParams = params
  if (sortVal) {
    lastParams = sortObj(lastParams)
    // console.log(lastParams);
  }

  let str = ''
  for (var key in lastParams) {
    str += `${key}=${lastParams[key]}&`
  }

  const lastr = str.slice(0, -1)
  // console.log(str)
  return `${url}?${lastr}`
}
