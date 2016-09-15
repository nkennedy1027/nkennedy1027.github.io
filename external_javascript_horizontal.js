$(document).ready(function() {
	window.onbeforeunload = function(){
		window.scrollTo(0,0);
	}
    $("#navbar a").bind("click", function(event) {
        event.preventDefault();
        var target = $(this).attr("href");
        $("html, body").stop().animate({
            scrollLeft: $(target).offset().left,
            scrollTop: $(target).offset().top
        }, 1200);
        $(window).resize(function() {
			$(window).scrollLeft($(target).offset().left);
		});
    });
});