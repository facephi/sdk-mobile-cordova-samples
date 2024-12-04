console.log( "register getTrackingError received!" );

var listener = function( e ) {
  //log: didShow received! userInfo: {"data":"test"}
  console.log( "getTrackingError received! userInfo: " + JSON.stringify(e)  );
}

setTimeout(function() {
    if (typeof window.broadcaster !== "undefined") {
        window.broadcaster.addEventListener( "getTrackingError", listener );
    }
}, 2000);