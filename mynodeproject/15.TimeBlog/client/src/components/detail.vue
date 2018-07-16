<template>
  <div class="detail">
      <articals :tohide="tohide" :artical="articaldata" :comment_data="comment_data">
        <el-button style="position:absolute;right:17px;top:15px;padding:5px;" type="danger" icon="el-icon-delete" circle v-if="showDelete" @click="deleteArtical"></el-button>
      </articals>
      <comment :postID="postID" :comment_data="comment_data"
        :showDelete="showDelete"
        @get_comment="getdata(ID)"
        @deleteComment="deleteComment"
      >

      </comment>
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
      ID:"",
      showDelete:false,
      postID:""
    }

  },
  created(){
    var id = this.$route.params.id; //获取文章的id
    this.ID = id;
    this.postID = id;
     this.getdata(id);
  },
  methods:{
    getdata(id){
      var _this = this;
      _this.$reqs.post("/artical/getById",{id:id}).then(function(result){
        _this.articaldata = [result.data.data.artical];
        /*判断是否出现删除 */
        if(_this.articaldata[0].author._id == _this.$cookies.get("user")){
          _this.showDelete = true;
        }else{
          _this.showDelete = false;
        };

        _this.comment_data = result.data.data.comments;
      })
    },
    deleteComment(commentId){//根据评价id删除评价
      var _this = this;
      _this.$reqs.post("/comment/deleteById",{Id:commentId}).then(function(result){
          if(result.data.state > 0){
              _this.$message({message:"删除成功",type:"success"});
              _this.getdata(_this.ID);//更新评论的内容；
          }
      }).catch(function(ex){

      })
    },
    deleteArtical(){
      var _this = this;
      _this.$reqs.post("/artical/deleteById",{Id:_this.postID}).then(function(result){
          if(result.data.state > 0){
            _this.$message({message:"删除成功",type:"success"});
             history.back();
          }else{
            _this.$message({message:result.data.msg,type:"error"});
          }

      }).catch(function(ex){

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
