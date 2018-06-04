<!--
	有点坑的地方是上拉和下拉，前前提是一定要content超过wrapper差不多大于100把，
	在电脑上是这样，手机没有试，如果没有超过的话，就会拉一个方向的时候，上下的事件都触发了；
-->


<template>
  <scroll class="wrapper"
          :data="data"
          :pulldown="pulldown"
          :pullup="pullup"
          @pulldown="loadData" style="height:450px;background:red;">
    <ul class="content" style="background:yellow;position:relative;z-index:4;">
      <li v-for="(item,index) in data">{{index}}:{{item}}</li>
    </ul>
    <div class="loading-wrapper"></div>
  </scroll>
</template>
<script>
  import scroll from './detail/scroll'
  export default {
  	name: "upanddown",
    data() {
      return {
        data: [],
        pulldown: true,
        pullup:true,
        page:0
      }
    },
    created() {
      this.loadData()
    },
    components:{
    	scroll
    },
    methods: {
      loadData() {
      	var self = this;
      	self.page++;
      	self.$reqs.post('/users/getdown',{page:self.page,rows:6}).then(function(result){
					
        //requestData().then((res) => {
          self.data = result.data;
        });
      }
    }
  }
</script>

<style scoped>
	li{line-height: 91px;}
</style>