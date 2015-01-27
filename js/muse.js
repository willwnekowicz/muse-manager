// when window loads call the setup method
$( document ).ready( initMuses );

function initMuses(){
  for (var i = 1; i <= muses; i++) { //Number of muses configured in setup.js
    $("#muses").append(muse(i));
  }
}

function muse(museNumber){
  var museId = museNumber + parseInt(id_offset);
  return "<div class='muse muse-"+museId+"'> \
    <div class='outerContainer'> \
      <div class='container'> \
        <div class='horseshoe'></div> \
      </div> \
      <div class='bottom left'></div> \
      <div class='bottom right'></div> \
      <div class='sensor sensor-1 TP9'></div> \
      <div class='sensor sensor-2 FP1'></div> \
      <div class='sensor sensor-3 FP2'></div> \
      <div class='sensor sensor-4 TP10'></div> \
      <span class='battery'>0.00%</span> \
      <span class='muse-number'>"+museNumber+"</span> \
    </div> \
  </div>";
}
