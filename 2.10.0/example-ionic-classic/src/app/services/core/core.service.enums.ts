export enum SdkErrorType 
{
    UnknownError = "UNKNOWN_ERROR",
    NoError = "NO_ERROR",
    InitFlow = "INIT_FLOW",
    CameraPermissionDenied = "CAMERA_PERMISSION_DENIED",
    PermissionDenied = "PERMISSION_DENIED",
    SettingsPermissionDenied = "SETTINGS_PERMISSION_ERROR",
    HardwareError = "HARDWARE_ERROR",
    ExtractionLicenseError = "EXTRACTION_LICENSE_ERROR",
    UnexpectedCaptureError = "UNEXPECTED_CAPTURE_ERROR",
    ControlNotInitializedError = "CONTROL_NOT_INITIALIZATED_ERROR",
    BadExtractorConfiguration = "BAD_EXTRACTOR_CONFIGURATION_ERROR",
    Timeout = "TIMEOUT",
    CancelByUser = "CANCEL_BY_USER",
    InitProccessError = "INIT_PROCCESS_ERROR",
    NfcError = "NFC_ERROR",
    NetworkConnection = "NETWORK_CONNECTION_ERROR",
    TokenError = "TOKEN_ERROR",
    InitSessionError = "INIT_SESSION_ERROR",
    ComponentControllerError = "COMPONENT_CONTROLLER_ERROR",
    LicenseCheckerErrorInvalidLicense = "LICENSE_CHECKER_ERROR",
    LicensingErrorAppIdInvalid = "LICENSING_ERROR_APP_ID_INVALID",
    LicensingErrorApiKeyForbidden = "LICENSING_ERROR_API_KEY_FORBIDDEN",
    LicensingErrorLicenseNotFound = "LICENSING_ERROR_LICENSE_NOT_FOUND",
    LicensingErrorPackageName = "LICENSING_ERROR_PACKAGE_NAME",
    LicenseCheckerErrorInvalidComponentLicense = "LICENSING_CHECKER_ERROR_INVALID_COMPONENT_LICENSE",
    ComponentControllerApplicationError = "COMPONENT_CONTROLLER_APPLICATION_ERROR",
    NoOperationCreatedError = "NO_OPERATION_CREATED_ERROR",
    LicenseStringError = "LICENSING_ERROR",
    SdkNotInitialized = "SDK_NOT_INITIALIZED_ERROR",
    NfcErrorReading = "NFC_ERROR_READING",
    TrackingError = "TRACKING_ERROR",
    ActivityResultError = "ACTIVITY_RESULT_ERROR",
    ExtractorLicenseError = "EXTRACTION_LICENSE_ERROR",
    InitializationError = "INITIALIZATION_ERROR",
    ResourcesNotFound = "RESOURCES_NOT_FOUND",
    NfcErrorDisabled = "NFC_ERROR_DISABLED",
    NfcErrorData = "NFC_ERROR_DATA",
    NfcErrorNotSupported = "NFC_ERROR_NOT_SUPPORTED",
    NfcErrorTagLost = "NFC_ERROR_TAG_LOST",
    NfcErrorIllegalArgument = "NFC_ERROR_ILLEGAL_ARGUMENT",
    QrCaptureError = "QR_CAPTURE_ERROR",
    CameraError = "CAMERA_ERROR",
    PhacturasCaptureError = "PHACTURAS_CAPTURE_ERROR",
    QrGenerationError = "QR_GENERATION_ERROR",
    NoDataError = "NO_DATA_ERROR",
    VideoError = "VIDEO_ERROR",
    PhingersAutofocusFailure = "PHINGERS_AUTOFOCUS_FAILURE",
    PhingersCaptureFailure = "PHINGERS_CAPTURE_FAILURE",
    PhingersCameraFailure = "PHINGERS_CAMERA_FAILURE",
    PhingersFingerprintTemplateIoError = "PHINGERS_FINGERPRINT_TEMPLATE_IO_ERROR",
    PhingersConfigurationFailure = "PHINGERS_CONFIGURATION_FAILURE",
    PhingersFingerprintCaptureFailure = "PHINGERS_FINGERPRINT_CAPTURE_FAILURE",
    PhingersLicensingFailure = "PHINGERS_LICENSING_FAILURE",
    PhingersLivenessFailure = "PHINGERS_LIVENESS_FAILURE",
    PhingersNoFingersDetected = "PHINGERS_NO_FINGERS_DETECTED",
    PhingersUniqueUserIdNotSpecified = "PHINGERS_UNIQUE_USER_ID_NOT_SPECIFIED",
}

export enum SdkFinishStatus {
    Ok = 1,
    Error = 2
}

/**
 * Enum for OperationType values.
 * @readonly
 * @enum {string}
 */
export enum SdkOperationType {
    Authentication = "Authentication",
    Onboarding = "Onboarding"
}

/**
 * Enum for OperationEventTracking values.
 * @readonly
 * @enum {string}
 */
export enum SdkOperationEventTracking {
    Success = "Success",
    Denied = "Denied"
}