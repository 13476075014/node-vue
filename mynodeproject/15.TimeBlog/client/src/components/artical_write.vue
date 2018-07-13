<template>
  <div class="towrite" style="padding:0 20px 0 0;">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-dynamic">
      <el-form-item label="文章标题" prop="title" :rules="[{required:true,message:'请输入文章标题',trigger:'blur'}]">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <wangeditor
           @getHtml = "getHtml"
           @getText = "getText">
        </wangeditor>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wangeditor from './template/tem_wangeditor'
  export default({
    name:"artical_write",
    data(){
      return {
         ruleForm: {
          title: '',
          email:'',
          content: ''
        },
         dynamicValidateForm: {
            domains: [{
              value: ''
            }],
            email: ''
          }
      }
    },
    components:{
      wangeditor
    },
    methods:{
       getHtml(html){//获取到wangeditor里面的html,并赋值给表单数据中的商品详细描述字段
          this.ruleForm.content = html;
          var _this = this;
          this.$reqs.post("/artical/create",this.ruleForm).then(function(result){
              if(result.data.state > 0){//创建成功
                  //提示一秒后跳到文章详情页面
                  _this.$message({message:"编写描述成功,1秒后将跳转到详情页",type:"success"});
                  setTimeout(function(){
                      _this.$router.push("/index/artical_detail/" + result.data.id);
                  },1000)

              }else if(result.data.state < 0){
                 alert(result.data.msg)
              }
          })
          //this.$message({message:"编写描述成功，具体内容：" + html,type:"success"});/
      },
      getText(text){//获取到wangeditor里面的html
          console.log(text)
      }
    }
  })
</script>

<style scoped>

</style>

