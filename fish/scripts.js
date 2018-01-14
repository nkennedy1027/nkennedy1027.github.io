(function($){
  $(document).ready(function(){

    function randomValue(min,max) {
      return Math.random()*(max-min+1)+min;
    }
    function randomInt(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }

    // MAKE FRAME RESPONSIVE
    let vh, vw, fh, fw, ratioHeight, ratioWidth, inverse;
    
    function setVars(){
      vh = $(window).height();
      vw = $(window).width();
      fh = $('.frame').height();
      fw = $('.frame').width();
      ratioHeight = fh / vh;
      ratioWidth = fw / vw;
    }

    function scaleFrame(){
      setVars();

      if(ratioHeight <= ratioWidth){
        inverse = 1/ratioHeight;
      } else {
        inverse = 1/ratioWidth;
      }
  
      $('.frame').css('transform','translate(-50%,-50%) scale('+inverse+')')
    }

    $(window).resize(function(){
      scaleFrame();
    })

    scaleFrame();


    // GENERATE DROPS
    for (let i = 0; i < 10; i++) {
      let left = Math.random() * 100,
          top = Math.random() * 100,
          delay = randomValue(0,10);
      $('.drops').append('<div class="drop" style="left:'+left+'%; top:'+top+'px; animation-delay:'+delay+'s">')
    }

    // GENERATE BUBBLES

    // Bubbles
    for (let i = 0; i < 12; i++) {
      let left = Math.random() * 100,
          duration = randomValue(10,25),
          bubble = randomInt(1,2),
          layerNum = randomInt(1,2),
          layer,
          delay = randomValue(0,15);

      layer = layerNum === 1 ? $('.bubbles-back') : $('.bubbles-front')

      if(i == 0){
        left = 5;
      } else if(i == 12){
        left = 95;
      }
      
      layer.append('<img src="assets/fish/bubble'+bubble+'.png" alt="" class="bubble layer" style="left:'+left+'%; animation-delay:'+delay+'s; animation-duration:'+duration+'s;">')
    }

    // Mushrooms
    for (let i = 0; i < 6; i++) {
      let left = Math.random() * 100,
          translateDuration = randomValue(10,25),
          rotateDuration = randomValue(4,8),
          bubble = randomInt(1,2),
          layerNum = randomInt(1,2),
          layer,
          delay = randomValue(0,5);

      layer = layerNum === 1 ? $('.bubbles-back') : $('.bubbles-front')

      if(i == 0){
        left = 5;
      } else if(i == 6){
        left = 85;
      }
      
      layer.append('<div class="bubble layer" style="left:'+left+'%; animation-delay:'+delay+'s; animation-duration:'+translateDuration+'s;"><img src="assets/fish/mushroom'+bubble+'.png" alt="" class="mushroom" style="animation-duration:'+rotateDuration+'s"></div>')
    }


    // EYE

    setInterval(function(){
      $( ".frame" ).mousemove(function( event ) {
        let vw = $(window).width(),
            px = event.pageX,
            vh = $(window).height(),
            py = event.pageY,
            ePosX = 480 + ((px / vw) * 60),
            ePosY = 190 + ((py / vh) * 30),
            eye = $('.eye');

        eye.css({
          left : ePosX,
          top: ePosY
        });
        
      });
    },500)
    
    
    
  })
})(jQuery)