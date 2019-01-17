<template>
  <transition class="myrate" name="leftIn">
      <rate  v-if="show" :my="my" :url="url"></rate>
  </transition>
</template>

<script>
import Rate from './rate.vue'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      show: false,
      my: true
    }
  },
  created () {
    this.$emit('changtab', '-1')
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  computed: {
    url () {
      // alert(this.userToken)
      return `api/APPProduct/GetMyCommentProductList?CanteenToken=${this.userToken}`
    },
    ...mapState(['userToken'])
  },
  components: {
    Rate
  }
}
</script>

<style lang="stylus" scoped>
.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
</style>
