// 用这个对象混入到vue中，初始化需要影响的所有组件的一些内容

/* eslint-disable */
import { mapGetters } from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters(['playList'])
    },
    mounted() {
        this.handlePlaylist(this.playList)
    },
    activated() {
        this.handlePlaylist(this.playList)
    },
    watch: {
        playList(newV) {
            this.handlePlaylist(this.playList)
        }
    },
    methods: {
        handlePlaylist() {

        }
    }
}