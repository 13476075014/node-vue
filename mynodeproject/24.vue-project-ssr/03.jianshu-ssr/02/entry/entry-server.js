// 打包服务端的webpack的入口文件
import { createApp } from '../src/main'

export default context => {
    return new Promise((resolve, reject) => {
        const app = createApp()

        // 更改路由
        app.$router.push(context.url)

        // 获取路由下面的组件
        const matchedComponents = app.$router.getMatchedComponents()

        // 如果不存在组件，抛出错误
        if (!matchedComponents.length) {
            return reject({ code: 404 })
        }

        // 遍历路由下所有组件，如果有需要服务端渲染的请求，就用store来请求
        Promise.all(matchedComponents.map(component => {
            if (component.serverRequest) {
                return component.serverRequest(app.$store)
            }
        })).then(() => {
            context.state = app.$store.state
                // 没有错误就异步返回app
            resolve(app)
        }).catch(reject)


    })
}