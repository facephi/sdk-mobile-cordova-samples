var isStartingSDK   = false;

const CUSTOMER_ID               = "cordoba@facephi.com";
const LICENSE_APIKEY_ANDROID    = "";
const LICENSE_APIKEY_IOS        = "";
const LICENSE_URL               = "";
const LICENSEIOS_NEW            = "{}";
const LICENSEANDROID_NEW        = "{}";

/// FINISH_STATUS MESSAGES
const fphi_str_stopped_manually = "User cancelled the process.";
const fphi_str_timeout = "Process finished by timeout condition.";
const fphi_str_unknown_error = "Unexpected error.";

// ERROR TYPE MESSAGES
const fphi_str_camera_permission_denied = "Camera permission are disabled.";
const fphi_str_settings_permission_denied = "Settings permission are disabled.";
const fphi_str_permission_denied = "Permission are disabled.";
const fphi_str_low_memory = "Process cancelled due to low memory issues.";
const fphi_str_hardware_error = "A hardware internal error has occurred.";
const fphi_str_generic_extraction_license = "The license data is not correct.";
const fphi_str_generic_unexpected_captured = "The capturing process has failed.";
const fphi_str_generic_control_not_initialized = "Unable to initialize the component.";
const fphi_str_generic_bad_extractor_conf = "The extractor configuration is not correct.";
const fphi_str_init_proccess_error = "The init proccess failed.";
const fphi_str_nfc_error = "The NFC failed.";
const fphi_str_network_connection = "There is a problem with the internet connection";
const fphi_str_token_error = "The token failed";
const fphi_str_init_session_error = "The init session failed";
const fphi_str_component_controller_error = "The component controller failed";
const fphi_str_lic_error = "The license is incorrect";
const fphi_str_license_checker_error_invalid_license = "License Checker Error Invalid License";
const fphi_str_licensing_error_app_id_invalid = "Licensing Error AppId Invalid";
const fphi_str_licensing_error_api_key_forbidden = "Licensing Error ApiKey Forbidden";
const fphi_str_licensing_error_license_not_found = "Licensing Error License Not Found";
const fphi_str_licensing_error_package_name = "Licensing Error PackageName";
const fphi_str_license_checker_error_invalid_component_license = "License Checker Error Invalid Component License";
const fphi_str_component_controller_application_error = "Component Controller Application Error";
const fphi_str_no_operation_created_error = "No Operation Created Error";
const fphi_str_license_string_error = "License string Error";
const fphi_str_sdk_not_initialized = "SDK not initialized";
const fphi_str_sdk_init_flow = "Init flow initialized incorrectly. Check the flow.json file.";
const fphi_str_tracking_error = "Tracking Error.";
const fphi_str_activity_result_error = "Activity Result Error.";
const fphi_str_extractor_license_error = "Extractor License Error.";
const fphi_str_initialization_error = "Initialization Error";
const fphi_str_resourses_not_found = "Resourses not found.";
const fphi_str_nfc_error_disabled = "Nfc error disabled.";
const fphi_str_nfc_error_data = "Nfc error data.";
const fphi_str_nfc_error_not_supported = "Nfc error not supported.";
const fphi_str_nfc_error_tag_lost = "Nfc error tag lost.";
const fphi_str_nfc_error_illegal_argument = "Nfc error illegal argument.";
const fphi_str_qr_capture_error = "QR Capture Error.";
const fphi_str_camera_error = "Camera Error.";
const fphi_str_phacturas_capture_error = "Phacturas Capture Error.";
const fphi_str_qr_generation_error = "Qr Generation Error.";
const fphi_str_no_data_error = "No Data Error.";
const fphi_str_video_error = "Video Error.";
const fphi_str_phingers_autofocus_failure = "Phingers autofocus failure.";
const fphi_str_phingers_capture_failure = "Phingers capture failure.";
const fphi_str_phingers_camera_failure = "Phingers camera failure.";
const fphi_str_phingers_fingerprint_template_io_error = "Phingers fingerprint template IO Error.";
const fphi_str_phingers_configuration_failure = "Phingers configuration failure.";
const fphi_str_phingers_fingerprint_capture_failure = "Phingers fingerprint capture failure.";
const fphi_str_phingers_licensing_failure = "Phingers licensing failure.";
const fphi_str_phingers_liveness_failure = "Phingers liveness failure.";
const fphi_str_phingers_no_detected = "Phingers no detected.";
const fphi_str_phingers_unique_userid_not_specified = "Phingers unique userId not specified.";
const fphi_str_license_checker_error = "License Checker Error";

/**
 * Method to show an error in the UI
 * @method showErrorUI
 * @param String message The message to show
 */
function showErrorUI(message) {
    //alert("Error:" + message);
    $("#messageResult").html("Error:" + message).removeClass("blink").css("color", "#ff0000").css("text-align", "center").show();
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

function getErrorStringToShow(data)
{
    if (data['errorType'] === SdkErrorType.InitFlow) // Unknown Error
    {
        showErrorUI(fphi_str_sdk_init_flow);
    }
    if (data['errorType'] === SdkErrorType.UnknownError) // Unknown Error
    {
        showErrorUI(fphi_str_unknown_error);
    }
    if (data['errorType'] === SdkErrorType.CameraPermissionDenied) // Camera Permission Denied
    {
        showErrorUI(fphi_str_camera_permission_denied);
    }
    if (data['errorType'] === SdkErrorType.SettingsPermissionDenied) // Settings Permission Denied
    {
        showErrorUI(fphi_str_settings_permission_denied);
    }
    if (data['errorType'] === SdkErrorType.HardwareError) // Hardware error
    {
        showErrorUI(fphi_str_hardware_error);
    }
    if (data['errorType'] === SdkErrorType.ExtractionLicenseError)
    {
        showErrorUI(fphi_str_generic_extraction_license);
    }
    if (data['errorType'] === SdkErrorType.UnexpectedCaptureError)
    {
        showErrorUI(fphi_str_generic_unexpected_captured);
    }
    if (data['errorType'] === SdkErrorType.ControlNotInitializedError)
    {
        showErrorUI(fphi_str_generic_control_not_initialized);
    }
    if (data['errorType'] === SdkErrorType.BadExtractorConfiguration)
    {
        showErrorUI(fphi_str_generic_bad_extractor_conf);
    }
    if (data['errorType'] === SdkErrorType.CancelByUser)
    {
        showErrorUI(fphi_str_stopped_manually);
    }
    if (data['errorType'] === SdkErrorType.Timeout)
    {
        showErrorUI(fphi_str_timeout);
    }
    if (data['errorType'] === SdkErrorType.InitProccessError)
    {
        showErrorUI(fphi_str_init_proccess_error);
    }
    if (data['errorType'] === SdkErrorType.NfcError)
    {
        showErrorUI(fphi_str_nfc_error);
    }
    if (data['errorType'] === SdkErrorType.NetworkConnection)
    {
        showErrorUI(fphi_str_network_connection);
    }
    if (data['errorType'] === SdkErrorType.TokenError)
    {
        showErrorUI(fphi_str_token_error);
    }
    if (data['errorType'] === SdkErrorType.InitSessionError)
    {
        showErrorUI(fphi_str_init_session_error);
    }
    if (data['errorType'] === SdkErrorType.ComponentControllerError)
    {
        showErrorUI(fphi_str_component_controller_error);
    }
    if (data['errorType'] === SdkErrorType.LicenseCheckerErrorInvalidLicense)
    {
        showErrorUI(fphi_str_license_checker_error_invalid_license);
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorAppIdInvalid)
    {
        showErrorUI(fphi_str_licensing_error_app_id_invalid);
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorApiKeyForbidden)
    {
        showErrorUI(fphi_str_licensing_error_api_key_forbidden);
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorLicenseNotFound)
    {
        showErrorUI(fphi_str_licensing_error_license_not_found);
    }
    if (data['errorType'] === SdkErrorType.LicensingErrorPackageName)
    {
        showErrorUI(fphi_str_licensing_error_package_name);
    }
    if (data['errorType'] === SdkErrorType.LicenseCheckerErrorInvalidComponentLicense)
    {
        showErrorUI(fphi_str_license_checker_error_invalid_component_license);
    }
    if (data['errorType'] === SdkErrorType.ComponentControllerApplicationError)
    {
        showErrorUI(fphi_str_component_controller_application_error);
    }
    if (data['errorType'] === SdkErrorType.NoOperationCreatedError)
    {
        showErrorUI(fphi_str_no_operation_created_error);
    }
    if (data['errorType'] === SdkErrorType.LicenseStringError)
    {
        showErrorUI(fphi_str_license_string_error);
    }
    if (data['errorType'] === SdkErrorType.SdkNotInitialized)
    {
        showErrorUI(fphi_str_sdk_not_initialized);
    }
    if (data['errorType'] === SdkErrorType.TrackingError)
    {
        showErrorUI(fphi_str_tracking_error);
    }
    if (data['errorType'] === SdkErrorType.ActivityResultError)
    {
        showErrorUI(fphi_str_activity_result_error);
    }
    if (data['errorType'] === SdkErrorType.ExtractorLicenseError)
    {
        showErrorUI(fphi_str_extractor_license_error);
    }
    if (data['errorType'] === SdkErrorType.InitializationError)
    {
        showErrorUI(fphi_str_initialization_error);
    }
    if (data['errorType'] === SdkErrorType.ResourcesNotFound)
    {
        showErrorUI(fphi_str_resourses_not_found);
    }
    if (data['errorType'] === SdkErrorType.NfcErrorDisabled)
    {
        showErrorUI(fphi_str_nfc_error_disabled);
    }
    if (data['errorType'] === SdkErrorType.NfcErrorData)
    {
        showErrorUI(fphi_str_nfc_error_data);
    }
    if (data['errorType'] === SdkErrorType.NfcErrorNotSupported)
    {
       showErrorUI(fphi_str_nfc_error_not_supported);
    }
    if (data['errorType'] === SdkErrorType.NfcErrorTagLost)
    {
        showErrorUI(fphi_str_nfc_error_tag_lost);
    }
    if (data['errorType'] === SdkErrorType.NfcErrorIllegalArgument)
    {
        showErrorUI(fphi_str_nfc_error_illegal_argument);
    }
    if (data['errorType'] === SdkErrorType.QrCaptureError)
    {
        showErrorUI(fphi_str_qr_capture_error);
    }
    if (data['errorType'] === SdkErrorType.CameraError)
    {
        showErrorUI(fphi_str_camera_error);
    }
    if (data['errorType'] === SdkErrorType.PhacturasCaptureError)
    {
        showErrorUI(fphi_str_phacturas_capture_error);
    }
    if (data['errorType'] === SdkErrorType.QrGenerationError)
    {
        showErrorUI(fphi_str_qr_generation_error);
    }
    if (data['errorType'] === SdkErrorType.NoDataError)
    {
        showErrorUI(fphi_str_no_data_error);
    }
    if (data['errorType'] === SdkErrorType.VideoError)
    {
        showErrorUI(fphi_str_video_error);
    }
    if (data['errorType'] === SdkErrorType.PermissionDenied)
    {
        showErrorUI(fphi_str_permission_denied);
    }
    if (data['errorType'] === SdkErrorType.PhingersAutofocusFailure)
    {
        showErrorUI(fphi_str_phingers_autofocus_failure);
    }
    if (data['errorType'] === SdkErrorType.PhingersCaptureFailure)
    {
        showErrorUI(fphi_str_phingers_capture_failure);
    }
    if (data['errorType'] === SdkErrorType.PhingersCameraFailure)
    {
        showErrorUI(fphi_str_phingers_camera_failure);
    }
    if (data['errorType'] === SdkErrorType.PhingersFingerprintTemplateIoError)
    {
         showErrorUI(fphi_str_phingers_fingerprint_template_io_error);
    }
    if (data['errorType'] === SdkErrorType.PhingersConfigurationFailure)
    {
        showErrorUI(fphi_str_phingers_configuration_failure);
    }
    if (data['errorType'] === SdkErrorType.PhingersFingerprintCaptureFailure)
    {
        showErrorUI(fphi_str_phingers_fingerprint_capture_failure);
    }
    if (data['errorType'] === SdkErrorType.PhingersLicensingFailure)
    {
        showErrorUI(fphi_str_phingers_licensing_failure);
    }
    if (data['errorType'] === SdkErrorType.PhingersLivenessFailure)
    {
        showErrorUI(fphi_str_phingers_liveness_failure);
    }
    if (data['errorType'] === SdkErrorType.PhingersNoFingersDetected)
    {
        showErrorUI(fphi_str_phingers_no_detected);
    }
    if (data['errorType'] === SdkErrorType.PhingersUniqueUserIdNotSpecified)
    {
       showErrorUI(fphi_str_phingers_unique_userid_not_specified);
    }
}
