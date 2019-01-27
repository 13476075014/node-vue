/* 这个是一些接口地址的配置文件 */
export const ipDetail = {
    data_header: 'http://localhost:55145' // 域名位置
}

export const url = {
    '/index/main-one': '/index/main-one',
    '/ModuleManager/Index': '/index/menu' // 模块管理的地址
}

export const apiUrl = {
    '菜单配置': '/UserSession/GetModulesTree',
    '添加模块': '/moduleManager/Add',
    '修改模块': '/moduleManager/Update',
    '获取按钮': '/ModuleManager/LoadAuthorizedMenus?modulecode=Module',
    '获取用户可见按钮': '/ModuleManager/LoadAuthorizedMenus', // 参数要加上?modulecode=Role
    '获取模块所有按钮': '/ModuleManager/LoadMenus', // 参数要加上 ?page=1&limit=10&moduleId=4
    '更新按钮设置': '/moduleManager/UpdateMenu'
}

export const apiMenuAuthQuery = {
    '菜单配置': 'Module'
}
