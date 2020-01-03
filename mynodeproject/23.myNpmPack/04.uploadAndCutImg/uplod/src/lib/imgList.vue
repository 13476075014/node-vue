<template>
  <div class="imgListOut">
    <!-- 展示图片 -->
    <div class="show">
      <draggable v-model="myImgList" @end="dragEnd" v-if="myImgList && myImgList.length">
        <div :key="index" class="cropper-close-box" v-for="(item,index) in myImgList">
          <img class="cropper-preview" :src="item" alt />
          <div v-if="showClose" class="close-tailoring close-goodsCarousel" @click="deleteImg(index)">×</div>
        </div>
      </draggable>
    </div>

    <!-- 添加图片 -->
    <div class="myUpload">
      <!-- 添加素材库图片 -->
      <el-button class="btnSelectImg" @click.stop="selectMaterial()" type="info" plain>素材库图片</el-button>

      <!-- 添加本地图片 -->
      <el-button class="btnSelectImg" @click.stop="selectCropper()" type="info" plain>本地图片</el-button>
    </div>

     <!-- 从素材库添加图片弹框 -->
    <el-dialog
      title="选择图片"
      :visible.sync="selectImgFromFile"
      width="80%"
      center
    >
      
    </el-dialog>      

  </div>
</template>

<script>

import draggable from "vuedraggable";
export default {
  props: {
    imgList: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      //是哪个类型的图片
      type: String,
      default: ""
    },
    maxImgLength:{
        //最大的图片数量够了就不能再传了
        type:Number,
        default:10
    },
    showClose:{
        // 是否展示删除图片的按钮
        type:Boolean,
        default(){
            return true
        }
    },
    indexKey:{ //一些特殊情况要传下标，例如在sku的图片里面要传下标
        type:Number,
        default(){
            return 0
        }
    }
  },
  data() {
    return {
      isComponent:true, //展示素材库确定选好了图片的按钮
      selectImgFromFile:false,
      myImgList: []
    };
  },
  created() {
    this.myImgList = this.imgList;
  },
  components: {
    draggable,
  },
  methods: {
    reload(list){//在没有刷新的时候强制刷新
        this.myImgList = list;
    },
    dragEnd(evt) {
      //轮播图拖动结束
      // console.log(this.imgList, 22, this.myImgList);
      this.$emit("dragEnd", { imgStr: this.myImgList, type: this.type });
    },
    /**删除某个图片 */
    deleteImg(index) {
        this.$emit("deleteListImg",{index:index,type:this.type})
    },
    /**触发添加本地图片事件 */
    selectCropper() {
      if(this.maxImgLength <=  this.myImgList.length){
          this.$message({
              type:'info',
              message:`最大上传${this.maxImgLength}张图片`
          })
          return false
      }
      this.$emit("selectCropper", this.type,this.indexKey);
    },
    /**从素材库选择图片 */
    selectMaterial(){
      this.selectImgFromFile = true
    },
    selectFromFile(data){ //素材库选中图片的回调函数 data是选中的图片数据
      this.$emit("selectCropper", this.type,this.indexKey,data[0]);
      this.$refs.materialManage.myGetList()
      this.selectImgFromFile = false
    }
  }
};
</script>


<style lang="scss" scoped>
.imgListOut {
  display: flex;
  .myUpload{
      display: flex;
      align-content: center;
      align-items: center;
      width:140px;
      min-width:140px;
      height:140px;
      flex-wrap: wrap;
      border:2px dashed rgb(222,222,222);
      justify-content: center;
     button{
       margin:0 5px;
         width:100px;
          padding:10px 5px!important;
         &:nth-of-type(2){
             margin-top:20px;
             margin-left:0;
         }
     }
  }
}
img.cropper-preview {
  width: 140px;
  height: auto;
  display: block;
  float: left;
  margin-right: 15px;
}
.cropper-close-box {
  display: inline-block;
  position: relative;
  .close-tailoring {
    position: absolute;
    top: -5px;
    right: 3px;
    background: #757575;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
  }
}
</style>
<style lang="scss">
.combination{
    img.cropper-preview {
        width: 40px;
        margin-right: 5px;
        }
}
</style>