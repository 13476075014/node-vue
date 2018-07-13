<template>
<div class="comment">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>留言列表</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="(o,index2) in comment_data" :key="index2" class="text item comment_inner">
        <img src="../../assets/logo.png" alt="">
        <p>
          <span class="author">
           {{o.author.name}}
          </span>
          <span class="time">
           {{o.created_at}}
          </span>
        </p>
        <p>
            {{ o.content }}
        </p>
    </div>
  </el-card>
  <div class="commit">
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
    <el-button type="primary" @click="commit_comment">提交评论</el-button>
  </div>

</div>

</template>

<script>
  export default({
    name:"comment",
    data(){
      return {
        arr:[{author:{name:"haha"}}],
        textarea: ''
      }
    },
    props:{
      postID:{type:String},
      comment_data:{type:Array}
    },
    created(){
    },
    methods:{
      commit_comment(){
        var _this = this;
      //  console.log(this.$cookies.get("user"))
        if(this.$cookies.get("user") != null){
          var author = this.$cookies.get("user")
            this.$reqs.post("/comment/create",{comment:{author:author,postId:_this.postID,content:_this.textarea}}).then(function(result){
              if(result.data.state > 0){
                  _this.textarea = "";
                 _this.$message({message:"评论发表成功",type:"success"});
                  _this.get_comment();  //刷新评论的数据
              }else{
                _this.$message({message:result.data.msg,type:"error"})
              }
          }).catch(function(ex){

          })
        }else{
          _this.$message({message:"请登录后再操作，现在没有权限",type:"error"})
        }

      }
    }
  })
</script>


<style scoped>
.comment{padding:10px;box-sizing: border-box;}
.comment .comment_inner{padding-left:80px;position:relative;margin:20px 0;}
.comment_inner>img{width:60px;height:60px;position:absolute;left:5px;top:0;}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    text-align: left;
    /* width: 480px; */
  }
  .commit{margin-top:20px;}
  .commit button{float:right;margin-top:15px;margin-right:30px;}
</style>
