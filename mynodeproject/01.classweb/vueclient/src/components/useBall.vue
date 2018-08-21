<!--这个页面主要是用来展示如何使用公用的小球飞入动画的模板-->

<template>
	<div class="wrapper">
		<ul>
			<li v-for="(item,index) in liData">
				<button @click="toDrop($event)">{{index}}</button>
			</li>
		</ul>
		
		<div class="car">
			<button>弹到这里消失</button>
		</div>
		
		<Ball :leftMy="'120px'" :bottomMy="'22px'" ref="childBall"></Ball>
	</div>
</template>

<script>
	import Ball from "./template/tem_ball.vue"
	
	export default{
		data(){
			return {
				liData:6,
			}
		},
		mounted(){
			
		},
		methods:{
			toDrop(event){
				var tar = event.currentTarget; //currentTarget返回绑定这个事件的元素 ，target返回触发事件的元素
				this.$refs.childBall.drop(tar)
			}
		},
		components:{
			Ball
		}
	}
</script>

<style scoped="scoped">
	li{
		list-style: none;
		margin-bottom:15px;
	}
	.car{
		position: fixed;
		bottom:20px;
		left:100px;
	}
	
     
</style>

































