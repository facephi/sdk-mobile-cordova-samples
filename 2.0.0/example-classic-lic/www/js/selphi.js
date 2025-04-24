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
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

    selphiResponse  = null;
    var config      = new SdkSelphiConfig();
    // Sets the Liveness Passive mode.
    config.setLivenessMode(facephi.plugins.livenessmode.SdkSelphiLivenessMode.PassiveMode);
    config.setDebug(false);
    config.setEnableFullscreen(true);
    config.setResourcesPath("fphi-selphi-widget-resources-sdk.zip");
    config.setLocale("es");
    config.setShowDiagnostic(false);

    facephi.plugins.sdkselphi.launchSelphi(config)
    .then(
        (result) => onSuccessSelphiExtraction(result),
        (err) => onErrorSelphiExtraction(err),
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
    if (result != null && result)
    {
        var data = (result);

        if (typeof data['finishStatus'] === "undefined") {
            showErrorUI(fphi_str_unknown_error);
            return;
        }

        switch (parseInt(data['finishStatus']))
        {
            case SdkMobileFinishStatus.Ok: // OK
                selphiResponse = data;
                var rowWidth = (window.screen.availWidth).toString() + 'px';
                // The "bestImage" is the image that must be used for the Liveness Passive process. It is formatted in stringBase64
                //showMessageUI('BestImage Length: ' + data.bestImage.length); // data['bestImage'].length;
                document.getElementById("bestImg").src = 'data:image/jpeg;base64,' + data.bestImage;
                $("#bestImg").css("height", "95%").css("width", "100%");
                //$("#authenticationResponse").css("width", rowWidth).show();
                $("#authenticationResponse").show();
                $("#messageResult").css("color", "#000000").hide();

                break;

            case SdkMobileFinishStatus.Error: // Error
                if (data['errorType'])
                {
                    getErrorStringToShow(data);
                }
                else
                {
                    showErrorUI(fphi_str_unknown_error);
                }
                break;

            default:
                showErrorUI(fphi_str_unknown_error);
        }
    }
    else {
        showErrorUI(fphi_str_unknown_error);
    }
};

/**
 * Event launched when Widget Plugin launches an exception/error.
 * @method onErrorWidgetExtracion
 * @param String result The result widget object
 */
const onErrorSelphiExtraction = (result) =>
{
    console.log('Enter to onErrorSelphiExtraction', result);
    if (result != null && result)
    {
        showErrorUI(result);
    }
};
