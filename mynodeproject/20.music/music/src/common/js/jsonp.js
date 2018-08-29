// 封装的插件 jsonp 让其支持promise的写法，需要先安装 npm i jsonp --save

// 1.引入jsonp的包
import originJsonp from 'jsonp'

// 2.对外暴露处理过的jsonp的方法
// jsonp (url, option,fn) //url是后台提供的接口；option是对回调函数参数，和需要调用那个回调函数的定义，fn是执行完的回调
export default function jsonp (url, data, option) {
    // 把地址和字段拼接一下
    url += (url.indexOf('?') < 0 ? '?' : '&') + paramHandler(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

// 3.写一个函数来处理在调用这个函数的时候需要传一些别的字段的话，拼接在url上的函数
function paramHandler (data) {
    let url = ''
    for (var keys in data) {
        var value = data[keys] != undefined ? data[keys] : ''
        url += `&${keys}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}
