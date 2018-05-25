<!-- 这个是会员中心的页面 -->

<template>
    <div>
      <el-row>
        <!-- 左边的导航 -->
        <el-col :span="4" :offset="3">
            <div>
              <dl>
                <dt>个人中心</dt>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
              </dl>
              <dl>
                <dt>个人中心</dt>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
              </dl>
              <dl>
                <dt>个人中心</dt>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
                <dd>账户余额</dd>
              </dl>
            </div>
        </el-col>
        <!-- 右边的个人中心展示 -->
        <el-col :span="14">
            <div>

            </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default{
    name:'membercenter',
    data:function(){
      return {

      }
    }
  }

</script>

<style scoped>

</style>
