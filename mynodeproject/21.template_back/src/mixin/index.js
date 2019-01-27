import { apiUrl } from '@/assets/js/config'
import { dealFoodMenu } from '@/assets/js/menu/leftMenu'
import { mapMutations, mapState } from 'vuex'

export const base = {
    beforeMount () {
        if (!this.menu.length) {
            this.$reqs.get(apiUrl['菜单配置']).then(res => { // 获取菜单数据
                if (res.statusText === 'OK') {
                    const newMenu = JSON.parse(JSON.stringify(res.data))
                    dealFoodMenu(newMenu)
                    this.setMenu(newMenu.slice(1))
                }
            }).catch(res => {
                console.log(res)
            })
        }
    },
    created () {

    },
    methods: {
        getData () {
            this.$reqs.get(apiUrl['菜单配置']).then(res => { // 获取菜单数据
                if (res.statusText === 'OK') {
                    const newMenu = JSON.parse(JSON.stringify(res.data))
                    dealFoodMenu(newMenu)
                    this.setMenu(newMenu.slice(1))
                }
            }).catch(res => {
                console.log(res)
            })
        },
        ...mapMutations({ 'setMenu': 'SET_MENU' })
    },
    computed: {
        ...mapState(['menu'])
    }
}
