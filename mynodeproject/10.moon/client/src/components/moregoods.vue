<template>
  <div id="moregoods">
    <el-row>
      <el-col :span="18" :offset="3">
        <!-- 面包屑导航 -->
          <div class="top1">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 面包屑导航结束 -->

          <!-- 折叠效果的商品筛选 -->
          <div class="top2">
              <el-collapse v-model="activeNames" @change="handleChange" style="text-align:left;">
                <div class="item" v-for="(toptwo,index7) in top2_date" :key="index7">
                   <div class="title_left">
                        {{toptwo.title_left}}
                   </div>
                  <div class="title_top">
                       <el-checkbox-group v-model="checkList_bank" text-color="red">
                          <el-checkbox v-for="(chek,index8) in toptwo.title_top" :key="index8" :label="chek"></el-checkbox>
                        </el-checkbox-group>
                  </div>
                  <el-collapse-item :name="index7" style="padding:0 0 0 80px;">
                     <el-checkbox-group v-model="checkList_bank">
                      <el-checkbox v-for="(chek2,index9) in toptwo.title_top2" :key="index9" :label="chek2"></el-checkbox>
                    </el-checkbox-group>
                  </el-collapse-item>
                </div>


              </el-collapse>
          </div>
          <!-- 折叠效果的商品筛选结束 -->
          <goodsdetail
            :detail2="goodslist"
            :currentPage="currentPage"
            :page_sizes="page_sizes"
            :total="total"
            @handleCk="handleCk"
           >
           </goodsdetail>
      </el-col>
    </el-row>

  </div>
</template>


<script>
import goodsdetail from './littleComponent/goods_detail' ;
  export default{
    name:"moregoods",
    data(){
      return{
          currentPage:1, //当前页
          total:12, //总共的商品数
          page_sizes:[6], //每页显示的条数
          activeNames: ['1'],
          checkList_bank: ['选中且禁用','复选框 A'], //选中的筛选条件
          top2_date:[ //筛选的条件
              {title_left:"品牌：",title_top:["欧莱雅","ysl","迪奥","欧莱雅","ysl","迪奥"],title_top2:["欧莱雅","ysl","迪奥","欧莱雅","ysl","迪奥"]},
              {title_left:"品牌：",title_top:["欧莱雅2","ysl2","迪奥2","欧莱雅2","ysl2","迪奥2"],title_top2:["欧莱雅2","ysl2","迪奥22","欧莱雅2","ysl2","迪奥2"]},
              {title_left:"品牌：",title_top:["欧莱雅3","ysl3","迪奥3","欧莱雅3","ysl2","迪奥3"],title_top2:["欧莱雅3","ysl3","迪奥3","欧莱雅3","ysl3","迪奥3"]},
              {title_left:"品牌：",title_top:["欧莱雅","ysl","迪奥","欧莱雅","ysl","迪奥"],title_top2:["欧莱雅","ysl","迪奥","欧莱雅","ysl","迪奥"]}
          ],
          goodslist:[//商品的各个信息
            {src:"../../static/images/goods1.png",des:"这里是对这个商品；",newprice:"￥257",paycout:999},
            {src:"../../static/images/goods1.png",des:"daldalsdjakdjsladjlada",newprice:"￥257",paycout:999},
            {src:"../../static/images/goods1.png",des:"daldalsdjakdjsladjlada",newprice:"￥257",paycout:999},
            {src:"../../static/images/goods1.png",des:"daldalsdjakdjsladjlada",newprice:"￥257",paycout:999},
            {src:"../../static/images/goods1.png",des:"daldalsdjakdjsladjlada",newprice:"￥257",paycout:999}
          ]
     }
    },
    components:{
        goodsdetail
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      handleCk(val){

      }
    }

  }
</script>



<style scoped="scoped">
.top1 span{line-height: 50px;}
.top2 .item{position:relative;border:1px solid rgb(247,247,247);}
.top2 .title_left{line-height: 49px;position: absolute;left:0;top:0px;background:rgb(247,247,247);width:70px;text-align: left;height:100%;padding-left:5px;}
.title_top{position:absolute;left:80px;top:0px;line-height: 49px;}



</style>

