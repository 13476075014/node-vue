# liuselectdate

> A Vue.js liuselectdate Plugin

## Install
```shell
npm i liuselectdate --save
```

## How To Use
```javascript
//main.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
})
```

``` vue
 <!-- app.vue -->
 <template>
  <div id="app">
     <liuselectdate :option="option"></liuselectdate>
  </div>
</template>

```

```javascript
<script>
export default {
  name: 'app',
  data () {
    return {
      option:{} // 配置参数
    }
  },
  components:{
  }
}
</script>

```

## option
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| startDay | Date |  new Date() | 开始的日期 |
| maxLength | Number | 6 | 总共展示几天的数据 |
| title | String | 请选择日期 | 提示框的标题 |


