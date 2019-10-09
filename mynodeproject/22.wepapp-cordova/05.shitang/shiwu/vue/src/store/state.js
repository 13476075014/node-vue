import { getUserToken } from './cache'

const state = {
  userToken: getUserToken(), // 用户登录成功后的token
  userInfo: {} // 用户的基本信息
}

export default state
