<template>
  <div id="camera">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
export default{
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      dealOptions:{
        targetWidth:this.options.targetWidth | 100,
        targetHeight:this.options.targetHeight | 100,
        quality: this.options.quality | 50 ,// 照片的质量0-100之间，默认是50
        destinationType:this.options.destinationType |  Camera.DestinationType.FILE_URI |  Camera.DestinationType.NATIVE_URI, // 设置相片的返回格式，默认是FILE_URI 是返回图片uri地址，用在android,NATIVE_URI是用在ios(有三个可选值：DATA_URL,是返回的base64的格式的图片字符串，官方不建议用，FILE_URL ,ANTIVE_URI)
        sourceType:this.options.sourceType | 1 ,//选择从哪里选图片，默认是1，调用相机拍照，并且，选用刚拍的图片；0是从手机图片选，2是从相机胶卷相册选
        allowEdit:this.options.allowEdit | false ,//是否可以编辑，默认是false不可以，
        encodingType:this.options.encodingType | 0, // 选择图片生成的后缀名，默认是0,就是JPEG,可选项 1 PNG
        mediaType:this.options.mediaType | 0 , // 设置能选择什么类型的，只能在sourceType没有选1的时候用，0是只能选图片是默认值，1是只能选视频，2是都可以。
        correctOrientation:this.options.correctOrientation | false, // 设置是否校正图片在旋转的时候，没有默认值。
        saveToPhotoAlbum:this.options.saveToPhotoAlbum | false , // 只能在sourceType是1的时候用，选择是否保存图片到相册，没有默认值
        cameraDirection:this.options.cameraDirection | 0 // 只能在sourceTyoe是1的时候用，选择调用前置还是后置摄像头，默认是0后置，可选1前置
      }
    }
  },
  methods: {
    cameraTakePicture () {
      const _this = this
      navigator.camera.getPicture(_this.onSuccess, _this.onFail, _this.dealOptions)
    },
    onSuccess(imageData){
      alert(imageData)
      let src = ""
      if(this.destinationType ===  Camera.DestinationType.DATA_URL){ // 设置的返回base64的格式
          src = 'data:/image/jpeg;base64,' + imgData
      }else{
        src = imageData
      }
      this.$emit("onSuccess",src)
    },
    onFail(message){
      alert("拍摄失败" + message)
    }
  }
}
</script>
