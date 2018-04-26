<template>
    <div id="onefoot" style="font-size:12px;">
        <el-row>
          <el-col :span="14" :offset="5">
              <p class="p1">
                <span v-for='(i,index) in top1' :key='index'>
                    <a class="bor_r" :href="i.url">
                      {{i.label}}
                    </a>
                </span>
              </p>
              <p class="p2">
                <span class="bor_r" v-for='(i,index) in top2' :key='index'>
                      {{i}}
                </span>
              </p>
              <p>
                <span v-for='(i,index) in top3' :key='index'>
                      {{i}}
                </span>
              </p>
          </el-col>
        </el-row>

    </div>
</template>


<script>
export default {
    name:"onefoot",
    data(){
      return {
          top1:[{label:"关于我们",url:""},{label:"联系我们",url:""},{label:"联系客服",url:""},{label:"合作招商",url:""},{label:"营销中心",url:""},{label:"手机晓月",url:""},{label:"友情链接",url:""},{label:"销售联盟",url:""},{label:"晓月社区",url:""},{label:"风险监测",url:""},{label:"隐私策略",url:""}]
          ,top2:["备案号","ICP证","资格证--经营证----"]
          ,top3:["互联网出版许可证","网络文化经营许可证","违法和不良信息举报电话"]
          ,top4:["Copyright"]
      }
    }
}
</script>


<style scoped>
.bor_r{border-right:1px solid rgb(113,113,113);padding:0 10px;}
#onefoot{position:absolute;bottom:0;left:0;width:100%;}

</style>

