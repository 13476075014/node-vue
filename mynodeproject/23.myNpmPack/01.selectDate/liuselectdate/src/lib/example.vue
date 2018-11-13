<template>
  <div class="wrapper">
    <input @click="select" id="kick" type="text" />
  </div>
</template>

<script>
  import  './jquery-1.9.0.js'
  import './select.js'

  export default{
    name:"example",
    created() {

    },
    methods:{
      select(){
        openTip({text:7,nowDate:da,maxLength:6,title:"选择时间"});
      }
    }
  }
</script>

<style lang="stylus" scoped>
ul{margin:0;padding:0;list-style: none;}
#outTip #ul_day li.active,#outTip #ul_time li.active{background:red;color:white;}
#outTip p{margin:0;padding:0;margin-bottom:10px;color:rgb(145,145,145);}
#outTip #ul_day{overflow: hidden;}
#outTip #ul_day li{cursor: pointer;float:left;width:calc((100% - 20px)/3);margin-right:10px;background:dodgerblue;color:white;margin-bottom:5px;text-align: center;}
#outTip #ul_day li:nth-of-type(3n){margin-right:0;}
#outTip #ul_time{overflow: hidden;}
#outTip #ul_time li{cursor: pointer;margin-bottom:5px;text-align: center;float:left;background:rgb(112,112,112);color:white;width:calc((100% - 30px)/4);margin-right:10px;}
#outTip #ul_time li:hover{background:red;color:white;}
#outTip #ul_time li:nth-of-type(4n){margin-right:0;}
#outTip #ul_time li.hasOld {
      background: rgb(213,213,213);
  }
</style>

