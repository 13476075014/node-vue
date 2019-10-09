<!--
	这里使用element框架里面的东西，在前面的main.js配置好了的前提下，只需要直接copy过来就可以用，具体的样式可以在
	后期修改
-->

<!--<template>
	<el-switch
	  v-model="value2"
	  active-color="#13ce66"
	  inactive-color="#ff4949">
	</el-switch>
</template>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    }
  };
</script>-->

<!--这个页面暂时用来作为上传图片啥的表单页面-->

<template>
	<div>
		<div>
			<el-button type="primary" icon="el-icon-edit" @click="edit"></el-button>
			<el-button type="primary" icon="el-icon-share"></el-button>
			<el-button type="primary" icon="el-icon-delete"></el-button>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
			<el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
		</div>
		
		
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%;">
			<el-table-column header-align="center" type="index" width="100" label="排序">
			</el-table-column>
			<el-table-column header-align="center" align="center" property="_id" label="id" width="120">
			</el-table-column>
			<el-table-column header-align="center" property="title" label="标题" width="120">
			</el-table-column>
			<el-table-column header-align="center" property="description" label="描述">
			</el-table-column>
			<el-table-column header-align="center" property="img_src" label="图片地址">
			</el-table-column>

			<el-table-column header-align="center" label="操作">
				<template slot-scope="scope">
					<el-button ref="btn_upodate" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleEdit2(scope.$index, scope.row)">修改图片</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--图片-->
		<el-dialog title="提示"  :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
					<el-upload
					  class="upload-demo"
					  drag
					  :data="{_id:id}"
					  name="picture"
					  action="http://localhost:3000/backIndex/courseList"
					  >
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
					<br /><br />
		</el-dialog>
		

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
				<el-form-item label="标题">
					<el-input v-model="form.title" name="title" type="text"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="form.description" name="description" type="text"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-input v-model="form.img_src" name="img_src" type="text"></el-input>
				</el-form-item>
				<el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button native-type="submit" type="primary" @click="add_course">确 定</el-button>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					title:"",
					description:"",
					img_src:""
				},
				id:"",
				dialogVisible: false,   //控制是否弹出修改表单的标题等信息的页面
				dialogVisible2:false,  //控制是否弹出增加图片的页
				tableData: [],
				edit_flag:true,
				currentRow: null
			}
		},
		created:function(){ //在vue2中，ready的方法已经被移除，可以使用钩子函数created来替代
			var _this = this;
			this.$reqs.post("/backIndex/find",{}).then(function(result){
					if(result){
//						console.log(result)
						_this.tableData = result.data;
					};
				});
		},
		methods: {
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) { //行数改变触发的事件
				this.currentRow = val;
			},
			
			//编辑按钮
			handleEdit(index, row) { //index是行数下标索引；；row是这一行的数据字段和具体的值
				this.edit_flag = false;
				this.dialogVisible = true; //这个属性来控制是否弹出对话框
				this.form.title = row.title;
				this.form.img_src = row.img_src;
				this.form.description = row.description;
				this.id = row._id;
//				console.log(row)
			},
			
			//修改图片按钮的方法
			handleEdit2(index, row) { //index是行数下标索引；；row是这一行的数据字段和具体的值
				this.id = row._id;
				this.dialogVisible2 = true; //这个属性来控制是否弹出对话框
			},
			
			//删除整行的按钮
			handleDelete(index, row) {
				var _this = this;
				this.$confirm('确认删除？')
					.then(_ => {
						this.$reqs.post("/backIndex/delete",{
								_id:row._id
							}).then(function(result){
								console.log(result)
								if(result.data.success){
									_this.tableData.splice(index,1)
								}
						});
					})
					.catch(_ => {});
				
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
			edit(){
				this.form.title = "";
				this.form.description = "";
				this.edit_flag = true;
				this.dialogVisible = true; //这个属性来控制是否弹出对话框
			},
			add_course(){//弹出框点击确认的事件
				//如果是添加按钮点击的
				if(this.edit_flag){
						this.$reqs.post("/backIndex/add",{
								title:this.form.title,
								description:this.form.description
							}).then(function(result){
								if(result.success){
									console.log("成功")
								}
						});
				}else{//如果是编辑按钮点击的
					var _this = this;
					this.$reqs.post("/backIndex/update",{
								_id:_this.id,
								title:this.form.title,
								description:this.form.description
						}).then(function(result){
								if(result.success){
									console.log("成功")
								}
						});
				};
				
				
			
			}
			
		}
	}
</script>