<template>
  <div id="app">
    <upload-and-cut-img :needCropper="true"></upload-and-cut-img>
  </div>
</template>

<script>
import uploadAndCutImg from './lib/example'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components:{
    uploadAndCutImg
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
