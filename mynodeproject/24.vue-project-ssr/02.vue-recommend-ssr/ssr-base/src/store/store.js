// 这个文件主要是处理vuex的数据存储的

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入我们的接口请求函数
import { fetchItem } from '../api/api'

// 还是为了防止环境污染，这里对外暴露一个工厂函数，返回store实例
export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem({ commit }, id) {
                return fetchItem(id).then(item => {
                    commit('setItem', { id, item })
                })
            }
        },
        mutations: {
            setItem(state, { id, item }) {
                Vue.set(state.items, id.item)
            }
        }
    })
}