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
        (err) => showErrorUI(err),
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
    try {
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
                    showErrorUI(result['errorType']);
                }
                else
                {
                    $("#messageResult").html("").removeClass("blink").hide();
                }
            },
            (err) => showErrorUI(err),
        )
        .finally (() =>
        {
            isStartingSDK = false;
            console.log("callInitSession finished...");
        });
    } catch (e) {
        isStartingSDK = false;
        console.log(e);
        showErrorUI(e.message || e);
    }
}

function callInitOperation()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    console.log('callInitOperation started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    try {
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
                else
                {
                    $("#messageResult").html("").removeClass("blink").hide();
                }
            },
            (err) => showErrorUI(err),
        )
        .finally (() =>
        {
            isStartingSDK = false;
            console.log("callInitOperation finished...");
        });
    } catch (e) {
        isStartingSDK = false;
        console.log(e);
        showErrorUI(e.message || e);
    }
}

function callGetExtraData()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    console.log('callGetExtraData started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    try {
        data = null;
        facephi.plugins.sdkcore.launchGetExtraData()
        .then(
            (result) => {
                console.log(result);
                if (parseInt(result.finishStatus) == SdkMobileFinishStatus.Ok)
                {
                    data = result.data;
                    $("#messageResult").html("").removeClass("blink").hide();

                    passiveLivenessEvaluate();
                    authenticateFacialDocument();
                }
                else if (parseInt(result.finishStatus) == SdkMobileFinishStatus.Error)
                {
                    showErrorUI(result['errorType']);
                }
                else
                {
                    $("#messageResult").html("").removeClass("blink").hide();
                }
            },
            (err) => showErrorUI(err),
        )
        .finally (() =>
        {
            isStartingSDK = false;
            console.log("callGetExtraData finished...");
        });
    } catch (e) {
        isStartingSDK = false;
        console.log(e);
        showErrorUI(e.message || e);
    }
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
         "flow": "acc560f0-8cbc-475b-b479-1f22ae5cdae8"
     })
    .then(
        (result) => { console.log("launchInitFlow result", result); },
        (err) => showErrorUI(err),
    );

    await facephi.plugins.sdkselphid.setSelphidFlow()
    .then(
        (result) => { console.log("setSelphidFlow result", result); },
        (err) => showErrorUI(err),
    );

    await facephi.plugins.sdkselphi.setSelphiFlow()
    .then(
        (result) => { console.log("setSelphiFlow result", result); },
        (err) => showErrorUI(err),
    );

    await facephi.plugins.sdkcore.launchStartFlow()
    .then(
        (result) => { console.log("launchStartFlow result", result); },
        (err) => showErrorUI(err),
    );
}
