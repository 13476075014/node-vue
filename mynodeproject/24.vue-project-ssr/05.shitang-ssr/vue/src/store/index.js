import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'PRODUCTION'
// console.log(debug)

export function createStore () {
  return new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
}
