import { apiUrl } from '@/assets/js/config'
import { dealFoodMenu } from '@/assets/js/menu/leftMenu'
import { mapMutations, mapState } from 'vuex'

export const base = {
    beforeMount () {
        if (!this.menu.length) {
            console.log(this.$data)
            this.$reqs.get(apiUrl['模块管理']).then(res => { // 获取菜单数据
                console.log(res)
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
            this.$reqs.get(apiUrl['模块管理']).then(res => { // 获取菜单数据
                if (res.statusText === 'OK') {
                    const newMenu = JSON.parse(JSON.stringify(res.data))
                    dealFoodMenu(newMenu)
                    this.setMenu(newMenu.slice(1))
                }
            }).catch(res => {
                console.log(res)
            })
        },
        computedHeight () {
            // modulecode
            this.$nextTick(() => {
                if (this.$refs.baseTable) {
                    if (this.$refs.baseTable.getClientRects()[0]) {
                        const h = this.$refs.baseTable.getClientRects()[0].height - 60 - 52 - 45
                        this.$set(this.tableConfig, 'height', h)
                    }
                } else if (this.$refs.menuRight) {
                    if (this.$refs.menuRight.getClientRects()[0]) {
                        const h = this.$refs.menuRight.getClientRects()[0].height - 60 - 43
                        this.$set(this.tableConfig, 'height', h)
                    }
                }
            })
        },
        ...mapMutations({ 'setMenu': 'SET_MENU' })
    },
    computed: {
        ...mapState(['menu'])
    }
}

export const allNeed = {
    beforeCreate () {
        // alert(1)
        // window.removeEventListener('resize', this.computedHeight, false)
    }
}
