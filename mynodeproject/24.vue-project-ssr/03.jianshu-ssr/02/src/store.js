// 向外暴露vuex的store的文件

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default function createStore() {
    let store = new Vuex.Store({
        state: {
            homeInfo: ''
        },
        actions: {
            getHomeInfo({ commit }) {
                return axios.get('http://localhost:8080/api/getHomeInfo').then((res) => {
                    commit('setHomeInfo', res.date)
                })
            }
        },
        mutations: {
            setHomeInfo(state, res) {
                state.homeInfo = res
            }
        }
    })

    return store
}