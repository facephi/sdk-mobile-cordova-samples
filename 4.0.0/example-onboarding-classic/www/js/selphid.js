var tokenFaceImage = null;

function callSelphID()
{
    if (typeof facephi.plugins.sdkselphid === "undefined") {
        showErrorUI("Cordova Selphid Sdk is not installed...");
        return;
    }

    console.log('callSelphID started...');
    clearStatus();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    var config = buildSelphidConfig();

    tokenFaceImage = null;
    
    //const lic = window.cordova.platformId.toUpperCase() == "IOS" ? LICENSEIOS : LICENSEANDROID
    facephi.plugins.sdkselphid.launchSelphID(config).then(
        (result) => onSuccessSelphIDCapture(result),
        (err) => showErrorUI(err)
    )
    .finally (() =>
    {
        console.log("callSelphID finished...");
        isStartingSDK = false
    });
}

const imageSrc = (value) =>
    typeof value !== "undefined"
        ? "data:image/jpeg;base64," + value
        : "./img/image_not_available.png";

function showDocumentImage(imgId, blockId, value) {
    if (value) {
        document.getElementById(imgId).src = imageSrc(value);
        $("#" + blockId).show();
    } else {
        $("#" + blockId).hide();
    }
}

function parseDocumentData(raw) {
    if (!raw) return null;
    try {
        var decoded = JSON.parse(String(raw).replace(/\\/g, ""));
        return decoded && typeof decoded === "object" ? decoded : null;
    } catch (e) {
        return null;
    }
}

/**
 * The callback method that receives the result of the Widget plugin if the process was executed correctly
 *
 * @method onSuccessSelphIDCapture
 * @param String result Object with response data
 */
const onSuccessSelphIDCapture = (result) =>
{
    switch (parseInt(result['finishStatus']))
    {
        case SdkMobileFinishStatus.Ok: // OK
            // The OCR Data.
            tokenFaceImage = result.tokenFaceImage || null;
            showDocumentImage("frontImg", "frontBlock", result.frontDocumentImage);
            showDocumentImage("backImg", "backBlock", result.backDocumentImage);
            showDocumentImage("selfieImg", "faceBlock", result.faceImage);
            lastDocumentData = parseDocumentData(result.documentData);
            $("#btnDocData").toggle(!!lastDocumentData);
            if ($("#frontBlock, #backBlock, #faceBlock").filter(":visible").length || lastDocumentData) {
                $("#selphidResponse").show();
                $("#cardSelphid").addClass("is-done");
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