/* 这个文件主要操作和storage相关的缓存内容 */
import storage from 'good-storage'

const SEARCH_KEY = '__search__' // 存储的search对象
const SEARCH_KEY_LENGTH = 15 // 存储search的最大长度

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
    console.log(searches)
    storage.set(SEARCH_KEY, searches)
}

// 6.清除所有的搜索历史记录的localstorage和其vuex数据
export function clearSearch () {
    storage.remove(SEARCH_KEY)
    return []
}
