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
          :menuSelectDate="menuSelectDate"
          @handleCk="handleCurrentChange2"
          @handleSelectionChange="handleSelectionChange"
          @addTable="addTable"
          @editTable="editTable"
          @addBtn="addBtn"
          @handleBtnCheck="handleBtnCheck"
          @editBtn="editBtn"
        >
        </my-table>
      </div>

      <div>
        <el-table
          ref="multipleTable"
          :data="hasMenuDate"
          tooltip-effect="dark"
          style="width: 170px;margin-top:43px;"
          @selection-change="handlehasMenuDateChange"
          >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="Name"
            label="已有按钮"
            width="120">
          </el-table-column>
        </el-table>
      </div>

    </div>
    <!-- 添加和编辑菜单 -->
      <el-dialog
        title="提示"
        :center="true"
        :visible.sync="dialogVisible"
        width="50%"
        height="50%"
        :before-close="handleClose">
        <el-form :rules="AddModuleFormRules" status-icon class="demo-ruleForm myInline" ref="AddModuleForm" :model="form" label-width="100px">
          <el-form-item prop="Name" label="模块名称">
            <el-input v-model="form.Name"></el-input>
          </el-form-item>
          <el-form-item prop="Url" label="URL">
            <el-input v-model="form.Url"></el-input>
          </el-form-item>
          <el-form-item prop="IconName" label="图标">
            <el-input v-model="form.IconName"></el-input>
          </el-form-item>
          <el-form-item prop="SortNo" label="序列号">
            <el-input v-model="form.SortNo"></el-input>
          </el-form-item>
          <el-form-item prop="IsMenu" label="是否是菜单">
            <el-select v-model="form.IsMenu" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="ParentId" v-model="form.ParentId" label="上级模块">
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="canlcelAddForm">取 消</el-button>
          <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑菜单按钮 -->
      <el-dialog
        title="提示"
        :center="true"
        :visible.sync="dialogVisibleBtn"
        width="50%"
        height="50%"
        :before-close="handleClose2">
        <el-form :rules="btnFormRules" status-icon class="demo-ruleForm myInline" ref="btnForm" :model="formBtn" label-width="100px">
          <el-form-item prop="Name" label="菜单名称">
            <el-input v-model="formBtn.Name"></el-input>
          </el-form-item>
          <el-form-item prop="DomId" label="Domid">
            <el-input v-model="formBtn.DomId"></el-input>
          </el-form-item>
          <el-form-item prop="Icon" label="图标样式">
            <el-input v-model="formBtn.Icon"></el-input>
          </el-form-item>
          <el-form-item prop="ClassName" label="class名称">
            <el-input v-model="formBtn.ClassName"></el-input>
          </el-form-item>
          <el-form-item prop="Sort" label="序列号">
            <el-input v-model="formBtn.Sort"></el-input>
          </el-form-item>
          <el-form-item prop="Type" label="按钮类型">
            <el-select v-model="formBtn.Type" placeholder="请选择">
              <el-option label="红色/danger" value="danger"></el-option>
              <el-option label="蓝色/primary" value="primary"></el-option>
              <el-option label="白色/default" value=""></el-option>
              <el-option label="绿色/success" value="success"></el-option>
              <el-option label="灰色/info" value="info"></el-option>
              <el-option label="黄色/warning" value="warning"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="canlcelBtnForm">取 消</el-button>
          <el-button type="primary" @click="submitBtnForm">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import Tree from '@/components/base-components/tree'
import MyTable from '@/components/base-components/table'
import {dealfoodMenu} from '@/assets/js/menu/methods'
import {mapState} from 'vuex'
import { base } from '@/mixin/index'
import {apiUrl, apiMenuAuthQuery} from '@/assets/js/config'

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
      hasMenuDate:[], // 模块有的所有菜单按钮
      hasMenuCheckDate:[], // 已经选择的模块的菜单按钮
      selectedcascader:[],
      treeDate:[],
      menuSelectDate:[],
      talPro:[{prop:'_id', label:'id', fil:[]}, {prop:'name', label:'姓名', fil:[]}, {prop:'password', label:'密码'}, {prop:'phone', label:'手机'}], // 要显示的表头
      total:12, // 总共条数
      page_sizes:[4], // 每页显示的个数
      tableData: [{_id: '2016-05-05',
                  name: '王小虎5',
                  phone:'1234567895',
                  password: '1111115'}],
      tableConfig:{height:'200', showOpera:true, apiUrl2:apiUrl['获取用户可见按钮'], apiMenuAuthQuery2:apiMenuAuthQuery['菜单配置']},
      tableCheckDate:[],
      dialogVisible:false, // 编辑框
      dialogVisibleBtn:false, // 编辑和添加按钮的弹出框是否展示
      form:{Name:'', Url:'', IconName:'', SortNo:'', IsMenu:'', ParentId:''},
      formBtn:{Name:'', Icon:'', DomId:'', Sort:'', Type:'', ClassName:''},
      AddModuleFormRules: { // 注册表的验证
            Name: [{ validator: checkUser, trigger: 'blur' }],
            Url: [{ validator: checkUser, trigger: 'blur' }],
            SortNo: [{ validator: checkUser, trigger: 'blur' }],
            IsMenu: [{ validator: checkUser, trigger: 'blur' }],
            ParentId: [{ validator: checkUser, trigger: 'blur' }]
           },
      btnFormRules:{
        Name: [{ validator: checkUser, trigger: 'blur' }],
        Type:[{ validator: checkUser, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.initStyle()
    this.init()
  },
  mounted () {
    this.$refs.tree.$el.style.height = '100%'
    this.getHeight2()
  },
  methods:{
    init () {
      this.treeDate = dealfoodMenu(this.menu) // 左边tree数据
      this.tableData = this.treeDate[0].children.slice(0)
      console.log(this.tableData)
      // let menuSelectDate = JSON.parse(JSON.stringify(this.treeDate[0].children.slice(0)))
      let menuSelectDate = JSON.parse(JSON.stringify(this.treeDate.slice(0)))
      menuSelectDate[0].value = menuSelectDate[0].id
      menuSelectDate[0].children.forEach((item, index) => {
        item.value = item.id
        delete item.children
      })
      this.menuSelectDate = menuSelectDate
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
    getHeight2 () {
      this.$nextTick(() => {
        if (this.$refs.menuRight.getClientRects()[0]) {
          const h = this.$refs.menuRight.getClientRects()[0].height - 60 - 30
          this.$set(this.tableConfig, 'height', h)
        }
      })
    },
    resize () {
      const _this = this
      window.addEventListener('resize', function () {
        _this.getHeight2()
      })
    },
    handleTreeCheck (data, checked) { // 是tree组件里面的复选框点击的事件的回调函数
     // console.log(data, checked) // data是当前选中的节点的数据，checked是所有选中的信息
      if (data.ParentId === 0) { // 选中的是父节点
        this.tableData = data.children // 改变表格数据
      }
    },
    changePro () { // 表格数据表头的设定
      const pro = [
        {prop:'id', label:'ID'}, {prop:'icon', label:'图标'},
        {prop:'label', label:'模块名称'}, {prop:'href', label:'模块地址'},
        {prop:'SortNo', label:'序列号'}, {prop:'ParentName', label:'所属模块'}
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
    submitAddForm () { // 提交菜单编辑和添加表格
        this.$refs['AddModuleForm'].validate((valid) => {
          if (valid) {
            let toUrl = ''
            if (this.isEditModule) { // 编辑模块
              toUrl = apiUrl['修改模块']
            } else { // 新增模块
              toUrl = apiUrl['添加模块']
            }
            console.log(toUrl)

              this.$reqs.post(toUrl, this.form).then(res => {
                if (res.data.Code === 1) { // 成功
                  this.$message({message:'添加成功', type:'success'})
                  this.getData()
                } else {
                  this.$message({message:res.data.Message, type:'error'})
                }
                this.resetForm('AddModuleForm')
              }).catch(res => {
                this.resetForm('AddModuleForm')
                console.log(res)
              })
              this.dialogVisible = false
              this.isEditModule = false
          } else {
            return false
          }
        })
      },
    canlcelAddForm () { // 取消编辑或者新建菜单表格
        this.resetForm('AddModuleForm')
        this.dialogVisible = false
      },
    editTable () {
      this.isEditModule = true // 区分编辑和新增模块
      const check = this.tableCheckDate[0]
      if (check.ParentId == 0) {
        this.selectedcascader = [0]
      } else {
        this.selectedcascader = [0, check.ParentId]
      }

      this.form = {Name:check.label, Url:check.href, IconName:check.icon, SortNo:check.SortNo, IsMenu:check.label, ParentId:check.ParentId, Id:check.id}
      this.dialogVisible = true
    },
    menuSelectChange (data) { // 选择菜单改变时
      let pi = data[0] * 1
      if (data.length > 1) {
        pi = data[1] * 1
      }
      console.log(pi)
      this.$set(this.form, 'ParentId', pi)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm('AddModuleForm')
          done()
        })
        .catch(_ => {})
    },
    handleClose2 (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm('btnForm')
          done()
        })
        .catch(_ => {})
    },
    resetForm (formName) { // 重置表格数据
        this.selectedcascader = []
        this.$refs[formName].resetFields()
      },
    addBtn () { // 添加和编辑按钮
      this.dialogVisibleBtn = true
    },
    canlcelBtnForm () {
      this.dialogVisibleBtn = false
       this.resetForm('btnForm')
    },
    submitBtnForm () {
      this.addOrUpdateBtn(this.formBtn)
    },
    handleBtnCheck (id) {
      this.$reqs.get(apiUrl['获取模块所有按钮'], {params:{page:1, limit:10, moduleId:id}}).then(res => {
        console.log(res)
        if (res.data.code == 0) { // 成功
          this.hasMenuDate = res.data.data
        }
      }).catch(res => {

      })
    },
    handlehasMenuDateChange (val) {
      this.hasMenuCheckDate = val
    },
    editBtn () { // table的编辑菜单按钮点击事件
      if (!this.checkIsSlect()) {
        return false
      }
      this.dialogVisibleBtn = true
      // formBtn:{Name:'', Icon:'', DomId:'', Sort:'', Type:'', ClassName:''}
      this.formBtn = this.hasMenuCheckDate[0]
    },
    addOrUpdateBtn (data) {
      const formDate = {Id:data.Id, ModuleId:data.ModuleId, Name:data.Name, DomId:data.DomId, Class:data.ClassName, Sort:data.Sort, Type:data.Type}
      this.$reqs.post(apiUrl['更新按钮设置'], formDate).then(res => {
        console.log(res)
        if (res.data.Code == 1) {
          this.$message({message:'更新成功！！！', type:'success'})
          this.$refs.myTable.getCanSeeMenu()
        } else {
          this.$message({message:res.data.Message, type:'error'})
        }
        this.resetForm('btnForm')
        this.dialogVisibleBtn = false
      }).catch(res => {
        this.dialogVisibleBtn = true
        this.resetForm('btnForm')
      })
    },
    checkIsSlect () {
      if (this.hasMenuCheckDate.length) {
        if (this.hasMenuCheckDate.length > 1) {
            this.$message({message:'只能选中一条进行操作！！！', type:'error'})
            return false
        }
        return true
      } else {
        this.$message({message:'请选中表格再操作！！！', type:'error'})
        return false
      }
    }
  },
  computed:{
    ...mapState(['menu'])
  },
  watch:{
    tableData (newval, old) {
      this.total = newval.length
    },
    menu (newval, oldval) {
      this.init()
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
    max-width calc(100% - 200px - 20px - 170px - 20px)
</style>
