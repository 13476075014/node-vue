<template>
<transition name="leftIn">
  <div class="suggest" v-if="show">
    <div class="top">
      <div class="inner">
        <p>吐槽建议</p>
        <p class="line">
          <span class="left"></span>
          <i class="dot"></i>
          <span class="right"></span>
        </p>
        <p class="tip">健康饮食</p>
      </div>
    </div>
    <div class="content">
      <loading v-if="showLoading" class="loading"></loading>
       <pull @onPullingDown="onPullingDown" :pullUpLoad="pullUpLoad" :items="items" class="pull">
        <ul>
          <li v-for="(item,index) in items" :key="index">
            <div class="left">
              <img :src="require('../assets/imgs/bg12.jpg')" alt="">
            </div>
            <div class="right">
              <p class="user">{{item.UserName}}</p>
              <p>{{item.SuggestMsg}}</p>
              <div class="foodImg">
                <img v-for="(img,index2) in item.Images" @click="showImg(img)" :key="index2" :src="img" alt="">
              </div>
              <div class="desc">
                <div class="fl">
                </div>
                <div class="fr">
                  <div>2018.10.29</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
       </pull>
       <div>
         <el-button @click="showDialog" class="btnsub" type="primary">提交建议</el-button>
       </div>
    </div>
    <el-dialog
    title="填写建议"
    :append-to-body='appendToBody'
    style="text-align:center"
    :show-close="showClose"
    :visible.sync="dialogVisible">
    <el-form status-icon class="demo-ruleForm formSuggest" :rules="SuggestRules" ref="rateForm" :model="SuggestForm" label-width="70px">
       <el-form-item prop="IsAnonymous" label="是否匿名">
        <template>
          <el-radio v-model="SuggestForm.IsAnonymous" label="1">是</el-radio>
          <el-radio v-model="SuggestForm.IsAnonymous" label="2">否</el-radio>
        </template>
      </el-form-item>
      <el-form-item prop="SuggestMsg" label="建议内容">
       <el-input type="textarea" placeholder="请填写建议内容" rows="5" v-model="SuggestForm.SuggestMsg"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:5px;" prop="foodImg" label="上传图片">
       <el-upload
        v-model="SuggestForm.foodImg"
        ref="myfile"
        name="myfile"
        class="upload-demo"
        action=""
        :auto-upload="false"
        :on-remove="handleRemove"
        :on-change="handleChange"
        multiple
        :limit="2"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary" plain>点击上传</el-button>
      </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer text-center">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitFormRate('rateForm')">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</transition>
</template>

<script>
import pull from '@/base/scrollupAndDown'
import {mapState} from 'vuex'
import Loading from '@/base/loading'

export default {
  data () {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    return {
      showLoading: true,
      pullUpLoad: false,
      appendToBody: true,
      items: [],
      showClose: false,
      dialogVisible: false,
      myfiles: [],
      SuggestForm: {IsAnonymous: '1', SuggestMsg: '', foodImg: ''},
      SuggestRules: {SuggestMsg: [{ validator: check, trigger: 'blur' }]},
      fileList: [],
      show: {
        type: Boolean,
        default: false
      }
    }
  },
  created () {
    this.$emit('changtab', '2')
    this.init()
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    onPullingDown () {
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    init () {
      this.$axios.get(`api/Suggest/GetSuggestAll?CanteenToken=${this.userToken}`).then(res => {
        console.log(res)
        if (res.data.Code === 1) {
          this.items = res.data.Data
          this.showLoading = false
        }
      }).catch(res => {
        // console.log(res.response)
        const me = res.response.data.Message
        if (!me.match('Token')) { // 如果是token不正确，就转到登录页面
          this.$alert('请求出错！！', {
            customClass: 'myConfirm'
          })
        }
      })
    },
    submitFormRate (form) { /* IsAnonymous:是否匿名； SuggestMsg：建议内容 */
      this.$refs[form].validate((valid) => {
        if (valid) {
          /* eslint-disable standard/object-curly-even-spacing */
          let IsAnonymous = (this.SuggestForm.IsAnonymous === '1')
          if (IsAnonymous) {
            IsAnonymous = true
          } else {
            IsAnonymous = false
          }
          if (!this.myfiles) {
            this.$alert('请上传图片', {customClass: 'myConfirm'})
            return false
          }
          let myFormData = new FormData()
          for (var i = 0; i < this.myfiles.length; i++) {
            // console.log(this.myfiles[i])
            myFormData.append('file', this.myfiles[i].raw)
          }
          this.$axios.post(`api/Suggest/Add?CanteenToken=${this.userToken}&SuggestMsg=${this.SuggestForm.SuggestMsg}&IsAnonymous=${IsAnonymous}&isformdata=0`, myFormData, {headers: {
            'Content-Type': 'multipart/form-data'
          }}).then(res => {
            // console.log(res)
            if (res.data.Code === 1) {
              this.$message({message: '成功', type: 'success'})
              this.init()
            } else {
              this.$message({message: `失败：${res.data.Message}`, type: 'error'})
            }
            this.dialogVisible = false
          }).catch(res => {
            this.$refs[form].resetFields()
            this.$message({message: `失败：${res.response.data.Message}`, type: 'error'})
          })
        } else {
          this.$refs[form].resetFields()
          console.log('error submit!!')
          return false
        }
      })
    },
    showDialog () {
      this.dialogVisible = true
    },
    handleRemove (file, fileList) { // 删除上传图片的钩子函数
      // console.log(fileList)
      this.myfiles.findIndex((item, index) => {
        if (item === file) {
          this.myfiles.splice(index, 1)
          console.log(this.myfiles)
        }
        return item === file
      })
    },
    handleExceed (file, fileList) { // 当上传的图片大于我们设置的limit时的钩子函数
      this.$alert('最多只能上传两张，请重新选择！！', {customClass: 'myConfirm'})
    },
    handleChange (file, fileList) {
      this.myfiles.push(file)
    },
    showImg (img) {
      this.$alert(`<div style="text-align:center;"><img style="width:90%;" src="${img}" /></div>`, {dangerouslyUseHTMLString: true, customClass: 'myConfirm'})
    }

  },
  components: {
    pull,
    Loading
  },
  computed: {
    ...mapState(['userToken'])
  }

}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
.suggest
  position fixed
  top 45px
  bottom 60px
  left 0
  width 100%
  z-index 99
  background rgb(244,244,244)
  color $color-text-l
  text-align center
  .top
    padding 30px 0
    background url('../assets/imgs/bg14.jpg') center no-repeat
    background-size cover
    .inner
      padding 10px 0
      background rgba(255,255,255,0.8)
      .line
        display flex
        align-items center
        justify-content center
        padding 5px 0
        .left,.right
          display inline-block
          height 2px
          background rgb(214,214,214)
          width 80px
        .dot
          display block
          width 5px
          height 5px
          background rgb(114,114,114)
          border-radius 100%
          margin 0 15px
      .tip
        font-size 12px
        color rgb(188,188,188)
  .content
    position absolute
    top 110px
    bottom 40px
    width 100%
    .loading
      position absolute
      top 100px
      z-index 2
    .pull
      ul
        margin 0 auto
        width 90%
        padding-bottom 0px
        li
          display flex
          align-items flex-start
          background white
          margin-bottom 10px
          padding 10px
          border-radius 7px
          .left
            flex 0 0 68px
            text-align left
            img
              width 50px
              height 50px
              border-radius 100%
          .right
            flex 1
            text-align left
            color $color-text-ll
            font-size 14px
            line-height 20px
            .user
              color $color-text-l
              line-height 30px
              font-weight 600
              font-size 16px
            .foodImg
              padding-top 10px
              img
                width 25%
                height 30px
                margin-right 5px
            .desc
              text-align right
              font-size 12px
    .btnsub
      background $color-text-yellow
      color white
      border none
      line-height 25px
      margin-top 5px
      padding 2px 40px
.showUpladImg
  padding-left 70px
  text-align left
  img
    width 40px
    max-height 30px
</style>
