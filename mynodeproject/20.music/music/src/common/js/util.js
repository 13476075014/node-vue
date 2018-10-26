function getRandomInt (min, max) { // 得到一个随机数在min 和 max之间,且是整数
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) { // 随机打乱数组的算法
    // 为了防止原数组被打乱，影响后面的使用异常，赋值给一个新数组去打乱
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let random = getRandomInt(0, i) // 获得一个范围内的随机数
        let B = _arr[i] // 保存当前这个下标的的数组的值
        _arr[i] = _arr[random] // 把当前这个下标数组的值赋值给随机下标的这个数组的值
        _arr[random] = B // 利用上面存储的，和当前下标的值做交换相当于
    }
    return _arr
}

// 节流函数 去抖函数
export function debounce (func, delay) {
    let timer
    return function (...args) { // ...args这个是剩余参数语法,拿到所有的函数参数
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
