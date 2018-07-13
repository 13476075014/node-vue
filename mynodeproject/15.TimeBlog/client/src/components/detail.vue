<template>
  <div class="detail">
      <articals :tohide="tohide" :artical="articaldata" :comment_data="comment_data"> </articals>
      <comment :postID="postID" :comment_data="comment_data"></comment>
  </div>
</template>

<script>
import articals from "./artical.vue"; //文章组件
import comment from "./template/tem_comment.vue"; //评论组件

export default({
  name:"detail",
  data(){
    return{
      tohide:false,
      articaldata:[],
      comment_data:[],
      postID:""
    }

  },
  created(){
    var id = this.$route.params.id; //获取文章的id
    this.postID = id;
     this.getdata(id);
  },
  methods:{
    getdata(id){
      var _this = this;
      _this.$reqs.post("/artical/getById",{id:id}).then(function(result){
        _this.articaldata = [result.data.data.artical];
        _this.comment_data = result.data.data.comments;
      })
    }
  },
  components:{
    articals,
    comment
  },
  computed:{

  }

})

</script>
