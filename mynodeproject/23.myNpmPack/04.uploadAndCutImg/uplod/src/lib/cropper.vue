<template>
  <div v-if="showCropper" class="cropperOut">
    <div class="cropperInner">
      <!-- 关闭按钮 -->
      <div id="close" class="close" @click="closeCropper('close')">关闭</div>
      <!-- 选择图片上传 -->
      <div class="inputImg">
        <label class="btn" for="imgFileInput">上传图片</label>
        <input id="imgFileInput" type="file" accept="image/*" @change="selectImg" />
      </div>

      <div class="mainContent">
        <!-- cropper区域 -->
        <div class="myCropper leftView">
          <img ref="myCropperImg" id="myCropperImg" src alt />
        </div>

        <!-- 右侧预览区域 -->
        <div class="rightView">
          <div class="preview-box-parcel">
            <p>preview</p>
            <div id="preview" class="square previewImg" />
          </div>
          <div class="sure">
            <button class="btn" @click="sureCut">confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>  

<script>
import $ from "jquery";
import "cropper/dist/cropper.css";
import cropper from "cropper";
// import { uploadImg ,getImgBase64} from "@/api/goods";
import draggable from "vuedraggable";

export default {
  props: {
    /**基本设置 */
    cropperOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    // 设置比例
    goodsImgScale: {
      type: Object,
      default() {
        return {
          width: 480,
          height: 240
        };
      }
    },
    actType:{
        type:Number,
        default(){
            return 4
        }
    },
    cropperDefaultSrc:{//默认展示的图片在素材库选中要用到
      type:String,
      default:''
    },
    isCanCropper:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      // 默认的设置
      defaultOPtions: {
        // minCropBoxWidth:200,
        viewMode: 1,
        preview: "#preview", // 预览视图
        guides: false, // 裁剪框的虚线(九宫格)
        autoCropArea: 1, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
        movable: false, // 是否允许移动图片
        dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        movable: true, // 是否允许移动剪裁框
        resizable: true, // 是否允许改变裁剪框的大小
        zoomable: true, // 是否允许缩放图片大小
        mouseWheelZoom: true, // 是否允许通过鼠标滚轮来缩放图片
        touchDragZoom: true, // 是否允许通过触摸移动来缩放图片
        rotatable: false, // 是否允许旋转图片
        crop: function(e) {}
      },
      showCropper: false,
      /**记录几种固有的图片比例 */
      fixGoodsImg: {
        goodsThumb: { width: 400, height: 400 },
        carouselFigure: { width: 600, height: 400 },
        goodsDetailImage: { width: 600, height: 600},
        combination: { width: 200, height: 200 }
      },
    };
  },
  created() {},
  mounted() {
    this.initThumb();
  },
  watch:{
    cropperDefaultSrc(newVal,oldVal){
      $("#myCropperImg").cropper("replace", newVal, false);
      // newVal = "https://lopscoop-image.oss-ap-southeast-1.aliyuncs.com/lopscoop/image/indexLopThum/2019/08/21/1566386435327546_indexLopThum.jpg"
    
    }
  },
  methods: {
    /**1.选择图片的事件 */
    selectImg: function(e) {
      var that = this;
      if (!e.target.files || !e.target.files[0]) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function(evt) {
        var replaceSrc = evt.target.result;
        const myCropperImgDom = that.$refs.myCropperImg;
        $("#myCropperImg").cropper("replace", replaceSrc, false); // 默认false，适应高度，不失真
      };
      reader.readAsDataURL(e.target.files[0]);
    },
    /**2.初始化 */
    initThumb: function() {
      debugger
      var previewId = "#preview";
      var bi = this.goodsImgScale.width / this.goodsImgScale.height;
      // if(this.actType==4){
      //    bi=NaN;
      // };
      if(!this.isCanCropper){//不允许剪裁图片，用上传的就行
        bi=NaN;
        this.defaultOPtions.resizable = false
        this.defaultOPtions.dragCrop = false
        this.defaultOPtions.movable = false
        this.defaultOPtions.zoomable = false
        this.defaultOPtions.mouseWheelZoom = false
        this.defaultOPtions.touchDragZoom = false
        this.defaultOPtions.cropBoxMovable = false
        this.defaultOPtions.cropBoxResizable = false
        this.defaultOPtions.scalable = false
        this.defaultOPtions.toggleDragModeOnDblclick = false
      }
      const setOptions = Object.assign(
        { aspectRatio:bi},
        this.defaultOPtions,
        this.cropperOptions
      );
      $("#myCropperImg").cropper(setOptions);
    },
    /**3.关闭弹框 */
    closeCropper(close) {
      $("#myCropperImg").cropper("reset");
      this.$emit('closeCropper',close)
      this.showCropper = false;
    },
    /**4.确认裁剪事件 */
    sureCut: function() {
      if ($("#myCropperImg").attr("src") == null) {
        return false;
      } else {
        debugger
        //校验当前的规格和需要的是否一致
        const getData = $("#myCropperImg").cropper("getData")
        if(this.goodsImgScale.width/this.goodsImgScale.height != getData.width/getData.height || this.goodsImgScale.width != getData.width){
          this.$message({
            message:'size error',
            type:'error'
          })
          return false
        }
        var cas = $("#myCropperImg").cropper("getCroppedCanvas", {
          width: this.goodsImgScale.width,
          height: this.goodsImgScale.height,
          fillColor: "#fff"
        });
        var base64url = cas.toDataURL("image/png"); // 转换为base64地址形式
        // 请求接口数据 返回的url 插入到对应的数组
        this.getImgUrl(base64url);
        // 关闭裁剪框
        this.closeCropper();
      }
    },
    /**5.上传图片 */
     getImgUrl: function(imgStr) {
      var that = this;
      // uploadImg({ actType: this.actType, imgStr: imgStr }).then(response => {
      //   if (response.code == "5200" && response.data.imgUrl) {
      //       that.$emit("successCropper", { imgStr: response.data.imgUrl });
      //       that.closeCropper();
      //   }
      // });
      var xhr = new XMLHttpRequest()
        xhr.open('post', 'http://192.168.1.5:11520/linkvaper-admin-api//upload_images', true)
        xhr.onload = function() {
          if (this.status === 200) {
            that.$emit("successCropper", { imgStr: response.data.imgUrl });
            that.closeCropper();
          }
        }
        xhr.send({actType: this.actType, imgStr: imgStr})
    },
    /**6.打开cropper */
    OpenCropper() {
      this.showCropper = true;
      this.$nextTick(() =>{
          this.initThumb();
      })
    },
    /**7.把一个地址的图片转换成base64的格式 */
    // convertImgToBase64(url){
    //   return Promise((resolve,reject) =>{
    //     getImgBase64(url).then(res => {
    //         var blob = res
    //         var fileReader = new FileReader()
    //         fileReader.onloadend = function(e) {
    //           var result = e.target.result
    //           resolve(result)
    //         }
    //         fileReader.readAsDataURL(blob)
    //     }).catch(res =>{
    //       reject(res)
    //     })
    //   })
      
    // },
    /**7.把一个地址的图片转换成base64的格式 */
    convertImgToBase64(url){
     return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.responseType = 'blob'
        xhr.onload = function() {
          if (this.status === 200) {
            var blob = this.response
            var fileReader = new FileReader()
            fileReader.onloadend = function(e) {
              var result = e.target.result
              resolve(result)
            }
            fileReader.readAsDataURL(blob)
          }
        }
        xhr.onerror = function() {
          reject()
        }
        xhr.send()
      })
    },
    changeImg(img){
      this.convertImgToBase64(img).then(res =>{
         $("#myCropperImg").cropper("replace", res, false);
      })
    }
   

  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.cropperOut {
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  z-index: 1999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  .cropperInner {
    position: relative;
    width: 80%;
    height: 600px;
    margin: 0 auto;
    transform: translateY(10%);
    background: white;
    border: 1px solid rgb(222, 222, 222);
    border-radius: 8px;
  }
  .inputImg {
    input {
      display: none;
    }
    label {
      margin-top: 5px;
      background: rgb(24, 144, 255);
      color: white;
      border-radius: 5px;
      margin-left: 20px;
    }
  }
  #close {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 10px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: rgb(222, 222, 222);
    color: white;
    border-radius: 100%;
    text-align: center;
  }
  .btn {
    display: inline-block;
    outline: none;
    resize: none;
    border: none;
    background: #1890ff;
    color: #fff;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
    line-height: 40px;
    width: 100px;
    text-align: center;
  }
}
.mainContent {
  display: flex;
  .leftView {
    flex: 1;
    overflow: hidden;
    height: 500px;
    margin: 20px;
    border: 1px solid rgb(222, 222, 222);
  }
  .rightView {
    flex-basis: 200px;
    #preview {
      margin: 10px 10px 10px 0;
      border: 1px solid rgb(222, 222, 222);
      min-width: 100px;
      min-height: 100px;
      overflow: hidden;
    }
  }
}
</style>

