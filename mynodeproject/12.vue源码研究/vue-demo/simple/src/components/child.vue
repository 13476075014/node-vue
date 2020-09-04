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