<!-- 这个是公用的头部的组件 -->

<template>
  <div id="headone">
      <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo item head1"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu class="head_item" index="1">
        <template slot="title">网站导航</template>
        <el-menu-item index="1-1"> <a class="map" href="#hot">热门商品</a> </el-menu-item>
        <el-menu-item index="1-2"><a class="map" href="#new">最新商品</a></el-menu-item>
        <el-menu-item index="1-3"><a class="map" href="#beauty">化妆品</a></el-menu-item>
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

      <el-menu-item class="item" index="4" style="float:right;">
        <router-link to="{path:'/'}" target="_blank">
            在线帮助
        </router-link>
      </el-menu-item>
      <el-menu-item class="item" index="5" style="float:right;">
        <router-link to="{path:'/'}" target="_blank">
            购物车
        </router-link>
      </el-menu-item>
      <el-menu-item class="item" index="6" style="float:right;">
        <router-link to="{path:'/'}" target="_blank">
            我的订单
        </router-link>
      </el-menu-item>
      <el-menu-item class="item" index="7" style="float:right;">
        <router-link to="{path:'/'}" target="_blank">
            晓月会员
        </router-link>
      </el-menu-item>
      <el-menu-item class="item" index="8" style="float:right;">
        <router-link :to="{name:'register'}" target="_blank">
            注册有礼
        </router-link>
      </el-menu-item>
      <el-menu-item class="item" index="9" style="float:right;">
        <router-link :to="{path:'/'}" target="_blank">
            请登录
        </router-link>
      </el-menu-item>
    </el-menu>

    <div id="top2" style="text-align:left;padding-top:45px;">
         <el-row style="margin-top:10px;">
          <el-col :offset="3" :span="5">
            <a href="#/index_one">
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


           <el-col :span="3" style="text-align:right;">
              <img src="../assets/images/login_02.png" alt="">
          </el-col>
           <el-col>

          </el-col>
        </el-row>
    </div>

     <!-- 头部3 -->
      <div id="top3" style="background:rgb(219,219,219);line-height:40px;text-align:left;">
        <el-row>
          <el-col :offset="3">
              <el-dropdown trigger="click" style="padding:0 35px;" v-for="(i,index) in drop" :key="index" :class="{'drop_active':index == active_index}" id="clickMe">
                <span class="el-dropdown-link" style="cursor:pointer;" @click="changetab(index)">
                  {{i.main}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div  v-for="(de,index2) in i.detail" :key="index2">
                      <el-dropdown-item>{{de.top}}</el-dropdown-item>
                      <el-dropdown-item>
                          <div style="max-width:150px;">
                            <span v-for="(ii,index3) in de.bottom" :key="index3">{{ii}} /</span>
                          </div>
                      </el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
        </el-row>
    </div>  <!-- 头部3结束 -->

  </div>
</template>

<script>
import city from '../assets/js/city.js'

export default {
  name:"oneHead",  //这个命名注意不要和一些内置的名重复尽量，不然会报错  "vue.esm.js?efeb:591 [Vue warn]: Do not use built-in or reserved HTML elements as component id: head"
   data() {
      return {
          activeIndex2: '1',
           active_index:0,
          options:city,
          selectedOptions2:[],
          input_search:"",
          drop:[ //头部3
              {main:"全部商品分类",detail:[{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]},{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]}]},
              {main:"化妆品",detail:[{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]},{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]}]},
              {main:"护肤品",detail:[{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]},{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]}]},
              {main:"沐浴用品",detail:[{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]},{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]}]},
              {main:"海外尖货",detail:[{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]},{top:"化妆品",bottom:["口红","眼霜","面霜","口红","眼霜","面霜"]}]}

            ]
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
      },
      changetab:function(ins){
              this.active_index = ins;
        }
    }
}
</script>

<style scoped>
    .item{height:40px!important;line-height: 40px!important;}
    .head1{position: fixed;top:0;left:0;width:100%;z-index:2005;}
    .block{background:none;}
    .drop_active{background:rgb(251,114,142);color:white;}
    a.map{color:white!important;}
</style>


