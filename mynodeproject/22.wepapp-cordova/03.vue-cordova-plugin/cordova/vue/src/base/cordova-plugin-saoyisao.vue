<!-- 扫一扫的参考网址：https://blog.csdn.net/weixin_43098481/article/details/83141997 -->

<template>
  <div class="sao">
    <button @click="handleClick">扫一扫</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      /* eslint-disable */
      cordova.plugins.barcodeScanner.scan(function (result) {
        alert(`result:${result.text};format:${result.format};cancelled:${result.cancelled}`)
      },function(error){
        alert(error)
      })
    }
  }
}
</script>

<style>

</style>
