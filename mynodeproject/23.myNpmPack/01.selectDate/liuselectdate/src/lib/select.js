//自己封装的弹框插件

var selectDayActive = function(event) { // 选择天
    var ev = event || window.event;
    var tar = ev.currentTarget;
    var day = new Date().getDate();
    day = day * 1;
    var text = $(tar).text();
    text = text.slice(3);
    $("#ul_time li").removeClass("active");
    if (text == day) {
        $("#ul_time li.hid").unbind('click');
        $("#ul_time li.hid").addClass("hasOld");
    } else {
        $("#ul_time li").click(selectTimeActive);
        $("#ul_time li.hasOld").removeClass("hasOld");
    };
    $(tar).parent("ul").find('li').removeClass("active");
    $(tar).addClass("active");
};
var selectTimeActive = function(event) {
    var ev = event || window.event;
    var tar = ev.target;
    $(tar).parent("ul").find('li').removeClass("active");
    $(tar).addClass("active");
};



(function($) {
    //填充渲染时间元素的函数
    var fillTime = function(text) { // text是从几点开始
        var noeHour = new Date().getHours();
        var nowMinu = new Date().getMinutes();
        var inner_li = "";
        for (var i = 0; i < 28; i++) {
            text = (i + 1) % 2 == 0 ? ++text : text;
            if (noeHour > text) {
                inner_li += "<li class='hasOld hid'>" + (text < 10 ? '0' + text : text) + ":" + ((i + 1) % 2 == 0 ? '00' : 30) + "</li>";
            } else if (noeHour == text && nowMinu >= ((i + 1) % 2 == 0 ? '00' : 30)) {
                inner_li += "<li class='hasOld hid'>" + (text < 10 ? '0' + text : text) + ":" + ((i + 1) % 2 == 0 ? '00' : 30) + "</li>";
            } else {
                inner_li += "<li onclick='selectTimeActive(event)'>" + (text < 10 ? '0' + text : text) + ":" + ((i + 1) % 2 == 0 ? '00' : 30) + "</li>"
            }

        };
        inner_li = "<ul id='ul_time' class='inner'>" + inner_li + "</ul>"
        return inner_li;
    };

    var fillDay = function(nowDate, maxLength) { // nowDate: 是起始日期;  maxLength:是渲染从起始日期的后几天一共
        var li = "";
        if (nowDate.getDate() < new Date().getDate()) {
            return false;
        };
        var dada = new Date(nowDate);
        for (var i = 0; i < maxLength; i++) {
            if (i != 0) {
                dada.setDate(dada.getDate() + 1); // 循环加1天
            };
            var month = dada.getMonth() + 1;
            if (month < 10) { month = "0" + month; };
            var date = dada.getDate();
            if (date < 10) { date = "0" + date; };
            var da = month + "-" + date;
            li += "<li onclick='selectDayActive(event)'>" + da + "</li>"
        };
        var ul = "<ul id='ul_day' class='inner_day'>" + li + "</ul>";
        return ul;
    };


    //公用弹框
    var openLayer = function(title, content, btn, area, yes) {
        layIndex = layer.open({
            title: title,
            area: ["80%"],
            btn: btn,
            btnAlign: 'c',
            skin: 'mylayer',
            content: content,
            yes: yes
        });
    };

    $.fn.openTip = function(options) { //options{hour,nowDate,maxLength,layer,title,content,btn,areas,yes}
        var defaultOptions = {
            btn: ["确定"],
            areas: ["80", "80"],
            hour: 7, // 填充时间元素函数中的，是要几点开始
            nowDate: new Date(), //填充日期天元素函数中的，是要从那一天开始开始
            maxLength: 6 // 填充日期天元素函数中的，是要填充一共几天
        };
        var newOptions = $.extend(defaultOptions, options);
        var _this = this;
        // 调用的元素就绑定这个点击事件
        $(this).click(function() {
            newOptions.dom = $(this);
            $(this).blur();
            var _this = this;
            //选择后的回调函数
            var yes_Date = function(index, layero) {
                var day = $("#ul_day li.active").text();
                if (!day) {
                    alert("请选择日期");
                    return false;
                };
                var time = $("#ul_time li.active").text();
                if (!time) {
                    alert("请选择时间");
                    return false;
                };
                var rDate = new Date();
                var year = rDate.getFullYear();
                var data = year + "-" + day + " " + time;
                $(_this).val(data);
                layer.close(index);
            };
            //生成元素
            var ul = fillDay(newOptions.nowDate, newOptions.maxLength);
            if (ul) {
                var content = "<div id='outTip'><p>请选择日期：</p>" + ul + "<p>请选择时间：</p>" + (fillTime(newOptions.hour)) + "</div>";
                openLayer(newOptions.title, content, newOptions.btn, newOptions.areas, yes_Date)
            } else {
                var content = "<div id='outTip'>请选择正确初始日期，日期不能小于当前日期</div>";
                openLayer("错误提示", content, newOptions.btn, newOptions.areas, function(index, layero) { layer.close(index); })
            }

        })

    }

})(jQuery)