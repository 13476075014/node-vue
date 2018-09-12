import * as types from './mutation-type'

// 定义一些mutation方法
const mutations = {
    [types.SET_SINGER] (state, singer) {
        state.singer = singer
    }
}
export default mutations
