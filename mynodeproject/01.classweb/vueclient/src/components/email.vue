<template>
	<div>
		<h1>这个是来测试，如何用node实现对邮箱的验证</h1>
		<el-input type="email" v-model="user.myemail" placeholder="请输入邮箱"></el-input>
		<el-button type="primary" @click="check">验证邮箱</el-button>
	</div>
</template>

<script>
	
	
	import adddate from '../assets/js/date_add.js';
	
	export default{
		data(){
			return {
				user:{myemail:"",code:"12qwe78kf",islive:true,data:15}
				
			}
		},
		methods:{
			check:function(){
				var _this = this ;
				this.$confirm("提示","确认用此邮箱验证？")
				.then(_ => {
					var da = new Date();
					da.add('n',_this.user.data);
					_this.user.data =  da ;
					console.log(_this.user)
					_this.$reqs.post("/email/toemail",{'euser':_this.user}).then(function(result){
						if(result.data.success === "true"){
							alert('请尽快在邮箱内进行验证');
						}
					}).catch(function(ee){
						console.log(ee);
					});
				})
			}
		}
	}
		
</script>

<style>
</style>