/*eslint-disable */
var slis = function(th) {
    var handler = function(captchaObj) {
        captchaObj.appendTo('#captcha')
        captchaObj.onReady(function() {
            $('#wait').hide()
        })
        $('#btn').click(function() {
                var result = captchaObj.getValidate()
                if (!result) {
                    return alert('请完成验证')
                }
                th.$router.push({ path: '/index/main-one' })
            })
            // 更多接口说明请参见：http://docs.geetest.com/install/client/web-front/
    }
    th.$reqs.get('/gt/register-slide?t=' + (new Date()).getTime()).then(function(data) {
        const result = data.data
            // 调用 initGeetest 进行初始化
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
        initGeetest({
            // 以下 4 个配置参数为必须，不能缺少
            gt: result.gt,
            challenge: result.challenge,
            offline: !result.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: result.new_captcha, // 用于宕机时表示是新验证码的宕机

            product: 'float', // 产品形式，包括：float，popup
            width: '300px'
                // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
        }, handler)
    }).catch(e => {
        console.log(e)
    })

}
export default slis