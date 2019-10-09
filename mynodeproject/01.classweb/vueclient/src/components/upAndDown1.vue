<!--这个页面主要是用插件scroll-better来结合vue来实现上拉加载，下拉刷新-->

<template>

	<!-- <scroll 
		class="wrapper"
		:data="dataha"
		:pulldown="pulldown"
		@pulldown="loadData">
		
		<ul class="content">
			<li v-for="(item,index) in dataha">{{index}}:{{item}}</li>
		</ul>
	</scroll>
	-->
	<div class="wrapper" ref="wrapper" style="height:100vh;">
		<div>

			<ul class="content">
				<li v-for="(item,index) in data">{{index}} : {{item}}</li>
			</ul>

			<div class="bottom-tip">
				<span class="loading-hook">查看更多</span>
			</div>

		</div>
	</div>
</template>

<script>
	//import scroll from './detail/scroll';
	import BScroll from 'better-scroll';

	export default {
		name: "upanddown",
		data() {
			return {
				data: [],
				pulldown: true,
				page:-1
			}
		},
		components: {
			//scroll
		},
		created() {
			this.loadData();
		},
		methods: {
			/*loadData(){
				var that = this;
				this.$reqs.post('/users/getdown',{page:1,rows:6}).then(function(result){
					
					that.dataha = result.data;
				})
			}*/
			loadData() {
				var self = this;
				self.page++
				self.$reqs.post('/users/getdown',{page:self.page,rows:6}).then(function(result){
					
					self.data = result.data;
				
				//requestData().then((res) => {
					//this.data = res.data.concat(this.data)
					self.$nextTick(() => {
						if(!self.scroll) {
							self.scroll = new BScroll(self.$refs.wrapper, {
								pullUpLoad: {
									threshold: -30, // 负值是当上拉到超过低部 30px；正值是距离底部距离时，  
								},
								pullup:true
							})
							self.scroll.on('touchend', (pos) => {
								// 下拉动作  
								if(pos.y > 50) {
									self.loadData()
								}
							})
							self.scroll.on('pullingUp', (pos) => {
								document.querySelector('.loading-hook').innerText = '加载中...';
								setTimeout(function() {
									// 恢复文本值  
									document.querySelector('.loading-hook').innerText = '查看更多';
									// 向列表添加数据  
									self.loadData();
								}, 1000);
							})
						} else {
							self.scroll.finishPullUp()
							self.scroll.refresh()
						}
					})
				})
			}
		},
		mounted() {
			this.loadData() ;
		}

	}
</script>

<style scoped="scoped">
	li {
		line-height: 180px;
		background: red;
		list-style: none;
	}
</style>