'use strict';

module.exports = {

    types: [
        {value: 'feat',     name: '需求:    新增一个新需求'},
        {value: 'fix',      name: '修复:    修复一个Bug'},
        {value: 'docs',     name: '文档:    变更的只有文档'},
        {value: 'format',   name: '格式:    空格, 分号等格式修复'},
        {value: 'refactor', name: '重构:    代码重构，注意和特性、修复区分开'},
        {value: 'perf',     name: '性能:    提升性能'},
        {value: 'test',     name: '测试:    添加一个测试'},
        {value: 'tool',     name: '工具:    开发工具变动(构建、脚手架工具等)'},
        {value: 'revert',   name: '回滚:    代码回退'},
        {value: 'merge',    name: '合并:    代码合并'}
    ],

    scopes: [
        {name: 'All', value: "all"},
        {name: 'Api', value: "api"},
        {name: 'Service', value: "service"},
        {name: 'Dao', value: "dao"},
        {name: 'Common', value: "common"}
    ],

    // it needs to match the value for field type. Eg.: 'fix'
    /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
    // override the messages, defaults are as follows
    messages: {
        type: '请选择提交类型:',
        scope: '请选择Scope:',
        // used if allowCustomScopes is true
        customScope: 'Denote the SCOPE of this change:',
        subject: '请输入简短的说明:\n',
        body: '请输入长说明，可使用"|"换行(可选)：\n',
        breaking: '非兼容性说明 (可选):\n',
        footer: '关联关闭的issue，例如：#31, #34(可选):\n',
        confirmCommit: '确定提交说明?'
    },

    allowCustomScopes: true,
    allowBreakingChanges: ['特性', '修复'],

    // limit subject length
    subjectLimit: 100

};
