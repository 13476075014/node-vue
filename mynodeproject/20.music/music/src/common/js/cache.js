/* 这个文件主要操作和storage相关的缓存内容 */
import storage from 'good-storage'

const SEARCH_KEY = '__search__' // 存储的search对象
const SEARCH_KEY_LENGTH = 15 // 存储search的最大长度
const PLAY_KEY = '__play__' // 存储的play对象，是播放过的歌曲
const PLAY_KEY_LENGTH = 200 // 存储play的最大长度
const FAVORITE_KEY = '_favorite_' // 存储favoriteList的localstorage名
const FAVORITE_MAX_LENGTH = 200 // 存储favoriteList的最大个数

// 1.arr插入新值的方法
function insertArray (arr, val, compare, maxlen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        return true
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val) // 在数组头部插入新元素
    if (maxlen && arr.length > maxlen) {
        arr.pop() // 要是数组的长度超过了设定的最大长度，就删掉最后一个元素
    }
}

// 2.增加搜索历史记录
export function saveSearch (query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => { return item === query }, SEARCH_KEY_LENGTH)
    storage.set(SEARCH_KEY, searches) // 新值存到storage中，这里的storage方法用的封装的插件npm安装的good-storage
    return searches
}

// 3.得到搜索历史记录
export function loadSearch () {
    console.log(storage.get(SEARCH_KEY, []))
    return storage.get(SEARCH_KEY, [])
}

// 4.删除arr的方法
function deleteArray (arr, compare) {
    const index = arr.findIndex(compare)
    if (index < 0) {
        return false
    }
    arr.splice(index, 1)
}

// 5.删除一条搜索历史记录
export function deleteSearch (query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteArray(searches, (item) => { return item === query })
    storage.set(SEARCH_KEY, searches)
    return searches
}

// 6.清除所有的搜索历史记录的localstorage和其vuex数据
export function clearSearch () {
    storage.remove(SEARCH_KEY)
    return []
}

// 7增加一首播放歌曲的历史记录
export function savePlay (play) {
    let plays = storage.get(PLAY_KEY, [])
    insertArray(plays, play, (item) => { return item.id === play.id }, PLAY_KEY_LENGTH)
    storage.set(PLAY_KEY, plays) // 新值存到storage中，这里的storage方法用的封装的插件npm安装的good-storage
    return plays
}

// 读取歌曲的播放历史记录
export function loadPlay () {
    const plays = storage.get(PLAY_KEY, [])
    return plays
}

// 8.删除一条搜索历史记录
export function deletePlay (play) {
    let plays = storage.get(PLAY_KEY, [])
    deleteArray(plays, (item) => { return item === play })
    storage.set(PLAY_KEY, plays)
    return plays
}

// 9.清除所有的搜索历史记录的localstorage和其vuex数据
export function clearPlay () {
    storage.remove(PLAY_KEY)
    return []
}

// 10.保存收藏歌曲favoriteList
export function saveFavorite (song) {
    var favorite = storage.get(FAVORITE_KEY, [])
    insertArray(favorite, song, (item) => {
        return song.id === item.id
    }, FAVORITE_MAX_LENGTH)
    storage.set(FAVORITE_KEY, favorite)
    return favorite
}

// 11.删除一个收藏歌曲
export function deleteFavorite (song) {
    var favorite = storage.get(FAVORITE_KEY, [])
    deleteArray(favorite, (item) => {
        return song.id === item.id
    })
    storage.set(FAVORITE_KEY, favorite)
    return favorite
}

// 12.初始加载的收藏歌曲
export function loadFavorite () {
    var favorite = storage.get(FAVORITE_KEY, [])
    return favorite
}
