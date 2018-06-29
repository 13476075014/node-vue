<template>
  <div id="moregoods">
    <el-row>
      <el-col :span="18" :offset="3">
        <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{whatype}}</el-breadcrumb-item>
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
                      <template v-if="toptwo.title_left== '品牌'">
                          <el-checkbox-group v-model="checkList_brank">
                            <el-checkbox v-for="(chek,index8) in toptwo.title_top" :key="index8" :label="chek"></el-checkbox>
                          </el-checkbox-group>
                      </template>
                       <template v-if="toptwo.title_left== '护理类型'">
                          <el-checkbox-group v-model="checkList_careType">
                            <el-checkbox v-for="(chek,index8) in toptwo.title_top" :key="index8" :label="chek"></el-checkbox>
                          </el-checkbox-group>
                      </template>
                  </div>
                  <el-collapse-item :name="index7" style="padding:0 0 0 80px;">
                    <template v-if="toptwo.title_left == '品牌'">
                        <el-checkbox-group v-model="checkList_brank">
                          <el-checkbox v-for="(chek2,index9) in toptwo.title_top2" :key="index9" :label="chek2"></el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <template v-if="toptwo.title_left == '护理类型'">
                        <el-checkbox-group v-model="checkList_careType">
                          <el-checkbox v-for="(chek2,index9) in toptwo.title_top2" :key="index9" :label="chek2"></el-checkbox>
                        </el-checkbox-group>
                    </template>
                  </el-collapse-item>
                </div>
                <!-- 筛选的点击事件 -->
                <div style="text-align:left;margin:10px 0;">
                  <el-button size="mini" @click="toselect">确定筛选</el-button>
                </div>
              </el-collapse>

          </div>
          <!-- 折叠效果的商品筛选结束 -->

          <!-- 商品展示的页面 -->
          <goodsdetail
            :detail2="goodslist"
            :currentPage="currentPage"
            :page_sizes="page_sizes"
            :total="total"
            @addCar="addCar"
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
          whatype:"热门商品",
          currentPage:1, //当前页
          total:12, //总共的商品数
          page_sizes:[6], //每页显示的条数
          activeNames: ['1'],
          checkList_brank: [], //选中的品牌筛选条件
          checkList_careType: [],
          top2_date:[ //筛选的条件
              {title_left:"品牌",title_top:["欧莱雅","ysl","迪奥"],title_top2:["欧莱雅","ysl","迪奥","欧莱雅","ysl","迪奥"]},
              {title_left:"护理类型",title_top:["面部护理","身体护理","脚步护理","香水彩妆"]}
          ],
          goodslist:[//商品的各个信息
            {src:"../../static/images/goods1.png",goodsDescribe:"这里是对这个商品；",newPrice:"￥257",stock:999},
            {src:"../../static/images/goods1.png",goodsDescribe:"daldjlada",newPrice:"￥257",stock:999}
          ],
          typePost:{
            "化妆品":"ModelMakeUp",
            "热门商品":"HotGoods"
          }
     }
    },
    components:{
        goodsdetail
    },
    created:function(){
       this. getData({});

       //获取cookie的方法
       //var nn = this.$cookies.get("makeupGoods_list");
       //nn = JSON.parse(nn)
    },
    methods: {
      handleChange(val) {
        //console.log(val);
      },
      getData(condition){
        var _this = this;
         var whatypes = this.$route.query.type ?this.$route.query.type:"化妆品"; //获取到地址栏里面的现在详细页打开的类型
         this.whatype = whatypes;
         var url ="/" + this.typePost[whatypes] + "/findSome";
         var condition = condition;
         var show = {'img':1,'_id':1,'originPrice':1,'newPrice':1,'goodsDescribe':1}
        this.$reqs.post(url,{condition:condition,show:show}).then(function(result){
          if(result.data != null){
              _this.total = result.data.length;
              _this.goodslist = result.data;

              //设置cookie的方法
              var k = JSON.stringify(result.data);
              _this.$cookies.set("makeupGoods_list",k,"1d"); //把这个数据存在cookie中，如果，这个数据是从表makeup中来的；
          }
        });
      },
      handleCk(val){
          this.currentPage = val;
      },
      toselect(){//筛选的按钮
        var brand = "";
        this.checkList_brank.forEach(el => {
            brand += (" " + el);
        });
        var type = "";
        this.checkList_careType.forEach(el => {
            type += (" " + el);
        });
         var condition = {};
         if(brand == "" && type != ""){
           condition = {careType:type}
         }else if(brand != "" && type == ""){
           condition = {brand:brand}
         }else if(brand != "" && type != ""){
           condition={brand:brand,careType:type}
         };

        this.getData(condition);
      },
      addCar(id){
         var _this = this;
          var collection = {goodsID:id,tableName:_this.typePost[_this.whatype]}
          console.log(collection.tableName);
         // console.log(_this.typePost["化妆品"]);
          _this.$reqs.post("/shopCar/add",{collection:collection}).then(function(result){
              console.log(result)
          }).catch(function(e){
              console.log("goods_detail.vue报错：" + e);
          })
      }
    }

  }
</script>



<style scoped="scoped">
.top2 .item{position:relative;border:1px solid rgb(247,247,247);}
.top2 .title_left{line-height: 49px;position: absolute;left:0;top:0px;background:rgb(247,247,247);width:70px;text-align: left;height:100%;padding-left:5px;}
.title_top{position:absolute;left:80px;top:0px;line-height: 49px;}



</style>

