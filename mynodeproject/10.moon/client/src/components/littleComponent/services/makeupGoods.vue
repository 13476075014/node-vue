<!--user表在这个页面把table和分页的页面引进来直接使用-->

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
		<el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
			<el-form ref="form" status-icon :rules="rules2" class="demo-ruleForm" :model="form" label-width="110px" enctype="multipart/form-data">
				<el-form-item style="width:50%;display:inline-block;" v-for="(item,index) in talPro" :key="index" :label="item.label + '：' "  :prop="item.prop">
					<el-input v-model="form[item.prop]" :name="form[item.prop]" type="text" :disabled="index === 0?true:false"></el-input>
				</el-form-item>

			</el-form>


			<el-button @click="dialogVisible = false">取 消</el-button>
			<!--<el-button native-type="submit" type="primary" @click="add_course">确 定</el-button>-->
			<el-button type="primary" @click="add_course">确 定</el-button>
		</el-dialog>
	</div>

</template>

<script>
	//引进来table和分页
	import myPage from "./myPager.vue";

	 export default({
    name:'makeupGoods',
	 	data:function(){
	 		var cheack = function(rule,value,callback){
	 					if(!value){
	 						return callback(new Error("不能为空 "));
	 					}else{
	 						 callback();
	 					}
	 			};

	 		return {
	 			talPro:[{prop:"_id",label:"id"},{prop:"careType",label:"护理类型"},{prop:"img",label:"商品图片"},{prop:"useType",label:"用途类型"},{prop:"brand",label:"品牌"},{prop:"originPrice",label:"未打折价格"},{prop:"newPrice",label:"活动后价格"},{prop:"goodsName",label:"商品名称"},{prop:"goodsDescribe",label:"商品简介"},{prop:"goodsDetail",label:"商品详细描述"},{prop:"stock",label:"库存量"},{prop:"monthlySales",label:"月销售量"},{prop:"productionPlace",label:"产地"},{prop:"SalesCount",label:"总销售量"}], //要显示的表头
	 			form:{_id:"",name:"",careType:"",img:"",useType:"",brand:"",originPrice:"",newPrice:"",goodsName:"",goodsDescribe:"",goodsDetail:"",stock:"",monthlySales:"",productionPlace:"",SalesCount:""},
	 			dialogVisible:false,
	 			rules2:{
	 				name:[{validator:cheack,trigger:'blur'}],
	 				newPrice:[{validator:cheack,trigger:'blur'}]
	 			},
	 			searchString:"",
	 			isAdd:true, //判断是新增还是修改
	 			total:12,//总共条数
	 			page_sizes:[6],//每页显示的个数
	 			currentPage:1,//当前页数
	 			//数据来源：
	 			 tableData: []
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
		     getdate(page){//获取表格数据的方法，需要刷新表格的时候重新调用这个方法即可
		     	var _this = this;
		     	this.$reqs.post('/ModelMakeUp/page',{
                    page:page,
                    rows:_this.page_sizes[0]
                }).then(function(results){
                	_this.total = results.data.count;
                  _this.tableData = results.data.result;
                }).catch(function(er){
                	console.log(er);
                })
		     },
		    handleDelete(index,row){
		     	var _id = row._id;
		     	var _this = this;
		     	this.$confirm('确认删除这条数据，且将把数据库数据移除，不能恢复？')
					.then(_ => {//点击确认
						_this.$reqs.post('/ModelMakeUp/deleteById',{"id":_id}).then(function(result){
              	_this.$message={message:"删除成功",type:"success"};
              if(result){

                	_this.getdate(_this.currentPage);
              }

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
	 			this.resetForm("form");
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
          var da = this.form;
          delete da["_id"];
					this.$reqs.post("/ModelMakeUp/add",{collection:_this.form}).then(function(result){
						if(result.data != null){
              _this.dialogVisible = false;
              _this.getdate(_this.currentPage);
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
						if(result.data.success){
              _this.dialogVisible = false;
               _this.getdate(_this.currentPage);
							_this.$message={message:result.data.success,type:"success"};
						}else{
							_this.dialogVisible = false;
							_this.$message={message:result.data.err,type:"error"};
						}
					});
				};

      },
      resetForm(formName){
        if(this.$refs[formName]){//初次点击按钮的时候，是还没有生成form的所以这里需要判断一下
          this.$refs[formName].resetFields();
        }

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
					if((item.careType + "").indexOf(ss) !== -1 || (item._id + "").indexOf(ss) !== -1 ||(item.useType + "").indexOf(ss) !== -1 ||(item.brand + "").indexOf(ss) !== -1 ||(item.originPrice + "").indexOf(ss) !== -1 ||(item.newPrice + "").indexOf(ss) !== -1 ||(item.goodsName + "").indexOf(ss) !== -1 || (item.goodsDescribe + "").indexOf(ss) !== -1 ||(item.goodsDetail + "").indexOf(ss) !== -1 ||(item.stock + "").indexOf(ss) !== -1 || (item.monthlySales + "").indexOf(ss) !== -1|| (item.productionPlace + "").indexOf(ss) !== -1|| (item.SalesCount + "").indexOf(ss) !== -1){
						result.push(item)
					};
				});

				return result;
	 		}
	 	}
	 })



</script>

<style scoped>

</style>
