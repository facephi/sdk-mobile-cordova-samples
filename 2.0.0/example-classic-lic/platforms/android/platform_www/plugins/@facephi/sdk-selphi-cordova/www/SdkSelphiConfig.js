cordova.define("@facephi/sdk-selphi-cordova.SdkSelphiConfig", function(require, exports, module) {
/**
 * Modifies the Widget configuration.
 * @param Boolean debug         enables or disables the Widget debug options.
 * @param Double  cropPercent   Indicates the percentages of cropping of the result images.
 */

/* global SdkSelphiConfig:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkSelphiConfig = function () {
    this.showResultAfterCapture = false;
    this.debug = false;
    this.jpgQuality = 0.95;
    this.compressFormat = 'jpeg';
    this.cropPercent = 1.0;
    this.logImages = false;
    this.fullscreen = true;
    this.livenessMode = 'PASSIVE';
    this.locale = null;
    this.templateRawOptimized = true;
    this.stabilizationMode = false;
    this.enableGenerateTemplateRaw = false;
    this.qrMode = false;
    this.translationsContent = '';
    this.viewsContent = '';
    this.resourcesPath = 'fphi-selphi-widget-resources-sdk.zip';
    this.showDiagnostic = false;
    this.showTutorial = false;
    this.cameraId = -1000;
    this.params = null;
    this.cameraFlashEnabled = false;
    this.videoFilename = '';
    this.showPreviousTip = false;
    this.extractionDuration = '';
    this.cameraPreferred = 'FRONT';
    this.vibrationEnabled = false;
    this.moveSuccessfulAttempts = -1000;
    this.moveFailedAttempts = -1000;
};

SdkSelphiConfig.prototype.setMoveFailedAttempts = function (value) {
    this.moveFailedAttempts = value;
};

SdkSelphiConfig.prototype.setMoveSuccessfulAttempts = function (value) {
    this.moveSuccessfulAttempts = value;
};

SdkSelphiConfig.prototype.setVibrationEnabled = function (value) {
    this.vibrationEnabled = value;
};

SdkSelphiConfig.prototype.setCameraPreferred = function (value) {
    this.cameraPreferred = value;
};

SdkSelphiConfig.prototype.setExtractionDuration = function (value) {
    this.extractionDuration = value;
};

SdkSelphiConfig.prototype.setShowPreviousTip = function (value) {
    this.showPreviousTip = value;
};

SdkSelphiConfig.prototype.setVideoFilename = function (value) {
    this.videoFilename = value;
};

SdkSelphiConfig.prototype.setCameraFlashEnabled = function (value) {
    this.cameraFlashEnabled = value;
};

/**
* Sets the compressFormat (example: "jpeg" or "png")
*/
SdkSelphiConfig.prototype.setCompressFormat = function (value) {
    this.compressFormat = value;
};

SdkSelphiConfig.prototype.setShowTutorial = function (value) {
    this.showTutorial = value;
};

SdkSelphiConfig.prototype.setShowDiagnostic = function (value) {
    this.showDiagnostic = value;
};

/**
 * Choose the resources Path. (example: fphi-selphi-widget-resources-sdk.zip)
 */
SdkSelphiConfig.prototype.setShowResultAfterCapture = function (showResultAfterCapture) {
    this.showResultAfterCapture = showResultAfterCapture;
};

/**
 * Choose the resources Path. (example: fphi-selphi-widget-resources-sdk.zip)
 */
SdkSelphiConfig.prototype.setResourcesPath = function (resourcesPath) {
    this.resourcesPath = resourcesPath;
};

/**
 * Choose the cameraId.
 */
SdkSelphiConfig.prototype.setCameraId = function (cameraId) {
    checkType(cameraId, ['number']);
    this.cameraId = cameraId;
};

/**
 * Set new Parameters. Only for development issues.
 */
SdkSelphiConfig.prototype.setParams = function (params) {
    this.params = params;
};

/**
 * Enable the translationsContent.
 */
SdkSelphiConfig.prototype.setTranslationsContent = function (translationsContent) {
    checkType(translationsContent, ['string']);
    this.translationsContent = translationsContent;
};

/**
 * Sets the widget viewsContent.
 */
SdkSelphiConfig.prototype.setViewsContent = function (viewsContent) {
    checkType(viewsContent, ['string']);
    this.viewsContent = viewsContent;
};

/**
 * Enable the widget for QR scans or not before the face scan.
 */
SdkSelphiConfig.prototype.setQRMode = function (isQRMode) {
    checkType(isQRMode, ['boolean']);
    this.qrMode = isQRMode;
};

/**
 * Sets if the widget return the generateTemplateRaw in the result or not.
 */
SdkSelphiConfig.prototype.setEnableGenerateTemplateRaw = function (isEnableGenerateTemplateRaw) {
    checkType(isEnableGenerateTemplateRaw, ['boolean']);
    this.enableGenerateTemplateRaw = isEnableGenerateTemplateRaw;
};

/**
 * Sets if the widget is fullscreen or not.
 */
SdkSelphiConfig.prototype.setEnableFullscreen = function (isFullscreen) {
    checkType(isFullscreen, ['boolean']);
    this.fullscreen = isFullscreen;
};

/**
 * Sets if the blink detection is enabled or not.
 */
SdkSelphiConfig.prototype.setLivenessMode = function (livenessMode) {
    if (livenessMode != null) { this.livenessMode = livenessMode; }
};

/**
 * Sets if the templateRaw is optimized or not.
 */
SdkSelphiConfig.prototype.setTemplateRawOptimized = function (templateRawOptimized) {
    checkType(templateRawOptimized, ['boolean']);
    this.templateRawOptimized = templateRawOptimized;
};

/**
 * Sets if the authentication must stabilize before the capturing process.
 */
SdkSelphiConfig.prototype.setStabilizationMode = function (stabilizationMode) {
    checkType(stabilizationMode, ['boolean']);
    this.stabilizationMode = stabilizationMode;
};

/**
 * Sets 4 bytes with data that can be configured by the main application and that will be included in the templates generated by the widget.
 */
SdkSelphiConfig.prototype.setJPGQuality = function (JPGQuality) {
    checkType(JPGQuality, ['number']);
    this.jpgQuality = JPGQuality;
};

/**
 * Sets if the widget is fullscreen or not.
 */
SdkSelphiConfig.prototype.setLocale = function (locale) {
    this.locale = locale;
};

/**
 * Gets if the plugin must return a sample extraction image.
 *
 * @property setLogImages
 * @type   Boolean
 * @default false
 */
SdkSelphiConfig.prototype.setLogImages = function (_logImages) {
    checkType(_logImages, ['boolean']);
    this.logImages = _logImages;
};

/**
 * Sets the debug mode enabled or disabled
 *
 * @property setDebug
 * @type   Boolean
 * @default false
 */
SdkSelphiConfig.prototype.setDebug = function (_debug) {
    checkType(_debug, ['boolean']);
    this.debug = _debug;
};

/**
 * Sets the crop percentage
 *
 * @property setCropPercent
 * @type   Double
 * @default 1.0
 */
SdkSelphiConfig.prototype.setCropPercent = function (_cropPercent) {
    checkType(_cropPercent, ['number']);
    this.cropPercent = _cropPercent;
};

SdkSelphiConfig.prototype.getMoveFailedAttempts = function () {
    return this.moveFailedAttempts;
};

SdkSelphiConfig.prototype.getMoveSuccessfulAttempts = function () {
    return this.moveSuccessfulAttempts;
};

SdkSelphiConfig.prototype.getVibrationEnabled = function () {
    return this.vibrationEnabled;
};

SdkSelphiConfig.prototype.getCameraPreferred = function () {
    return this.cameraPreferred;
};

SdkSelphiConfig.prototype.getVideoFilename = function () {
    return this.videoFilename;
};

SdkSelphiConfig.prototype.getCameraFlashEnabled = function () {
    return this.cameraFlashEnabled;
};

SdkSelphiConfig.prototype.getShowTutorial = function () {
    return this.showTutorial;
};

SdkSelphiConfig.prototype.getShowDiagnostic = function () {
    return this.showDiagnostic;
};

/**
 * Gets if result return the getShowResultAfterCapture
 *
 * @property getShowResultAfterCapture
 * @type   Boolean
 * @default false
 */
SdkSelphiConfig.prototype.getShowResultAfterCapture = function () {
    return this.showResultAfterCapture;
};

/**
 * Gets if result return the getCameraId
 *
 * @property getResourcesPath
 * @type   String
 * @default fphi-selphi-widget-resources-sdk.zip
 */
SdkSelphiConfig.prototype.getResourcesPath = function () {
    return this.resourcesPath;
};

/**
 * Gets if result return the getCameraId
 *
 * @property getCameraId
 * @type   Number
 * @default 100
 */
SdkSelphiConfig.prototype.getCameraId = function () {
    return this.cameraId;
};

/**
 * Gets if result return the getTranslationsContent or not
 *
 * @property getParams
 * @type   String
 * @default null
 */
SdkSelphiConfig.prototype.getParams = function () {
    return this.params;
};

/**
 * Gets if result return the getTranslationsContent or not
 *
 * @property getTranslationsContent
 * @type   String
 * @default ""
 */
SdkSelphiConfig.prototype.getTranslationsContent = function () {
    return this.translationsContent;
};

/**
 * Gets if result return the getViewsContent or not
 *
 * @property getViewsContent
 * @type   String
 * @default ""
 */
SdkSelphiConfig.prototype.getViewsContent = function () {
    return this.viewsContent;
};

/**
 * Gets if result return the generateTemplateRaw or not
 *
 * @property getEnableGenerateTemplateRaw
 * @type   Boolean
 * @default false
 */
SdkSelphiConfig.prototype.getEnableGenerateTemplateRaw = function () {
    return this.enableGenerateTemplateRaw;
};

/**
 * Gets if user control process images are enabled or not
 *
 * @property getLogImages
 * @type   Boolean
 * @default false
 */
SdkSelphiConfig.prototype.getLogImages = function () {
    return this.logImages;
};

/**
 * Gets if debug mode is enabled or not
 *
 * @property getDebug
 * @type   Boolean
 * @default false
 */
SdkSelphiConfig.prototype.getDebug = function () {
    return this.debug;
};

/**
 * Gets the crop percentage of the image
 *
 * @property getCropPercent
 * @type   Double
 * @default 1.0
 */
SdkSelphiConfig.prototype.getCropPercent = function () {
    return this.cropPercent;
};

SdkSelphiConfig.prototype.getShowPreviousTip = function () {
    return this.showPreviousTip;
};

SdkSelphiConfig.prototype.getExtractionDuration = function () {
    return this.extractionDuration;
};

/**
 * Returns params in JSON string format
 *
 * @method toString
 * @return String Widget params JSON structure in string format
 */
SdkSelphiConfig.prototype.toString = function () {
    const output = [
        { debug: +String(this.debug) },
        { showResultAfterCapture: +String(this.showResultAfterCapture) },
        { cropPercent: +String(this.cropPercent) },
        { logImages: +String(this.logImages) },
        { jpgQuality: +String(this.jpgQuality) },
        { compressFormat: +String(this.compressFormat) },
        { fullscreen: +String(this.fullscreen) },
        { templateRawOptimized: +String(this.templateRawOptimized) },
        { stabilizationMode: +String(this.stabilizationMode) },
        { livenessMode: +String(this.livenessMode) },
        { locale: +String(this.locale) },
        { enableGenerateTemplateRaw: +(this.enableGenerateTemplateRaw) },
        { qrMode: +(this.qrMode) },
        { cameraId: +(this.cameraId) },
        { params: +(this.params) },
        { resourcesPath: +(this.resourcesPath) },
        { showDiagnostic: +(this.showDiagnostic) },
        { showTutorial: +(this.showTutorial) },
        { cameraFlashEnabled: +(this.cameraFlashEnabled) },
        { videoFilename: +(this.videoFilename) },
        { showPreviousTip: +(this.showPreviousTip) },
        { extractionDuration: +(this.extractionDuration) },
        { cameraPreferred: +(this.cameraPreferred) },
        { vibrationEnabled: +(this.vibrationEnabled) },
        { moveFailedAttempts: +(this.moveFailedAttempts) },
        { moveSuccessfulAttempts: +(this.moveSuccessfulAttempts) }
    ];

    return JSON.stringify(output);
};

function typeOf (obj) {
    return {}.toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();
}

/**
 * Checks if the param type is correct
 *
 * @method checkType
 * @throws TypeError Throws a type error exception if the type is not correct.
 */
function checkType (args, types) {
    // args = [].slice.call(args);
    for (var i = 0; i < types.length; ++i) {
        if (typeOf(args) !== types[i]) {
            throw new TypeError('param ' + i + ' must be of type ' + types[i]);
        } else {
            console.log('checkType ' + types[i] + ' ok!');
        }
    }
}

module.exports.SdkSelphiConfig = SdkSelphiConfig;

});
