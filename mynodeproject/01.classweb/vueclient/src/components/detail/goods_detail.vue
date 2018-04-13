<!--
这个页面是来学习vue的路由的参数的传递
如何接受参数

注意：
	如果用路由的to的话 path 和 params不能同时使用，否则失效，要用在路由中指定的name属性来实现路由
	
-->


<template id="detail">
	<el-row>
		<h1>
			goods_detail
		</h1>
		<el-col :span="20" :offset="2">
			<h1>{{content.title}}</h1>
			<img :src="content.img_src" alt="" style="width:60%;"/>
			<p>{{content.description}}</p>
			<p>{{content.scan_cout}}</p>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data:function(){
			return{
				content:""
			}
		},
		name: 'detail',
		created:function(){
			var qu = this.$route.params;
			this.content = qu;
		}
	}
</script>

<style>
</style>