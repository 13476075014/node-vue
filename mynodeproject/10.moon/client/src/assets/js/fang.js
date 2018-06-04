var myfang = function(out, left, right) {
    //out最外层  ； left原图 ；right放大区域
    left.onmouseover = function() {
        var cw = document.documentElement.clientWidth;
        if (cw > 1000) {
            right.style.display = "block";
            //console.log(out.offsetTop)
            left.onmousemove = function(ev) {
                var scr = document.documentElement.scrollTop || document.body.scrollTop;
                var eve = ev || event;
                var xl = eve.clientX - out.offsetLeft; //鼠标距离out的左边的横轴距离
                var yl = eve.clientY - out.offsetTop + scr; //鼠标距离out的左边的纵轴距离 ；这里是要加上了y轴如果有滚动的话，滚动的高度
                var scarex = (xl / left.offsetWidth); //获取现在横轴占的左边目标放大图片的横轴所占百分比
                var scarey = (yl / left.offsetHeight); //获取现在纵轴占的左边目标放大图片的横轴所占百分比
                var right_img = right.getElementsByTagName("img")[0];
                right_img.style.left = -((right_img.offsetWidth - right.offsetWidth) * scarex) + "px";
                right_img.style.top = -((right_img.offsetHeight - right.offsetHeight) * scarey) + "px";
            };
        };
    };
    left.onmouseout = function() {
        right.style.display = "none";
    };
};

export default myfang;