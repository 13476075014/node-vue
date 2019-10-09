## 公用的table组件的配置参数data

### 一：tableConfig 一些table个性化的配置

``` vue

{
  height:String,  // 配置table的高度
  showOpera:Boolean // 配置是否展示最后一列关于操作的按钮，true是展示，false是隐藏
}

```

### 二：所有要渲染成表格的数据，必须包含的字段

``` vue

{
  fil:Array  // 这个参数是设置那些字段是可以被筛选的
}

```
