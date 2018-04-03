<!--在这个页面把table和分页的页面引进来直接使用-->

<template>
	<div id="my">
		<el-row>
			<el-col :span="6" :offset="9">
				<el-input placeholder="请输入内容" v-model="searchString">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</el-col>
		</el-row>
		
		<myPage
				:tableData="tableData"
				:total="total"
				:currentPage="currentPage"
				:page_sizes="page_sizes"
				:talPro="talPro"
				@handleCk="handleCurrentChange2"
		></myPage>
	</div>
	
	
	<!--
		如果要使用公用的table表格和分页页面"./myPager.vue"的话：
		  1.在js里面引入页面：
		  		import myPage from "./myPager.vue";
		  		
		  2.生成组件：
		  		components:{myPage}
		  
		  3.在页面引入，并附上基本属性：
		  		<myPage
					:tableData="tableData"
					:total="total"
					:currentPage="currentPage"
					:page_sizes="page_sizes"
					:talPro="talPro"
					@handleCk="handleCurrentChange2"
				></myPage>
		  		
				:tableData="tableData"   通过属性的绑定来把data的值传给组件
				:total="total"  总的数据条数
				:currentPage="currentPage" 当前要显示第几页
				:page_sizes="page_sizes"  //每页显示几条数据
				:talPro="talPro"  //表头和表内要展示的数据talPro.prop 和 表头信息talPro.label
	-->
	
</template>

<script>
	//引进来table和分页
	import myPage from "./myPager.vue";
	
	 export default({
	 	data:function(){
	 		return {
	 			talPro:[{prop:"_id",label:"id"},{prop:"name",label:"姓名"},{prop:"password",label:"密码"},{prop:"phone",label:"手机"}], //要显示的表头
	 			searchString:"",
	 			total:12,//总共条数
	 			page_sizes:[6],//每页显示的个数
	 			currentPage:1,//当前页数
	 			//数据来源：
	 			 tableData: [{date: '2016-05-02',
					          name: '王小虎',
					          address: '上海市普陀区金沙江路 1518 弄'}]
	 		}
	 	},
	 	created:function(){ //这里因为是子组件，所以在用created的时候需要写成函数的形式
	 		this.getdate(this.currentPage)
	 	},
	 	components:{myPage},
	 	methods:{
	 		handleCurrentChange2(val) {//处理分页插件中的当前第几页改变时候的事件
//		        console.log(`当前页: ${val}`);
				this.getdate(val)
		     },
		     getdate(page){
		     	var _this = this;
		     	this.$reqs.post('/users/AdminList',{
                    page:page,
                    size:_this.page_sizes[0]
                }).then(function(result){
                	//返回下面三个：
                	//result.data.data 是查找的数据
                	//result.data.total  是总共的条数
                	//result.data.success:"成功"
                	
                	_this.total = result.data.total;
                	_this.tableData = result.data.data;
                  	console.log(result)
                })
		     }
	 	},
	 	computed:{
	 		//可以在这里实现对数据的出来来达到搜索的效果，在前面有写到
	 	}
	 })
	 
	 
	 
</script>

<style>
</style>