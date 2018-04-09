<!--
	读user表，来根据不同的字段来分配权限，
-->


<template>
	<div style="border:1px solid rgb(225,225,225);">
		<el-row>
			<el-col :span="24" :offset="0" style="text-align: left;">
				<!--<el-tag style="margin:10px 20px;"
				  v-for="tag in tags"
				  :key="tag.name"
				  closable
				  :type="tag.type">
				  <router-link :to="tag.path">
				  	{{tag.name}}
				  </router-link>
				</el-tag>-->
				
				<el-tabs type="border-card" @tab-click="tab" style="border:none;margin-bottom:20px;height:39px;overflow: hidden;">
				  <el-tab-pane label="用户管理" path="/backIndex/limit/one"></el-tab-pane>
				  <el-tab-pane label="商品管理" path="/backIndex/limit/two"></el-tab-pane>
				  <el-tab-pane label="角色管理" path="/backIndex/limit/three"></el-tab-pane>
				  <el-tab-pane label="定时任务补偿" path="/backIndex/limit/four"></el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
		
		
		<router-view>
			111
		</router-view>
	</div>
</template>

<script>
	
	
	
  export default {
    data() {
      return {

      };
    },
    methods:{
    	tab(tab,event){//tab可以获取到当前点击的对象的一些属性
    		//console.log(tab.$attrs.path)
    		var rou = tab.$attrs.path;
    		this.$router.push(rou)
    	}
    }
  }
</script>

<style scoped>
	.breadcrumb{display: none;}
	.el-tabs__content{display: none;padding:0!important;}
	
</style>