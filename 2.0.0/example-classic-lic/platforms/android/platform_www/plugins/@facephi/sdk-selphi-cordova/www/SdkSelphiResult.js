cordova.define("@facephi/sdk-selphi-cordova.SdkSelphiResult", function(require, exports, module) {
/**
 * Encapsulates the Widget response.
 *
 * @class SdkSelphiResult
 * @constructor
 * @param String resultJSON Widget response in JSON format
 */

/* global SdkSelphiResult:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkSelphiResult = function (resultJSON) {
    var obj = JSON.parse(resultJSON);
    this.finishStatus = obj.finishStatus;
    this.template = obj.template;
    this.templateRaw = obj.templateRaw;
    this.bestImage = obj.bestImage;
    this.bestImageCropped = obj.bestImageCropped;
    this.eyeGlassesScore = obj.eyeGlassesScore;
    this.templateScore = obj.templateScore;
    this.qrData = obj.qrData;
    this.images = obj.images;
    this.livenessDiagnostic = obj.livenessDiagnostic;
    this.errorType = obj.errorType;
    this.errorMessage = obj.errorMessage;
};

/**
 * Gets the final status of the Widget process.
 *
 * @property getFinishStatus
 * @type     WidgetFinishStatus
 */
SdkSelphiResult.prototype.getFinishStatus = function () {
    return this.finishStatus;
};

/**
 * Gets the user template.
 *
 * @property getTemplate
 * @type     StringBase64
 */
SdkSelphiResult.prototype.getTemplate = function () {
    return this.template;
};

/**
 * Gets eyeGlassesScore
 *
 * @property getEyeGlassesScore
 * @type     Float
 */
SdkSelphiResult.prototype.getEyeGlassesScore = function () {
    return this.eyeGlassesScore;
};

/**
 * Gets templateScore
 *
 * @property getTemplateScore
 * @type     Float
 */
SdkSelphiResult.prototype.getTemplateScore = function () {
    return this.templateScore;
};

/**
 * Gets the liveness diagnostic.
 *
 * @property getLivenessDiagnostic
 * @type    UCLivenessDiagnostic
 */
SdkSelphiResult.prototype.getLivenessDiagnostic = function () {
    return this.livenessDiagnostic;
};

/**
 * Gets the type of the error if exists.
 *
 * @property getErrorType
 * @type     SdkErrorType
 */
SdkSelphiResult.prototype.getErrorType = function () {
    return this.errorType;
};

/**
 * Gets the message error if exists or null.
 *
 * @property getErrorMessage
 * @type     String
 */
SdkSelphiResult.prototype.getErrorMessage = function () {
    return this.errorMessage;
};

/**
 * Gets the best image of the Base64 format.
 *
 * @property getImage
 * @type     URIImage
 */
SdkSelphiResult.prototype.getImage = function () {
    return this.image;
};

/**
 * Get qr string data. Only available in qr modes.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphiResult.prototype.getQRData = function () {
    return this.qrData;
};

/**
 * Get template raw  data.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphiResult.prototype.getTemplateRaw = function () {
    return this.templateRaw;
};

/**
 * Get the best quality image from sequence.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphiResult.prototype.getBestImage = function () {
    return this.bestImage;
};

/**
 * Get the best quality image from sequence with the face cropped.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphiResult.prototype.getBestImageCropped = function () {
    return this.bestImageCropped;
};
module.exports.SdkSelphiResult = SdkSelphiResult;

});
