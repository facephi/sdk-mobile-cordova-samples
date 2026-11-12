var isStartingSDK   = false;

const CUSTOMER_ID               = "cordoba@facephi.com";
const LICENSE_APIKEY_ANDROID    = ""; // PROD
const LICENSE_APIKEY_IOS        = ""; // PROD
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
    var text = String(message == null ? "" : message).replace(/_/g, " ");
    $("#messageResult").text("Error: " + text).show();
}