## typescript的基础语法之泛型

### 泛型语法

* 在一开始定义一个实例的类型，下面所有用到了T的都必须一致是一种类型

#### 1.泛型函数

* 定义：泛型是可以支持不特定的数据类型，但是传入的参数类型必须和返回的参数类型一致

```javascript
//泛型的使用，规定函数getName的返回值和参数可以是任意类型，但是必须一致
function getName<T>(value:T):T{
  return value
}
//下面这样写是都是数字类型，如果参数传一个字符串会报错
getName<number>(123)
getName<string>("123")

```

#### 2.泛型类

```javascript
class Getage<T>{//这个T就是泛型实例化的时候里面所有用到这个T的都必须和实例化时指定的类型一致
  public ageList:T[]=[]
  add(value:T):void{
    this.ageList.push(value)
  }
  result(i:number):T{
    return this.ageList[i]
  }
}
var myGetAge = new Getage<number>()
myGetAge.add(1)
// myGetAge.add("2") //这里传入的参数由于是泛型需要和实例时候规定的number类型一致，所以这样写会报错
myGetAge.add(2)
myGetAge.result(0)
```

#### 3.泛型接口

```javascript

```



