<template>
    <div class="articals" style="position:relative;">
      <slot></slot>
      <ul>
        <li v-for="(item,index) in artical" :key="index">
          <router-link :to="'/index/artical_detail/' + item._id">
            <h1>{{item.title}}</h1>
            <p>
              <el-row>
                <el-col :span="2">
                    <img class="avatar" :src="item.author.avatar" alt="">
                </el-col>
                <el-col :span="22">
                    <p :class="{content:true,tohide:tohide}" v-html="item.content">
                      {{item.content}}
                  </p>
                </el-col>
              </el-row>
            </p>
          </router-link>
          <div class="detail" style="text-align:right;margin-top:15px;font-size:14px;">
              <span>{{item.author.name}}</span> 发布于 <i>{{item.created_at}}</i> 留言数（{{item.commentsCount}}） <span>阅读数（{{item.pv}}）</span>
          </div>
        </li>
      </ul>
    </div>
</template>


<script>
export default{
  name:"articals",
  data(){
    return {

    }
  },
  props:{
    tohide:{type:Boolean},
    artical:{type:Array},
    comment_data:{type:Array}
  },
  created(){
  }

}

</script>


<style scoped>
a{text-decoration: none;}
ul{list-style: none;margin:0;padding:10px 60px 10px;}
ul li{background:rgb(223,223,223);padding:10px;margin-bottom:10px;border-radius: 7px;}
ul li h1{font-size:20px;margin:0;}
ul li .avatar{width: 100%;display: block;height:70px;box-sizing: border-box}
ul li p.content{text-align: left;padding-left:15px;color:rgb(118,118,118);box-sizing: border-box;margin:0!important;line-height: 23px;}
ul li p.tohide{height:70px;overflow: hidden;}
</style>

