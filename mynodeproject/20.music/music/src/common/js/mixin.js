// 用这个对象混入到vue中，初始化需要影响的所有组件的一些内容

import { mapGetters, mapMutations } from 'vuex'
import { playMode } from '_common/js/config'
import { shuffle } from '_common/js/util'

export const playlistMixin = { // 在有播放底部栏的时候，需要重新计算scroll高度的地方用到这个mixin
    computed: {
        ...mapGetters(['playList'])
    },
    mounted () {
        this.handlePlaylist(this.playList)
    },
    activated () {
        this.handlePlaylist(this.playList)
    },
    watch: {
        playList (newV) {
            this.handlePlaylist(this.playList)
        }
    },
    methods: {
        handlePlaylist () {

        }
    }
}

// 在player和playlist页面歌曲播放模式icon和事件共有的代码部分通过mixin抽出来
export const playerMixin = {
    methods: {
        changeMode () { // 改变当前播放模式后，改变播放列表等
            const mode = (this.mode + 1) % 3 // 通过取余3来循环三种播放的状态
            this.setPlayMode(mode)
            let list = null
            if (mode == playMode.random) {
                list = shuffle(this.sequenceList) // 把播放的列表打乱
            } else {
                list = this.sequenceList
            }
            this.resetCurrentSong(list) // 重置当前播放歌曲的下标
            this.setPlayList(list) // 通过vuex改变播放列表
        },
        resetCurrentSong (list) { // 重置当前播放歌曲
            let index = list.findIndex((item) => { // arr.findIndex是es6的语法，找到满足条件的数组下标index
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        ...mapMutations({
            setPlayState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX', // 改变vuex的currentindex的值
            setPlayMode: 'SET_PLAY_MODE', // 改变播放的模式
            setPlayList: 'SET_PLAYLIST' // 改变播放的列表
        })
    },
    computed: {
        iconMode () { // 播放模式的图标
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'currentIndex',
            'playing',
            'sequenceList',
            'mode'
        ])
    }
}
