import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' // vuex里面的小插件，如果是修改的vuex的state里面的数据，就会在控制台有输入详细的修改信息，便于查看

// import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'PRODUCTION'

export default new Vuex.Store({
    // actions,
    getters,
    mutations,
    state,
    strict: debug, // 开发环境开启严格模式
    plugins: debug ? [createLogger()] : []
})
