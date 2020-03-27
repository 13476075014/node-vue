//实现元素的编译，各种指令和模版的
/**
 * 
 * @param {*元素容器} el 
 * @param {*vue的实例} vm 
 */
function Compile(el,vm){
    el = this.isElementNode(el) ? el : document.querySelector(el) ; //获取vue绑定的容器
    this.$vm = vm
    this.$fragement = document.createDocumentFragment()
    var child = null
    while(child = el.firstChild){
        //这里会一直循环直到el里没有元素了，因为每次把第一个子元素移到节点碎片里面的时候，就会从原节点里面移除出去
        this.$fragement.appendChild(child)
    }
}

Compile.prototype = {
    construct:Compile,
    isElementNode:function(el){//判断是否是元素节点
        return el.nodeType == 1
    },
    isTextNode:function(el){//判断是否是内容节点
        return el.nodeType == 3
    },
}