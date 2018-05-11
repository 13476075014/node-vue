var slis = function(th) {



    var handler = function(captchaObj) {
        captchaObj.appendTo('#captcha');
        captchaObj.onReady(function() {
            $("#wait").hide();
        });
        $('#btn').click(function() {
                var result = captchaObj.getValidate();
                if (!result) {
                    return alert('请完成验证');
                }
                $.ajax({
                    url: 'http://localhost:3000/users/login', //验证的地址
                    type: 'POST',
                    dataType: 'json',
                    xhrFields: { //这里一定要加上这个，否则的话，跨域保存session将失效；
                        withCredentials: true
                    },
                    data: {
                        username: th.ruleForm2.username,
                        password: th.ruleForm2.pass,
                        geetest_challenge: result.geetest_challenge,
                        geetest_validate: result.geetest_validate,
                        geetest_seccode: result.geetest_seccode
                    },
                    success: function(data) {
                        if (data.status === 'success') {
                            //alert('登录成功');
                            console.log(th);
                            th.$router.push({ path: '/index_one' });
                        } else if (data.status === 'error') {
                            console.log(th.ruleForm2.pass)
                            alert(data.info);
                            captchaObj.reset();
                        } else if (data.status === 'fail') {
                            alert('登录失败，请完成验证');
                            captchaObj.reset();

                        }
                    }
                });
            })
            // 更多接口说明请参见：http://docs.geetest.com/install/client/web-front/
    };


    $.ajax({
        url: "http://localhost:3000/users/gt/register-slide?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function(data) {

            // 调用 initGeetest 进行初始化
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest({
                // 以下 4 个配置参数为必须，不能缺少
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

                product: "float", // 产品形式，包括：float，popup
                width: "220px"
                    // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            }, handler);
        }
    });

};
export default slis;