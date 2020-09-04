vue-cli的浏览器兼容的配置

#### 一：通过browserslist来指定项目的目标浏览器范围，编译时会根据配置的目标浏览器来有针对性的转义；

* 参考地址：[github关于browserslist开源项目使用介绍](https://github.com/browserslist/browserslist)

* 参考地址：[vue-cli官网介绍](https://github.com/browserslist/browserslist)

  ```javascript
  //例如在package.json中的配置
  //这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。
  {
    "private": true,
    "dependencies": {
      "autoprefixer": "^6.5.4"
    },
    "browserslist": [
      "last 1 version",
      "> 1%",
      "IE 10"
    ]
  }
  ```

  #### 二：通过babel.config.js（新版本的cli支持这个方式）来结合上面进行babel转义的配置；

  * 参考地址 [cli-babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue)

    ```javascript
    //根目录下的babel.config.js配置
    //安装dev  "@vue/cli-plugin-babel": "^4.0.4"
    //安装save  "core-js": "^3.1.2"
    module.exports = {
      presets: [
        '@vue/cli-plugin-babel/preset',
        [
          '@babel/preset-env',
          {
            'useBuiltIns': 'entry',
            'corejs': 3
          }
        ]
      ],
      plugins:[]
    }
    
    ```

    ##### 2.1 关于 useBuiltIns 的配置，三个可选项 [false,'entry','usage']

    2.1.1."useBuiltIns": false

    (此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。)

    2.1.2."useBuiltIns": "entry","corejs": 2,

     (根据配置的浏览器兼容，引入浏览器不兼容的 `polyfill`。需要在入口文件手动添加 `import '@babel/polyfill'`，会自动根据 `browserslist` 替换成浏览器不兼容的所有 `polyfill`。

    这里需要指定 `core-js` 的版本, 如果 `"corejs": 3`, 则 `import '@babel/polyfill'` 需要改成下面这样:)
    

    ```javascript
    // 在main.js的头部
    import 'core-js/stable';
    import 'regenerator-runtime/runtime';
    ```

    2.1.3."useBuiltIns": "usage","corejs": 2,

    (`usage` 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 `polyfill`，实现了按需添加。)

