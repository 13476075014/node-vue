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
				@handleEditTWO="handleEdit2"
		>
		</myPage>
		
		
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
				<el-form-item label="标题">
					<el-input v-model="form.title" name="title" type="text"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="form.description" name="description" type="text"></el-input>
				</el-form-item>
			</el-form>
			
			<el-upload
			  style="margin-bottom:10px;"
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  multiple
			  :before-upload="beforeupload"
			  >
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<p>{{img_name}}</p>
			<el-button @click="dialogVisible = false">取 消</el-button>
			<!--<el-button native-type="submit" type="primary" @click="add_course">确 定</el-button>-->
			<el-button type="primary" @click="add_course">确 定</el-button>
		</el-dialog>
	</div>
	
	
	
</template>

<script>
	//引进来table和分页
	import myPage from "../myPager.vue";
	
	 export default({
	 	data:function(){
	 		return {
	 			form:{
	 				title:"",
	 				description:"",
	 				img_src:""
	 				
	 			},
	 			img_name:"",
	 			dialogVisible:false,
	 			talPro:[{prop:"_id",label:"id"},{prop:"title",label:"标题"},{prop:"description",label:"描述"},{prop:"img_src",label:"图片"}], //要显示的表头
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
		     	this.$reqs.post('/backIndex/page',{
                    page:page,
                    size:_this.page_sizes[0]
               }).then(function(result){
                	_this.total = result.data.total;
                	_this.tableData = result.data.data;
                  	console.log(result)
                })
		     },
		     handleEdit2(index,row){
		     	this.form.title = row.title;
		     	this.form.description = row.description;
		     	this.form.img_src = row.img_src;
		     	this.dialogVisible = true;
		     },
		     
		     beforeupload(file){
				//重新写一个表单上传的方法
				this.img_name= file.name;
				this.param = new FormData();
				this.param.append('file', file, file.name);
				return false;
		     },
		     add_course(){
		     	var title = this.form.title;
		     	var description = this.form.description;
				//下面append的东西就会到form表单数据的fields中；
				this.param.append('title', title);
				this.param.append('description', description);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				
				this.$reqs.post("/backIndex/courseList", this.param, config).then(function(result) {
								console.log(result);
				});
		     },
		     handleClose(done) { //弹出的对话框里的方法
				var _this = this;
				this.$confirm('确认关闭？')
					.then(_ => {
						location.reload()
//						done();
					})
					.catch(_ => {});
			},
	 	},
	 	computed:{
	 		//可以在这里实现对数据的出来来达到搜索的效果，在前面有写到
	 	}
	 })
	 
	 
	 
</script>

<style>
</style>