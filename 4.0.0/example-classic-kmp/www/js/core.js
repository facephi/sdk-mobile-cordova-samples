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
        (result) => {
            console.log(result);
            resetUi();
            clearStatus();
        },
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
                clearStatus();
            }
        },
        (err) => showErrorUI(err),
    )
    .finally (() =>
    {
        isStartingSDK = false;
        console.log("callInitSession finished...");
    });
}

function callInitOperation()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    console.log('callInitOperation started...');
    clearStatus();

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
            else
            {
                clearStatus();
            }
        },
        (err) => showErrorUI(err),
    )
    .finally (() =>
    {
        isStartingSDK = false;
        console.log("callInitOperation finished...");
    });
}

function callGetExtraData()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    console.log('callGetExtraData started...');
    clearStatus();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    isStartingSDK = true;

    data = null;
    facephi.plugins.sdkcore.launchGetExtraData()
    .then(
        (result) => {
            console.log(result);
            if (parseInt(result.finishStatus) == SdkMobileFinishStatus.Ok)
            {
                data = result.data;
                passiveLivenessEvaluate();
                authenticateFacialDocument();
            }
        },
        (err) => showErrorUI(err),
    )
    .finally (() =>
    {
        isStartingSDK = false;
        console.log("callGetExtraData finished...");
    });
}

function callGetFlows()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    facephi.plugins.sdkcore.launchGetFlowIntegrationData()
    .then(
        (result) => {
            console.log(result);
            if (parseInt(result.finishStatus) == SdkMobileFinishStatus.Ok) {
                var list = result.data;
                if (typeof list === "string" && list) {
                    try { list = JSON.parse(list); } catch (e) { list = []; }
                }
                showFlowList(Array.isArray(list) ? list : []);
                clearStatus();
            } else {
                showErrorUI(result.errorType || result.errorMessage || fphi_str_unknown_error);
            }
        },
        (err) => showErrorUI(err),
    );
}

async function callFlow()
{
    if (typeof facephi.plugins.sdkcore === "undefined") {
        showErrorUI("Cordova Core Sdk is not installed...");
        return;
    }

    if (!selectedFlowId) {
        showErrorUI("Selecciona un flujo.");
        return;
    }

    console.log('callFlow started...');

    await facephi.plugins.sdkcore.launchInitFlow({
         "customerId": CUSTOMER_ID,
         "flow": selectedFlowId
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
