// 这个文件主要处理localstorage
import storage from 'good-storage'

const USERTOKEN = '__userToken__'

export function setUserToken (val) { // 存token
  storage.set(USERTOKEN, val)
}

export function getUserToken () { // 取token
  const result = storage.get(USERTOKEN, [])
  return result
}

export function clearUserToken () {
  storage.remove(USERTOKEN)
  return []
}
