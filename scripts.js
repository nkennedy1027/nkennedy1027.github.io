// Cookies

function setCookie(cookieName, cookieValue, nDays) {
    var today = new Date();
    var expire = new Date();
    if (nDays == null || nDays == 0) nDays = 1;
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    document.cookie = cookieName + "=" + escape(cookieValue)
        + ";expires=" + expire.toGMTString();
}

function getCookie(cookieName) {
    var theCookie = " " + document.cookie;
    var ind = theCookie.indexOf(" " + cookieName + "=");
    if (ind == -1) ind = theCookie.indexOf(";" + cookieName + "=");
    if (ind == -1 || cookieName == "") return "";
    var ind1 = theCookie.indexOf(";", ind + 1);
    if (ind1 == -1) ind1 = theCookie.length;
    return unescape(theCookie.substring(ind + cookieName.length + 2, ind1));
}



$(document).ready(function () {


    var nav = $('.navcontrol'),
        main = $('#main'),
        left = $('#about'),
        right = $('#work'),
        below = $('#contact'),
        back = $('a.back');



    // ****** NAV FUNCTIONS ******

    nav.click(function () {
        let t = $(this);

        if (t.hasClass('left')) {
            main.addClass('move-right');
            left.addClass('toggled');
        } else if (t.hasClass('right')) {
            main.addClass('move-left');
            right.addClass('toggled');
        } else if (t.hasClass('down')) {
            main.addClass('move-up');
            below.addClass('toggled');
        }
    })

    back.click(function () {
        let t = $(this);

        t.closest('.slide').removeClass('toggled');

        if (main.hasClass('move-down')) {
            main.removeClass('move-down');
        } else if (main.hasClass('move-right')) {
            main.removeClass('move-right');
        } else if (main.hasClass('move-left')) {
            main.removeClass('move-left');
        } else if (main.hasClass('move-up')) {
            main.removeClass('move-up');
        }
    })


    // ****** ANIMATIONS/TRANSITIONS ******

    var paths = {};
    var delay;
    var customVars;

    var initPaths = function () {
        $("path").each(function () {
            let t = $(this),
                path = t.get(0),
                pathLength = path.getTotalLength(),
                objKey = t.attr("class"),
                o = {
                    name: t.attr("id"),
                    array: pathLength,
                    offset: (function () {
                        if (t.attr("id") === "main1") {
                            return 0;
                        } else {
                            return -pathLength;
                        }
                    })(),
                    duration: customVars[objKey - 1].duration,
                    delay: (function () {
                        let durationTotal = 0;
                        if (objKey === 1) {
                            return 0;
                        } else {
                            for (let i = 0; i < objKey - 1; i++) {
                                durationTotal = durationTotal + customVars[i].duration;
                                delay = durationTotal;
                            }
                            return durationTotal;
                        }
                    })(),
                    direction: customVars[objKey - 1].direction
                };
            t.css({
                "stroke-dasharray": o.array,
                "stroke-dashoffset": o.offset,
                'animation': o.duration + 's ease-in-out ' + o.delay + 's ' + o.name
            });
            setTimeout(function () {
                t.css('stroke-dashoffset', '0');
            }, (o.delay + o.duration) * 1000);
        });
    };

    var removeMainTransitions = function () {
        $('#main .element, #main h1').css('transition', 'none');
    }
    var removeSlideTransitions = function () {
        $('#work, #about, #contact, #main').addClass('no-transition');
    }
    var addSlideTransitions = function () {
        $('#work, #about, #contact, #main').removeClass('no-transition');
    }



    // ****** PAGE LOAD ******

    var skipLoader = getCookie('skipLoader');
    var hash = window.location.hash.substr(1);

    // ****** IF COOKIE EXISTS ******
    if (!skipLoader) {

        customVars = [
            { duration: 1.2, direction: 'forwards' },
            { duration: .6, direction: 'forwards' },
            { duration: .3, direction: 'forwards' },
            { duration: .1, direction: 'forwards' },
            { duration: .1, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .06, direction: 'forwards' },
            { duration: .08, direction: 'forwards' },
            { duration: .1, direction: 'forwards' },
            { duration: .15, direction: 'forwards' }
        ]

        $('.loader').delay(1000).fadeOut(1000);
        setTimeout(function () {
            $("#main .img").animate({
                opacity: 1
            }, 100);
            initPaths();

            setTimeout(function () {
                $('#main').addClass('loaded');
            }, (delay * 1000) + 500)
        }, 700);

        setCookie('skipLoader', 'true'); 

        // ****** IF COOKIE DOESN'T EXIST ******    
    } else {

        customVars = [
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' },
            { duration: 0, direction: 'forwards' }
        ]

        $("#main .img").animate({
            opacity: 1
        }, 0);
        initPaths();

        removeMainTransitions();
        $('#main').addClass('loaded');


        $('.loader').delay(500).fadeOut(1000);

        switch (hash) {
            case 'about-page':
                removeSlideTransitions();
                main.addClass('move-right');
                left.addClass('toggled');
                setTimeout(function () {
                    addSlideTransitions();
                }, 1000);
                break;
            case 'work-page':
                removeSlideTransitions();
                main.addClass('move-left');
                right.addClass('toggled');
                setTimeout(function () {
                    addSlideTransitions();
                }, 1000);
                break;
            case 'contact-page':
                removeSlideTransitions();
                main.addClass('move-up');
                below.addClass('toggled');
                setTimeout(function () {
                    addSlideTransitions();
                }, 1000);
                break;
        }


    }


})