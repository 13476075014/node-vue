<template>
  <div class="myrate">
    <rate :url="url"></rate>
  </div>
</template>

<script>
import Rate from './rate.vue'
import {mapState} from 'vuex'

export default {
  data () {
    return {
    }
  },
  created () {
    this.$emit('changtab', '1')
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

<style>

</style>
