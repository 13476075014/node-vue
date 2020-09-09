this.$store.dispatch('user/login', this.loginForm)

store.registerModule

store.unregisterModule(moduleName)

## vuex相关知识

一：module的应用场景和使用方式

为什么会用到module：

当项目比较庞大，涉及数据较多时，如果只是在一个单一文件里维护store，会变得臃肿不好维护难以根据功能区分；

使用方法：

```code
// a.js,模块a
export default {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

// store.js
import a from 'a.js'
const  store = new Vuex.Store({
	modules:{
		a:a
	}
})
//取值
store.state.a

//通过map取module里面的值
import { mapState } from 'vuex'
...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
```



1.1 几种调用store里面内容的方法

​	1.1.1  利用全局的 $store调用 

​			  this.$store.getters.somedata  / this.$store.state.somemethods / 

