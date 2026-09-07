var data = null; // Data needed for the next steps api rest call.

function callCloseSession()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }
    
    console.log('callCloseSession started...');
    
    facephi.plugins.sdkcore.launchCloseSession({"operationEventTracking": SdkMobileEventTracking.Success})
    .then(
        (result) => { console.log(result); },
        (err) => console.log(err),
    )
    .finally (() =>
    {
        console.log("callCloseSession finished...");
    });
}

function callInitSession()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    console.log('callInitSession started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    const lic       = window.cordova.platformId.toUpperCase() == "IOS" ? LICENSEIOS_NEW : LICENSEANDROID_NEW
    const apiKey    = window.cordova.platformId.toUpperCase() == "IOS" ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID
    facephi.plugins.sdkcore.launchInitSession({
        "license": lic,
        //"licenseUrl": LICENSE_URL,
        //"licenseApiKey": apiKey,
        "enableTracking": true,
    })
    .then(
        (result) => 
        {
            console.log(result);
            if (parseInt(result['finishStatus']) == SdkMobileFinishStatus.Error)
            {
                showErrorUI(result['errorType']);
            }
        },
        (err) => console.log(err),
    )
    .finally (() =>
    {
        isStartingSDK = false;
        console.log("callInitSession finished...");
        $("#messageResult").removeClass("blink");
    });
}

function callInitOperation()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    console.log('callInitOperation started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    facephi.plugins.sdkcore.launchInitOperation({
        "customerId": "cordoba@facephi.com",
        "type": SdkMobileOperationType.ONBOARDING,
        "steps": ""
    })
    .then(
        (result) => {
            console.log(result);
            if (parseInt(result['finishStatus']) == SdkMobileFinishStatus.Error)
            {
                showErrorUI(result['errorType']);
            }
        },
        (err) => console.log(err),
    )
    .finally (() =>
    {
        isStartingSDK = false;
        console.log("callInitOperation finished...");
        $("#messageResult").removeClass("blink");
    });
}