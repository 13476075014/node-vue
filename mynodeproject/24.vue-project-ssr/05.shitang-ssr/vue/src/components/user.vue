<template>
  <transition name="leftIn">
    <div class="user" v-if="show">
      <div v-if="showLoad" ref="loading" class="loading_out">
        <loading :title="loadTitle" class="loading"></loading>
      </div>
      <div class="top">
        <div class="topbg">

        </div>
        <div class="card">
          <div class="inner">
            <div>
              <img @click="updateImg" :src="items.HeadImg ? 'http://chenxiaoming.canteen.sundar.top:8060/' + items.HeadImg : require('../assets/imgs/bg7.jpg')" alt="">
              <p>{{items.Account}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <ul>
          <li @click="showMyMessage">
            <div class="left">
              <div class="fl">
                我的消息
              </div>
            </div>
            <div class="right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <li @click="showMyMessage2">
            <div class="left">
              <div class="fl">
                我的建议
              </div>
            </div>
            <div class="right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          <router-link to='/index/myrate'>
          <li>
            <div class="left">
              <div class="fl">
                我的点评
              </div>
            </div>
            <div class="right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
          </router-link>
           <li>
            <div class="left">
              <div class="fl">
                联系方式
              </div>
            </div>
            <div class="right">
              <span>{{items.Mobile}}</span>
              <!-- <i class="el-icon-arrow-right"></i> -->
            </div>
          </li>
        </ul>
        <div class="sub">
          <el-button type="primary" class="btn" @click="signout()">注销</el-button>
        </div>
      </div>
      <el-dialog
        title="上传头像"
        :append-to-body='appendToBody'
        style="text-align:center"
        :visible.sync="dialogVisible">

          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChange">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        <span slot="footer" class="dialog-footer text-center">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitImgForm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Loading from '@/base/loading'
import {clearUserToken} from '@/store/cache'

export default {
  data () {
    return {
      show: false,
      items: [],
      showLoad: false,
      loadTitle: '正在注销',
      dialogVisible: false,
      appendToBody: true,
      imageUrl: ''
    }
  },
  activated () {
    this.$emit('changtab', '3')
  },
  created () {
    this.init()
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  methods: {
    init () {
      this.$axios.get(`api/AppUser/GetUserInfo?CanteenToken=${this.userToken}`).then(res => {
        console.log(res)
        if (res.data.Code === 1) {
          this.setUserInfo(res.data.Data)
          this.items = res.data.Data
        }
      }).catch(res => {
        const me = res.response.data.Message
        if (!me.match('Token')) { // 如果是token不正确，就转到登录页面
          this.$alert('请求出错！！', {
            customClass: 'myConfirm'
          })
        }
      })
    },
    signout () { // 退出事件
      // this.$router.push('/login')
      this.showLoad = true
      if (this.userToken) {
        this.$axios({
          method: 'post',
          url: 'api/AppLogin/Logout?token=' + this.userToken
        }).then(res => {
          if (res.data.Code === 1) {
            setTimeout(() => {
              this.showLoad = false
              this.setUserToken(clearUserToken())
              this.$router.push('/login')
            }, 1000)
          } else {
            setTimeout(() => {
              this.showLoad = false
              console.log(res.data.Message)
              this.$router.push('/login')
            }, 1000)
          }
        }).catch(res => {
          this.showLoad = false
          this.$alert('请求错误', {
            customClass: 'myConfirm'
          })
          this.$router.push('/login')
        })
      } else {
        this.$router.push('/login')
      }
    },
    updateImg () { // 上传头像
      this.dialogVisible = true
    },
    handleChange (file, fileList) {
      this.files = file.raw
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    submitImgForm () {
      let myformData = new FormData()
      myformData.append('file', this.files)
      this.$axios.post(`api/AppUser/UpdateUserHeadImg?CanteenToken=${this.userToken}&isformdata=0`, myformData, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
        console.log(res)
        if (res.data.Code === 1) {
          this.dialogVisible = false
          this.$message({message: '上传成功', type: 'success'})
          this.init()
        }
      }).catch(res => {
        const me = res.response.data.Message
        if (me.match('Token')) { // 如果是token不正确，就转到登录页面
          this.$message({message: '登录过期，请重新登录，即将跳转到登录页面！！', duration: 2200})
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        } else {
          this.$alert('请求出错！！', {
            customClass: 'myConfirm'
          })
        }
      })
    },
    showMyMessage () {
      this.$alert('您还没有消息！！', {customClass: 'myConfirm'})
    },
    showMyMessage2 () {
      this.$alert('暂未开放！！', {customClass: 'myConfirm'})
    },
    ...mapMutations({
      'setUserToken': 'SET_USER_TOKEN',
      'setUserInfo': 'SET_USER_INFO'
    })
  },
  computed: {
    ...mapState(['userToken'])
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

a
  color $color-text-l
.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
.user
  position fixed
  top 45px
  bottom 60px
  left 0
  width 100%
  z-index 99
  background rgb(244,244,244)
  color $color-text-l
  .loading
    position absolute
    top 100px
    z-index 2
  .top
    position relative
    .topbg
      background $color-text-yellow
      height 80px;
    .card
      position absolute
      width 100%
      top 30px
      padding 10px 30px
      .inner
        padding 10px 15px
        background white
        display flex
        align-items center
        justify-content center
        border-radius 7px
        div
          text-align center
          color $color-text-ll
          font-size 14px
          img
            width 60px
            height 60px
            border-radius 100%
            margin-bottom 5px
  .content
    padding-top 70px
    .sub
      padding-top 30px
      text-align center
      .btn
        background $color-text-yellow
        color white
        border none
        line-height 25px
        padding 2px 40px
    ul
      background white
      margin-top 10px
      li
        display flex
        justify-content space-between
        line-height 25px
        padding 5px 15px
        border-bottom 1px solid rgb(244,244,244)
        .left
          overflow hidden
          .fl
            float left
            img
              margin-right 10px
              width 25px
              vertical-align middle
        .right
          span
            color $color-text-ll
            font-size 12px
.avatar-uploader-icon
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;

.avatar
  width: 178px;
  height: 178px;
  display: block;

</style>
