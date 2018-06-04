<template>
  <div class="goods_show">
    <el-row style="position:static;">
      <el-col :span="18" :offset="3">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>美妆个护</el-breadcrumb-item>
              <el-breadcrumb-item>面部护理</el-breadcrumb-item>
              <el-breadcrumb-item>洁面</el-breadcrumb-item>
              <el-breadcrumb-item>香奈儿洁面乳</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <fang_html>
        </fang_html>

<!-- 商品详情和商品评价-->
        <div>
            <el-tabs type="border-card">
              <el-tab-pane label="商品详情">
                  <img src="../assets/images/banner1.png" alt="">
              </el-tab-pane>
              <el-tab-pane label="商品评价">

              </el-tab-pane>
            </el-tabs>
        </div>
      </el-col>
    </el-row>

  </div>
</template>


<script>
import fang_html from './littleComponent/magnifier';

  export default{
    name:"goods_show",
    data(){
      return {

      }
    },
    components:{
      fang_html
    }
  }
</script>

<style scoped>

</style>

