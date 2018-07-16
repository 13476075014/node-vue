<template>
  <div class="content2">
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
      comment_data:[]
    }

  },
   created(){
    //var id = this.$route.params.id; //获取文章的id
    this.getdata();
  },
  methods:{
    getdata(){ //获取到时间由新到旧的文章
      var _this = this;
      var author = _this.$cookies.get("user");
         _this.$reqs.post("/artical/getByAuthor",{author:author}).then(function(result){
          var arr = result.data.msg;
          _this.articaldata = arr;
    })
    }
  },
  components:{
    articals
  }

})

</script>

<style>
</style>
