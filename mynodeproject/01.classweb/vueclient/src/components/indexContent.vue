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

		<ul>
			<li>
				{{[time,search] | ll }}   <!--vue2.**的版本对过滤器的改动-->
			</li>
			
			<!--vue2.**的版本对过滤器的改动-->
			<!--<li>
				{{time | searchFor(searchString) }}  
			</li>-->
		</ul>

		<ul>
			<li style="background:beige;color:black;line-height: 60px;">在上面的搜索中输入条件对下面的新闻进行筛选和搜索</li>
			<li>
				<br /><br /><br />
			</li>
			<li v-for="i in ne">
				<a v-bind:href="i.url">
				</a>
				<p>{{i.title}}</p>
			</li>
		</ul>
		
		
		<!--<ul>
			<li v-for="i in articles | searchFor(searchString)">
				<a v-bind:href="i.url">
				</a>
				<p>{{i.title}}</p>
			</li>
		</ul>-->

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
				articles: [{
						"title": "What You Need To Know About CSS Variables",
						"url": "http://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables/",
						"image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables-100x100.jpg"
					},
					{
						"title": "Freebie: 4 Great Looking Pricing Tables",
						"url": "http://tutorialzine.com/2016/02/freebie-4-great-looking-pricing-tables/",
						"image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/great-looking-pricing-tables-100x100.jpg"
					},
					{
						"title": "20 Interesting JavaScript and CSS Libraries for February 2016",
						"url": "http://tutorialzine.com/2016/02/20-interesting-javascript-and-css-libraries-for-february-2016/",
						"image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/interesting-resources-february-100x100.jpg"
					},
					{
						"title": "Quick Tip: The Easiest Way To Make Responsive Headers",
						"url": "http://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers/",
						"image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/quick-tip-responsive-headers-100x100.png"
					},
					{
						"title": "Learn SQL In 20 Minutes",
						"url": "http://tutorialzine.com/2016/01/learn-sql-in-20-minutes/",
						"image": "http://cdn.tutorialzine.com/wp-content/uploads/2016/01/learn-sql-20-minutes-100x100.png"
					},
					{
						"title": "Creating Your First Desktop App With HTML, JS and Electron",
						"url": "http://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/",
						"image": "http://cdn.tutorialzine.com/wp-content/uploads/2015/12/creating-your-first-desktop-app-with-electron-100x100.png"
					}
				]
			}
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
						return result;
					
				}
		}
	}
</script>

<style>
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