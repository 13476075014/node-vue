<!--所有页面可以使用的wangeditor的公共组件tempalte-->

<template>
	<div>
		<div id="myWangEditor" ref="myWangEditor" style="height:600px;">
		
		</div>
		<el-button type="primary" @click="getHtml">获取html</el-button>
		<el-button type="info" @click="getText">获取text</el-button>
	</div>
</template>



<script>
	import wangEditor from 'wangeditor';
	
	export default{
		name:"tem_WangEditor",
		data(){
			return {
				editor:""
			}
		},
		props:{
			uploadFileName:{//设置上传图片文件的时候，后台接受的文件名，files.myFileName;
                type:String,
                default:'myFileName'
            },
           uploadImgMaxSize:{// 将图片大小限制为 3M
           		type:Number,
           		default:3 * 1024 * 1024
           },
           uploadImgMaxLength:{// 限制一次最多上传 1 张图片
           		type:Number,
           		default:1
           },
           withCredentials:{//跨域上传中如果需要传递 cookie 需设置 withCredentials
           		type:Boolean,
           		default:true
           },
           uploadImgTimeout:{//自定义 timeout 时间，这里是设置的3秒
           		type:Number,
           		default:3000
           },
           uploadImgServer:{//上传到后台的接口
           		type:String,
           		default:"http://10.203.1.87:3000/ueditor/wangeditor/upload"
           },
           uploadImgParams:{//如果要自定义传一些参数，就在这里；// 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode// 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
           		type:Object,
           		default:function(){
           			return {
	           			token: 'abcdef12345'
	           		};
           		}
           },
           pasteIgnoreImg:{//true的话，禁止粘贴的时候粘过来图片，会被过滤掉
           		type:Boolean,
           		default:true
           },
           colors:{//配置头部的小笔，可以选择的字体颜色种类
           		type:Array,
           		default:function(){
           			return ['#000000',
					        '#eeece0',
					        '#1c487f',
					        '#4d80bf',
					        '#c24f4a',
					        '#8baa4a',
					        '#7b5ba1',
					        '#46acc8',
					        '#f9963b',
					        '#ffffff']
           		} 
           },
           emotions:{ //配置头部选择的表情的种类
           		type:Array,
           		default:function(){
           			return [{
				            // tab 的标题
				            title: '默认',
				            // type -> 'emoji' / 'image'
				            type: 'image',
				            // content -> 数组
				            content: [
				                {
				                    alt: '[坏笑]',
				                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
				                },
				                {
				                    alt: '[舔屏]',
				                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
				                }
				            ]
				        },
				        {
				            // tab 的标题
				            title: 'emoji',
				            // type -> 'emoji' / 'image'
				            type: 'emoji',
				            // content -> 数组
				            content: ['?', '@', '#', '!', '$']
				        }]
           		}
           },
           fontNames:{//头部工具栏的可选的字体的配置
           		type:Array,
           		default:function(){
           			return ['宋体','微软雅黑','Arial','Tahoma','Verdana']
           		}
           }
		},
		created(){
			
		},
		mounted(){
			var _this = this;
			_this.editor = new wangEditor(this.$refs.myWangEditor);
			_this.editor.customConfig = {
				//onchange : (html) =>{this.editorContent = html;} ,
				uploadImgMaxSize : this.uploadImgMaxSize,  
				uploadImgMaxLength : this.uploadImgMaxLength , 
				uploadFileName : this.uploadFileName , 
				withCredentials : this.withCredentials , 
				uploadImgTimeout : this.uploadImgTimeout , 
				uploadImgServer : this.uploadImgServer ,
				uploadImgParams:this.uploadImgParams,
				pasteIgnoreImg:this.pasteIgnoreImg,
				colors:this.colors,
				emotions:this.emotions,
				onchange:this.editorChange,
				onfocus :this.editorOnfocus ,
				onblur :this.editorOnblur 
			};
			
			this.toListenUp(_this.editor);//监听上传的各个阶段
			_this.editor.create();
		},
		methods:{
			toListenUp:function(editor){
				var _this = this;
				editor.customConfig.uploadImgHooks = {
				    before: function (xhr, editor, files) {
				    },
				    success: function (xhr, editor, result) {
				    },
				    fail: function (xhr, editor, result) {
				    },
				    error: function (xhr, editor) {
				    },
				    timeout: function (xhr, editor) {
				       
				    },
				    customInsert: function (insertImg, result, editor) {
				        var url = result.data[0]
				        insertImg(url)
				    }
				    }
			},
			editorChange:function(html){//当前编辑器里面的内容什么的发生改变触发的事件
				this.$emit("tochange",html);
			},
			editorOnfocus:function(){//编辑器鼠标聚焦当前容器时触发
				this.$emit("tofocus");
			},
			editorOnblur:function(html){
				this.$emit("toblur",html);
			},
			getHtml:function(){
				var html = this.editor.txt.html();
				//console.log(html)
				this.$emit("gethtml",html);
			},
			getText:function(){
				var text = this.editor.txt.text();
				this.$emit("gethtml",text);
			}
		}
		
	}
</script>
	
<style scoped>
	
</style>