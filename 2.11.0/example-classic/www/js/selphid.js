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
    isStartingSDK = true;

    var config_id = new SdkSelphIDConfig();
    
    config_id.showResultAfterCapture    = true;
    config_id.showTutorial              = false;
    config_id.scanMode                  = facephi.plugins.scanmode.SdkSelphIDScanMode.SearchMode;
    config_id.timeout                   = facephi.plugins.selphid.timeout.SdkSelphIDTimeout.Short;
    config_id.documentType              = facephi.plugins.doctype.SdkSelphIDDocumentType.IDCard;
    config_id.resourcesPath             = "fphi-selphid-widget-resources-sdk.zip";
    config_id.specificData              = "AR|<ALL>";
    //config_id.params                  = { "PromiscuousMode": "Full" }; //None|Half|Full
    tokenFaceImage = null;
    
    //const lic = window.cordova.platformId.toUpperCase() == "IOS" ? LICENSEIOS : LICENSEANDROID
    facephi.plugins.sdkselphid.launchSelphID(config_id).then(
        (result) => onSuccessSelphIDCapture(result),
        (err) => showErrorUI(err)
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
    if (result == null || result == undefined) {
        showErrorUI(fphi_str_unknown_error);
    }
    else
    {
        switch (parseInt(result['finishStatus']))
        {
            case SdkMobileFinishStatus.Ok: // OK
                // The OCR Data.
                tokenFaceImage = result.tokenFaceImage;
                var rowWidth = (window.screen.availWidth * 0.95).toString() + 'px';
                if (result['documentData']) {
                    document.getElementById("frontImg").src = (typeof result.frontDocumentImage !== 'undefined') ? 'data:image/jpeg;base64,' + result.frontDocumentImage : './img/image_not_available.png';
                    document.getElementById("backImg").src = (typeof result.backDocumentImage !== 'undefined') ? 'data:image/jpeg;base64,' + result.backDocumentImage : './img/image_not_available.png';
                    document.getElementById("selfieImg").src = (typeof result.faceImage !== 'undefined') ? 'data:image/jpeg;base64,' + result.faceImage : './img/image_not_available.png';

                    $("#frontImg, #backImg, #selfieImg").css("height", "100%").css("border-radius", "5%").css("width", "100%");
                    $("#messageResult").html("").append("<p style='border-bottom: 1px solid #bbb;'>DATOS OBTENIDOS</p>");

                    $.each(jQuery.parseJSON(result['documentData'].replace(/\\/g, "")), function(i, item) {
                        $("#messageResult").append("<p class='rowSelphIDResult'>" + i +  ": " + item + "</p>");
                    });
                    $("#messageResult").css("text-align","left").css("color","#000000").show();
                    $("#selphidResponse").show();
                }

                if (typeof result.bestImage !== 'undefined') {
                    document.getElementById("bestImg").src = 'data:image/jpeg;base64,' + result.bestImage;

                    $("#bestImg").css("height", "95%").css("width", "95%");
                    $("#messageResult").css("color", "#000000");
                    //$("#authenticationResponse").css("width", rowWidth).show();
                    $("#authenticationResponse").show();
                }

                break;

            case SdkMobileFinishStatus.Error: // Error
                showErrorUI(result['errorType']);
                break;

            default:
                showErrorUI(fphi_str_unknown_error);
        }
    }
};