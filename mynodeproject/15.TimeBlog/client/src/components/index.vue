<template>
  <div class="backlogin">
    <div class="header">
            <div class="time" style="padding-top:20px;float:left;margin-left:15px;color:rgb(145,145,145);">
            	<!-- {{da}} -->
            </div>
            <div class="handler">
                <router-link to="/index/artical_write/1" style="line-height:60px;height:60px;">创作文章</router-link>
                <div class="more" @click="toggleSlide">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <ul :class="{showul:showExit,menu:true}" style="z-index:999;">
                        <li><a href="javascript:;" @click="logout"  v-if="!showlogin"><i class="fa fa-sign-out" aria-hidden="true"></i>退出</a></li>
                        <li><a href="/" v-if="showlogin"><i class="fa fa-sign-out" aria-hidden="true"></i>登录</a></li>
                        <li><a @click="changepass">修改密码</a></li>
                        <!-- <li><a href="javascript:;">意见反馈</a></li> -->
                    </ul>
                </div>
                <el-dropdown>
								  <span class="el-dropdown-link">
								    <img style="width:40px;border-radius: 40px;height:40px;margin-top:10px;" src="../assets/logo.png" alt="" />
								  </span>
								  <el-dropdown-menu slot="dropdown" style="width:200px;" class="el_dropmenu">
								  	<h4 style="margin:0;padding-left:5px;">我的:</h4>
								    <el-dropdown-item><i class="fa fa-user"></i>个人信息</el-dropdown-item>
								    <!-- <el-dropdown-item><i class="fa fa-heart" @click="love_cli"></i>收藏</el-dropdown-item> -->
								    <el-dropdown-item>
                      <p @click="toMyartical">
                        <i class="fa fa-heart"></i>我的文章
                      </p>
                    </el-dropdown-item>
								    <!-- <el-dropdown-item>螺蛳粉</el-dropdown-item>
								    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
								    <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
								  </el-dropdown-menu>
								</el-dropdown>
            </div>
        </div>

        <!--侧面导航-->
        <div class="sidenav_box">
            <img class="logo" src="../assets/logo.png" alt="" />
            <ul class="sidenav">
                <li>
                    <router-link to="/index/content">
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        <span>首页</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/backIndex/upload">
                        <i class="fa el-icon-upload" aria-hidden="true"></i>
                        <span>upload的学习</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="content">

            <ul class="breadcrumb">
                <li><a href="#/index/content">首页</a></li>
                <li>{{pageTitle}}</li>
            </ul>
            <router-view></router-view>

        </div>

  </div>
</template>

<script>
    var pageTitleObj = {
        index:"网站首页",
        content:"文章列表",
        artical_write:"创建文章",
        artical_detail:"文章详情",
        myArtical:"我的文章列表"
    };

    export default {
      name: 'index',
      data () {
        return {
        			datatime:"",
              search_box_fouce:false,
              showExit:false,
              showlogin:"",
              pageTitle: pageTitleObj[(this.$route.path.split("/"))[2]]|| "网站首页"
        }
      },
      created(){
          if(this.$cookies.get("user") != null){
            this.showlogin = false;
          }else{
            this.showlogin = true;
          }
      },
      methods:{
            changepass(){
              var _this = this;
              if(_this.showlogin == false){
                   this.$prompt('请输入新密码', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                 // inputPattern: /66/,
                //  inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                  this.$reqs.post("/users/updatePassword",{id:_this.$cookies.get("user"),password:value}).then(function(result){
                    console.log(result)
                  }).catch(function(ex){

                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消输入'
                  });
                });
              }else{
                _this.$message({message:"请登录后再操作",type:"error"})
              }
                return false;
            },
      			love_cli(){

            },
            toMyartical(){
              var _this = this;
                 var author = _this.$cookies.get("user");
                  if(author != null && author != undefined){
                    this.$router.push("/index/myArtical");
                  }else{
                    _this.$message({message:"请先登录",type:"error"})
                  };
            },
            focusFn(){  //搜索框获取焦点，添加class
                this.search_box_fouce = true;
            },
            blurFn(){   //搜索框失去焦点，去掉class
                this.search_box_fouce = false;
            },
            toggleSlide(){ //这个是用来显示和隐藏头像旁的退出下拉框
                this.showExit = !this.showExit
            },
            logout(){ //退出系统
                var _this = this ;
                this.$reqs.post("/users/logout").then(function(result){
                  _this.$cookies.remove("user");
                  _this.$message({message:"退出成功",type:"success"});
                  _this.showlogin = true;
                	//成功
                	//_this.$router.push({path:'/'});
                })
            }
        },
        computed:{
        	da:function(){
            var da = new Date();
              da = da.toLocaleString();
              this.datatime = da;
              return da;
        	}

        },
        watch:{ //监控路径变化  当路径发送变化的时候，改变面包屑导航的显示
            $route: {
                handler: function (val, oldVal) {
                    var path = val.path;
                    this.pageTitle = pageTitleObj[ path.substr( path.lastIndexOf("/")+1 ) ] || "网站首页";

                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul, li{
        list-style: none;
    }
    ul.menu{padding:0;}
    .header{
        height: 60px;
        box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
        background: #fff;
        margin-left: 80px;
        min-width: 740px;
    }

    .sidenav_box{
        width: 80px;
        box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        z-index: 99;
    }
    .sidenav_box .logo{
        width: 46px;
        margin: 20px 0 0 17px;
    }
    .sidenav{
        margin-top: 30px;
        padding:0;
    }
    .sidenav li{
        margin-bottom: 20px;
    }
    .sidenav a{
        display: block;
        width: 56px;
        height: 56px;
        margin: 0 auto;
        position: relative;
        cursor: pointer;
        opacity: 0.6;
        transition:all 0.5s ease;
        text-decoration: none;
    }
    .sidenav a i{
        font-size: 20px;
        line-height: 56px;
        text-align: center;
        display: block;
        color: #566a80;
    }
    .sidenav a:hover{
        background: #f0f2f5;
        opacity: 1;
    }
    .sidenav a span{
        position: absolute;
        left: 55px;
        top: 22px;
        background: #000;
        color: #fff;
        width: 0px;
        padding: 5px 0;
        border-radius: 3px;
        font-size: 12px;
        opacity: 0;
    }
    .sidenav a:hover span{
        opacity: 1;
        left: 65px;
        width: 60px;
        padding: 5px 20px;
        transition:none 0.5s ease-out;
        transition-property: opacity,left;
    }
    .sidenav a span:after{
        content: "";
        position: absolute;
        top: 8px;
        left: -10px;
        border:5px solid transparent;
        border-right-color: #000;
    }
    .sidenav .router-link-active:after{
        content: "";
        position: absolute;
        left: -16px;
        top: 8px;
        height: 40px;
        width: 8px;
        border-radius: 3px;
        background: #566a80;
    }
    .sidenav .router-link-active{
        opacity: 1;
        background: #f0f2f5;
    }

    /*顶部栏*/
    .search_box{
        color: #979fa8;
        padding-top: 20px;
        float: left;
    }
    .search_box i{
        margin: 0 12px 0 70px;
        transition: all 0.5s ease;
    }
    .search_box input{
        border:none;
        outline: none;
    }
    .search_box_fouce i{
        margin-left: 55px;
        color: #2C3D50;
    }

    .handler > *{
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }
    .handler .more{
        font-size: 20px;
        color: #566A80;
        margin: 15px 30px 0 0;
        position: relative;
    }
    .handler .more:hover{
        color: #2C3D50;
    }
    .handler .more ul{
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 55px;
        width: 120px;
        box-shadow: 0 1px 5px rgba(13,62,73,0.2);
        transition: all 0.3s ease-out;
        height: 0;
        opacity: 0;
        overflow: hidden;
        text-align: center;
    }
    .handler .more .showul{
        height: auto;
        top: 45px;
        opacity: 1;
        border-top: 1px solid #979FA8;
    }
    .handler .more a{
        display: block;
        padding: 8px 10px;
        background: #fff;
        color: #566A80;
        text-decoration: none;
    }
    .handler .more a:hover{
        background: #f8f9fb;
    }
    .handler > img{
        width: 50px;
        border-radius: 50%;
        margin-top: 5px;
        margin-right: 30px;
    }

    .content{
        margin: 20px 0px 0px 80px;
        min-height: 300px;
        /*min-width: 700px;*/
    }

    .breadcrumb{
        border-radius: 4px;
        padding: 10px 15px;
        background: #fff;
    }
    .breadcrumb > li{
        display: inline-block;
        color: #777777;
    }
    .breadcrumb > li+li:before{
        padding: 0 5px;
        color: #ccc;
        content: "/\00a0";
    }
    .breadcrumb > li > a{
        color: #32475f;
        text-decoration: none;
    }
    .main{
        border-radius: 4px;
        background: #fff;
        margin-top: 10px;
    }

   .el_dropmenu i{margin-right:5px;}

</style>
