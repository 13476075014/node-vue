// 这个是服务端的打包入口文件
import { createApp } from '../app.js'
// 对外暴露一个函数
export default context => {
  return new Promise((resolve, reject) => {
    const { newApp, router, store } = createApp()
    // 设置服务器端router的地址
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents() // 回去组件
      if (!matchedComponents.length) {
        /* eslint  prefer-promise-reject-errors:0 */
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state
        resolve(newApp)
      }).catch(reject)
    }, reject)
  })
}
