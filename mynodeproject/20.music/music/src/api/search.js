/* 搜索页面的数据拉取 */
import { commonPramas } from '@/api/config'
import Axios from 'axios'

// 1.热门搜索的推荐搜索接口
export function getHotKey () {
    // https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
    const url = '/api/getHotKey'
    const data = Object.assign({}, commonPramas, {
        g_tk: 1481109725,
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    return Axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}

// 2. 搜索的接口
export function search (query, page, zhida, perpage) {
    // https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp
    const url = '/api/getSearchData'
    const data = Object.assign({}, commonPramas, {
        w: query,
        p: page,
        catZhida: zhida ? 1 : 0,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: perpage,
        n: perpage,
        remoteplace: 'txt.mqq.all',
        needNewCode: 1,
        platform: 'h5'
    })
    return Axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}
