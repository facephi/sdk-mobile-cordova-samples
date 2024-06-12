function callNfc()
{
    if (typeof facephi.plugins.sdknfc === "undefined") {
        showErrorUI("Cordova Nfc Sdk is not installed...");
        return;
    }

    console.log('callNfc started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

    var config = new SdkNfcConfig();

    config.setDocNumber("AAA439684");
    config.setBirthDate("16/08/1979");
    config.setExpirationDate("29/11/2022");
    config.setExtractionTimeout(50000);

    facephi.plugins.sdknfc.launchNfc(config)
    .then(
        (result) => console.log(result),
        (err) => console.log(err),
    )
    .finally (() =>
    {
        console.log("callNfc finished...");
        $("#messageResult").html("").removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
        isStartingSDK = false
    });
}