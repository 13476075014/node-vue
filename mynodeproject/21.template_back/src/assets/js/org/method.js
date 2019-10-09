// import { mydata } from '@/assets/api/org'

export const delOrgData = function (mydata) {
    let data = mydata.slice(0)
    let arr = [{ Id: 0, value: '0', label: '根目录', ParentId: 0, children: [] }]
    data.forEach((item, index) => {
        if (item.ParentId == 0) { // 处理一级
            item.value = item.Id
            item.label = item.Name
            item.children = []
            arr[0].children.push(item)
        }
    })
    data.forEach((item, index) => {
        if (item.ParentId != 0) { // 处理二级
            const index2 = arr[0].children.findIndex((item2, index3) => {
                return item2.Id == item.ParentId
            })
            item.value = item.Id
            item.label = item.Name
                // item.disabled = true
            arr[0].children[index2].children.push(item)
        }
    })
    return arr
}
