// 客户端webpack入口文件
import { createApp } from './app.js'
const { newApp, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  newApp.$mount('#app')
})
