// when window loads call the setup method
$(window).on("load", setup);

// Spacebrew Object
var sb, app_name = "Muse Manager";

var muses = 21;
/**
* Setup Function that connect to spacebrew and creates listeners for Muse data.
*/
function setup (){
  // Setup Spacebrew
  sb = new Spacebrew.Client('localhost');  // create spacebrew client object

  sb.name(app_name);
  sb.description("This app monitors Muses for battery level, connection status, and fit.");

  // Create the spacebrew subscription channels for each Muse
  for (i = 1; i <= muses; i++) {
    sb.addSubscribe("battery-muse"+i, "string");		// create the subscription feed
    sb.addSubscribe("touching-muse"+i, "string");		// create the subscription feed
    sb.addSubscribe("horseshoe-muse"+i, "string");		// create the subscription feed
  }

  // configure the publication and subscription feeds
  sb.onStringMessage = MessageRouter;
  sb.onOpen = onOpen;

  // connect to spacbrew
  sb.connect();
}
