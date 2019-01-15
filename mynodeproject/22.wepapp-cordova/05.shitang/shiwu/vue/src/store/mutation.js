import { setUserToken } from './cache'

const mutations = {
  SET_USER_TOKEN (state, str) {
    setUserToken(str)
    state.userToken = str
  },
  SET_USER_INFO (state, obj) {
    state.userInfo = obj
  }
}

export default mutations
