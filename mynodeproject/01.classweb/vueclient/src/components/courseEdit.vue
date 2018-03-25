<template>
	<el-switch
	  v-model="value2"
	  active-color="#13ce66"
	  inactive-color="#ff4949">
	</el-switch>
</template>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    }
  };
</script>

