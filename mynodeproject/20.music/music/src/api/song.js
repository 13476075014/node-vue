import { commonPramas, axiosdefault } from './config.js'
import Axios from 'axios'
Axios.defaults.withCredentials = axiosdefault ? axiosdefault.withCredentials : ''
Axios.defaults.baseURL = axiosdefault ? axiosdefault.baseURL : ''

export function getLyric (mid) {
    const url = '/api/getLyric'
    const data = Object.assign({}, commonPramas, {
        songmid: mid,
        pcachetime: new Date(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        g_tk: 67232076,
        format: 'json'
    })

    return Axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}
