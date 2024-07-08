var listener = function( e ) {
  //console.log( "core.flow received!: " + JSON.stringify(e)  );
  console.log("core.flow received!: ", e);
}
var listenerTrackingError = function(e)
{
  console.log("tracking.error.listener received!: ", e);
}

setTimeout(function() {
    if (typeof window.broadcaster !== "undefined")
    {
        window.broadcaster.addEventListener( "core.flow", listener );
        window.broadcaster.addEventListener( "tracking.error.listener", listenerTrackingError );
    }
}, 2000);