// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': 0, // 忽略indent
        "no-tabs": "off",
        "newline-after-var": "off",
        "no-spaced-func": "off",
        "eqeqeq": "off", //取消非要写成 ！== 这个规则
        "no-unused-expressions": "off",
        "one-var": "off", // 取消一个var不能连续声明的规则，例如 var a , b , c 这里如果不取消这样的表达就会把报错
        "standard/no-callback-literal": "off",
        "key-spacing": "off" //键值对空格取消
    }
}