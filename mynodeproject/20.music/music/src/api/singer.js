// import { commonPramas,options} from './config.js'
import { commonPramas, axiosdefault } from './config.js'
// import jsonp from '_common/js/jsonp.js'
import Axios from 'axios'

Axios.defaults.withCredentials = axiosdefault ? axiosdefault.withCredentials : ''
Axios.defaults.baseURL = axiosdefault ? axiosdefault.baseURL : ''

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

// 获取歌手和歌曲的详细信息
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

// 通过songmid来获取vkey,拼接歌曲地址
// http://dl.stream.qqmusic.qq.com/{filename}?vkey={vkey}&fromtag=66
export function getVkey (songmid) {
    const url3 = '/api/getSongVkey'
    const data3 = Object.assign({}, commonPramas, {
        g_tk: '678733985',
        'hostUin': '0',
        'format': 'json',
        'inCharset': 'utf8',
        'notice': '0',
        'platform': 'yqq',
        'needNewCode': '0',
        'cid': '205361747',
        'songmid': songmid,
        'filename': 'C100' + songmid + '.m4a',
        'guid': '1674273789'
    })
    return Axios.get(url3, { params: data3 }).then(response => {
        return Promise.resolve(response.data)
    })
}
// export function getVkey (songmid) {
//     const url3 = '/api/getSongVkey'
//     const data3 = Object.assign({}, commonPramas, {
//         g_tk: '5381',
//         guid: '9136027940',
//         loginUin: '0',
//         platform: 'yqq',
//         needNewCode: '0',
//         data: {
//             'req': {
//                 'module': 'CDN.SrfCdnDispatchServer',
//                 'method': 'GetCdnDispatch',
//                 'param': { 'guid': '4547511582', 'calltype': 0, 'userip': '' }
//             },
//             'req_0 ': {
//                 'module': 'vkey.GetVkeyServer',
//                 'method': 'CgiGetVkey',
//                 'param': { 'guid': '4547511582', 'songmid': [songmid], 'songtype': [0], 'uin': '0', 'loginflag': 1, 'platform': '20' }
//             },
//             'comm': { 'uin': 0, 'format': 'json', 'ct': 20, 'cv': 0 }
//         }
//     })
//     return Axios.get(url3, { params: data3 }).then(response => {
//         return Promise.resolve(response.data)
//     })
// }

// 2018.11.16原来的获取歌曲的地址和vkey现在获取不到播放的地址
// 新拉的接口
export const getNewVey = function (songmid) {
    const url3 = '/api/getSongVkey'
    const data3 = Object.assign({}, commonPramas, {
        g_tk: '510614530',
        'hostUin': '0',
        'format': 'json',
        'inCharset': 'utf8',
        'notice': '0',
        'platform': 'yqq',
        'needNewCode': '0',
        'cid': '205361747',
        'songmid': songmid,
        'filename': 'C100' + songmid + '.m4a',
        'guid': '1674273789'
    })
    return Axios.get(url3, { params: data3 }).then(response => {
        return Promise.resolve(response.data)
    })
}
