var videoIdResponse = null;

function callVideoId()
{
    if (typeof facephi.plugins.sdkvideoid === "undefined") {
        showErrorUI("Cordova VideoId Sdk is not installed...");
        return;
    }

    console.log('callVideoId started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

    var config = new SdkVideoIdConfig();
    config.setMode(facephi.plugins.sdkvideoid.mode.SdkVideoIdMode.face_document_front)
    config.setSectionTime(5000);
    config.setShowTutorial(true);

    videoIdResponse = null;
    facephi.plugins.sdkvideoid.launchVideoId(config)
    .then(
        (result) => console.log(result),
        (err) => console.log(err),
    )
    .finally (() =>
    {
        isStartingSDK = false
        console.log("callVideoId finished...");
        $("#messageResult").html("").removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
    });
}