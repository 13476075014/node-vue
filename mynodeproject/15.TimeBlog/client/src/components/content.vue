<template>
  <div class="content2">
      <articals :tohide="tohide" :artical="articaldata"> </articals>
      <mypage
				:total="total"
				:currentPage="currentPage"
				:page_sizes="page_sizes"
				@handleCk="handleCurrentChange2"
		></mypage>
  </div>
</template>

<script>
import articals from "./artical.vue";
import mypage from "./template/tem_page";

export default({
  name:"contents",//这里命名不要用content和原有的内定有冲突
  data(){
    return{
      tohide:true,
      articaldata:[],
      comment_data:[],
      total:6,
      currentPage:1,
      page_sizes:[4]

    }

  },
   created(){
    //var id = this.$route.params.id; //获取文章的id
    this.getdata();
  },
  methods:{
    getdata(){ //获取到时间由新到旧的文章
      var _this = this;
      // _this.$reqs.post("/artical/getByAuthor").then(function(result){
       _this.$reqs.post("/artical/getArticalPage",{row:_this.page_sizes[0],page:_this.currentPage}).then(function(result){
         if(result.data.state > 0){
            var arr = result.data.msg[0];
            var count = result.data.msg[1];
            _this.total = count;
            _this.articaldata = arr;
         }else{
           _this.$message({message:result.data.msg,type:"error"})
         }

        //console.log(result)
        //_this.comment_data = result.data.data.comments;
      })
    },
    handleCurrentChange2(val){
        var _this = this;
        _this.currentPage = val;
        _this. getdata();
    }
  },
  components:{
    articals,
    mypage
  }

})

</script>

<style>
</style>
