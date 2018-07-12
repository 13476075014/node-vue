<template>
  <div class="content">
      <articals :tohide="tohide" :artical="articaldata"> </articals>
  </div>
</template>

<script>
import articals from "./artical.vue";

export default({
  name:"contents",//这里命名不要用content和原有的内定有冲突
  data(){
    return{
      tohide:true,
      articaldata:[],
      comment_data:""
    }

  },
   created(){
    //var id = this.$route.params.id; //获取文章的id
    this.getdata();
  },
  methods:{
    getdata(){ //获取到时间由新到旧的文章
      var _this = this;
      _this.$reqs.post("/artical/getByAuthor").then(function(result){
        console.log(result)
        var arr = result.data.msg;
        _this.articaldata = arr;
        //_this.comment_data = result.data.data.comments;
      })
    }
  },
  components:{
    articals
  }

})

</script>

<style scoped>
</style>
