// import { commonPramas,options} from './config.js'
import { commonPramas } from './config.js'
// import jsonp from '_common/js/jsonp.js'
import Axios from 'axios'

// 获取这些歌手信息在QQ音乐上，没有referer限制就直接用jsonp来实现了
export function getSingerList () {
    // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    const url = '/api/getSingerList'
    const data = Object.assign({}, commonPramas, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100, // 这里测试用只获取前100条数据
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return Axios.get(url, { params: data }).then(response => {
            return Promise.resolve(response.data)
        })
        // return jsonp(url, data, options)
}

export function getSingerDetail (singermid) {
    const url2 = '/api/getSingerDetail'
    const data2 = Object.assign({}, commonPramas, {
        platform: 'yqq',
        needNewCode: 0,
        order: 'listen',
        begin: 0,
        num: 30,
        songstatus: 1,
        singermid: singermid

    })
    return Axios.get(url2, { params: data2 }).then(response => {
        return Promise.resolve(response.data)
    })
}
