<!--
	这个是对各个表的操作
-->


<template>
	<div style="border:1px solid rgb(225,225,225);" id="service_out">
		<el-row>
			<el-col :span="24" :offset="0" style="text-align: left;">
				<el-tabs v-model="activeName" type="border-card" @tab-click="tab" style="border:none;margin-bottom:20px;height:39px;overflow: hidden;">
				  <el-tab-pane label="用户管理" name="one" path="/service_index/one"></el-tab-pane>
				  <el-tab-pane label="热门商品管理" name="two" path="/service_index/two"></el-tab-pane>
				  <el-tab-pane label="化妆品数据管理" name="three" path="/service_index/three"></el-tab-pane>
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
    name:'service_index',
    data() {
      return {
			activeName:"one"
      };
    },
    created:function(){
      var pa = this.$route.path.substr(this.$route.path.lastIndexOf("/")+1);
    	if(pa == "service_index"){
        this.$router.push("/service_index/one")
    		this.activeName = "one";
    	}else{
    		this.activeName = pa;
    	}
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

<style>
#service_out{margin-top:41px;}
#headone #top2{display: none}
#headone #top3{display: none}
#service_out .breadcrumb{display: none;}
#service_out .el-tabs__content{display: none;padding:0!important;}

</style>
