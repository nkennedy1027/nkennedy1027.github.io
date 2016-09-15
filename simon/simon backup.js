$(document).ready(function() {
  var colors = ["Red", "Green", "Yellow", "Blue"]
  var simonOrder = [];
  var playerOrder = [];
  var current = [];

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
    //Thanks to palswim on stackoverflow.com
  }

  $("input").click(function() {
    if ($(this).val() === "Clear") {
      simonOrder = [];
      $("#simon").val("");
      playerOrder = [];
      $("#player").val("")
    } else if ($(this).val() === "Play") {
      simonOrder.push(colors[Math.floor(Math.random() * 4)]);
      $("#simon").val(simonOrder);
    } else {
      playerOrder.push($(this).val());
      current.push("hey");
      if (playerOrder[current.length - 1] !== simonOrder[current.length - 1]) {
        playerOrder = [];
        current = [];
      }
      if (arraysEqual(simonOrder, playerOrder) === true) {
        simonOrder.push(colors[Math.floor(Math.random() * 4)]);
        $("#simon").val(simonOrder);
        playerOrder = [];
        current = [];
      }
      $("#player").val(playerOrder);
    }

  })

});