<template>
  <transition name="layer">
    <div id="wrapper" v-if="showLay">
      <div class="layerExample" id="outTip">
        <div class="title">选择日期</div>
        <div class="close" @click="close">
          <i class="iconfont  icon-LC_icon_close_circle_line"></i>
        </div>
        <div class="content">
          <p>请选择日期：</p>
            <ul ref="ul_day" id="ul_day" class="inner_day">
              <li ref="ul_day_li" :class="{'active':index == dayActive}" :key="index" v-for="(item,index) in  fillday" @click="selectDayActive(index)">{{item.month + '-' + item.day}}</li>
            </ul>
            <p>请选择时间：</p>
            <ul id="ul_time" class="inner">
              <li ref="ul_time_li" v-for="(item,index) in filltime" @click="index >= disableMax ? selectTimeActive(index): ''" :key="index" :class="{'active':index == timeActive,'hasOld': disableMax > index}">{{item.hour + ':' + item.miu}}</li>
            </ul>
        </div>
        <div class="btn-out">
          <button @click="submit">确定</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default{
    data(){
      return {
        filltime:[{hour:'07',miu:'30'}],
        fillday:[{day:"13",month:"11"}], // 填充天的数据
        hour:this.options.hour || 7, // 填充时间是从几点开始
        startDay:this.options.startDay || new Date, // 开始的日期
        maxLength:this.options.maxLength || 6, // 共渲染几天
        dayActive:-1,  // 改变天active的class在那个元素上
        disableMax:9,
        origindisableMax:9,
        timeActive:-1
      }
    },
    props:{
      options:{
        type:Object,
        default:function(){return {}}
      },
      showLay:{
        type:Boolean,
        default:false
      }
    },
    created(){
      this.fillTime(this.hour);
      this.fillDay(this.startDay, this.maxLength)
    },
    methods:{
       selectDayActive(index) { // 选择天
          var day = new Date().getDate();
          day = day * 1;
          var text = this.$refs.ul_day_li[index].innerHTML;
          text = text.slice(3);
          this.timeActive = -1;
          if (text == day) {
              this.disableMax = this.origindisableMax
          } else {
              this.disableMax = 0;
          };
          this.dayActive = index ;
      },
      selectTimeActive(index) {
         this.timeActive = index;
      },
      submit(){
        var month = this.$refs.ul_day_li[this.dayActive].innerHTML;
        var time = this.$refs.ul_time_li[this.timeActive].innerHTML;
        var year = this.startDay.getFullYear();
        var da =year + " " + month + " " + time;
        this.$emit("sureDate",da);
      },
      fillTime(text) { //填充渲染时间元素的函数 // text是从几点开始
        var noeHour = new Date().getHours();
        var nowMinu = new Date().getMinutes();
        var arr = [];
        var max = 0;
        for (var i = 0; i < 28; i++) {
            text = (i + 1) % 2 == 0 ? ++text : text;
             if (noeHour > text) {
                  max = max + 1;
              } else if (noeHour == text && nowMinu >= ((i + 1) % 2 == 0 ? '00' : 30)) {
                  max = max + 1;
              };
            arr.push({hour:(text < 10 ? '0' + text : text) , miu:((i + 1) % 2 == 0 ? '00' : 30)});
        };
        this.disableMax = max;
        this.origindisableMax = max;
        this.filltime = arr;
      },
      fillDay(nowDate, maxLength){// nowDate: 是起始日期;  maxLength:是渲染从起始日期的后几天一共
            if (nowDate.getDate() < new Date().getDate()) {
                return false;
            };
            var dada = new Date(nowDate);
            var arr = [];
            for (var i = 0; i < maxLength; i++) {
                if (i != 0) {
                    dada.setDate(dada.getDate() + 1); // 循环加1天
                };
                var month = dada.getMonth() + 1;
                if (month < 10) { month = "0" + month; };
                var date = dada.getDate();
                if (date < 10) { date = "0" + date; };
                arr.push({day:date,month:month})
            };
            this.fillday = arr ;
      },
      close(){
        this.$emit("closeLay",false)
      }
    }


  }
</script>

<style>
.layer-enter-active,.layer-leave-active{
  transition:all linear 0.4s;
}
.layer-enter,.layer-leave-to{
  opacity: 0;
}
#wrapper{
  background:rgba(0,0,0,0.8);
  width:100%;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
}
.close{border-radius: 50%;background:black;float:right;position:relative;top:-38px;margin-right:-5px;color:white;width:16px;height:16px;;font-weight: bold}
#outTip{
  position:absolute;
  width:80%;
  left:10%;
  top:50%;
  transform: translateY(-50%);
  background:white;
  box-sizing: border-box;
  padding-bottom:20px;
}
#outTip .content{padding:10px;}
#outTip .title{text-align: left;background:dodgerblue;color:white;line-height:30px;padding-left:10px;}
.btn-out{padding-top:5px;}
.btn-out button{border:none;line-height: 30px;background:dodgerblue;color:white;padding:0 15px;border-radius: 5px;}
ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        #outTip #ul_day li.active,
        #outTip #ul_time li.active {
            background: red;
            color: white;
        }

        #outTip p {
            margin: 0;
            padding: 0;
            margin-bottom: 10px;
            color: rgb(145, 145, 145);
        }

        #outTip #ul_day {
            overflow: hidden;
        }

        #outTip #ul_day li {
            cursor: pointer;
            float: left;
            width: calc((100% - 20px)/3);
            margin-right: 10px;
            background: dodgerblue;
            color: white;
            margin-bottom: 5px;
            text-align: center;
        }

        #outTip #ul_day li:nth-of-type(3n) {
            margin-right: 0;
        }

        #outTip #ul_time {
            overflow: hidden;
        }

        #outTip #ul_time li {
            cursor: pointer;
            margin-bottom: 5px;
            text-align: center;
            float: left;
            background: rgb(112, 112, 112);
            color: white;
            width: calc((100% - 30px)/4);
            margin-right: 10px;
        }

        #outTip #ul_time li:hover {
            background: red;
            color: white;
        }

        #outTip #ul_time li:nth-of-type(4n) {
            margin-right: 0;
        }

        #outTip #ul_time li.hasOld {
            background: rgb(213, 213, 213);
        }
        .content p{text-align: left;}
</style>

