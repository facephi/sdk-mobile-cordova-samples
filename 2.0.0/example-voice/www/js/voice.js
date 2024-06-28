var voiceResponse = null;

function callVoice()
{
    if (typeof facephi.plugins.sdkvoice === "undefined") {
        showErrorUI("Cordova Voice Sdk is not installed...");
        return;
    }

    console.log('callVoice started...');
    $("#messageResult").html("Starting proccess...").addClass("blink").css("color", "#000000").css("text-align","center").show();

    if (isStartingSDK) {
        console.log("A process is running...");
        return false;
    }
    if (!isStartingSDK) {
        isStartingSDK = true;
    }

    var config = new SdkVoiceConfig();
    config.setPhrases("Hola Facephi Component|Hello world|Desarrollo del componente Voice")
    config.setVibrationEnabled(true);
    config.setShowTutorial(true);

    voiceResponse = null;
    facephi.plugins.sdkvoice.launchVoice(config)
    .then(
        (result) => console.log(result),
        (err) => console.log(err),
    )
    .finally (() =>
    {
        isStartingSDK = false;
        console.log("callVoice finished...");
        $("#messageResult").html("").removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
    });
}