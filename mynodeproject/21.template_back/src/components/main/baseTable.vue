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
      ></my-table>
    </div>
  </div>
</template>

<script>
import MyTable from '@/components/base-components/table'
import {dealMenu} from '@/assets/js/menu/methods'

export default {
  data () {
    return {
      talPro:[{prop:'_id', label:'id', fil:[]}, {prop:'name', label:'姓名', fil:[]}, {prop:'password', label:'密码'}, {prop:'phone', label:'手机'}], // 要显示的表头
      total:12, // 总共条数
      page_sizes:[10], // 每页显示的个数
      tableData: [{_id: '2016-05-02',
                  name: '王小虎',
                  phone:'123456789',
                  password: '111111'}, {_id: '2016-05-03',
                  name: '王小虎2',
                  phone:'1234567892',
                  password: '1111112'}, {_id: '2016-05-04',
                  name: '王小虎3',
                  phone:'1234567893',
                  password: '1111113'}, {_id: '2016-05-05',
                  name: '王小虎5',
                  phone:'1234567895',
                  password: '1111115'}],
      tableConfig:{height:'200', showOpera:false}
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.getHeight()
  },
  methods:{
    init () {
      this.treeDate = dealMenu() // 左边tree数据
      this.tableData = this.treeDate[0].children.slice(0)
      this.changePro() // 表头
      this.talPro.forEach((item, index) => { // 让表单有筛选功能
        if (item.fil) {
          let n = []
        this.tableData.forEach((item2, index2) => {
          n.push({text:item2[item.prop], value:item2[item.prop]})
        })
        // console.log(this.talPro)
        this.$set(this.talPro[index], 'fil', n)
        }
      })
      // console.log(this.talPro)
      this.resize()
    },
    handleCurrentChange2 (val) { // 处理分页插件中的当前第几页改变时候的事件
				this.currentPage = val
    },
    getHeight () {
      this.$nextTick(() => {
        if (this.$refs.baseTable.getClientRects()[0]) {
          console.log(this.$refs.baseTable.getClientRects()[0])
          const h = this.$refs.baseTable.getClientRects()[0].height - 60 - 52 - 25
          this.$set(this.tableConfig, 'height', h)
        }
      })
    },
    resize () {
      const _this = this
      window.addEventListener('resize', function () {
          _this.getHeight()
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
        {prop:'ID', label:'ID'}, {prop:'IconName', label:'图标'},
        {prop:'Name', label:'模块名称'}, {prop:'Url', label:'模块地址'},
        {prop:'SortNo', label:'序列号'}, {prop:'ParentName', label:'所属模块'}
        ]
        this.talPro = pro
    }
  },
  watch:{
    tableData (newval, old) {
      this.total = newval.length
    }
  },
  components:{
    MyTable
  }
}
</script>

<style lang="stylus" scoped>
</style>
