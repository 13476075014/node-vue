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
		
		
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column property="date" label="日期" width="120">
			</el-table-column>
			<el-table-column property="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column property="address" label="地址">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleEdit2(scope.$index, scope.row)">添加图片</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--图片-->
		<el-dialog title="提示" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
					<el-upload
					  class="upload-demo"
					  drag
					  name="picture"
					  action="http://localhost:3000/backIndex/courseList"
					  multiple>
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
		</el-dialog>
		

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
				<el-form-item label="标题">
					<el-input v-model="form.title" name="title" type="text"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="form.description" name="description" type="text"></el-input>
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
					description:""
				},
				dialogVisible: false,
				dialogVisible2:false,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				currentRow: null
			}
		},

		methods: {
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) { //行数改变触发的事件
				this.currentRow = val;
			},
			handleEdit(index, row) { //index是行数下标索引；；row是这一行的数据字段和具体的值
				this.dialogVisible = true; //这个属性来控制是否弹出对话框
				console.log(row)
			},
			handleEdit2(index, row) { //index是行数下标索引；；row是这一行的数据字段和具体的值
				this.dialogVisible2 = true; //这个属性来控制是否弹出对话框
				console.log(row)
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleClose(done) { //弹出的对话框里的方法
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			edit(){
				this.dialogVisible = true; //这个属性来控制是否弹出对话框
			},
			add_course(){
				this.$reqs.post("/backIndex/add",{
					title:this.form.title,
					description:this.form.description
				}).then(function(result){
					if(result.success){
						console.log("成功")
					}
				})
			}
		}
	}
</script>