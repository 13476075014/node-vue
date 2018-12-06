<template>
  <div id="app">
    <button @click="takePhoto">拍照</button>
    <img ref="showImg" src="">
    <camera @onSuccess="onSuccess" ref="camera" :options="options"></camera>
    <router-view/>
  </div>
</template>

<script>
import Camera from '@/base/cordova-plugin-camera'

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
    Camera
  }
}
</script>

<style>

</style>
