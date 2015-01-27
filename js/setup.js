// when window loads call the setup method
$(window).on("load", setup);

// Spacebrew Object
var sb, app_name = "muse-manager";

var muses = 21;
var id_offset = 5000;
/**
* Setup Function that connect to spacebrew and creates listeners for Muse data.
*/
function setup (){
  // Setup Spacebrew
  // sb = new Spacebrew.Client('server.neuron.brain');  // create spacebrew client object
  sb = new Spacebrew.Client('localhost', {reconnect: true});  // create spacebrew client object

  sb.extend(Spacebrew.Admin);
  sb.debug = false;
  sb.name(app_name);
  sb.description("This app monitors Muses for battery level, connection status, and fit.");

  // Create the spacebrew subscription channels for each Muse
  for (var i = 5001; i <= 5021; i++) {
    sb.addSubscribe("battery-muse-" + i, "string");		// create the subscription feed
    sb.addSubscribe("touching-muse-" + i, "string");		// create the subscription feed
    sb.addSubscribe("horseshoe-muse-" + i, "string");		// create the subscription feed
  }

  // configure the publication and subscription feeds
  sb.onStringMessage = MessageRouter;
  sb.onOpen = onOpen;
  sb.onNewClient = onNewClient;


  // connect to spacbrew
  sb.connect();

}

/**
* Function that is called when Spacebrew connection is established
*/
function onOpen() {
  var message = "Connected as <strong>" + sb.name() + "</strong>. ";
  $(".connection").html( message );
  console.log(sb.admin.clients);
  reconnectClients();
}

/**
* Function that is called when a new client is connected.
*/
function onNewClient(){
  //Check that muse-manager itself is listed before trying to connect muses.
  sb.admin.clients.forEach(function(client){
    if ( client.name === app_name && client.remoteAddress === sb.admin.remoteAddress ) {
      connect_muses();
    }
  });
}

/**
* Function that ensures new client events are triggered upon reconnections.
*/
function reconnectClients(){
  sb.admin.clients.forEach(function(client){
      onNewClient();
  });
}

/**
* Function that checks whether client is a Muse publisher, and if so, connects it.
*/
function connect_muses(){
  sb.admin.clients.forEach(function(client){
    if(client.publish.messages.length > 0 && client.name.indexOf("muse") > -1){
      connect_muse(client.name, client.remoteAddress);
    }
  });
}

/**
* Function that subscribes this client to the battery, horseshoe, and touching-forehead for each muse
*/
function connect_muse(clientName, remoteAddress){
  console.log("Connecting Muses...");
  adminAddress = sb.admin.remoteAddress || "127.0.0.1";

  //{ Publisher Metric: Subscriber Metric }
  var metrics = {"batt": "battery", "touching_forehead": "touching", "horseshoe": "horseshoe"};

  for(var pub_metric in metrics){
    sb.addRoute(clientName, remoteAddress, pub_metric, "muse-manager", adminAddress, metrics[pub_metric]+"-"+clientName);
  }

}
