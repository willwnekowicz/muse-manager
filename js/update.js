/**
* Function that is called when Battery message is received
*/
function updateBatteryLevel(museName, value){
  element = $("."+museName+" .battery");
  value = value.split(",")[0];
  $(element).text(parseFloat(value)/100 + "%"); // display the battery level
  $(element).addClass("flash").delay(400)
  .queue(function() {
    $(this).removeClass("flash");
    $(this).dequeue();
  });
}

/**
* Function that is called when Touching Forehead message is received
*/
function updateTouchingForehead(museName, value){
  element = $("."+museName);
  if(value == 1){ //Touching
    $(element).addClass("touching");
  }else{ //Not Touching
    $(element).removeClass("touching");
  }
}

/**
* Function that is called when Horseshoe message is received
*/
function updateHorseshoe(museName, value){
  value.split(",").forEach(function(key, index){
    if(parseFloat(key) == 1.0){ //Good Contact
      $("."+museName+" .sensor-"+eval(index+1)).addClass("contact");
    }else{ //Bad or No Contact
      $("."+museName+" .sensor-"+eval(index+1)).removeClass("contact");
    }
  });
}

/**
* Function that is called when Spacebrew connection is established
*/
function onOpen() {
  var message = "Connected as <strong>" + sb.name() + "</strong>. ";
  $(".connection").html( message );
}
