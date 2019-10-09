<!--在这个页面把table和分页的页面引进来直接使用-->

<template>
	<div id="my">
		<el-row>
			<el-col :span="6" :offset="9">
				<el-input placeholder="请输入内容" v-model="searchString">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</el-col>
			<el-col :span="24" style="text-align: right;padding-right:15px;">
				<el-button type="primary" icon="el-icon-edit" @click="edit_add">新增</el-button>
			</el-col>
		</el-row>
		
		<myPage
				:tableData="comdata"
				:total="total"
				:currentPage="currentPage"
				:page_sizes="page_sizes"
				:talPro="talPro"
				@handleCk="handleCurrentChange2"
				@handleEditTWO="handleEdit2"
				@handleDeleteTWO="handleDelete2"
		>
		</myPage>
		
		<!--编辑-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form ref="form" status-icon :rules="rules2" class="demo-ruleForm" :model="form" label-width="80px" enctype="multipart/form-data">
				<el-form-item label="标题" prop="title">
					<el-input v-model="form.title" name="title" type="text"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="form.description" name="description" type="text" ></el-input>
				</el-form-item>
				<el-form-item label="浏览量" prop="scan_cout" style="width:49%;display: inline-block;float:left;">
					<el-input v-model="form.scan_cout" name="scan_cout" type="text" disabled></el-input>
				</el-form-item>
				<el-form-item label="收藏量" prop="love_cout" style="width:49%;display: inline-block;float:left;">
					<el-input v-model="form.love_cout" name="love_cout" type="text" disabled></el-input>
				</el-form-item>
			</el-form>
			
			<el-upload
			  style="margin-bottom:30px;"
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  multiple
			  :before-upload="beforeupload"
			  >
			  <el-button size="small" type="danger">点击上传</el-button>
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
	
	 export default{
	 	data:function(){
	 		var cheack = function(rule,value,callback){
	 					if(!value){
	 						return callback(new Error("不能为空 "));
	 					}else{
	 						 callback();
	 					}
	 			};
	 		return {
	 			form:{
	 				scan_cout:0,
	 				love_cout:0,
	 				title:"",
	 				description:"",
	 				img_src:"",
	 				_id:""
	 				
	 			},
	 			rules2:{
	 				title:[{validator:cheack,trigger:'blur'}],
	 				description:[{validator:cheack,trigger:'blur'}]
	 			},
	 			param:"",
	 			param2:"",
	 			img_name:"",
	 			isaddEdit:false, //是false的时候就是编辑按钮点击，是true的时候就是新增按钮的点击
	 			dialogVisible:false,
	 			talPro:[{prop:"_id",label:"id"},{prop:"scan_cout",label:"浏览量"},{prop:"love_cout",label:"收藏量"},{prop:"title",label:"标题"},{prop:"description",label:"描述"},{prop:"img_src",label:"图片"}], //要显示的表头
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
	 		this.getdate(this.currentPage);
	 		
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
                  	//console.log(result)
                })
		     },
		     handleEdit2(index,row){//行编辑
		     	this.param = new FormData();
		     	this.form.title = row.title;
		     	this.form.description = row.description;
		     	this.form.img_src = row.img_src;
		     	this.form.scan_cout = row.scan_cout;
		     	this.form.love_cout = row.love_cout;
		     	this.form._id = row._id;
		     	this.isaddEdit = false;
		     	this.dialogVisible = true;
		     },
		     edit_add(){
		     	this.param2 = new FormData();
		     	this.form.title = "";
		     	this.form.description = "";
		     	this.form.img_src = "";
		     	this.form.scan_cout = 0;
		     	this.form.love_cout = 0;
		     	this.form._id = "";
		     	this.isaddEdit = true;
		     	this.dialogVisible = true;
		     },
		     handleDelete2(index,row){//行删除
		     	var _id = row._id;
		     	var _this = this;
		     	this.$confirm('确认删除这条数据，且将把数据库数据移除，不能恢复？')
					.then(_ => {//点击确认
						_this.$reqs.post('/backIndex/delete',{"_id":_id}).then(function(result){
							//location.reload();
							_this.getdate(_this.currentPage);
						}).catch(function(e){
							console.log(e);
						})
						
					})
					.catch(_ => {});
		     },
		     beforeupload(file){
				//重新写一个表单上传的方法
				//this.param = new FormData();
				if(file.name){
					if(this.isaddEdit){//新增
						this.img_name= file.name;
						this.param2.append('file', file, file.name);
					}else{
						this.img_name= file.name;
						this.param.append('file', file, file.name);
					};
				};
				return false;
		     },
		     add_course(){
		     	let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					};
		     	//判断是编辑按钮还是新增按钮的操作
		     	if(this.isaddEdit){//新增按钮
		     		var _this = this;
		     		this.param2.append('title', this.form.title);
					this.param2.append('description', this.form.description);
					this.$reqs.post("/backIndex/add2",this.param2,config).then(function(result){
						if(result){
								_this.dialogVisible = false;
								//location.reload();
								_this.$message({message:"修改成功",type:"success"});
								_this.getdate(_this.currentPage);
							};
					});
		     	}else{//编辑按钮
			     	var _this = this;
					//下面append的东西就会到form表单数据的fields中；
					this.param.append('title', this.form.title);
					this.param.append('description', this.form.description);
					this.param.append('_id', this.form._id);
					this.$reqs.post("/backIndex/courseList", this.param, config)
					.then(function(result) {
							if(result){
								_this.dialogVisible = false;
								_this.$message({message:"修改成功",type:"success"});
								_this.getdate(_this.currentPage);
							}else{
								_this.$message({message:"修改失败！",type:"error"})
							};
					});
		     	}
		     },
		     handleClose(done) { //弹出的对话框里的方法
				var _this = this;
				this.$confirm('确认关闭？')
					.then(_ => {
						//location.reload()
						done();
					})
					.catch(_ => {});
			},
	 	},
	 	computed:{
	 		//可以在这里实现对数据的出来来达到搜索的效果，在前面有写到
	 		comdata:function(){
	 			var result = [];
	 			var ss = this.searchString;
	 			var gg = this.tableData;
	 			gg.forEach(function(item){
					if((item.title + "").indexOf(ss) !== -1 || (item._id + "").indexOf(ss) !== -1 ||(item.description + "").indexOf(ss) !== -1 ){
						result.push(item)
					};
				});
				
				return result;
	 		}
	 		
	 	}
	 }
	 
	 
	 
</script>

<style>
</style>