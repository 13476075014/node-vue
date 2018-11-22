import * as types from './mutation-type'

// 定义一些mutation方法
const mutations = {
    [types.SET_SINGER] (state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE] (state, flag) { // 改变是否播放的值
        state.playing = flag
    },
    [types.SET_FULL_SCREEN] (state, flag) { // 改变是否全屏的值
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST] (state, list) { // 改变播放列表的值
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST] (state, list) { // 改变顺序播放列表的值
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE] (state, list) {
        state.mode = list
    },
    [types.SET_CURRENT_INDEX] (state, list) {
        state.currentIndex = list
    },
    [types.SET_DISC] (state, list) {
        state.disc = list
    },
    [types.SET_TOPLIST] (state, list) {
        state.topList = list
    },
    [types.SET_SEARCHHISTORY] (state, list) {
        state.searchHistory = list
    },
    [types.SET_PLAYHISTORY] (state, list) {
        state.playHistory = list
    },
    [types.SET_FAVORITE_LIST] (state, list) {
        state.favoriteList = list
    }
}
export default mutations
