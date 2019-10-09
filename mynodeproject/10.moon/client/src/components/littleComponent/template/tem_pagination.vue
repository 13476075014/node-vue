<template>
  <div id="page">
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
  export default({
    name:"pagination",
    data(){
      return {

      }
    },
    props:{//通过属性去得到父组件的绑定展示的数据
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val){
      this.currentRow = val; //table的让当前被选中的行，高亮
      this.$emit("handleCurrentChange",val);
    },
    handleCurrentChange2(val){//下面的handleCk，需要在这个模板引用后写上这个事件，才能顺利调用
      this.$emit("handleCk",val);//组件应用后绑定的方法
    }
  }
  })
</script>

<style>


</style>

