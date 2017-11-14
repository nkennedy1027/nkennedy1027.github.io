$(document).ready(function(){
    var nav = $('.navcontrol'),
        main = $('#main'),
        above = $('#above'),
        left = $('#about'),
        right = $('#right'),
        below = $('#below'),
        back = $('a.back');


    // Nav functions
    nav.click(function(){
        let t = $(this);

        if (t.hasClass('left')) {
            main.addClass('move-right');
            left.addClass('toggled');
        } else if (t.hasClass('right')){
            main.addClass('move-left');
            right.addClass('toggled');
        } else if (t.hasClass('down')) {
            main.addClass('move-up');
            below.addClass('toggled');
        }
    })

    back.click(function(){
        let t = $(this);

        t.closest('.slide').removeClass('toggled');

        if (main.hasClass('move-down')) {
            main.removeClass('move-down');
        } else if (main.hasClass('move-right')) {
            main.removeClass('move-right');
        } else if (main.hasClass('move-left')){
            main.removeClass('move-left');
        } else if (main.hasClass('move-up')) {
            main.removeClass('move-up');
        }
    })

    // Drawing
    var paths = {};
    var delay;
    var customVars = [
      {duration: 1.2, direction: 'forwards'},
      {duration: .6, direction: 'forwards'},
      {duration: .3, direction: 'forwards'},
      {duration: .1, direction: 'forwards'},
      {duration: .1, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .06, direction: 'forwards'},
      {duration: .08, direction: 'forwards'},
      {duration: .1, direction: 'forwards'},
      {duration: .15, direction: 'forwards'}
    ]
    
    var initPaths = function() {
      $("path").each(function() {
        let t = $(this),
          path = t.get(0),
          pathLength = path.getTotalLength(),
          objKey = t.attr("class"),
          o = {
            name: t.attr("id"),
            array: pathLength,
            offset: (function() {
              if (t.attr("id") === "main1") {
                return 0;
              } else {
                return -pathLength;
              }
            })(),
            duration: customVars[objKey-1].duration,
            delay: (function(){
              let durationTotal = 0;
              if(objKey === 1){
                return 0;
              } else {
                for(let i = 0; i < objKey - 1; i++){
                  durationTotal = durationTotal + customVars[i].duration;
                  delay = durationTotal;
                }
                return durationTotal;
              }
            })(),
            direction: customVars[objKey-1].direction
          };
    
        //console.log(o.name + ': ' + pathLength)
        
        t.css({
            "stroke-dasharray": o.array,
            "stroke-dashoffset": o.offset,
            'animation': o.duration + 's ease-in-out ' + o.delay + 's ' + o.name
        });
        setTimeout(function(){
          t.css('stroke-dashoffset', '0');
        }, (o.delay + o.duration)*1000);
      });
    };
    
    // Page Load
    $('.loader').delay(1000).fadeOut(1000);
    setTimeout(function(){
        $( "#main .img" ).animate({
            opacity: 1
          }, 100);
        initPaths();

        setTimeout(function(){
            $('#main').addClass('loaded');
        }, (delay * 1000) + 500)
    },700);
    
    
    

})