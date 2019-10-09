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
      >
      </my-table>
    </div>

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
    return {
      talPro:[], // 要显示的表头
      total:12, // 总共条数
      page_sizes:[10], // 每页显示的个数
      moduleCode:this.$route.query.modulecode,
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
      tableConfig:{height:'200', showOpera:false, apiMenuAuthQuery2:'', apiUrl2:apiUrl['获取用户可见按钮']}
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
          // console.log(res)
          if (res.data.code == 0) {
            this.tableData = res.data.data
             this.changePro(this.tableData[0]) // 改变表头
          }
        }).catch(res => {

        })
      }
    },
    changeSearch (data) {
      console.log(data)
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
        // {prop:'ID', label:'ID'}, {prop:'IconName', label:'图标'},
        // {prop:'Name', label:'模块名称'}, {prop:'Url', label:'模块地址'},
        // {prop:'SortNo', label:'序列号'}, {prop:'ParentName', label:'所属模块'}
        ]
        for (var key in data) {
          let item = {prop:key, label:key}
          pro.push(item)
        }
        this.talPro = pro
        this.changeSearch(this.talPro)
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
