import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'

// import * as actions from './actions'
import * as getters from './getters'
import state from './states'
import mutations from './mutaions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'PRODUCTION'

export default new Vuex.Store({
    // actions,
    getters,
    mutations,
    state,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
