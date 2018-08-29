// 这个文件是公用的获取接口时候的公用的一些参数和参数值
export const commonPramas = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

// 这个是用jsonp获取 qq音乐数据时候的指定的回调函数名的配置
export const options = {
    param: 'jsonCallback'
}

// 这个是没有错误的话返回的字段
export const ERR_OK = 0
