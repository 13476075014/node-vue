

<!--这个是封装的table的展示，和分页的操作-->

<template>
	<div id="mytable">
		<!--table-->
		 <el-table
		    :data="tableData"
		    highlight-current-row
    		@current-change="handleCurrentChange"
		    stripe
		    @row-click="row_click"
		    style="width: 100%">
		    	 <el-table-column
            v-for="(item,index5) in talPro" :key="index5"
			      align="center"
			      :prop="item.prop"
			      :label="item.label"
			      >
			    </el-table-column>
		    	 <el-table-column label="操作" align="center">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		</el-table>

		  <!--分页-->
		   <div class="block" style="padding-top:20px;">
		     <el-pagination
		       @size-change="handleSizeChange"
		       @current-change="handleCurrentChange2"
		       :current-page="currentPage"
		       :page-sizes="page_sizes"
		       :page-size="100"
		       layout="total, sizes, prev, pager, next, jumper"
		       :total="total">
	  	     </el-pagination>
		   </div>
	</div>

</template>

<script>
	 export default {
		    data() {
		      return {
		      	currentRow:null
		      }
		    },
		    props:{//通过属性去得到父组件的绑定展示的数据
		    	tableData:{
		    		type:Array,
	                default:function(){
	                    return [{}]
	                }
		    	},
		    	currentPage:{//当前页
		    		type:Number,
		    		default:function(){
		    			return 1;
		    		}
		    	},
		    	total:{//总共条数
		    		type:Number,
		    		default:function(){
		    			return 6;
		    		}
		    	},
		    	page_sizes:{//每页显示几条
		    		type:Array,
		    		default:function(){
		    			return [6];
		    		}
		    	},
		    	talPro:{
		    		type:Array,
		    		default:function(){
		    			return ["date","name","address"]
		    		}
		    	}

		    },
		     methods: {
		      handleEdit(index,row){//表格行的编辑
		      	this.$emit("handleEditTWO",index,row);
		      },
		      handleDelete(index,row){//表格行的删除操作
		      	this.$emit("handleDeleteTWO",index,row);
		      },
		      handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      row_click(row, event, column){
		      	var nn = event.target;
		      	//nn = nn.parentNode.parentNode;
		      	//console.log(nn)
		      },
		      handleCurrentChange(val){
		      	this.currentRow = val; //table的让当前被选中的行，高亮
		      	this.$emit("handleCurrentChange",val);
		      },
		      handleCurrentChange2(val){//下面的handleCk，需要在这个模板引用后写上这个事件，才能顺利调用
		      	this.$emit("handleCk",val);//组件应用后绑定的方法
		      }
		    },
		  }

</script>

<style>


</style>
