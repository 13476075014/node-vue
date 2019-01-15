<template>
<transition class="allrate" name="leftIn">
    <rate :url="url" v-if="show"></rate>
</transition>
</template>

<script>
import Rate from './rate.vue'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      show: false
    }
  },
  created () {
    this.$emit('changtab', '1')
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  computed: {
    url () {
      // alert(this.userToken)
      return `api/APPProduct/GetALLCommentProductList?CanteenToken=${this.userToken}`
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
