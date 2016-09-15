$(document).ready(function() {
  var colors = ["Red", "Green", "Yellow", "Blue"],
  simonOrder = [],
  playerOrder = [],
  current,
  timer,
  limit = 0,
  strict = "off",
  holder,
  i = 0,
  j,
  k;


  $(".simon-quad").hide();
  $("#simon-counter").attr("src", "counter/"+ simonOrder.length + ".png");
  

//EQUAL ARRAYS FUNCTION  
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
}


//TIMER FUNCTIONS

function timerMax() {
  timer = window.setTimeout(tooLong, limit);
}

function tooLong() {
  clearTimer();
  youLose();
}

function clearTimer() {
  window.clearTimeout(timer);
}

function updateLimit(){
  clearTimer();
  limit = (5000);
  timerMax();
}


//AUDIO 
function stop(sound){
  sound.pause();
  sound.currentTime = 0;
}

function play(color, stop, dur){
 var colorHolder = document.getElementById("audio-"+color);
 colorHolder.volume = 1;
 colorHolder.play();
 if(stop === true){
  setInterval(stop, dur);
 }
}

function playFail(){
 var fail = document.getElementById("audio-fail");
 fail.volume = 0.25;
 fail.play();
}

(function($) {
    $.fn.playJQ = function(color){
       return play(color);
       };
    })(jQuery);


//DISPLAY ORDER FUNCTION
function displayOrder(){
  holder = simonOrder[i];
  $("#"+holder).fadeTo(75, 1).delay(500).fadeTo(75, 0);
  $("#simon-counter").delay(50).queue(function(n){
    $(this).attr("src", "counter/"+ simonOrder.length + ".png");
    $.fn.playJQ(holder);
    n();
  });
  updateLimit();
  i++;
  if (i < simonOrder.length) {
    setTimeout(displayOrder, 800);
  }
}


//LOSE FUNCTION
function youLose(){
  var youLoseAlert = function(){
    $("#simon-game-full").fadeTo(40,1).delay(1000).fadeTo(40,0);
    $("#simon-counter").attr("src", "counter/X.png");
    playFail();
  }
  var checkStrict = function(){
    if(strict === "on"){
      simonOrder = [];
      playerOrder = [];
      $("#simon-counter").attr("src", "counter/"+ simonOrder.length + ".png");
      current = "off";
    } else if(strict === "off"){
      $("#simon-counter").attr("src", "counter/"+ simonOrder.length + ".png");
      playerOrder = [];
      displayOrder();
    }
  }
  clearTimer();
  youLoseAlert();
  i = 0;
  setTimeout(checkStrict, 2500);
}


//WIN FUNCTION
function youWin(){
  clearTimer();
    $("#simon-counter").attr("src", "counter/W.png");
  if(j < 12){
    $("#"+colors[k]).fadeTo(25, 1).delay(50).fadeTo(25, 0);
    play(colors[k], true, 90);
    k++;
    j++;
    if (k < colors.length) {
      setTimeout(youWin, 100);
    } else if(k === colors.length){
      k=0;
      setTimeout(youWin, 100);
    }
  }
  simonOrder = [];
  setTimeout(function() {$("#counter").html(simonOrder.length);}, 1200);
}


//START and STRICT
$("input").click(function() {
  if ($(this).val() === "Start") {
    current = "on";
    simonOrder = [];
    playerOrder = [];
    simonOrder.push(colors[Math.floor(Math.random() * 4)]);
    i=0;
    displayOrder();
  } 
  if ($(this).val() === "Strict") {
    if(strict === "off"){
      strict = "on";
      $("#strict-light").css("background-color", "red");
    } else if(strict === "on"){
      strict = "off";
      $("#strict-light").css("background-color", "#111");
    }
  }
})


//MOUSE DOWN
$(".quad-overlay").mousedown(function(){
  if(current==="on"){
    $("#"+ $(this).val()).fadeTo(75,1);
    play($(this).val());
    updateLimit();
  }
})


//MOUSE UP
$(".quad-overlay").mouseup(function(){
  if(current==="on"){
    $("#"+ $(this).val()).fadeTo(75,0);
    playerOrder.push($(this).val());
//WRONG CHOICE
if (playerOrder[playerOrder.length - 1] !== simonOrder[playerOrder.length - 1]) {
  youLose();
//RIGHT SEQUENCE      
} else if (arraysEqual(simonOrder, playerOrder) === true) {
  simonOrder.push(colors[Math.floor(Math.random() * 4)]);
//WON THE GAME     
if(simonOrder.length === 21){
  j=0;
  k=0;
  youWin();
//WON THE ROUND
} else {
  playerOrder = [];
  i = 0;
  setTimeout(displayOrder, 1000);
}
}
}
})

});