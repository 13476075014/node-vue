// 实现数据的监听
function observe(data){
    if(!data || typeof data != 'object'){
        return
    }
    Object.keys(data).forEach((item,index) =>{
        dealProperty(data,item,data[item])
    })
}

function dealProperty(data,key,value){
    //属性有：数据属性，和，访问器属性
    //定义属性的访问器属性
    observe(value) //监听字属性
    Object.defineProperty(data,key,{
        enumerable:true, //是否可枚举
        configurable:false,//是否可再次define
        get(){
            return value
        },
        set(newval){
            value = newval
        }
    })
}
