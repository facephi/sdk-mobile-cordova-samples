cordova.define("@facephi/sdk-selphid-cordova.SdkSelphidConfig", function(require, exports, module) {
/**
 * Modifies the Widget configuration.
 * @param Boolean debug         enables or disables the Widget debug options.
 * @param Boolean showResultAfterCapture         If it is true, after document side capture the widget show the result and ask you if you want to repeat the process.
 * @param Double  showTutorial   If it is true, then the tutorial will be showed before the operation process.
 * @param WidgetSelphIDScanMode  scanMode  Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
 * @param String  locale  the localization (example: ES_es)
 * @param WidgetSelphIDDocumentType documentType IDCARD: Scans searching country id documents, PASSPORT: Scans searching passport documents.
 */
/* global SdkSelphIDConfig:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkSelphIDConfig = function () {
    this.debug = false;
    this.showResultAfterCapture = true;
    this.showTutorial = false;
    this.tutorialOnly = false;
    this.scanMode = 'Generic';
    this.specificData = null;
    this.locale = null;
    this.fullscreen = true;
    this.documentType = 'DT_IDCard';
    this.documentSide = 'Front';
    this.timeout = 'Short';
    this.documentModels = '';
    this.videoFilename = '';
    this.generateRawImages = false;
    this.compressFormat = 'jpeg';
    this.jpgQuality = 0.95;
    this.viewsContent = '';
    this.translationsContent = '';
    this.resourcesPath = 'fphi-selphid-widget-resources-sdk.zip';
    this.showDiagnostic = false;
    this.cameraId = -1000;
    this.params = null;
    this.tokenImageQuality = 0.5;
    this.tokenPreviousCaptureData = '';
    this.wizardMode = true;
    this.showPreviousTip = false;
    this.vibrationEnabled = false;
};

SdkSelphIDConfig.prototype.setVibrationEnabled = function (value) {
    this.vibrationEnabled = value;
};

SdkSelphIDConfig.prototype.setShowPreviousTip = function (value) {
    this.showPreviousTip = value;
};

SdkSelphIDConfig.prototype.setVideoFilename = function (value) {
    this.videoFilename = value;
};

SdkSelphIDConfig.prototype.setWizardMode = function (value) {
    this.wizardMode = value;
};

SdkSelphIDConfig.prototype.setTokenPreviousCaptureData = function (value) {
    this.tokenPreviousCaptureData = value;
};

SdkSelphIDConfig.prototype.setTokenImageQuality = function (value) {
    this.tokenImageQuality = value;
};

SdkSelphIDConfig.prototype.setShowDiagnostic = function (value) {
    this.showDiagnostic = value;
};

/**
 * Choose the resources Path. (example: fphi-selphid-widget-resources-sdk.zip)
 */
SdkSelphIDConfig.prototype.setResourcesPath = function (resourcesPath) {
    this.resourcesPath = resourcesPath;
};

/**
 * Choose the cameraId.
 */
SdkSelphIDConfig.prototype.setCameraId = function (cameraId) {
    checkType(cameraId, ['number']);
    this.cameraId = cameraId;
};

/**
 * Set new Parameters. Only for development issues.
 */
SdkSelphIDConfig.prototype.setParams = function (params) {
    this.params = params;
};

/**
* Sets the viewsContent (example: String)
*/
SdkSelphIDConfig.prototype.setViewsContent = function (_viewsContent) {
    this.viewsContent = _viewsContent;
};

/**
* Sets the translationsContent (example: String)
*/
SdkSelphIDConfig.prototype.setTranslationsContent = function (_translationsContent) {
    this.translationsContent = _translationsContent;
};

/**
* Sets the generateRawImages (example: false)
*/
SdkSelphIDConfig.prototype.setGenerateRawImages = function (_generateRawImages) {
    this.generateRawImages = _generateRawImages;
};

/**
* Sets the compressFormat (example: "jpeg" or "png")
*/
SdkSelphIDConfig.prototype.setCompressFormat = function (_compressFormat) {
    this.compressFormat = _compressFormat;
};

/**
* Sets the jpgQuality (example: 0.95)
*/
SdkSelphIDConfig.prototype.setJPGQuality = function (value) {
    this.jpgQuality = value;
};

/**
* Sets the localisation (example: ES_es)
*/
SdkSelphIDConfig.prototype.setLocale = function (_locale) {
    this.locale = _locale;
};

/**
* Sets the localisation (example: ES_es)
*/
SdkSelphIDConfig.prototype.setTimeout = function (_timeout) {
    this.timeout = _timeout;
};

/**
 * Sets the localisation (example: ES_es)
 */
SdkSelphIDConfig.prototype.setFullscreen = function (_fullscreen) {
    this.fullscreen = _fullscreen;
};

/**
* Sets the specific type of document to scan if the scan mode is 'Specific'
*/
SdkSelphIDConfig.prototype.setSpecificData = function (_specificData) {
    this.specificData = _specificData;
};

/**
* Sets the debug mode enabled or disabled
*
* @property setDebug
* @type   Boolean
* @default false
*/
SdkSelphIDConfig.prototype.setDebug = function (_debug) {
    checkType(_debug, ['boolean']);
    this.debug = _debug;
};

/**
* If it is true, after document side capture the widget show the result and ask you if you want to repeat the process.
*
* @property setShowResultAfterCapture
* @type   Boolean
* @default false
*/
SdkSelphIDConfig.prototype.setShowResultAfterCapture = function (_showResultAfterCapture) {
    checkType(_showResultAfterCapture, ['boolean']);
    this.showResultAfterCapture = _showResultAfterCapture;
};

/**
* If it is true, then the tutorial will be showed before the operation process.
*
* @property setShowTutorial
* @type   Boolean
* @default 1.0
*/
SdkSelphIDConfig.prototype.setShowTutorial = function (_showTutorial) {
    checkType(_showTutorial, ['boolean']);
    this.showTutorial = _showTutorial;
};

/**
* If it is true, then the tutorial will be showed before the operation process.
*
* @property setTutorialOnly
* @type   Boolean
* @default 1.0
*/
SdkSelphIDConfig.prototype.setTutorialOnly = function (_tutorialOnly) {
    checkType(_tutorialOnly, ['boolean']);
    this.tutorialOnly = _tutorialOnly;
};

SdkSelphIDConfig.prototype.getVibrationEnabled = function () {
    return this.vibrationEnabled;
};

SdkSelphIDConfig.prototype.getShowDiagnostic = function () {
    return this.showDiagnostic;
};

SdkSelphIDConfig.prototype.getVideoFilename = function () {
    return this.videoFilename;
};

/**
 * Gets the resource path name.
 *
 * @property getResourcesPath
 * @type   String
 * @default fphi-selphid-widget-resources-sdk.zip
 */
SdkSelphIDConfig.prototype.getResourcesPath = function () {
    return this.resourcesPath;
};

/**
 * Gets if result return the getCameraId
 *
 * @property getCameraId
 * @type   Number
 * @default 100
 */
SdkSelphIDConfig.prototype.getCameraId = function () {
    return this.cameraId;
};

/**
 * Gets if result return the getTranslationsContent or not
 *
 * @property getParams
 * @type   String
 * @default null
 */
SdkSelphIDConfig.prototype.getParams = function () {
    return this.params;
};

/**
* If it is true, after document side capture the widget show the result and ask you if you want to repeat the process.
*
* @property getShowResultAfterCapture
* @type   Boolean
* @default false
*/
SdkSelphIDConfig.prototype.getShowResultAfterCapture = function () {
    return this.showResultAfterCapture;
};

/**
* If it is true, then the wgt only will show the tutorial of the widget but the scan document won´t start.
*
* @property getTutorialOnly
* @type   Boolean
* @default true
*/
SdkSelphIDConfig.prototype.getTutorialOnly = function () {
    return this.tutorialOnly;
};

/**
* If it is true, then the tutorial will be showed before the operation process.
*
* @property getShowTutorial
* @type   Boolean
* @default true
*/
SdkSelphIDConfig.prototype.getShowTutorial = function () {
    return this.showTutorial;
};

/**
* Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
*
* @property getScanMode
* @type   WidgetSelphIDScanMode
* @default Generic
*/
SdkSelphIDConfig.prototype.getScanMode = function () {
    return this.scanMode;
};

/**
* Front: Scans the front document, Back: Scans only the back document.
*
* @property getDocumentSide
* @type   SdkSelphIDDocumentSide
* @default Front
*/
SdkSelphIDConfig.prototype.getDocumentSide = function () {
    return this.documentSide;
};

/**
*
* @property getDocumentType
* @type   SdkSelphIDDocumentType
* @default DT_IDCard
*/
SdkSelphIDConfig.prototype.getDocumentType = function () {
    return this.documentType;
};

/**
* Gets the specific type of document to scan if the scan mode is 'Specific'
*
* @property getSpecificData
* @type   Boolean
* @default false
*/
SdkSelphIDConfig.prototype.getSpecificData = function () {
    return this.specificData;
};

SdkSelphIDConfig.prototype.getShowPreviousTip = function () {
    return this.showPreviousTip;
};

/**
* Returns params in JSON string format
*
* @method toString
* @return String Widget params JSON structure in string format
*/
SdkSelphIDConfig.prototype.toString = function () {
    const output = [
        { debug: +String(this.debug) },
        { showResultAfterCapture: +String(this.showResultAfterCapture) },
        { showTutorial: +String(this.showTutorial) },
        { tutorialOnly: +String(this.tutorialOnly) },
        { scanMode: +String(this.scanMode) },
        { documentType: +String(this.documentType) },
        { documentSide: +String(this.documentSide) },
        { specificData: +String(this.specificData) },
        { fullscreen: +String(this.fullscreen) },
        { locale: +String(this.locale) },
        { timeout: +String(this.timeout) },
        { videoFilename: +String(this.videoFilename) },
        { documentModels: +String(this.documentModels) },
        { generateRawImages: +String(this.generateRawImages) },
        { compressFormat: +String(this.compressFormat) },
        { jpgQuality: +String(this.jpgQuality) },
        { viewsContent: +String(this.viewsContent) },
        { translationsContent: +String(this.translationsContent) },
        { cameraId: +(this.cameraId) },
        { params: +(this.params) },
        { resourcesPath: +(this.resourcesPath) },
        { showDiagnostic: +(this.showDiagnostic) },
        { showPreviousTip: +(this.showPreviousTip) },
        { vibrationEnabled: +(this.vibrationEnabled) }
    ];
    return JSON.stringify(output);
};

/**
* Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
*
* @property setScanMode
* @type   String
* @default Generic
*/
SdkSelphIDConfig.prototype.setScanMode = function (_scanMode) {
    this.scanMode = _scanMode;
};

/**
* @property setDocumentType
* @type   String
* @default DT_IDCard
*/
SdkSelphIDConfig.prototype.setDocumentType = function (_documentType) {
    this.documentType = _documentType;
};

/**
* @property setDocumentSide
* @type   String
* @default Front
*/
SdkSelphIDConfig.prototype.setDocumentSide = function (_documentSide) {
    this.documentSide = _documentSide;
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
        }
    }
}

module.exports.SdkSelphIDConfig = SdkSelphIDConfig;

});
