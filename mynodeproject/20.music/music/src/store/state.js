// vuex 的state数据
import { playMode } from '_common/js/config'
import { loadSearch, loadPlay, loadFavorite } from '_common/js/cache'

const state = {
    singer: [], // 歌手页面的公用数据
    playing: false, // 控制是否播放
    fullScreen: false, // 屏幕状态
    playList: [], // 播放的列表
    sequenceList: [], // 播放队列列表
    mode: playMode.sequence, // 播放的模式，循环播放，随机播放，等
    currentIndex: -1, // 当前播放歌曲
    disc: {}, // 推荐页面点开的详情信息
    topList: {}, // 排行页面的点击详情页需要的数据
    searchHistory: loadSearch(), // 搜索的历史记录数据,初始值是从本地localstorage读取的
    playHistory: loadPlay(), // 存储播放过的歌曲
    favoriteList: loadFavorite() // 自己喜欢的歌曲列表，被自己点了收藏的歌曲
}

export default state
