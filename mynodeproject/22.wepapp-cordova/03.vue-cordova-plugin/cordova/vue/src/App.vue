<template>
  <div id="app">
    <button @click="takePhoto">拍照</button>
    <img ref="showImg" src="">
    <camera @onSuccess="onSuccess" ref="camera" :options="options"></camera>
    <router-view/>
    <scan></scan>
  </div>
</template>

<script>
import Camera from '@/base/cordova-plugin-camera'
import Scan from '@/base/cordova-plugin-saoyisao'

export default {
  name: 'App',
  data () {
    return {
      options: {
        saveToPhotoAlbum: true
      }
    }
  },
  created () {

  },
  methods: {
    takePhoto () {
      this.$refs.camera.cameraTakePicture()
    },
    onSuccess (imgData) {
      this.$refs.showImg.src = imgData
    }
  },
  components: {
    Camera,
    Scan
  }
}
</script>

<style>

</style>
