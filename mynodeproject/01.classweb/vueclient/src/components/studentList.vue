


<template>
	<!--这个页面主要是学习和实现vue的filter进行的商品搜索功能-->
	<div id="index_content">
		<el-row>
			<el-col :span="6" :offset="9">
				<el-input placeholder="请输入内容" v-model="searchString">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
		  <el-col :span="6" v-for="(i,index) in ne" :key='index'>
		  	<!--下面的to如果里面的路径是要用到vuedata里面的参数，就需要在前面加上冒号-->
		  	 <router-link :to='{
						  	 	name:"goods",
						  	 	params:i
						  	 	}'
		  	 	  class="thumbnail" style="display: block;background:rgb(240,242,245);padding:10px;margin:10px;">
		      	<p>{{i.title}}</p>
		      	<img :src="i.img_src" alt="..." style="height:250px;width:100%;">
			    <p>{{i.description}}</p>
		     </router-link>
		  </el-col>
		</el-row>
		
		<!--<div class="row">
		 <div class="col-xs-6 col-md-3" v-for="i in ne">
		    <a href="#" class="thumbnail" style="background:cornsilk">
		      <img :src="i.img_src" alt="..." style="height:250px;width:100%;">
		      <p>{{i.title}}</p>
		      <p>{{i.description}}</p>
		    </a>
		  </div>
		</div>-->
	</div>
</template>

<script>
	export default {
		name: 'indexContent',
		data() {
			return {
				search: "555",
				time: "20160101",
				searchString:"",
				articles: [],
			}
		},
		created:function(){
			var _this = this;
			this.$reqs.post("/backIndex/find",{}).then(function(result){
					if(result){
						_this.articles = result.data;
					};
				});
		},
		filters: {
			ll: function([value, search]) {
				return value + search
			},
			nn:function(value,search){
				return value + search;
			},
			searchFor:function(value, searchString) {
						var result = [];
						if(!searchString) {
							return value;
						}
		
						searchString = searchString.trim().toLowerCase();
						result = value.filter(function(item) {
							if(item.title.toLowerCase().indexOf(searchString) !== -1) {
								return item;
							}
						});
		
						return result;
				}

		},
		computed:{ //这里是通过计算属性，对值进行过滤的搜索
				ne:function(){
					var result = [];
					var ss = this.searchString;
							result = this.articles.filter(function(item) {
							if(item.title.toLowerCase().indexOf(ss) !== -1) {
								return item;
							}
						});
//						console.log(result)
						return result;
					
				}
		}
	}
</script>

<style scoped>
	p{line-height: 21px;}
	a{text-decoration: none;color:rgb(45,45,45)}
	li{list-style: none;}
	.time {
		font-size: 13px;
		color: #999;
	}
	
	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}
	
	.button {
		padding: 0;
		float: right;
	}
	
	.image {
		width: 100%;
		display: block;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
</style>