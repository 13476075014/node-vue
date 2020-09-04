#### vue的父组件调用子组件的几种方式：

1.子组件对外emit一个方法

// 子组件   child.vue
<template>
    <div @click='$emit("clickChild","666")'>
        点我我是子组件
    </div>
</template>

// 父组件 parent.vue

<template>
    <div>
        <child @clickChild="alert(1)"></child>
    </div>
</template>





