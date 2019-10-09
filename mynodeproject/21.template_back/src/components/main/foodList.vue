<template>
  <div class="setMenu" ref="baseTable">
    <div style="background:white;padding:15px;">
      <my-table
        ref="myTable"
        :tableData="tableData"
				:total="total"
				:page_sizes="page_sizes"
				:talPro="talPro"
        :tableConfig="tableConfig"
				@handleCk="handleCurrentChange2"
        @myaddFoodBtn="myaddFoodBtn"
      >
      <!-- 插入子组件中的关于自定义的菜品是否在售的内容 -->
      <div slot="Status" slot-scope="hh">
        <input ref="inputStatus" style="display:none;" type="text" :value="hh.data.Status">
        <el-switch
          @change="changeStatus(hh.data.Status,hh.data.Id,'Status')"
          v-model="hh.data.Status"
          :active-value=1
          :inactive-value=0
          active-text="是"
          inactive-text="否">
        </el-switch>
      </div>

      <!-- 插入的是否推荐的自定义内容 -->
      <div slot="IsRecommend" slot-scope="rec">
        <el-switch
          @change="changeStatus(rec.data.IsRecommend,rec.data.Id,'IsRecommend')"
          v-model="rec.data.IsRecommend"
          :active-value=true
          :inactive-value=false
          active-text="是"
          inactive-text="否">
        </el-switch>
      </div>
      </my-table>
    </div>

    <!-- 下面是菜品列表的添加菜品按钮的点击弹出框 -->
    <el-dialog
      title="添加"
      :center="true"
      :visible.sync='dialogVisibleFoodList'
      width="50%"
      height="50%"
      :before-close="handleClose">
        <el-form :rules="AddFoodListFormRules" status-icon class="demo-ruleForm" ref="foodListForm" :model="foodListForm" label-width="100px">
          <el-form-item prop="Name" label="图片名称">
            <el-input v-model="foodListForm.Name"></el-input>
          </el-form-item>
          <el-form-item prop="Describe" label="图片描述">
            <el-input type="textarea" v-model="foodListForm.Describe"></el-input>
          </el-form-item>
          <el-form-item prop="pic1" v-model="foodListForm.pic1" label="图片上传">
            <el-upload
              ref="upload"
              :multiple=false
              :limit=1
              class="upload-demo"
              action=""
              :auto-upload="false"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="foodPictureList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且只能上传一张，如需覆盖请先删除已经选择的！！</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="canlcelAddForm('foodListForm')">取 消</el-button>
          <el-button type="primary" @click="submitAddForm('foodListForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import MyTable from '@/components/base-components/table'
// import {dealMenu} from '@/assets/js/menu/methods'
import {apiMenuAuthQuery, apiUrl} from '@/assets/js/config'
import {mapState, mapMutations} from 'vuex'
import { base } from '@/mixin/index'

export default {
  mixins:[base],
  data () {
    var checkUser = (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error('不能为空'))
          } else {
            callback()
          }
        }
    return {
      talPro:[], // 要显示的表头
      total:12, // 总共条数
      page_sizes:[10], // 每页显示的个数
      moduleCode:this.$route.query.modulecode,
      tableData: [],
      tableConfig:{height:'200', showOpera:false, apiMenuAuthQuery2:'', apiUrl2:apiUrl['获取用户可见按钮']},
      status:true,
      dialogVisibleFoodList:false,
      foodListForm:{Name:'', Describe:'', pic1:''}, // 添加菜品的表单
      foodPictureList:[],
      AddFoodListFormRules:{
        Name:[{validator: checkUser, trigger: 'blur'}]
      }
    }
  },
  props:{

  },
  created () {
    this.computedHeight()
    this.setModulecode(this.$route.query.modulecode)
    this.init()
  },
  mounted () {
  },
  methods:{
    init () {
      this.$set(this.tableConfig, 'apiMenuAuthQuery2', apiMenuAuthQuery[this.modulecode].code)
      this.getDate()
      this.resize()
    },
    getDate () {
      console.log(this.modulecode)
      const url = apiMenuAuthQuery[this.modulecode].getDateListUrl
      if (url) {
        this.$reqs.get(url).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data
             this.changePro(this.tableData[0]) // 改变表头
          }
        }).catch(res => {

        })
      }
    },
    changeSearch (data) {
      data.forEach((item, index) => { // 让表单有筛选功能
        if (item.fil) {
          alert(88)
          let n = []
        this.tableData.forEach((item2, index2) => {
          n.push({text:item2[item.prop], value:item2[item.prop]})
        })
        this.$set(data[index], 'fil', n)
        }
      })
    },
    handleCurrentChange2 (val) { // 处理分页插件中的当前第几页改变时候的事件
				this.currentPage = val
    },
    resize () {
      const _this = this
      window.addEventListener('resize', _this.computedHeight, false)
    },
    handleTreeCheck (data, checked) { // 是tree组件里面的复选框点击的事件的回调函数
      // console.log(data, checked) // data是当前选中的节点的数据，checked是所有选中的信息
      if (data.ParentId === 0) { // 选中的是父节点
        this.tableData = data.children // 改变表格数据
      }
    },
    changePro (data) { // 表格数据表头的设定
      const pro = [
        {label:'ID', prop:'Id'}, {label:'名称', prop:'Name'}, {label:'图片', prop:'ImageUrl'}, {label:'描述', prop:'Describe'}, {label:'创建时间', prop:'CreateTime'}, {label:'更新时间', prop:'UpdateTime'}, {label:'是否在售', prop:'Status', istoSlot:true}, {label:'评价数量', prop:'CommentCount'}, {label:'平均分', prop:'AvgStar'}, {label:'是否推荐', prop:'IsRecommend', istoSlot:true}
      ]
        this.talPro = pro
        this.changeSearch(this.talPro)
    },
    changeStatus (newval, id, type) {
      if (type == 'Status') {
        this.$reqs.post(apiUrl['更新菜品是否在售'], {Status:newval == true, id:id}).then(res => {
          console.log(res)
          if (res.data == 'True') { // 修改成功
            this.$message({message:'修改成功！！', type:'success'})
          }
        })
      } else if (type == 'IsRecommend') {

      }
    },
    myaddFoodBtn () { // 菜品列表页面的添加菜品按钮点击事件，暂时先写在这里
      this.dialogVisibleFoodList = true
    },
    handleRemove (file, fileList) {

    },
    handleChange (file, fileList) {
        console.log(this.foodPictureList)
        this.$set(this.foodListForm, 'pic1', file.raw)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm('orgForm')
          done()
        })
        .catch(_ => {})
    },
    canlcelAddForm (formName) { // 取消编辑或者新建菜单表格
        this.resetForm(formName)
        this.dialogVisibleFoodList = false
      },
    submitAddForm (formName) { // 提交部门编辑和添加表格
      this.$refs[formName].validate((valid) => {
        var newFormData = new FormData()
        newFormData.append('file', this.foodListForm.pic1)
        newFormData.append('Name', this.foodListForm.Name)
        newFormData.append('Describe', this.foodListForm.Describe)
        if (valid) {
          let toUrl = ''
          if (this.isEditModule) { // 编辑部门
            toUrl = apiUrl['修改部门']
          } else { // 新增部门
            toUrl = apiUrl['添加菜品']
          }
            this.$reqs.post(toUrl + '?isformdata=0', newFormData).then(res => {
              console.log(res)
              if (res.data.Code === 1) { // 成功
                this.$message({message:'添加成功', type:'success'})
                this.getDate()
              } else {
                this.$message({message:res.data.Message, type:'error'})
              }
              this.resetForm(formName)
            }).catch(res => {
              console.log(res)
              this.$message({message:res.data.Message, type:'error'})
              this.resetForm(formName)
            })
            this.$refs.upload.clearFiles() // 清除选中的上传的图片列表
            this.dialogVisibleFoodList = false
            this.isEditModule = false
        } else {
          return false
        }
      })
    },
    resetForm (formName) { // 重置表格数据
      this.$refs[formName].resetFields()
      console.log(this.foodListForm)
    },
    ...mapMutations({'setModulecode':'SET_MODULECODE'})
  },
  computed:{
    ...mapState(['modulecode'])
  },
  watch:{
    tableData (newval, old) {
      this.total = newval.length
    },
    modulecode (newval, oldval) {
      // alert(newval)
      if (this.modulecode == '主页') {
        window.removeEventListener('resize', this.computedHeight, false)
        return false
      }
       this.init()
    }
  },
  components:{
    MyTable
  }
}
</script>

<style lang="stylus" scoped>
</style>
