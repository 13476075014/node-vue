$(function() {
    //$('.carousel').carousel();
    //导航栏Li的点击事件
    $(".navbar-nav>li").on("click", function() {
        $(".navbar-nav>li").removeClass("nav_active");
        $(this).addClass("nav_active");
    })




    $("audio").get(0).volume = 0.3;

    function li_active(obj) {
        obj.find(">a").css({
            "color": "#ffc77f"
        });
        var oleft = obj.offset().left;
        var owidth = obj.outerWidth(true);
        $(".nav_slider").css({
            "left": oleft,
            "opacity": "1",
            "width": owidth
        });
    }

    li_active($(".nav_active"))

    //适应屏幕决定content的margin-top值；
    function con_margin() {
        var banner_height = $(".return_image").outerHeight(true);
        $(".content").css("margin-top", banner_height);
    };

    var audio_index = ["images/a1.mp3", "images/a2.mp3", "images/a3.mp3", "images/a4.mp3", "images/a5.mp3"]
    window.onload = function() {
        //轮播图的高度调整
        function carimg() {
            var returnimg_h = $(".carousel-inner .item.active img").outerHeight(true);
            $(".carousel-inner img").css({
                "height": returnimg_h,
                "width": "100%"
            });

        };
        carimg();
        con_margin();

        window.onresize = function() {
            $(".carousel-inner .item.active img").css("height", "auto");
            carimg();

            carimg();
            con_margin();
            li_active($(".nav_active"));
            nav_change();
        };
        nav_change();
        //导航栏的特效；
        function nav_change() {
            $(".navbar-nav>li").hover(function() {
                var auin = $(this).index() - 1;
                auin = auin % 5;
                $("audio").attr("src", audio_index[auin])
                $(this).find(">a").css({
                    "color": "#ffc77f"
                });
                var oleft = $(this).offset().left;
                var owidth = $(this).outerWidth(true);
                $(".nav_slider").css({
                    "left": oleft,
                    "opacity": "1",
                    "width": owidth
                });
                if ($(this).index() != $(".nav_active").index()) {
                    $(".nav_active").find(">a").css("color", "rgb(119,119,119)");
                };

            }, function() {
                $(this).find(">a").css({
                    "color": "rgb(119,119,119)"
                });
                li_active($(".nav_active"));
            });
        };

        //第一个内容的距离顶部的距离
        $(".con_inner li").css({
            "top": "0",
            "left": "0",
            "transform": "scale(1)"
        });

    };
    //写一个滚动事件
    $(window).on("scroll", function() {
        var scrotop = $(window).scrollTop(); //获取当前的滚动高度
        //第一个内容的距离顶部的距离
        var con1_top = $(".con_inner").offset().top + 30;
        var wh = $(window).height();
        var now_top = scrotop + wh;
        if (now_top >= con1_top) {
            $(".con_inner li").css({
                "top": "0",
                "left": "0",
                "transform": "scale(1)"
            })
        } else {
            $(".con_inner li:eq(0)").css({
                "top": "220px",
                "left": "-220px",
                "transform": "scale(0)"
            });
            $(".con_inner li:eq(1)").css({
                "top": "220px",
                "left": "0px",
                "transform": "scale(0)"
            });
            $(".con_inner li:eq(2)").css({
                "top": "220px",
                "left": "220px",
                "transform": "scale(0)"
            });
        };

    });

    //内容1的一些效果
    $(".con_inner ul").on("mouseenter", "li", function() {
        $(this).find(".shade").css({
            "opacity": "1"
        });
        $(this).find(".shade p").css({
            "left": "0"
        });
    });
    $(".con_inner ul").on("mouseleave", "li", function() {
        $(this).find(".shade").css({
            "opacity": "0"
        });
        $(this).find(".shade p:nth-of-type(1)").css({
            "left": "-60px"
        });
        $(this).find(".shade p:nth-of-type(2)").css({
            "left": "60px"
        });
    });

})