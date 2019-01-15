<template>
<transition name="leftIn">
    <div class="foodDetail" v-if="show">
      <no-result v-if="showNoResult" title="暂时没有上传图片"></no-result>
      <scroll :data="results">
        <div class="scrollInner">
          <ul class="innerDetail">
            <li>
              <img v-if="items.ImageUrl" :src="'http://212.64.74.12/' + items.ImageUrl" alt="找不到图片">
            </li>
            <li class="count">
              <p class="flex">
                <span class="tip">得分：</span>
                <span>
                {{items.AvgStar}} {{items.AvgStar === '5.00' ? '（100%好评）' : ''}}
                </span>
                <i v-if="items.IsRecommend" class="iconfont recommend">&#xe62a;</i>
                <i v-if="items.IsGood" class="iconfont recommend">&#xe668;</i>
              </p>
            </li>
            <li>
              <p class="flex desc">
                <span class="tip">描述：</span>
                <span>{{items.Describe}}</span>
              </p>
            </li>
          </ul>
          <div class="flex topComment">
            <span>精选评价</span>
            <span @click="openComment">写评价</span>
          </div>
          <ul v-if="comments.length > 0" class="commentDetail">
            <li v-for="(item,index) in comments" :key="index">
              <div class="flex">
                <div class="img">
                  <img :src="item.HeadImg ? item.HeadImg : require('../assets/imgs/bg7.jpg')" alt="">
                </div>
                <div class="right">
                  <div class="top">
                    <span>{{item.UserName}}</span>
                    <span class="zan"><i @click="like(item,index)" class="iconfont">&#xe62b;</i>{{item.LikesCount}}</span>
                  </div>
                  <p>
                    {{item.CommentMsg}}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
      <el-dialog
        title="填写评价"
        style="text-align:center"
        :append-to-body='appendToBody'
        :show-close="showClose"
        :visible.sync="dialogVisible">
        <el-form status-icon class="demo-ruleForm" :rules="rateRules" ref="rateForm" :model="rateForm" label-width="0px">
          <el-form-item prop="Content">
            <el-input type="textarea" placeholder="请填写评价" rows="6" v-model="rateForm.Content"></el-input>
          </el-form-item>
          <el-form-item prop="star" label="对菜单评分：" label-width="100px">
            <el-rate
              style="height:auto;padding-top:11px;"
              class="star"
              v-model="rateForm.star">
            </el-rate>
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
import Scroll from '@/base/scroll' // 封装的scroll
import noResult from '@/base/no-result'
import {mapState} from 'vuex'

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
      show: {
        type: Boolean,
        default: false
      },
      showClose: false,
      dialogVisible: false,
      appendToBody: true,
      results: [],
      comments: [],
      items: {},
      showNoResult: false,
      rateForm: {Content: '', star: 0},
      rateRules: {
        Content: [
          { validator: check, trigger: 'blur' }
        ],
        star: [
          { validator: check, trigger: 'blur' }
        ],
        productID: [
          { validator: check, trigger: 'blur' }
        ]
      }

    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 20)
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      if (!this.$route.params.Id) {
        this.$router.push('/index')
        return false
      }
      this.getComment()
      this.$axios.get(`api/APPProduct/GetProductDetail?CanteenToken=${this.userToken}`, {params: {ProductID: this.$route.params.Id}}).then(res => {
        if (res.data.Code === 1) {
          this.items = res.data.Data
          this.results = [this.items]
        } else {
          this.showNoResult = true
        }
        console.log(res)
      }).catch(res => {
        this.showNoResult = true
      })
    },
    getComment (stop, index) {
      this.$axios.get(`api/APPProduct/GetSingleProductList?CanteenToken=${this.userToken}`, {params: {ProductID: this.$route.params.Id}}).then(res => {
        console.log(res)
        if (res.data.Code === 1) {
          if (stop === 'stop') {
            res.data.Data[index].hasClick = true
          }
          this.comments = res.data.Data
        }
      })
    },
    like (item, index) {
      if (item.hasClick) {
        this.$message({message: '已经点过赞了', customClass: 'myConfirm'})
        return false
      }
      this.$axios.post(`api/APPProduct/LikeComment?CanteenToken=${this.userToken}&CommentID=${item.CommentID}`).then(res => {
        // console.log(res)
        if (res.data.Code === 1) {
          this.getComment('stop', index)
        }
      })
    },
    openComment () {
      this.dialogVisible = true
    },
    submitFormRate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证成功
          this.$axios({
            method: 'get',
            url: `api/APPProduct/CommentProduct?productID=${this.$route.params.Id}&star=${this.rateForm.star}&Content=${this.rateForm.Content}&CanteenToken=${this.userToken}`
          }).then(res => {
            // console.log(res)
            if (res.data.Code === 1) { // 验证成功
              this.$message({message: '操作成功', type: 'success'})
              this.dialogVisible = false
              this.getComment()
            } else {
              this.$message({message: res.data.Message, type: 'error'})
              this.dialogVisible = false
            }
            this.$refs['rateForm'].resetFields()
          }).catch(res => {
            const me = res.response.data.Message
            const str = 'Token'
            if (!me.match(str)) { // 如果是token不正确，就转到登录页面
              this.$refs['rateForm'].resetFields()
              this.$alert('请求出错！！', {
                customClass: 'myConfirm'
              })
            }
          })
        } else {
          this.$refs['rateForm'].resetFields()
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    ...mapState(['userToken'])
  },
  components: {
    Scroll,
    noResult
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/styl/mixin'

.leftIn-enter-active
  transition all linear .2s
.leftIn-enter,.leftIn-leave-to
  transform translateX(100%)
.foodDetail
  position fixed
  top 45px
  bottom 60px
  left 0
  width 100%
  z-index 99
  background rgb(244,244,244)
  color $color-text-l
  text-align center
  overflow hidden
  .scrollInner
    min-height calc(100vh + 30px)
  .flex
    display flex
  img
    width 100%
  .innerDetail
    li
      padding 10px
      color $color-text-l
      text-align left
      font-size 14px
      &.count
        line-height 20px
        color $color-text-ll
        i
          color red
          font-size 25px
      .flex
        display flex
        span
          flex 1
          &.tip
            flex 0 0 50px
  .topComment
    padding 10px
    font-size 14px
    color $color-text-ll
    justify-content space-between
  .commentDetail
    padding 10px
    padding-bottom 30px
    li
      padding-bottom 20px
      .img
        flex 0 0 50px
        text-align left
        img
          width 40px
          height 40px
      .right
        text-align left
        flex 1
        font-size 14px
        .top
          display flex
          justify-content space-between
          color $color-text-ll
          line-height 25px
          .zan
            color $color-text-light-link2
            i
              font-size 25px
              vertical-align top
        p
          line-height 25px

</style>
