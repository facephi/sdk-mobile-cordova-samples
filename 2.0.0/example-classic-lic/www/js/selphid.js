var tokenFaceImage = null;

function callSelphID()
{
    if (typeof facephi.plugins.sdkselphid === "undefined") {
        showErrorUI("Cordova Selphid Sdk is not installed...");
        return;
    }

    console.log('callSelphID started...');

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

    var config_id = new SdkSelphIDConfig();
    
    config_id.showResultAfterCapture    = true;
    config_id.showTutorial              = false;
    config_id.scanMode                  = facephi.plugins.scanmode.SdkSelphIDScanMode.SearchMode;
    config_id.timeout                   = facephi.plugins.selphid.timeout.SdkSelphIDTimeout.Short;
    config_id.documentType              = facephi.plugins.doctype.SdkSelphIDDocumentType.IDCard;
    config_id.resourcesPath             = "fphi-selphid-widget-resources-sdk.zip";
    config_id.specificData              = "AR|<ALL>";

    tokenFaceImage = null;
    
    //const lic = window.cordova.platformId.toUpperCase() == "IOS" ? LICENSEIOS : LICENSEANDROID
    facephi.plugins.sdkselphid.launchSelphID(config_id).then(
        (result) => onSuccessSelphIDCapture(result),
        (err) => onErrorSelphIDCapture(err)
    )
    .finally (() =>
    {
        console.log("callSelphID finished...");
        isStartingSDK = false
    });
}

/**
 * The callback method that receives the result of the Widget plugin if the process was executed correctly
 *
 * @method onSuccessSelphIDCapture
 * @param String result Object with response data
 */
const onSuccessSelphIDCapture = (result) =>
{
    // Here must return the value of processing Widget if is a success.
    if (result != null && result)
    {
        var data = (result);

        switch (parseInt(data['finishStatus']))
        {
            case SdkMobileFinishStatus.Ok: // OK
                // The OCR Data.
                tokenFaceImage = data.tokenFaceImage;
                var rowWidth = (window.screen.availWidth * 0.95).toString() + 'px';
                if (data['documentData']) {
                    document.getElementById("frontImg").src = (typeof data.frontDocumentImage !== 'undefined') ? 'data:image/jpeg;base64,' + data.frontDocumentImage : './img/image_not_available.png';
                    document.getElementById("backImg").src = (typeof data.backDocumentImage !== 'undefined') ? 'data:image/jpeg;base64,' + data.backDocumentImage : './img/image_not_available.png';
                    document.getElementById("selfieImg").src = (typeof data.faceImage !== 'undefined') ? 'data:image/jpeg;base64,' + data.faceImage : './img/image_not_available.png';

                    $("#frontImg, #backImg, #selfieImg").css("height", "100%").css("border-radius", "5%").css("width", "100%");
                    $("#messageResult").html("").append("<p style='border-bottom: 1px solid #bbb;'>DATOS OBTENIDOS</p>");

                    $.each(jQuery.parseJSON(data['documentData'].replace(/\\/g, "")), function(i, item) {
                        $("#messageResult").append("<p class='rowSelphIDResult'>" + i +  ": " + item + "</p>");
                    });
                    $("#messageResult").css("text-align","left").css("color","#000000").show();
                    $("#selphidResponse").show();
                }

                if (typeof data.bestImage !== 'undefined') {
                    document.getElementById("bestImg").src = 'data:image/jpeg;base64,' + data.bestImage;

                    $("#bestImg").css("height", "95%").css("width", "95%");
                    $("#messageResult").css("color", "#000000");
                    //$("#authenticationResponse").css("width", rowWidth).show();
                    $("#authenticationResponse").show();
                }

                break;

            case SdkMobileFinishStatus.Error: // Error
                if (data['errorType'])
                {
                    getErrorStringToShow(data);
                }
                else {
                    showErrorUI(fphi_str_unknown_error);
                }
                break;

            default:
                showErrorUI(fphi_str_unknown_error);
        }

    } else {
        showErrorUI(fphi_str_unknown_error);
    }
};


/**
 * Event launched when Widget plugin launches an exception/error.
 * @method  onErrorSelphIDCapture
 * @param String result Object with response data
 */
const onErrorSelphIDCapture = (result) =>
{
    console.log('Enter to onErrorSelphIDCapture', result);
    if (result != null && result)
    {
        showErrorUI(result);
    }
};