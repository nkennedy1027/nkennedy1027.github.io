$(window).load(function() {

    function msieversion() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        var browserHTML = "<div id='browser'><div id='browser-wrap'><h1>Uh oh!</h1><p>Looks like you're using Internet Explorer...</p><p>This site works best on Chrome, Firefox, and Edge, so please  reload with one of those browsers.</p></div></div>";

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
            $("#home").before(browserHTML)
        }
        return false;
    }
    msieversion();

    var getSectCoords = function(){
        var sectCoords = [$("#home").offset().top,$("#about").offset().top,$("#apps").offset().top,$("#contact").offset().top,];
        return sectCoords;
    };

    jQuery(function($){
        var windowWidth = $(window).width();
        $(window).resize(function() {
            if(windowWidth != $(window).width()){
                getSectCoords();
                location.reload();
                return;
            }
        });
    });

    $.stellar({
        horizontalScrolling: false,
        responsive: true,
        hideDistantElements: false
    });

    if($(window).width() < 992){
        $("#home").css("padding-top", "35px")
    } else {
        $("#home").css("padding-top", "5px")
    }
    $('#dropdown-list').toggle();
    $('#navbar-dropdown').click(function() {
            $('#dropdown-list').toggle("slideDown");
        });


    $("#dropdown-list a").bind("click", function(event) {
        event.preventDefault();
        var target = $(this).attr("href");  
        $("html, body").stop().animate({
            scrollTop: $(target).offset().top - 35
        }, 1200);
    });

    $(".scroll-hover").hide().css('opacity', 1);
        var navIconHeight = function () {
        var height = $("#nav-wrap").height();
        $(".nav-button-wrap a img").css("height", height*0.25)
    };
    navIconHeight();

    $("#nav-wrap a").mouseenter(function(){
        var target = $(this).attr("href") + "-scroll-hover";
        var width = $(this).width();
        $(target).show(100);
        $(target).css("right", width);
    });
    $("#nav-wrap a").mouseleave(function(){
        var target = $(this).attr("href") + "-scroll-hover";
        $(target).css("right","2vw");
        $(target).hide(100);
    });
    
    $(window).scroll(function(){
        var sp = $(document).scrollTop();
        var gsc = getSectCoords();
        if (sp >= gsc[0] && sp <= gsc[1]*.25) {
            $("#scroll-bg").css("top", "0")
        } else if (sp >= gsc[1]*.85 && sp < gsc[1]*1.25) {
            $("#scroll-bg").css("top", "25%")
        } else if (sp >= gsc[2]*.85 && sp < gsc[2]*1.25) {
            $("#scroll-bg").css("top", "50%")
        } else if (sp >= gsc[3]*.85) {
            $("#scroll-bg").css("top", "75%")
        };
    });
    

    $("#nav-wrap a").bind("click", function(event) {
        event.preventDefault();
        var target = $(this).attr("href");  
        $("html, body").stop().animate({
            scrollTop: $(target).offset().top
        }, 1200);
        switch(target){
            case "#home":
            $("#scroll-bg").css("top", "0%")
            break;
            case "#about":
            $("#scroll-bg").css("top", "25%")
            break;
            case "#apps":
            $("#scroll-bg").css("top", "50%")
            break;
            case "#contact":
            $("#scroll-bg").css("top", "75%")
            break;
        }
    });

});