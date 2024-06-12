var phingersResponse = null;

function callPhingers()
{
    if (typeof facephi.plugins.sdkphingers === "undefined") {
        showErrorUI("Cordova Phinger Sdk is not installed...");
        return;
    }

    console.log('callPhingers started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

    phingersResponse    = null;
    var config          = new SdkPhingersConfig();
    // SdkPhingersCaptureOrientation capture orientation.
    config.setReticleOrientation(facephi.plugins.sdkphingers.captureorientation.SdkPhingersCaptureOrientation.left)
    config.setReturnFullFrameImage(true);
    config.setReturnProcessedImage(true);
    config.setReturnRawImage(true);
    config.setUseFlash(true);
    config.setUseLiveness(true);

    //const lic = "4700-8415-1478-1-2";
    facephi.plugins.sdkphingers.launchPhingers(config)
    .then(
        (result) => onSuccessPhingersExtraction(result),
        (err) => onErrorPhingersExtraction(err),
    )
    .finally (() =>
    {
        console.log("callPhingers finished...");
        $("#messageResult").html("").removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
        isStartingSDK = false
    });
}

/**
 * The event that receives the result of the Widget plugin if the process was executed correctly
 *
 * @method onSuccessWidgetExtraction
 * @return String result The JSON object with all the data result
 */
const onSuccessPhingersExtraction = (result) =>
{
    console.log('Enter to onSuccessPhingersExtraction');
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
                console.log(data);
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
 * @method onErrorPhingersExtraction
 * @param String result The result widget object
 */
const onErrorPhingersExtraction = (result) =>
{
    console.log('Enter to onErrorPhingersExtraction', result);
    if (result != null && result)
    {
        showErrorUI(result);
    }
};
