<template>
  <div id="app">
    <div class="back"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{margin:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
/* .back{background:url(../static/back.jpg)left top;filter: blur(20px) ;position:fixed;top:0;left:0;width:100%;height:100vh;z-index:-1;} */
</style>
