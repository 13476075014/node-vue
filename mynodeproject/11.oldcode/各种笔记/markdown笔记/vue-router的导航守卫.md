### vue-router的导航守卫

#### 一：三种路由导航守卫：

* [https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#全局前置守卫)

1.全局的

2.单个路由独享的

3.组件级的

#### 二：全局路由守卫

##### 2.1 全局前置守卫（router.beforeEach）：

``` vue
 //参数解释如下
to: Route: 即将要进入的目标 路由对象
from: Route: 当前导航正要离开的路由
next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//代码
const router = new VueRouter({ ... })
router.beforeEach((to,from,next) => {   ....   })
```

 * 触发得时机 ：  当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

   

##### 2.2 全局解析守卫（router.beforeResolve）：

* 在 2.5.0+ 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

##### 2.3 全局后置钩子（router.afterEach）：

* 这些钩子不会接受 `next` 函数也不会改变导航本身

#### 三：路由独享得守卫（beforeEnter）

使用方法如下

``` vue
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

#### 四：组件内得守卫

##### 4.1 组件内的路由进入前钩子（beforeRouteEnter）

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

##### 4.2 组件内的路由更新前钩子（`beforeRouteUpdate` (2.2 新增)）

##### 4.3 组件内的路由离开前钩子（beforeRouteLeave）

``` vue
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

#### 五：完整的导航解析流程

1.导航被触发

2.在失活的组件里调用beforeRouteLeave守卫

3.调用全局的beforeEach守卫

4.在重用的组件里调用beforeRouteUpdate守卫（2.2+）

5.在路由配置里调用beforeEnter守卫

6.解析异步路由组件

7.在被激活的组件里调用beforeRouteEnter

8.调用全局的beforeResolve守卫

9.导航被确认

10.调用全局的afterEach钩子

11.触发DOM更新

12.用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

