<!--Ueditor的模板页-->

<template>
	<div>
		<div>
			<h1>完整demo</h1>
			<script id="editor" type="text/plain" style="width:624px;height:300px;"></script>
		</div>
		<div id="btns">
			<div>
				<button @click="getAllHtml()">获得整个html的内容</button>
				<button @click="getContent()">获得内容</button>
				<button @click="setContent()">写入内容</button>
				<button @click="setContent(true)">追加内容</button>
				<button @click="getContentTxt()">获得纯文本</button>
				<button @click="getPlainTxt()">获得带格式的纯文本</button>
				<button @click="hasContent()">判断是否有内容</button>
				<button @click="setFocus()">使编辑器获得焦点</button>
				<button @mousedown="isFocus(event)">编辑器是否获得焦点</button>
				<button @mousedown="setblur(event)">编辑器失去焦点</button>

			</div>
			<div>
				<button @click="getText()">获得当前选中的文本</button>
				<button @click="insertHtml()">插入给定的内容</button>
				<button id="enable" onclick="setEnabled()">可以编辑</button>
				<button @click="setDisabled()">不可编辑</button>
				<button @click=" UE.getEditor('editor').setHide()">隐藏编辑器</button>
				<button @click=" UE.getEditor('editor').setShow()">显示编辑器</button>
			</div>

		</div>
		<div>
			<button @click="createEditor()">
    创建编辑器</button>
			<button @click="deleteEditor()">
    删除编辑器</button>
		</div>

	</div>
</template>


<!--<script src="/static/Ueditor/ueditor.config.js"></script>
<script src="/static/Ueditor/ueditor.all.min.js"></script>
<script src="/static/Ueditor/lang/zh-cn/zh-cn.js"></script>
<script src="/static/Ueditor/ueditor.parse.min.js"></script>-->
<script>
	/*引入依赖的js*/
	import config from '../../../static/Ueditor/ueditor.config.js';
	import all from '../../../static/Ueditor/ueditor.all.min.js';
	import lang from '../../../static/Ueditor/lang/zh-cn/zh-cn.js';
	import parse from '../../../static/Ueditor/ueditor.parse.min.js';
		
	export default {
		name: "myUeditor",
		data() {
			return {

			}
		},
		mounted() {
			var ue;
			setTimeout(function(){
				ue = UE.getEditor('editor');
			},1000)
			
		},
		methods: {
			isFocus(e) {
				alert(UE.getEditor('editor').isFocus());
				UE.dom.domUtils.preventDefault(e)
			},

			setblur(e) {
				UE.getEditor('editor').blur();
				UE.dom.domUtils.preventDefault(e)
			},

			insertHtml() {
				var value = prompt('插入html代码', '');
				UE.getEditor('editor').execCommand('insertHtml', value)
			},

			createEditor() {
				enableBtn();
				UE.getEditor('editor');
			},

			getAllHtml() {
				alert(UE.getEditor('editor').getAllHtml())
			},

			getContent() {
				var arr = [];
				arr.push("使用editor.getContent()方法可以获得编辑器的内容");
				arr.push("内容为：");
				arr.push(UE.getEditor('editor').getContent());
				alert(arr.join("\n"));
			},

			getPlainTxt() {
				var arr = [];
				arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
				arr.push("内容为：");
				arr.push(UE.getEditor('editor').getPlainTxt());
				alert(arr.join('\n'))
			},

			setContent(isAppendTo) {
				var arr = [];
				arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
				UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
				alert(arr.join("\n"));
			},

			setDisabled() {
				UE.getEditor('editor').setDisabled('fullscreen');
				disableBtn("enable");
			},

			setEnabled() {
				UE.getEditor('editor').setEnabled();
				enableBtn();
			},

			getText() {
				//当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
				var range = UE.getEditor('editor').selection.getRange();
				range.select();
				var txt = UE.getEditor('editor').selection.getText();
				alert(txt)
			},

			getContentTxt() {
				var arr = [];
				arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
				arr.push("编辑器的纯文本内容为：");
				arr.push(UE.getEditor('editor').getContentTxt());
				alert(arr.join("\n"));
			},

			hasContent() {
				var arr = [];
				arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
				arr.push("判断结果为：");
				arr.push(UE.getEditor('editor').hasContents());
				alert(arr.join("\n"));
			},

			setFocus() {
				UE.getEditor('editor').focus();
			},

			deleteEditor() {
				disableBtn();
				UE.getEditor('editor').destroy();
			},

			disableBtn(str) {
				var div = document.getElementById('btns');
				var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
				for(var i = 0, btn; btn = btns[i++];) {
					if(btn.id == str) {
						UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
					} else {
						btn.setAttribute("disabled", "true");
					}
				}
			},

			enableBtn() {
				var div = document.getElementById('btns');
				var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
				for(var i = 0, btn; btn = btns[i++];) {
					UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
				}
			}

		}
	}
</script>

<style>

</style>