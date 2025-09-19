var data        = null;
var listener    = function(e)
{
  //console.log("core.flow received!: " + JSON.stringify(e));
  console.log("core.flow received!: ", e);
}

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
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

    const lic       = window.cordova.platformId.toUpperCase() == "IOS" ? LICENSEIOS_NEW : LICENSEANDROID_NEW
    const apiKey    = window.cordova.platformId.toUpperCase() == "IOS" ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID
    facephi.plugins.sdkcore.launchInitSession({
        //"license": lic,
        "licenseUrl": LICENSE_URL,
        "licenseApiKey": apiKey,
        "enableTracking": true
    })
    .then(
        (result) =>
        {
            console.log(result);
            if (parseInt(result['finishStatus']) == SdkMobileFinishStatus.Error)
            {
                getErrorStringToShow(result);
            }
        },
        (err) => console.log(err),
    )
    .finally (() =>
    {
        isStartingSDK = false
        console.log("callInitSession finished...");
        $("#messageResult").html("").removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
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
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

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
                getErrorStringToShow(result);
            }
        },
        (err) => console.log(err),
    )
    .finally (() =>
    {
        isStartingSDK = false
        console.log("callInitOperation finished...");
        $("#messageResult").html("").removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
    });
}

function callGetExtraData()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    console.log('callGetExtraData started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

    data = null;
    facephi.plugins.sdkcore.launchGetExtraData()
    .then(
        (result) => {
            console.log(result);
            if (parseInt(result.finishStatus) == 1)
            {
                data = result.data;

                passiveLivenessEvaluate();
                authenticateFacialDocument();
            }
        },
        (err) => console.log(err),
    )
    .finally (() =>
    {
        isStartingSDK = false
        console.log("callGetExtraData finished...");
        $("#messageResult").html("").removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
    });
}

async function callFlow()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    console.log('callFlow started...');

    await facephi.plugins.sdkcore.launchInitFlow({
         "customerId": "cordoba@facephi.com",
         "flow": "acc560f0-8cbc-475b-b479-1f22ae5cdae8",
         "preview": false
     })
    .then(
        (result) => { console.log("launchInitFlow result", result); },
        (err) => console.log(err),
    );

    await facephi.plugins.sdkselphid.setSelphidFlow()
    .then(
        (result) => { console.log("setSelphidFlow result", result); },
        (err) => console.log(err),
    );

    await facephi.plugins.sdkselphi.setSelphiFlow()
    .then(
        (result) => { console.log("setSelphiFlow result", result); },
        (err) => console.log(err),
    );

    await facephi.plugins.sdkcore.launchStartFlow()
    .then(
        (result) => { console.log("launchStartFlow result", result); },
        (err) => console.log(err),
    );
}
