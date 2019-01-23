<template>
  <div class="setMenu">
    <div class="left">
      <tree ref="tree"></tree>
    </div>
    <div ref="menuRight" class="right">
      <my-table
        ref="myTable"
        :tableData="tableData"
				:total="total"
				:currentPage="currentPage"
				:page_sizes="page_sizes"
				:talPro="talPro"
        :tableConfig="tableConfig"
				@handleCk="handleCurrentChange2"
      ></my-table>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/base-components/tree'
import MyTable from '@/components/base-components/table'

export default {
  data () {
    return {
      talPro:[{prop:'_id', label:'id', fil:[]}, {prop:'name', label:'姓名', fil:[]}, {prop:'password', label:'密码'}, {prop:'phone', label:'手机'}], // 要显示的表头
      total:12, // 总共条数
      page_sizes:[6], // 每页显示的个数
      currentPage:1, // 当前页数
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
  mounted () {
    this.$refs.tree.$el.style.height = '100%'
    this.getHeight()
  },
  methods:{
    handleCurrentChange2 (val) { // 处理分页插件中的当前第几页改变时候的事件
				this.currentPage = val
    },
    getHeight () {
      this.$nextTick(() => {
        if (this.$refs.menuRight) {
          const h = this.$refs.menuRight.getClientRects()[0].height - 60 - 30
          this.$set(this.tableConfig, 'height', h)
        }
      })
    },
    resize () {
      const _this = this
      window.onresize = function () {
        _this.getHeight()
      }
    }
  },
  components:{
    Tree,
    MyTable
  }
}
</script>

<style lang="stylus" scoped>
.setMenu
  display flex
  max-width 100%
  .left
    flex 0 0 250px
    background rgb(222,222,222)
    overflow-y scroll
  .right
    margin-left 20px
    flex 1
    max-width calc(100% - 250px - 20px)
</style>
