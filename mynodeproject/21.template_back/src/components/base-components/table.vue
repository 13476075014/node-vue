
<!--这个是封装的table的展示，和分页的操作-->

<template>
	<div id="mytable">
    <div class="rightMenu">
      <!-- <el-button round @click="addTable" size="mini">添加</el-button>
      <el-button type="primary" size="mini" @click="editTable" round>编辑</el-button>
      <el-button type="success" size="mini" @click="addBtn" round>添加按钮</el-button>
      <el-button type="danger" size="mini" round>删除</el-button>
      <el-button type="danger" size="mini" @click="clearFilter" round>重置</el-button> -->
      <template v-for="(item,index) in canSeeMenu">
        <el-button :type="item.Type" :key="index" round @click="computedMenuScript(item.Name)" size="mini"><i></i>{{item.Name}}</el-button>
      </template>
    </div>
		<!--table-->
    <el-table
      ref="elTable"
      :allData="tableData"
      :data="showDate"
      highlight-current-row
      @current-change="handleCurrentChange"
      stripe
      :height=tableConfig.height
      @row-click="row_click"
      @selection-change="handleSelectionChange"
      style="width: 100%;">
      <el-table-column
        v-if="combineTableConfig.showTableCheck"
        type="selection"
        width="55">
      </el-table-column>
      <template v-for="(item,index) in talPro">
          <el-table-column
             v-if="item.fil"
            :key="index"
            align="center"
            :prop="item.prop"
            :label="item.label"
            :filters='item.fil'
            :filter-method="filterHandler"
            >
        </el-table-column>
      </template>
      <template v-for="(item,index) in talPro">
          <el-table-column
             v-if="!item.fil"
            :key="index"
            align="center"
            :prop="item.prop"
            :label="item.label"
            >
        </el-table-column>
      </template>
          <el-table-column v-if="tableConfig.showOpera" label="操作" align="center">
            <slot></slot>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCheck(scope.$index, scope.row)">查看按钮</el-button>
            <!-- <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
    </el-table>

    <!--分页-->
      <div class="block" style="padding-top:20px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange2"
          :current-page.sync="currentPage"
          :page-sizes="page_sizes"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
          </el-pagination>
      </div>

	</div>

</template>

<script>

  export default {
      data () {
        return {
          showDate:[],
          currentRow:null,
          currentPage:1,
          combineTableConfig:Object.assign({}, {showTableCheck:true}, this.tableConfig),
          tableCheckDate:[],
          canSeeMenu:[]
        }
      },
      created () {
        this.tochangePage(this.tableData)
        this.getCanSeeMenu()
      },
      props:{// 通过属性去得到父组件的绑定展示的数据
        tableData:{
          type:Array,
                default:function () {
                    return [{}]
                }
        },
        total:{// 总共条数
          type:Number,
          default:function () {
            return 6
          }
        },
        page_sizes:{// 每页显示几条
          type:Array,
          default:function () {
            return [6]
          }
        },
        talPro:{
          type:Array,
          default:function () {
            return ['date', 'name', 'address']
          }
        },
        tableConfig:{
          type:Object,
          default:function () {
            return {
              height:'200', // 高度
              showOpera:true,
              showTableCheck:true, // 是否展示多选框
              apiUrl2:'',
              apiMenuAuthQuery2:''
            }
          }
        },
        menuSelectDate:{
          type:Array,
          default:function () {
            return []
          }
        }

      },
      methods: {
        computedMenuScript (data) {
         switch (data) {
            case '添加菜单':
            this.addBtn()
            break
            case '添加模块':
            this.addTable()
            break
            case '删除菜单':
            this.deleteBtn()
            break
            case '编辑模块':
            this.editTable()
            break
            case '编辑菜单':
            this.editBtn()
            break
         }
        },
        clearFilter () {
          this.$refs.elTable.clearFilter()
        },
        handleEdit (index, row) { // 表格行的编辑
          this.$emit('handleEditTWO', index, row)
        },
        handleDelete (index, row) { // 表格行的删除操作
          this.$emit('handleDeleteTWO', index, row)
        },
        handleCheck (index, row) { // 查看按钮的点击事件，来展示当前模块有的按钮
          console.log(index, row)
          this.$emit('handleBtnCheck', row.id)
        },
        handleSizeChange (val) {
          console.log(`每页 ${val} 条`)
        },
        row_click (row, event, column) {

        },
        handleCurrentChange (val) {
          this.currentRow = val // table的让当前被选中的行，高亮
          this.$emit('handleCurrentChange', val)
        },
        handleCurrentChange2 (val) { // 下面的handleCk，需要在这个模板引用后写上这个事件，才能顺利调用
           this.currentPage = val
           this.tochangePage(this.tableData)
          this.$emit('handleCk', val)// 组件应用后绑定的方法
        },
        filterHandler (value, row, column) {
          const property = column['property']
          return row[property] === value
        },
        checkIsSlect () {
          if (this.tableCheckDate.length) {
            if (this.tableCheckDate.length > 1) {
               this.$message({message:'只能选中一条进行操作！！！', type:'error'})
               return false
            }
            return true
          } else {
            this.$message({message:'请选中表格再操作！！！', type:'error'})
            return false
          }
        },
        editTable () {
          if (!this.checkIsSlect()) {
            return false
          }
          this.$emit('editTable')
        },
        addTable () {
          this.$emit('addTable')
        },
        deleteBtn () {

        },
        editBtn () {
          this.$emit('editBtn')
        },
        tochangePage (newval) {
          const star = (this.currentPage - 1) * this.page_sizes[0]
          const end = star + this.page_sizes[0]
          this.showDate = newval.slice(star, end)
        },
        handleSelectionChange (val) { // 表格的复选框改变时
          this.tableCheckDate = val
          this.$emit('handleSelectionChange', val)
        },
        addBtn () { // 添加按钮点击事件
          if (!this.checkIsSlect()) {
            return false
          }
          this.$emit('addBtn')
        },
       getCanSeeMenu () { // 获取当前用户的可见菜单
          this.$reqs.get(this.tableConfig.apiUrl2, {params:{modulecode:this.tableConfig.apiMenuAuthQuery2}}).then(res => {
            console.log(res)
            if (res.statusText === 'OK') { // 请求成功
              this.canSeeMenu = res.data
            }
          }).catch(res => {
            console.log(res)
          })
        }
      },
      watch:{
        tableData (newval, oldval) {
          this.currentPage = 1
          this.tochangePage(newval)
        }
      }
    }

</script>

<style lang="stylus" scoped>
.rightMenu
  text-align left
  padding-right 10px
  padding-bottom 15px
</style>
