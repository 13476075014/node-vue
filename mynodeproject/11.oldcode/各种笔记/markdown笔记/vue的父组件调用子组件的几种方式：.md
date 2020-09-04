#### vue的子组件调用父组件的几种方式：

#### 1.父组件的provide和子组件的inject  (https://cn.vuejs.org/v2/api/#provide-inject)

* 不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
* `provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

---

#### 2.通过调用this.$parent来调用父级的方法  （https://cn.vuejs.org/v2/api/#vm-parent）

* 在子组件里面 this.$parent 得到的是父组件的实例

---

#### 3.子组件对外emit一个方法（https://cn.vuejs.org/v2/api/#vm-emit）

* 子组件先执行自己事件，然后在事件里面通过$emit来实现在父组件中调用接收的函数；

#### 4.props来接收父组件传入的方法

#### 5.四种方法的实现例子如下：

//子组件

```vue
<template>
  <div>
     <!-- 1.通过provide和inject来实现子调用父方法 -->
    <span @click="clickFn(1)">click 1.通过provide和inject来实现子调用父方法</span>
    <br>
    <!-- 2.通过调用this.$parent来调用父级的方法 -->
    <span @click="test2">click 2.通过调用this.$parent来调用父级的方法</span>
    <br>
    <!-- 3.通过$emit来实现实际调用父级的方法 -->
    <span @click="test3">click 3.通过$emit来实现实际调用父级的方法</span>
    <br>
    <!-- 4.通过props来接收父组件传入的方法 -->
    <span @click="test4(4)">click 4.通过props来接收父组件传入的方法</span>
  </div>
</template>

<script>
export default {
  inject:['clickFn'],
  props:{
    test4:{
      type:Function,
      default(){
        return function(){}
      }
    }
  },
  methods:{
    test2(){
      this.$parent.toAlert(2)
    },
    test3(){
      this.$emit("test3")
    }
  }
}
</script>
```

// 父组件

```vue
<template>
    <div>
       <child @test3="toAlert(3)" :test4="toAlert" />
    </div>
</template>
<script>
   import Child from './child'
    export default {
      // provide:{ //如果是对象的类型在里面不能用this会找不到,只有是函数类型才可以
      //   clickFn:"66"
      // },
      provide(){//在这里对外提供方法，在子孙组件中都可以用这个
        return {
           clickFn:this.toAlert
        }
      },
      components:{
        Child
      },
      methods:{
        toAlert(count){
          alert(count||1)
        }
      }
    }
</script>
```

