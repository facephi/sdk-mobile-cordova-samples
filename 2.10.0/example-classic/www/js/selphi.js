var selphiResponse = null;

function callSelphi()
{
    if (typeof facephi.plugins.sdkselphi === "undefined") {
        showErrorUI("Cordova Selphi Sdk is not installed...");
        return;
    }

    console.log('callSelphi started...');

    $("#authenticationResponse").hide();
    $("#selphidResponse").hide();
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    selphiResponse  = null;
    var config      = new SdkSelphiConfig();
    // Sets the Liveness Passive mode.
    config.setLivenessMode(facephi.plugins.livenessmode.SdkSelphiLivenessMode.PassiveMode);
    config.setDebug(false);
    config.setEnableFullscreen(true);
    config.setResourcesPath("fphi-selphi-widget-resources-sdk.zip");
    config.setShowDiagnostic(false);

    facephi.plugins.sdkselphi.launchSelphi(config)
    .then(
        (result) => onSuccessSelphiExtraction(result),
        (err) => showErrorUI(err),
    )
    .finally (() =>
    {
        console.log("callSelphi finished...");
        isStartingSDK = false
    });
}

/**
 * The event that receives the result of the Widget plugin if the process was executed correctly
 *
 * @method onSuccessWidgetExtraction
 * @return String result The JSON object with all the data result
 */
const onSuccessSelphiExtraction = (result) =>
{
    console.log('Enter to onSuccessWidgetExtraction');
    // Here must return the value of processing Widget if is a success.

    if (result == null || result == undefined) {
        showErrorUI(fphi_str_unknown_error);
    }
    else
    {
        switch (parseInt(result['finishStatus']))
        {
            case SdkMobileFinishStatus.Ok: // OK
                selphiResponse = result;
                var rowWidth = (window.screen.availWidth).toString() + 'px';
                document.getElementById("bestImg").src = 'data:image/jpeg;base64,' + result.bestImage;
                $("#bestImg").css("height", "95%").css("width", "100%");
                //$("#authenticationResponse").css("width", rowWidth).show();
                $("#authenticationResponse").show();
                $("#messageResult").css("color", "#000000").hide();

                break;

            case SdkMobileFinishStatus.Error: // Error
                showErrorUI(result['errorType']);
                break;

            default:
                showErrorUI(fphi_str_unknown_error);
        }
    }
};
