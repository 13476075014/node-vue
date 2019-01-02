import { getUserToken } from './cache'

const state = {
  userToken: getUserToken() // 用户登录成功后的token
}

export default state
