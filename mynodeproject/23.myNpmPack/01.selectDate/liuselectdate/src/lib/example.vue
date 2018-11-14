<template>
  <div class="wrapper">
    <input ref="input" @click="select" id="kick" v-model="inputDate" type="text" />
    <div class="layerout">
      <layer-html @sureDate="sureDate" :options="options" :showLay="showLay" @closeLay="closeLay"></layer-html>
    </div>
  </div>
</template>

<script>
  import LayerHtml from './layerExample.vue'

  export default{
    name:"liuselectdate",
    props:{
      options:{
        type:Object,
        default:function(){
          return {title:"选择日期"} ;
        }
      }
    },
    data(){
      return {
        inputDate:"请选择日期",
        layIndex:1,
        showLay:false
      }
    },
    created() {

    },
    methods:{
      select(){
        this.showLay = true ;
      },
      yesCallback(index, layero){//选择后的回调函数
          if (!this.dayHtml) {
              alert("请选择日期");
              return false;
          };
          if (!this.timeHtml) {
              alert("请选择时间");
              return false;
          };
          var rDate = new Date();
          var year = rDate.getFullYear();
          var data = year + "-" + this.dayHtml + " " + this.timeHtml;
          this.inputDate = data; // 设置input的value值
          _this.$layer.close(index);
      },
      openLayer(title, content, btn, area, yes){//公用弹框

      },
      closeLay(flag){
        this.showLay = flag;
      },
      sureDate(da){ // 弹出页面的确定按钮点击事件
      this.showLay = false;
        this.inputDate = da
      }

    },
    components:{
      LayerHtml
    }

  }
</script>

<style scoped>

</style>

