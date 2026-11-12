var selphiResponse = null;

function callSelphi()
{
    if (typeof facephi.plugins.sdkselphi === "undefined") {
        showErrorUI("Cordova Selphi Sdk is not installed...");
        return;
    }

    console.log('callSelphi started...');
    clearStatus();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    selphiResponse = null;
    var config = buildSelphiConfig();

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
    switch (parseInt(result['finishStatus']))
    {
        case SdkMobileFinishStatus.Ok: // OK
            selphiResponse = result;
            if (result.bestImage) {
                document.getElementById("bestImg").src = "data:image/jpeg;base64," + result.bestImage;
                $("#authenticationResponse").show();
                $("#cardSelphi").addClass("is-done");
            }
            refreshCaptureState();
            clearStatus();
            break;

        case SdkMobileFinishStatus.Error: // Error
            showErrorUI(result['errorType']);
            break;

        default:
            showErrorUI(fphi_str_unknown_error);
    }
};
