<!-- 用elementui的upload插件上传图片的插件 -->

<template>
  <div class="imgListOut">
    <!-- 展示图片 -->
    <div class="show">
      <draggable v-model="myImgList" @end="dragEnd" v-if="myImgList && myImgList.length">
        <div :key="index" v-for="(item,index) in myImgList" class="cropper-close-box">
          <img :ref="'smallImg_new' + type + index " @mouseover="imgHover(item,'smallImg_new' + type + index)" @mouseout="imgMouseOut" class="cropper-preview" :src="item" alt />
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

    <el-upload
      v-show="false"
      ref="upload"
      action
      class="upload-demo"
      accept="image/*"
      :multiple="multiple"
      :auto-upload="false"
      :on-change="uploadChange"
      :on-remove="uploadRemove"
      list-type="picture"
    >
      <el-button ref="uploadBtn" size="small" type="primary"></el-button>
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>
     <!-- 从素材库添加图片弹框 -->
    <el-dialog
      title="选择图片"
      :visible.sync="selectImgFromFile"
      width="80%"
      center
    >
      <!-- <material-manage ref="materialManage" :isComponent="isComponent" @selectFromFile="selectFromFile"></material-manage> -->
    </el-dialog>      

   <!-- 查看大图 -->
    <div ref="bigImg" class="bigImg">
      <img :src="bigImg" style="width:400px;">
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name:"elementImg",
  props: {
    imgList: {
      type: Array,
      default() {
        return [];
      }
    },
    multiple:{
      type:Boolean,
      default:true
    },
    actType:{
        type:Number,
        default(){
            /*轮播图： 2 / 描述图： 4,
              缩略图： 3, / 用户头像: 5*/
            return 4
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
    },
    fixGoodsImg:{ //设置的尺寸的限制，如果不满足尺寸的不能上传,默认是没有限制
      type:Object,
      default:{
        width: false, height: false
      }
    },
    uploadOptions:{ //上传图片到服务器的请求参数
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      bigImg: '',
      isComponent:true, //展示素材库确定选好了图片的按钮
      selectImgFromFile:false,
      myImgList: [],
      fileList:[],
    };
  },
  created() {
    this.myImgList = this.imgList;
  },
  components: {
    draggable,
    // MaterialManage
  },
  methods: {
    reload(list){//在没有刷新的时候强制刷新
        this.myImgList = list;
    },
    dragEnd(evt) {
      //轮播图拖动结束
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
      this.$refs.uploadBtn.$el.click()
      // this.$emit("selectCropper", this.type,this.indexKey);
    },
    /**从素材库选择图片 */
    selectMaterial(){
      this.selectImgFromFile = true
    },
    selectFromFile(data){ //素材库选中图片的回调函数 data是选中的图片数据
      // this.$emit("selectCropper", this.type,this.indexKey,data[0]);
      const _this = this
      data.forEach((item,index) =>{
        var oImg=new Image();
            oImg.src=item;
            document.body.appendChild(oImg);
            oImg.onload=function(){
                var imgWidth=oImg.offsetWidth;
                var imgHeight=oImg.offsetHeight;
                document.body.removeChild(oImg);
                const fixgoodsImg = _this.fixGoodsImg[_this.type]
                if(fixgoodsImg.width != imgWidth || fixgoodsImg.height != imgHeight){
                  //尺寸不对需要提示错误
                  _this.$message({
                    type:"error",
                    message:"size error"
                  })
                }else{
                  //尺寸ok
                  _this.$emit("successCropper", { imgStr: item },_this.type);
                }

            };
      })
      this.$refs.materialManage.myGetList()
      this.selectImgFromFile = false
    },
    uploadRemove(file, fileList) {
      
    },
    uploadChange(file, fileList) {
      const _this = this
      if (file) {
          var reader = new FileReader()
          reader.readAsDataURL(file.raw) // 读出 base64
          reader.onloadend = function () {
              // console.log(reader)
              var oImg=new Image();
              oImg.src=this.result;
              oImg.style.opacity = "0"
              document.body.appendChild(oImg);
              oImg.onload=function(){
                  var imgWidth=oImg.offsetWidth;
                  var imgHeight=oImg.offsetHeight;
                  document.body.removeChild(oImg);
                  const fixgoodsImg = _this.fixGoodsImg
                  if(_this.type=="goodsDetailImage" && ((fixgoodsImg.width && fixgoodsImg.width != imgWidth) || (fixgoodsImg.height && fixgoodsImg.maxheight < imgHeight))){ //商品详情描述图不一样规则，是限定宽和最高的高度
                     //尺寸不对需要提示错误
                    _this.$message({
                      type:"error",
                      message:file.name + " size error"
                    })
                  }else if(_this.type!="goodsDetailImage" && ((fixgoodsImg.width && fixgoodsImg.width != imgWidth)  || (fixgoodsImg.height && fixgoodsImg.height != imgHeight))){
                    //尺寸不对需要提示错误
                    _this.$message({
                      type:"error",
                      message:file.name + " size error"
                    })
                  }else{
                    //尺寸ok
                    _this.getImgUrl(reader.result,_this.type,_this.indexKey)
                  }

              };
          }
      }
    },
    /**上传图片 */
     getImgUrl(imgStr,type,comIndex) {
      var that = this;
      let defaultOptions = {
        url: 'http://192.168.1.5:11520/linkvaper-admin-api/upload_images',
        method: 'post',
        data:{actType: this.actType, imgStr: imgStr},
        headers: { 'Content-Type': 'application/json' }
      }
      const options = Object.assign({},defaultOptions,that.uploadOptions)
      this.$req(options).then(response =>{
        response = response.data
        if (response.code == "5200" && response.data.imgUrl) {
          console.log(that,222)
          that.$emit("successCropper", { imgStr: response.data.imgUrl },type,comIndex);
        }
      })
    },
    imgHover(src, ref) { // 图片的hover放大事件
      this.bigImg = src
      if (this.$refs[ref]) {
        const leftOff = this.$refs[ref][0].getBoundingClientRect().left + this.$refs[ref][0].clientWidth + 15
        const topOff =  this.$refs[ref][0].getBoundingClientRect().top
        this.$refs.bigImg.style.left = leftOff + 'px'
        this.$refs.bigImg.style.top = topOff + 'px'
        this.$refs.bigImg.style.display = 'block'
      }
    },
    imgMouseOut() {
      if (this.$refs.bigImg) {
        this.$refs.bigImg.style.display = 'none'
      }
    },
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
  width: 60px;
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
.bigImg{
    display:none;
    position: fixed;
    z-index:9;
    left:400px;
    top:0;
    background:white;
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