<template>
  <div class="dealImg">
      <!-- 不需要剪裁，可以一次上传多张图片的 -->
    <img-list-element
      v-if="!needCropper"
      :maxImgLength="maxImgLength"
      :showClose="showClose"
      @successCropper="successCropper"
      :multiple="multiple"
      :fixGoodsImg="fixImgSize"
      @dragEnd="dragEnd"
      type="goodsThumb"
      :imgList="editImg"
      :uploadOptions="uploadOptions"
    ></img-list-element>

    <!-- 需要剪裁，一次只能上传一张 -->
    <img-list
      v-if="needCropper"
      :maxImgLength="maxImgLength"
      :showClose="showClose"
      @dragEnd="dragEnd"
      @selectCropper="selectCropperThumb"
      type="goodsThumb"
      :imgList="editImg"
    ></img-list>

     <!-- 图片剪裁插件 -->
    <my-cropper
      :isCanCropper="true"
      :cropperDefaultSrc="cropperDefaultSrc"
      :actType="actType"
      :goodsImgScale="fixImgSize"
      ref="cropperCommonTem"
      @closeCropper="closeCropper"
      @successCropper="successCropper"
    ></my-cropper>
  </div>
</template>

<script>
import imgListElement from './elementImg';
import imgList from './imgList';
import myCropper from './cropper';

export default {
  components:{
    imgListElement,
    imgList,
    myCropper
  },
  data() {
    return {
      canUseCropper:true
    };
  },
  computed:{
    editImg(){
      return [...this.imgListArr]
    }
  },
  props:{
      cropperDefaultSrc:{ //cropper的默认展示图片
        type:String,
        default:""
      },
      multiple:{ //是否支持一次上传多张图片
        type:Boolean,
        default:true
      },
      actType:{ //后台上传图片到oss需要根据不同的图片类型来创建不同的文件夹
        type:Number,
        default(){
            return 4
        }
      },
      maxImgLength:{ //最多可以上传的张数
          type:Number,
          default:2
      },
      needCropper:{ //是否需要剪裁
          type:Boolean,
          default:true
      },
      showClose:{ //展示删除图片的按钮
          type:Boolean,
          default:false
      },
      imgType:{ //设置当前这个插件用在上传那个图片类型上，当所有引用这个插件的事件回调名字都一样的时候，可以使用这个字段来区分
          type:String,
          default:"dealImg"
      },
      imgListArr:{ //需要展示的图片初始值
        type:Array,
        default(){
          return []
        }
      },
      fixImgSize:{ //限制的图片的大小尺寸，不符合的会报错
        type:Object,
        default(){
          return {
            width:200,height:200
          }
        }
      },
      uploadOptions:{ //上传图片到服务器的请求参数
        type:Object,
        default(){
          return {}
        }
      }

  },
  methods: {
    /**拖拽图片后的更改 */
    dragEnd(data) {
      const imgList = data.imgStr;
      const type = data.type;
      this.editImg[type] = imgList;
    },
    /**上传成功的事件 */
    successCropper(data, type, comIndex) {
      if (type && typeof type == "string") {
        this.cropperType = type;
      }
      switch (this.cropperType) {
        case "goodsThumb":
          this.editImg.push(data.imgStr)
          // this.$set(this.editImg.goodsThumb, "0", data.imgStr);
          break;
        case "carouselFigure":
          if (this.excced(this.editImg.carouselFigure, 5)) {
            this.editImg.carouselFigure.push(data.imgStr);
          }
          break;
        case "goodsDetailImage":
          if (this.excced(this.editImg.goodsDetailImage, 20)) {
            this.editImg.goodsDetailImage.push(data.imgStr);
          }
          break;
        case "combination":
          // var changeCom = this.goodsAttrValue[this.combinationIndex]
          var changeCom = this.goodsAttrValue[comIndex];
          changeCom.thumb = data.imgStr;
          //  this.$refs.combinationImgList[this.combinationIndex].reload([data.imgStr])
          this.$refs.combinationImgList[comIndex].reload([data.imgStr]);
          break;
      }
      this.canUseCropper = true;
    },
    /**选择上传商品图,打开cropper截图 */
    selectCropperThumb(type,index,img) {
      if(!this.canUseCropper){
        this.$message({
          type:'error',
          message:'Waiting for the last picture to complete before continuing!!'
        })
        return false
      }
      if(img && typeof img == "string"){//是从素材库选的图片这是图片地址
        this.cropperDefaultSrc = img
        this.$refs.cropperCommonTem.changeImg(img)
      }
      if(type == 'combination'){//获取要改变哪个规格的图片通过下标获取
        this.combinationIndex = index
      }
      // this.cropperTypeCase(type)
      this.$emit('cropperTypeCase',type) //对外暴露这个更改上传图片的type
      this.cropperType = type; // 'goodsThumb'
      this.goodsImgScale = this.$refs.cropperCommonTem.fixGoodsImg[type]; //更改上传的比例
      this.$refs.cropperCommonTem.OpenCropper();//打开裁剪图片的插件
      this.canUseCropper = false //能打开插件的开关
    },
    /**3.关闭弹框 */
     closeCropper(close){
      if(close && close == 'close'){
         this.canUseCropper = true //跳出的
      }
    },
  }
};
</script>

<style>
</style>