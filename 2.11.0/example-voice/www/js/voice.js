var voiceResponse = null;

function callVoice()
{
    if (typeof facephi.plugins.sdkvoice === "undefined") {
        showErrorUI("Cordova Voice Sdk is not installed...");
        return;
    }

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    console.log('callVoice started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    try {
        var config = new SdkVoiceConfig();
        config.setPhrases("Hola Facephi Component|Hello world|Desarrollo del componente Voice")
        config.setVibrationEnabled(true);
        config.setShowTutorial(true);

        voiceResponse = null;
        facephi.plugins.sdkvoice.launchVoice(config)
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
                        voiceResponse = result;
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
            console.log("callVoice finished...");
        });
    } catch (e) {
        isStartingSDK = false;
        console.log(e);
        showErrorUI(e.message || e);
    }
}
