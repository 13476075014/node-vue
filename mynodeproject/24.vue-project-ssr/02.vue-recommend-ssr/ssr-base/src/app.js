// 这个文件是用来创建一个对外暴露的创建新的vue实例的工厂函数

const Vue = require('vue')

module.exports = function createApp(context) {
    return new Vue({
        data: {
            url: context.url
        },
        template: `<div>访问的url是{{url}}</div>`
    })
}