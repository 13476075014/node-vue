import * as types from './mutation-type'
import { playMode } from '_common/js/config'
import { shuffle } from '_common/js/util' // 引入打乱数组的方法函数
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from '_common/js/cache'

function findIndex (arr, id) {
    return arr.findIndex(function (item) { // es6的语法，得到符合条件的数组下标
        return item.id === id
    })
}

// 选择歌曲后设定播放列表，和当前歌曲
export const selectPlay = function ({ commit, state }, { song, index }) {
    if (state.mode == playMode.random) {
        let id = song[index].id
        let randomList = shuffle(song)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList, id)
    } else {
        commit(types.SET_PLAYLIST, song) // 重定义播放列表数据 // 提交song，重定义播放列表正常顺序数据
    }
    commit(types.SET_SEQUENCE_LIST, song)
    commit(types.SET_CURRENT_INDEX, index) // 重定义当前播放歌曲下标
    commit(types.SET_FULL_SCREEN, true) // 开启全屏
    commit(types.SET_PLAYING_STATE, true) // 启动播放
}

// 点击随机播放按钮的操作
export const randomPlay = function ({ commit, state }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

// 在搜索里面用的,点击的时候同时改变多个state,插入歌曲
export const InsertSong = function ({ commit, state }, song) {
    let playlist = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    let fpIndex = findIndex(playlist, song.id) // 是否存在这个歌曲了，并返回索引
    currentIndex++ // 插入歌曲让索引加1,要放在当前播放歌曲的后面，不加1就是放在前面了
    playlist.splice(currentIndex, 0, song) // 插入歌曲
    if (fpIndex > -1) { // 已经存在这个歌
        if (currentIndex > fpIndex) {
            playlist.splice(fpIndex, 1)
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1, 1) // 因为在后面，现在歌曲列表变多了一个，所以是加1才是之前这个歌的索引
        }
    }

    // 修改sequenceList的部分
    let currentSIndex = findIndex(sequenceList, currentSong) + 1 // 需要插入的位置
    let fsIndex = findIndex(sequenceList, song.id) // 看这个歌曲是否已经存在歌曲列表里面
    sequenceList.splice(currentSIndex, 0, song)
    if (fsIndex > -1) { // 存在这个歌曲了
        if (currentSIndex > fsIndex) { // 插入的这个歌曲在之前存在歌曲的后面
            sequenceList.splice(fsIndex, 1) // 删除之前存在的歌曲
                // currentSIndex-- // 因为前面删除了一首歌，所以当前歌曲在歌曲列表里面的下标减1
        } else {
            sequenceList.splice(fsIndex + 1, 1) // 因为在后面所以下标收到印象，现在存在的歌曲下标要加1才是要删的
        }
    }

    // 改变vuex
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

// 增加搜索的storage并更改vuex
export const saveSearchHistory = function ({ commit, state }, query) {
    commit(types.SET_SEARCHHISTORY, saveSearch(query))
}

// 删除搜索的storage并更改vuex
export const deleteSearchHistory = function ({ commit, state }, query) {
    commit(types.SET_SEARCHHISTORY, deleteSearch(query))
}

// 清除搜索历史记录
export const clearSearchHistory = function ({ commit, state }) {
    commit(types.SET_SEARCHHISTORY, clearSearch())
}

// 删除顺利播放列表中的一首歌曲
export const deleteSong = function ({ commit, state }, item) {
    let playlist = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist, item.id)
    playlist.splice(pIndex, 1) // 删除播放列表这首歌
    let sIndex = findIndex(sequenceList, item.id)
    sequenceList.splice(sIndex, 1) // 删除顺序列表里面这首歌

    if (currentIndex > pIndex || currentIndex == playlist.length) {
        currentIndex--
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)

    if (!playlist.length) { // 如果没有歌曲了就把播放状态设置成false
        commit(types.SET_PLAYING_STATE, false)
    } else {
        commit(types.SET_PLAYING_STATE, true)
    }
}

// 删除所有的播放列表
export const clearSongList = function ({ commit, state }) {
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
}

// 保存播放歌曲
export const savePlayHistory = function ({ commit, state }, list) {
    commit(types.SET_PLAYHISTORY, savePlay(list))
}

// 个人收藏歌曲
export const saveFavoriteList = function ({ commit, state }, song) {
        commit(types.SET_FAVORITE_LIST, saveFavorite(song))
    }
    // 删除个人收藏歌曲
export const deleteFavoriteList = function ({ commit, state }, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
