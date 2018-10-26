// 这个文件是利用前面进一步封装的jsonp来跨域抓取网上QQ音乐的真实的数据
// import { commonPramas, options } from './config.js'
import { commonPramas } from './config.js'
import Axios from 'axios'
// import jsonp from '_common/js/jsonp.js'

// 拉取QQ音乐的首页的轮播图的数据，之前是用的jsonp的方法跨域本地请求，但是由于后面这个QQ网页在请求这个接口的时候，给了一个referer的限制，所以获取不到，后面通过用Axios和在webpack.dev.conf.js中模拟本地接口请求和referer设置，请求得到
export function getRecommend () {
    // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonPramas, {
        // 请求资源发起方是用的什么页面类型
        platform: 'h5',
        // uin：登录的 qq号
        uin: 0,
        needNewCode: 1
    })

    // return jsonp(url, data, options)  //这是在没有referer限制的时候可以用jsonp来拉取数据
    return Axios.get('/api/getRecommend', {
        params: data
    }).then(function (res) {
        return Promise.resolve(res.data)
    })
}

// 在QQ音乐上面拉取pc端的全部歌单页面里面的歌曲数据
export function getDiscList () {
    // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    const data = Object.assign({}, commonPramas, {
            platform: 'yqq',
            hostUin: 0,
            sin: 0,
            ein: 29,
            sortId: 5,
            needNewCode: 0,
            categoryId: 10000000,
            rnd: Math.random()
        })
        // return jsonp(url, data, options)
    return Axios.get('/api/getDiscList', {
        params: data
    }).then(function (res) {
        return Promise.resolve(res.data)
    })
}

// 获取推荐页面的点开详情的信息
export function getSongList (dissid) {
    //  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    const url = '/api/getSongList'
    const data = Object.assign({}, commonPramas, {
            platform: 'yqq',
            hostUin: 0,
            type: 1,
            json: 1,
            onlysong: 0,
            needNewCode: 0,
            gtk: 67232076,
            disstid: dissid
        })
        // return jsonp(url, data, options)
    return Axios.get(url, {
        params: data
    }).then(function (res) {
        return Promise.resolve(res.data)
    })
}
