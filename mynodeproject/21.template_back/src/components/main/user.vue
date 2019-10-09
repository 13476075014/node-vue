<template>
  <div class="setMenu">
    <div class="inner" style="background:white;">
      <div class="left">
        <tree @handleTreeCheck="handleTreeCheck" :treeDate="treeDate" ref="tree"></tree>
      </div>
      <div ref="menuRight" class="right">
        <my-table
          ref="myTable"
          :tableData="tableData"
          :total="total"
          :page_sizes="page_sizes"
          :talPro="talPro"
          :tableConfig="tableConfig"
          @handleCk="handleCurrentChange2"
          @handleSelectionChange="handleSelectionChange"
          @addTable="addTable"
          @editTable="editTable"
          @handleBtnCheck="handleBtnCheck"
          @toDelete="toDelete"
        >
        </my-table>
      </div>
    </div>
     <!-- 添加和编辑部门 -->
      <el-dialog
        title="提示"
        :center="true"
        :visible.sync="dialogVisible"
        width="40%"
        height="50%"
        :before-close="handleClose">
        <el-form :rules="AddOrgFormRules" status-icon class="demo-ruleForm myInline" ref="orgForm" :model="orgForm" label-width="70px">
          <el-form-item prop="Account" label="账号">
            <el-input v-model="orgForm.Account"></el-input>
          </el-form-item>
          <el-form-item prop="Name" label="姓名">
            <el-input v-model="orgForm.Name"></el-input>
          </el-form-item>
          <el-form-item prop="Sex" label="性别">
             <el-select v-model="orgForm.Sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="OrganizationIds" v-model="orgForm.OrganizationIds" label="所属部门">
            <!-- <el-input v-model="form.ParentId"></el-input> -->
            <el-cascader
              ref="cascader"
              placeholder="可以输入搜索"
              :options="menuSelectDate"
              filterable
              change-on-select
              @change="menuSelectChange"
              v-model="selectedcascader"
            ></el-cascader>
          </el-form-item>
           <el-form-item prop="Status" label="是否可用">
            <el-switch
              v-model="orgForm.Status"
              active-color="#13ce66"
              inactive-color="grey"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="canlcelAddForm">取 消</el-button>
          <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </span>
      </el-dialog>
 </div>
</template>

<script>
import Tree from '@/components/base-components/tree'
import MyTable from '@/components/base-components/table'
// import {dealfoodMenu} from '@/assets/js/menu/methods'
import {mapState} from 'vuex'
import { base } from '@/mixin/index'
import {apiUrl, apiMenuAuthQuery} from '@/assets/js/config'
import {delOrgData} from '@/assets/js/org/method'

export default {
  mixins: [base],
  data () {
     var checkUser = (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error('不能为空'))
          } else {
            callback()
          }
        }
    return {
      treeDate:[],
      talPro:[{prop:'_id', label:'id', fil:[]}, {prop:'name', label:'姓名', fil:[]}, {prop:'password', label:'密码'}, {prop:'phone', label:'手机'}], // 要显示的表头
      total:12, // 总共条数
      page_sizes:[4], // 每页显示的个数
      tableData: [],
      tableConfig:{height:'200', showOpera:true, apiUrl2:apiUrl['获取用户可见按钮'], apiMenuAuthQuery2:apiMenuAuthQuery['用户管理'].code},
      tableCheckDate:[],
      dialogVisible:false, // 编辑框
      orgForm:{Name:'', OrganizationIds:'', Status:false, Account:'', Sex:'0'},
      AddOrgFormRules: { // 注册表的验证
            Name: [{ validator: checkUser, trigger: 'blur' }],
            OrganizationIds: [{ validator: checkUser, trigger: 'blur' }]
           },
      menuSelectDate:[], // 编辑和添加的弹出框里面的父节点选择的数据
      selectedcascader:[] // 选中的数据
    }
  },
  created () {
    this.orgId = 0 // 设置初始显示的根节点的用户数据
    this.initStyle()
    this.getOrgData()
    this.getUserData()
  },
  mounted () {
    this.computedHeight()
    this.$refs.tree.$el.style.height = '100%'
  },
  methods:{
    init () {
      let menuSelectDate = JSON.parse(JSON.stringify(this.treeDate.slice(0)))
      menuSelectDate[0].value = menuSelectDate[0].Id
      menuSelectDate[0].children.forEach((item, index) => {
        item.value = item.Id
        delete item.children
      })
      this.menuSelectDate = menuSelectDate
    },
    getUserData () { // 获取右边的用户表格数据
      this.$reqs.get(apiUrl['获取部分用户'], {params:{orgId:this.orgId}}).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          this.tableData = res.data.data
        }
      }).catch(res => {

      })
    },
    getOrgData () { // 获取左边树形的数据
      this.$reqs.get(apiUrl['部门管理']).then(res => {
        if (res.data.code == 0) {
          this.treeDate = delOrgData(res.data.data) // 处理数据
          this.init()
        }
      }).catch(res => {

      })
    },
    initStyle () {
      this.changePro() // 表头
      this.talPro.forEach((item, index) => { // 让表单有筛选功能
        if (item.fil) {
          let n = []
        this.tableData.forEach((item2, index2) => {
          n.push({text:item2[item.prop], value:item2[item.prop]})
        })
        this.$set(this.talPro[index], 'fil', n)
        }
      })
      this.resize()
    },
    handleCurrentChange2 (val) { // 处理分页插件中的当前第几页改变时候的事件
				this.currentPage = val
    },
    resize () {
      const _this = this
      window.addEventListener('resize', _this.computedHeight)
    },
    handleTreeCheck (data, checked) { // 是tree组件里面的复选框点击的事件的回调函数
     console.log(data, checked) // data是当前选中的节点的数据，checked是所有选中的信息
     this.orgId = data.Id
     this.getUserData()
    },
    changePro () { // 表格数据表头的设定
      const pro = [
        {prop:'Account', label:'用户名'}, {prop:'CreateTime', label:'创建时间'},
        {prop:'Name', label:'角色名'}, {prop:'Organizations', label:'所属部门名称'},
        {prop:'OrganizationIds', label:'所属部门ID'}, {prop:'Id', label:'ID'}
        ]
        this.talPro = pro
    },
    handleSelectionChange (val) { // 表格的复选框改变时
      // console.log(val)
      this.tableCheckDate = val
    },
    addTable () {
      this.dialogVisible = true
    },
    editTable () {
      this.isEditModule = true // 区分编辑和新增模块
      const check = this.tableCheckDate[0]
      if (check.OrganizationIds == 0) {
        this.selectedcascader = [0]
      } else {
        this.selectedcascader = [0, check.OrganizationIds * 1]
      }
      if (check.Status) {
        check.Status = true
      } else {
        check.Status = false
      }
      this.orgForm = {Account:check.Account, Name:check.Name, OrganizationIds:check.OrganizationIds, Id:check.Id, Status:check.Status, Sex:(check.Sex + '')}
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm('orgForm')
          done()
        })
        .catch(_ => {})
    },
    resetForm (formName) { // 重置表格数据
        this.selectedcascader = []
        this.$refs[formName].resetFields()
        this.orgForm = {Name:'', SortNo:'', ParentId:'', Id:''}
      },
    menuSelectChange (data) { // 选择菜单改变时
      let pi = data[0] * 1
      if (data.length > 1) {
        pi = data[1] * 1
      }
      console.log(pi)
      this.$set(this.orgForm, 'OrganizationIds', pi)
    },
    handleBtnCheck (row) { // 查看按钮的点击事件的回调函数，row是当前点击行的值
      this.$message({message:row})
    },
    canlcelAddForm () { // 取消编辑或者新建菜单表格
        this.resetForm('orgForm')
        this.dialogVisible = false
      },
    submitAddForm () { // 提交用户编辑和添加表格
      this.$refs['orgForm'].validate((valid) => {
        if (valid) {
          let toUrl = ''
          if (this.isEditModule) { // 编辑
            toUrl = apiUrl['新增或更新用户']
          } else { // 新增
            toUrl = apiUrl['新增或更新用户']
          }
          if (this.orgForm.Status) {
            this.$set(this.orgForm, 'Status', 1)
          } else {
            this.$set(this.orgForm, 'Status', 0)
          }
          this.$set(this.orgForm, 'sex', this.orgForm['sex'] * 1)
            this.$reqs.post(toUrl, this.orgForm).then(res => {
              if (res.data.Code === 1) { // 成功
                this.$message({message:'添加成功', type:'success'})
                this.getUserData()
              } else {
                this.$message({message:res.data.Message, type:'error'})
              }
              this.resetForm('orgForm')
            }).catch(res => {
              console.log(res)
              this.$message({message:res.data.Message, type:'error'})
              this.resetForm('orgForm')
            })
            this.dialogVisible = false
            this.isEditModule = false
        } else {
          return false
        }
      })
    },
    toDelete () { // 删除部门
      this.$confirm('确定要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            const ids = [this.tableCheckDate[0].Id]
            this.$reqs.post(apiUrl['删除用户'], {ids}).then(res => {
              // console.log(res)
              if (res.data.Code == 1) { // 删除成功
                  this.$message({message:'更新成功！！！', type:'success'})
                  this.getUserData()
              } else {
                this.$message({message:res.data.Message, type:'error'})
              }
            }).catch(res => {

            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }

  },
  computed:{
    ...mapState(['menu'])
  },
  watch:{
    tableData (newval, old) {
      this.total = newval.length
    }
  },
  components:{
    Tree,
    MyTable
  }
}
</script>

<style lang="stylus" scoped>
.inner
  display flex
  max-width 100%
  height 100%
  padding 15px
  box-sizing border-box
  .left
    flex 0 0 200px
    background rgb(222,222,222)
    overflow-y scroll
  .right
    margin-left 20px
    margin-right 20px
    flex 1
    max-width calc(100% - 200px - 20px)
</style>
