/* 这个是一些接口地址的配置文件 */
export const ipDetail = {
    data_header: 'http://10.202.2.112:55145' // 域名位置
}

export const url = {
    '/index/main-one': '/index/main-one',
    '/ModuleManager/Index': '/index/menu', // 模块管理的地址
    '/OrgManager/Index': '/index/org', // 部门管理
    '/RoleManager/Index': '/index/role', // 角色管理
    '/UserManager/Index': '/index/user', // 用户管理
    '/Product/Index': '/index/product' // 菜品列表
}

export const apiUrl = { // 一些接口地址
    '模块管理': '/UserSession/GetModulesTree',
    '添加模块': '/moduleManager/Add',
    '修改模块': '/moduleManager/Update',
    '获取按钮': '/ModuleManager/LoadAuthorizedMenus?modulecode=Module',
    '获取用户可见按钮': '/ModuleManager/LoadAuthorizedMenus', // 参数要加上?modulecode=Role
    '获取模块所有按钮': '/ModuleManager/LoadMenus', // 参数要加上 ?page=1&limit=10&moduleId=4
    '更新按钮设置': '/moduleManager/UpdateMenu',
    '新增按钮': '/moduleManager/AddMenu', // ModuleId: 4；Name: 66； DomId: btnkl；Class: ；Sort: 8
    '删除按钮': '/moduleManager/DelMenu', // ids[]: 34
    '部门管理': '/UserSession/GetSubOrgs?page=1&limit=10&orgId=0',
    '修改部门': '/OrgManager/Update', // Id: 1/Name: 集团总部/SortNo: 1/ParentName: 根节点/ParentId: 0
    '添加部门': '/OrgManager/Add', // Id: /Name: 555/SortNo: 1/ParentName: 集团总部/ParentId: 1
    '删除部门': '/OrgManager/Delete', // ids[]: 8
    '获取部门角色': '/RoleManager/Load?page=1&limit=10', // & orgId=2
    '新增角色': '/RoleManager/Add', // Name: haha;Organizations: 食品安全部;OrganizationIds: 2;Status: 1
    '更新角色': '/RoleManager/Update', // Id: 6; Name: 444445555888;Organizations: 集团总部; OrganizationIds: 1;Status: 1
    '获取部分用户': 'UserManager/Load?page=1&limit=10', // &orgId=1
    '新增或更新用户': '/UserManager/AddOrUpdate', // Id: ; Account: 555;Name: 555;Organizations: 集团总部; OrganizationIds: 1;Sex: 0;Status: 1
    '删除用户': '/UserManager/Delete', // ids[]: 4
    '更新菜品是否在售': '/Product/UpdateSailStatus', // post； Status:true ；id: 55
    '添加菜品': '/Product/AddProduct' // Form Data ; Name:...;Describe:....; pic1:file
}

export const apiMenuAuthQuery = { // 配置后台的基本页面的菜单按钮获取的code名
    // href是其在tag中应该保存的名字
    '模块管理': { code: 'Module', href: '/ModuleManager/Index' },
    '菜品列表': { code: 'product', href: '/Product/Index', getDateListUrl: '/Product/GetProductList?page=1&limit=10' },
    '评价列表': { code: 'Comment', href: '/Comment/Index', getDateListUrl: '/Comment/GetCommentList?page=1&limit=10' },
    '部门管理': { code: 'Org', href: '/OrgManager/Index' },
    '角色管理': { code: 'Role', href: '/RoleManager/Index' },
    '用户管理': { code: 'User', href: '/UserManager/Index' }
}
