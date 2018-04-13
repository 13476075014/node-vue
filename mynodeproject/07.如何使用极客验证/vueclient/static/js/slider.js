
 var handler = function (captchaObj) {
        captchaObj.appendTo('#captcha');
        captchaObj.onReady(function () {
            $("#wait").hide();
        });
        $('#btn').click(function () {
            var result = captchaObj.getValidate();
            if (!result) {
                return alert('请完成验证');
            };
            $.ajax({
                url: 'http://localhost:3000/gt/validate-slide', //这里的地址是根据你的后台接口的地址，我这里是这样的
                type: 'POST',
                dataType: 'json',
                data: {
                    username: $('#username2').val(), //用户名
                    password: $('#password2').val(), //密码
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode
                },
                success: function (data) {
                    if (data.status === 'success') {
                        alert('登录成功');
                    } else if (data.status === 'fail') {
                        alert('登录失败，请完成验证');
                        captchaObj.reset();
                    }
                },
                error:function(jqXHR,textStatus,errorThrown){
                      console.log("错误")
                }
            });
        })
        // 更多接口说明请参见：http://docs.geetest.com/install/client/web-front/
    };


    $.ajax({//这个地址也是需要根据自己的后台接口地址来改动
        url: "http://localhost:3000/gt/register-slide?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
				console.log(data)
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
                width: "300px"
                // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            }, handler);
        },
        error:function(){
          console.log("噢噢噢")
        }
    });


