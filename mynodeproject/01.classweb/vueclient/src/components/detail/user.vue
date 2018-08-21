<!--在这个页面把table和分页的页面引进来直接使用-->

<template>
	<div id="my">
		<el-row>
			<el-col :span="6" :offset="9">
				<el-input placeholder="请输入内容" v-model="searchString">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</el-col>
			<el-col :span="9" style="text-align: right;padding-right:10px;">
				<el-button type="primary" @click="add_user">新增</el-button>
			</el-col>
		</el-row>
		
		<myPage
				:tableData="comdata"
				:total="total"
				:currentPage="currentPage"
				:page_sizes="page_sizes"
				:talPro="talPro"
				@handleEditTWO="handleEdit"
				@handleDeleteTWO="handleDelete"
				@handleCk="handleCurrentChange2"
		></myPage>
		
		<!--编辑-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form ref="form" status-icon :rules="rules2" class="demo-ruleForm" :model="form" label-width="80px" enctype="multipart/form-data">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name" name="name" type="text"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="form.phone" name="phone" type="text" ></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" style="width:49%;display: inline-block;float:left;">
					<el-input v-model="form.password" name="password" type="text" ></el-input>
				</el-form-item>
				<el-form-item label="收藏量" prop="love_cout" style="width:49%;display: inline-block;float:left;">
					<el-input v-model="form.love_cout" name="love_cout" type="text" disabled></el-input>
				</el-form-item>
			</el-form>
			
			
			<el-button @click="dialogVisible = false">取 消</el-button>
			<!--<el-button native-type="submit" type="primary" @click="add_course">确 定</el-button>-->
			<el-button type="primary" @click="add_course">确 定</el-button>
		</el-dialog>
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
	 			talPro:[{prop:"_id",label:"id"},{prop:"love_cout",label:"收藏"},{prop:"name",label:"姓名"},{prop:"phone",label:"手机"}], //要显示的表头
	 			form:{_id:"",name:"",phone:"",password:"",love_cout:"",oldpass:""},
	 			dialogVisible:false,
	 			rules2:{
	 				name:[{validator:cheack,trigger:'blur'}],
	 				phone:[{validator:cheack,trigger:'blur'}]
	 			},
	 			searchString:"",
	 			isAdd:true,
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
		        //console.log(`当前页: ${val}`);
		        this.currentPage = val;
				this.getdate(val);
		     },
		     getdate(page){
		     	var _this = this;
		     	this.$reqs.post('/users/AdminList',{
                    page:page,
                    rows:_this.page_sizes[0]
                }).then(function(result){
                	//返回下面三个：
                	//result.data.data 是查找的数据
                	//result.data.total  是总共的条数
                	//result.data.success:"成功"
                	_this.total = result.data.total;
                	result.data.data.forEach(function(item,index){
                		result.data.data[index].love_cout = item.love_cout.length;
                	});
                	_this.tableData = result.data.data;
                }).catch(function(er){
                	console.log(er);
                })
		     },
		    handleDelete(index,row){
		     	var _id = row._id;
		     	var _this = this;
		     	this.$confirm('确认删除这条数据，且将把数据库数据移除，不能恢复？')
					.then(_ => {//点击确认
						_this.$reqs.post('/users/delete',{"_id":_id}).then(function(result){
							
							_this.getdate(_this.currentPage);
						}).catch(function(e){
							console.log(e);
						})
						
					})
					.catch(_ => {});
		     },
	 		handleEdit(index,row){//行编辑的功能
	 			this.isAdd = false;
	 			this.form.name = row.name;
	 			this.form._id = row._id;
	 			this.form.phone = row.phone;
	 			this.form.love_cout = row.love_cout;
	 			this.form.password = row.password;
	 			this.form.oldpass = row.password;
	 			this.dialogVisible = true;
	 		},
	 		add_user(){
	 			this.isAdd = true;
	 			this.form.name = "";
	 			this.form._id = "";
	 			this.form.phone = "";
	 			this.form.love_cout = 0;
	 			this.form.password = "";
	 			this.dialogVisible = true;
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
			add_course(){
				if(this.isAdd){//新增按钮
					var _this = this;
					var da = {love_cout:0,name:this.form.name,phone:this.form.phone,password:this.form.password};
					this.$reqs.post("/users/add",da).then(function(result){
						if(result.data.success){
							_this.dialogVisible = false;
							_this.$message={message:result.data.success,type:"success"};
						}else{
							_this.dialogVisible = false;
							_this.$message={message:result.data.err,type:"error"};
						}
					}).catch(function(er){
						console.log(er);
					});
				}else{//编辑按钮
					var _this = this;
					var da = {_id:this.form._id,name:this.form.name,phone:this.form.phone};
					if(this.form.password != this.form.oldpass){
						da.password = this.form.password;
					}
					this.$reqs.post("/users/update",da).then(function(result){
						console.log(result)
						if(result.data.success){
							_this.dialogVisible = false;
							_this.$message={message:result.data.success,type:"success"};
						}else{
							_this.dialogVisible = false;
							_this.$message={message:result.data.err,type:"error"};
						}
					});
				};
				
			}
	 	},
	 	computed:{
	 		//搜索
	 		//可以在这里实现对数据的出来来达到搜索的效果，在前面有写到
	 		comdata:function(){
	 			var result = [];
	 			var ss = this.searchString;
	 			var gg = this.tableData;
	 			gg.forEach(function(item){
					if((item.name + "").indexOf(ss) !== -1 || (item._id + "").indexOf(ss) !== -1 ||(item.phone + "").indexOf(ss) !== -1 ){
						result.push(item)
					};
				});
				
				return result;
	 		}
	 	}
	 }
	 
	 
	 
</script>

<style scoped>
	
</style>