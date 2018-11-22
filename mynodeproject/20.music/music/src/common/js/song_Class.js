import { getLyric } from '@/api/song'
import { getVkey } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { Base64 } from 'js-base64'

/* 用es6的语法，在这里建一个song页面公用的类 */
export default class Song {
    constructor ({ id, mid, singer, name, album, duration, filename, image, url }) {
            this.id = id
            this.mid = mid
            this.singer = singer
            this.name = name
            this.album = album
            this.duration = duration
            this.image = image
            this.url = url
            this.filename = filename
        }
        // 得到vkey重新拼接url
    getVkeys () {
        if (this.vkey) {
            return Promise.resolve(this.vkey)
        }
        return getVkey(this.mid).then(res => {
            this.vkey = res.data.items[0].vkey
                // this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${this.vkey}&fromtag=66` // 这是原来的拼接方式，后来不可以用了
            this.url = `http://183.192.163.152/amobile.music.tc.qq.com/${this.filename}?guid=4547511582&vkey=${this.vkey}&fromtag=66`
            return Promise.resolve(this.vkey)
        })
    }
    getLyrics () { // 通过歌曲获取歌词
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then(res => { // 得到歌词
                if (res.retcode == ERR_OK) {
                    this.lyric = Base64.decode(res.lyric) // 因为得到的数据是被编码的，在这里通过插件转义
                    resolve(this.lyric)
                } else {
                    reject(new Error('no lyric'))
                }
            })
        })
    }
}

export function createSong (musicData, double) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer, double),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        filename: 'C100' + musicData.songmid + '.m4a',
        // 图片地址
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // 歌曲地址 filename=C100{songmid}.m4a  http://dl.stream.qqmusic.qq.com/{filename}?vkey={vkey}&fromtag=66
        url: musicData.url

    })
}
// http://dl.stream.qqmusic.qq.com/C100004dsKoM1grCjU.m4a?vkey=DF12255C1548EE6ADC632C2056D3955A449F72EAC25F66E1345C69E99854F3B264C988C3C750B4A3436E9462AED1C408D9813405102C6923&fromtag=66

// 工厂函数，直接用上面的类来处理一个固定格式的对象
function filterSinger (singer, double) {
    if (double == 'yes') {
        return singer
    }
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach(s => {
        ret.push(s.name)
    })
    return ret.join('/')
}
