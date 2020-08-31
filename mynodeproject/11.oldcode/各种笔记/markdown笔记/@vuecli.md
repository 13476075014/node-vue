@vue/cli

npm install  @vue/cli -g     ;   vue create  ; vue serve  ; vue ui 



--------



@vue/cli-service-global



-----



@vue/cli-service

是一个开发环境的依赖，是一个npm包，局部安装在项目中；

是cli服务，是构建于webpack和webpack-dev-server之上的；

该服务包含：

1.加载其他cli插件的核心服务；

2.一个针对绝大部分应用优化过的内部的webpack配置；

3.项目内部的vue-cli-service的命令，提供serve,build,inspect命令；

​	3.1 vue-cli-service serve 命令的使用：

```text
用法：vue-cli-service serve [options] [entry]

选项：

  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --https   使用 https (默认值：false)
```



---

cli插件

含义：cli插件是向你的vue项目提供可选功能的npm包，例如babel/eslint集成；

两种插件类型：

内建插件（@vue/cli-plugin-名字），都是以@开头；

社区插件（ vue-cli-plugin-名字)

使用过程：

当运行vue-cli-service命令时，会自动解析并加载package.json中列出的所有CLI插件，不管是内建的还是社区的；

----

vue create 快速创建一个建立在cli之上的项目脚手架





