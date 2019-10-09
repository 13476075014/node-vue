$(function() {
	var arr = $(".drop");
	$.each(arr, function(i, v) {
		var drop = $(v);
		var di = drop.attr("data-index");
		var li = $(".mainli").filter("[data-index=" + di + "]");
		drop.css("left", li.offset().left);
		drop.css("padding-left", li.width());
	});
	var headli;
	$("[data-index]").hover(function() {
		headli = $(".header").find(".mainli.act2");
		headli.removeClass("act2");
		var di = $(this).attr("data-index");
		$(".mainli").filter("[data-index=" + di + "]").addClass("act");
		$(".drop").filter("[data-index=" + di + "]").addClass("act");
	}, function() {
		var di = $(this).attr("data-index");
		headli.addClass("act2");
		$(".mainli").filter("[data-index=" + di + "]").removeClass("act");
		$(".drop").filter("[data-index=" + di + "]").removeClass("act");
	});
	$(".navbtn").click(function() {
		$(this).toggleClass('act');
		$("body").toggleClass("act");
		$(".headerm").toggleClass("act");
		$(".navdiv").toggleClass("act");
	});
	$(window).scroll(function() {
		if ($(window).scrollTop() > 100) {
			$("header").addClass("act");
		} else {
			$("header").removeClass("act");
		}
		if ($(window).scrollTop() > 100) {
			$(".up").addClass("act");
		} else {
			$(".up").removeClass("act");
		}
		if ($(window).width() <= 991) {
			if ($(window).scrollTop() > 70) {
				$(".secnavm").addClass("act");
				$(".secnavm").next().addClass("paddingtop");
				if ($(".navbtn").hasClass("act")) {
					$(".secnavm").addClass("act2");
				}
			} else {
				$(".secnavm").removeClass("act");
				$(".secnavm").next().removeClass("paddingtop");
				$(".secnavm").removeClass("act2");
			}
		}
	});
	if ($(window).width() <= 991) {
		if ($(window).scrollTop() > 70) {
			$(".secnavm").addClass("act");
			$(".secnavm").next().addClass("paddingtop");
		} else {
			$(".secnavm").removeClass("act");
			$(".secnavm").next().removeClass("paddingtop");
		}
	}
	if ($(window).scrollTop() > 100) {
		$(".up").addClass("act");

	} else {
		$(".up").removeClass("act");
	}
	var li;
	$(".secnav").find("li").not(".act").hover(function() {
		li = $(".secnav").find("li.act")
		li.removeClass("act");
		$(this).addClass("act");
	}, function() {
		li.addClass("act");
		$(this).removeClass("act");
	});
	$(".secnavm").find("h4").click(function() {
		$(this).next().slideToggle();
		$(this).find("img").toggleClass('act');
	});
	$(".up").click(function(event) {
		/* Act on the event */
		$("html,body").animate({
			scrollTop: 0
		}, 300);
	});
})