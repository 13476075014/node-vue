import { menu } from '@/assets/api/menu'

export const dealMenu = function () { // 处理菜单数据
    let data = menu
    let arr = [{ id: 0, label: '根目录', children: [] }]
    data.forEach((item, index) => {
        if (item.ParentId === 0) {
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
            arr[0].children[tip].children.push(item)
        }
    })

    return arr.slice(0)
}
