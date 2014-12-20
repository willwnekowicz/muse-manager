/**
* onStringMessage Function that is called whenever new spacebrew string messages are received.
*          It accepts two parameters:
* @param  {String} name    Holds name of the subscription feed channel
* @param  {String} value 	Holds value received from the subscription feed
*/
function MessageRouter( name, value ){
  var nameArr = name.split("-");
  var path = nameArr[0];
  var museName = nameArr[1];

  if(path == "battery"){
    updateBatteryLevel(museName, value);
  }
  if(path == "touching"){
    updateTouchingForehead(museName, value);
  }
  if(path == "horseshoe"){
    updateHorseshoe(museName, value);
  }
}
