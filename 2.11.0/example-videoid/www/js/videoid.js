var videoIdResponse = null;

function callVideoId()
{
    if (typeof facephi.plugins.sdkvideoid === "undefined") {
        showErrorUI("Cordova VideoId Sdk is not installed...");
        return;
    }

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    console.log('callVideoId started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    try {
        var config = new SdkVideoIdConfig();
        config.setMode(facephi.plugins.sdkvideoid.mode.SdkVideoIdMode.face_document_front)
        config.setSectionTime(5000);
        config.setShowTutorial(true);

        videoIdResponse = null;
        facephi.plugins.sdkvideoid.launchVideoId(config)
        .then(
            (result) =>
            {
                console.log(result);
                if (result == null || result == undefined) {
                    showErrorUI(fphi_str_unknown_error);
                    return;
                }

                switch (parseInt(result['finishStatus']))
                {
                    case SdkMobileFinishStatus.Ok:
                        videoIdResponse = result;
                        $("#messageResult").html("").removeClass("blink").hide();
                        break;

                    case SdkMobileFinishStatus.Error:
                        showErrorUI(result['errorType'] || fphi_str_unknown_error);
                        break;

                    default:
                        showErrorUI(fphi_str_unknown_error);
                }
            },
            (err) => showErrorUI(err),
        )
        .finally (() =>
        {
            isStartingSDK = false;
            console.log("callVideoId finished...");
        });
    } catch (e) {
        isStartingSDK = false;
        console.log(e);
        showErrorUI(e.message || e);
    }
}
