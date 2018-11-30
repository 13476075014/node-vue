/* 排行榜的数据抓取 */
import { commonPramas, axiosdefault } from '@/api/config'
import axios from 'axios'
axios.defaults.withCredentials = axiosdefault ? axiosdefault.withCredentials : ''
axios.defaults.baseURL = axiosdefault ? axiosdefault.baseURL : ''

export function getTopList () {
    // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const url = '/api/getTopList'
    const data = Object.assign({}, commonPramas, {
        platform: 'h5',
        needNewCode: 1
    })
    return axios.get(url, { params: data }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getTopListDetail (id) {
    // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    const url = '/api/getTopListDetail'
    const data = Object.assign({}, commonPramas, {
        platform: 'h5',
        needNewCode: 1,
        page: 'detail',
        type: 'top',
        tpl: 3,
        topid: id
    })
    return axios.get(url, { params: data }).then((res) => {
        return Promise.resolve(res.data)
    })
}
