import { mapState } from 'vuex'
export const base = {
    beforeCreate() {
        if (!this.menu.length) { // 没有menu数据的话话，就重新获取

        }
    },
    computed: {
        ...mapState(['menu'])
    }
}
