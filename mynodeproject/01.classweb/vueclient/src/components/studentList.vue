


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
			    <p class="description">{{i.description}}</p>
			    <p style="text-align: right;">
			    	<span id="scan" class="el-icon-view" style="margin-right:15px;color:royalblue;"><i style="margin-left:5px;">{{i.scan_cout}}</i></span>
			    	<el-tooltip class="item" effect="dark" content="点我收藏哦！" placement="top-start" style="background:none;border:none;">
				      <el-button @click = "btn_love(i._id)">
				      	<span @mouseenter.native="love_enter(index)"   :class="{'love_active':ind === index ,'love':true,'el-icon-star-on':true}" style="margin-right:5px;color:indianred;"><i style="margin-left:5px;">{{i.love_cout}}</i></span>
				      </el-button>
				    </el-tooltip>
			    	
			    </p>
		     </router-link>
		  </el-col>
		</el-row>
		
		
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
				ind:""
			}
		},
		created:function(){
			this.getdata(this);
		},
		methods:{
			getdata:function(th){//获取本页的数据
				th.$reqs.post("/backIndex/find",{}).then(function(result){
					if(result){
						th.articles = result.data;
					};
				});
			},
			love_enter:function(index){
				alert(index)
				//this.ind = index;
			},
			btn_love:function(_id,e){
				var _that = this;
				var ev = e || event;
				//ev.cancelBubble = true;
				ev.preventDefault(); 
				//在数据库里操作收藏这个字段，如果之前没有收藏过就收藏，如果之前收藏过就取消收藏
				this.$reqs.post("/backIndex/update_lovecout",{goods_id:_id}).then(function(result){
					if(result.data.love == "true"){//进入的是之前没有收藏过，现在收藏的数据
						//location.reload();
						_that.$message({message:"收藏成功",type:"success"});
						_that.getdata(_that);
						
					}else if(result.data.love == "false"){
						_that.$message({message:'已经收藏过啦！' ,type:'warning'});
					}
				}).catch(function(e){
					
				})
			}
		},
		filters: {
//			ll: function([value, search]) {
//				return value + search
//			},
//			nn:function(value,search){
//				return value + search;
//			},
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
	.description{height:21px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
	.love{transition:all linear .5s;-moz-transition: all linear .5s;-ms-transition: all linear .5s;-webkit-transition: all linear .5s;}
	.love:hover{transform: scale(1.6);-moz-transform: scale(5);-ms-transform: scale(1.6);-webkit-transform: scale(1.6);}
	.love_active{-moz-transform: scale(5);}
</style>