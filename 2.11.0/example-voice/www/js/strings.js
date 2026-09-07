var isStartingSDK   = false;

const CUSTOMER_ID               = "cordoba@facephi.com";
const LICENSE_APIKEY_ANDROID    = "";
const LICENSE_APIKEY_IOS        = "";
const LICENSE_URL               = "";

const LICENSEIOS_NEW            = "{}";
const LICENSEANDROID_NEW        = "{}";

/// FINISH_STATUS MESSAGES
const fphi_str_stopped_manually = "User cancelled the process.";
const fphi_str_timeout          = "Process finished by timeout condition.";
const fphi_str_unknown_error    = "Unexpected error.";

/**
 * Method to show an error in the UI
 * @method showErrorUI
 * @param String message The message to show
 */
function showErrorUI(message) {
    //alert("Error:" + message);
    $("#messageResult").html("Error: " + message.replace(/_/g, " ")).removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
};

/**
 * Method to show a message in the UI
 * @method showMessageUI
 * @param String result The message to show
 */
function showMessageUI(message)
{
    //alert(message);
    $("#messageResult").html(message).removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
};
