<!-- 这个是公用的头部的组件 -->

<template>
  <div id="headone">
      <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo item"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-submenu class="head_item" index="1">
        <template slot="title">网站导航</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
          <el-menu-item index="1-4-2">选项2</el-menu-item>
          <el-menu-item index="1-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu class="head_item" index="2">
        <template slot="title">客户服务</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item class="item" index="3">
        <div class="block head_block">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </div>
      </el-menu-item>

      <el-menu-item class="item" index="4" style="float:right;"><a href="https://www.ele.me" target="_blank">在线帮助</a></el-menu-item>
      <el-menu-item class="item" index="5" style="float:right;"><a href="https://www.ele.me" target="_blank">购物车</a></el-menu-item>
      <el-menu-item class="item" index="6" style="float:right;"><a href="https://www.ele.me" target="_blank">我的订单</a></el-menu-item>
      <el-menu-item class="item" index="7" style="float:right;"><a href="https://www.ele.me" target="_blank">晓月会员</a></el-menu-item>
      <el-menu-item class="item" index="8" style="float:right;"><a href="https://www.ele.me" target="_blank">注册有礼</a></el-menu-item>
      <el-menu-item class="item" index="9" style="float:right;"><a href="https://www.ele.me" target="_blank">请登录</a></el-menu-item>
    </el-menu>

    <div id="top2" style="text-align:left;">
         <el-row style="margin-top:10px;">
          <el-col :offset="2" :span="5">
            <a href="">
                <img src="../assets/images/login_01.png" alt="">
            </a>
          </el-col>

          <el-col :span="10">
               <el-input style="" placeholder="请输入内容" v-model="input_search" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <p style="font-size:12px;">
                  <span>热门搜索：</span> 兰蔻
              </p>
          </el-col>


           <el-col :span="5" style="text-align:right;">
              <img src="../assets/images/login_02.png" alt="">
          </el-col>
           <el-col>

          </el-col>
        </el-row>
    </div>

  </div>
</template>

<script>
import city from '../assets/js/city.js'

export default {
  name:"oneHead",  //这个命名注意不要和一些内置的名重复尽量，不然会报错  "vue.esm.js?efeb:591 [Vue warn]: Do not use built-in or reserved HTML elements as component id: head"
   data() {
      return {
          activeIndex2: '1',
          options:city,
          selectedOptions2:[],
          input_search:""
      };
    },
    created:function(){
        //console.log(city);
    },
    methods: {
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleChange(value) {
        console.log(value);
      }
    }
}
</script>

<style scoped>
    .item{height:40px!important;line-height: 40px!important;}
    .block{background:none;}
</style>


