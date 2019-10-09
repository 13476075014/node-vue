import { menu } from '@/assets/api/menu'

export const dealMenu = function () { // 处理菜单数据,浩优格式的
    let data = menu
    let arr = [{ ID: 0, value: '0', label: '根目录', ParentId: 0, children: [] }]
    data.forEach((item, index) => {
        if (item.ParentId === 0) {
            if (item.ID === 0) {
                return true
            }
            item.value = item.ID + ''
            item.label = item.Name
            item.children = []
            arr[0].children.push(item)
        }
    })
    data.forEach((item, index) => {
        if (item.ParentId !== 0) {
            let tip = arr[0].children.findIndex((itemP) => {
                return itemP.ID == item.ParentId
            })
            item.label = item.Name
            item.value = item.ID + ''
            item.disabled = true
            arr[0].children[tip].children.push(item)
        }
    })

    return arr.slice(0)
}

export const dealfoodMenu = function (data) { // 处理菜单树形，校园食堂的
    let arr = []
    arr.push({ id: 0, value: '0', label: '根目录', ParentId: 0, children: JSON.parse(JSON.stringify(data)) })
    arr[0].children.forEach((item, index) => {
        delete item.child
        delete item.Children
        delete item.Item
    })
    return arr
}
