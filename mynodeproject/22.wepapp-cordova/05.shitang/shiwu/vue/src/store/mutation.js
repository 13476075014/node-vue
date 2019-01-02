import { setUserToken } from './cache'

const mutations = {
  SET_USER_TOKEN (state, str) {
    setUserToken(str)
    state.userToken = str
  }
}

export default mutations
