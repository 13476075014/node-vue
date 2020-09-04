## typescript的基础语法之interface

### interface语法

* 有属性类型接口和函数类型接口

* interface的用途：主要是来约束批量传入的参数和返回值的类型

  #### 1.属性类型接口

  ```javascript
  //使用场景例如下面这个属性类型接口可以用来约束自己封装的ajax必须传的参数和可选的参数
  interface Config{
  
  ​	type:string;
  
  ​	url:string;
  
  ​	data?:string;
  
  }
  function ajax(config:Config){
  	var xhr = new XMLHttpRequest();
      xhr.open(config.type,onfig.url,true)
      xhr.send(config.data);
      xhr.onreadystatechange=function(){
  		if(xhr.readyState==4&&xhr.status==200){
              console.log("请求成功")
          }
      }
  }
  //如果不传type/url就会报错提示
  ajax({
      type:"...",
      url:"...",
      data:"...",
  })
  ```

  #### 2.函数类型接口

  ```javascript
  //函数类型的接口的使用场景，可以规定传参的类型和返回值的类型
  interface encrypt{
      //定义这个类型的必须参数都是字符串类型和返回值也必须是字符串类型
  	(key:string,value:string):string
  }
  var md5:encrypt=function(key,value){
  	return key+value
  }
  ```

  #### 3.可索引接口

  ```javascript
  //1.使用场景可以用来定义数组的索引类型和值类型
  interface StrArr{
      //规定索引必须是number类型，值必须是字符串类型
  	[index:number]:string
  }
  var arr:StrArr=["aaa","ccc"]
  
  //2.使用场景也可以是用来对对象的类型约束
  interface ApiObj{
      //规定对象的key必须是字符串类型，值也必须是字符串类型
  	[index:string]:string
  }
  var apiJson:ApiObj={
      name:"123"
  }
  ```

  #### 4.类类型接口

  ```javascript
  interface Animal{
    name:string;
    eat(str:string):string
  }
  //猫类实现Animal接口这里用implements而不是冒号了，根据上面规定实现这个接口必须包含一个name的属性和eat的方法
  class Cat implements Animal{
    name="cat"
    eat(){
      return "123"
    }
  }
  ```

  #### 5.接口的扩展也可以叫接口的继承

  ```javascript
  interface plant{
    color:string;
    eat(str:string):string
  }
  interface flower extends plant{ //花继承植物
    fruit:boolean;
    water(str:string):string
  }
  class rose implements flower{ //玫瑰实现花接口，必须包含color，fruit属性和eat，water方法
    color="red"
    fruit=true
    eat(){
      return this.color
    }
    water(){
      return "yes"
    }
    
  }
  
  
  ```

  

  

