import { menu } from '@/assets/api/menu'

export const dealMenu = function () { // 处理左边菜单数据到需要的格式菜单数据(适用于服务家系统返回的格式)
    let data = menu
    let arr = []
    data.forEach((item, index) => {
        if (item.ParentId === 0) {
            if (item.ID === 0) {
                return true
            }
            item.title = item.Name
            item.icon = 'el-icon-menu'
            item.child = []
            arr.push(item)
        }
    })
    data.forEach((item, index) => {
        if (item.ParentId !== 0) {
            let tip = arr.findIndex((itemP) => {
                return itemP.ID == item.ParentId
            })
            item.text = item.Name
            item.href = item.Url
            arr[tip].child.push(item)
        }
    })
    console.log(arr)
    return arr.slice(0)
}

export const dealFoodMenu = function (data) {
    data.forEach((item, index) => {
        if (item.Item.Id == 1) {
            return false
        }
        item.title = item.Item.Name
        item.icon = item.Item.IconName
        item.href = item.Item.Url
        item.child = item.Children
        item.children = item.Children
        item.text = item.Item.Name
        item.ParentId = item.Item.ParentId
        item.label = item.Item.Name
        item.id = item.Item.Id
        item.SortNo = item.Item.SortNo
        item.ParentName = item.Item.ParentName
            // item.IsMenu = item.Item.IsMenu
        if (item.Item.ParentId !== 0) {
            // item.disabled = true
        }
        if (item.Children.length) {
            dealFoodMenu(item.Children)
        }
    })
}
