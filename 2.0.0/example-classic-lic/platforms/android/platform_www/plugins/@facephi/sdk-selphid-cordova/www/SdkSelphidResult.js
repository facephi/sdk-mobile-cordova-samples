cordova.define("@facephi/sdk-selphid-cordova.SdkSelphidResult", function(require, exports, module) {
/**
 * Encapsulates the SelphID response.
 *
 * @class SdkSelphIDResult
 * @constructor
 * @param String resultJSON Widget response in JSON format
 */

/* global SdkSelphIDResult:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkSelphIDResult = function (resultJSON) {
    var obj = JSON.parse(resultJSON);
    this.finishStatus = obj.finishStatus;
    this.template = obj.template;
    this.templateRaw = obj.templateRaw;
    this.bestImage = obj.bestImage;
    this.bestImageCropped = obj.bestImageCropped;
    this.eyeGlassesScore = obj.eyeGlassesScore;
    this.templateScore = obj.templateScore;
    this.qrData = obj.qrData;
    this.image = obj.images;
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
SdkSelphIDResult.prototype.getFinishStatus = function () {
    return this.finishStatus;
};

/**
 * Gets the user template.
 *
 * @property getTemplate
 * @type     StringBase64
 */
SdkSelphIDResult.prototype.getTemplate = function () {
    return this.template;
};

/**
 * Gets eyeGlassesScore
 *
 * @property getEyeGlassesScore
 * @type     Float
 */
SdkSelphIDResult.prototype.getEyeGlassesScore = function () {
    return this.eyeGlassesScore;
};

/**
 * Gets templateScore
 *
 * @property getTemplateScore
 * @type     Float
 */
SdkSelphIDResult.prototype.getTemplateScore = function () {
    return this.templateScore;
};

/**
 * Gets the liveness diagnostic.
 *
 * @property getLivenessDiagnostic
 * @type    UCLivenessDiagnostic
 */
SdkSelphIDResult.prototype.getLivenessDiagnostic = function () {
    return this.livenessDiagnostic;
};

/**
 * Gets the type of the error if exists.
 *
 * @property getErrorType
 * @type     SdkErrorType
 */
SdkSelphIDResult.prototype.getErrorType = function () {
    return this.errorType;
};

/**
 * Gets the message error if exists or null.
 *
 * @property getErrorMessage
 * @type     String
 */
SdkSelphIDResult.prototype.getErrorMessage = function () {
    return this.errorMessage;
};

/**
 * Gets the best image of the Base64 format.
 *
 * @property getImage
 * @type     URIImage
 */
SdkSelphIDResult.prototype.getImage = function () {
    return this.image;
};

/**
 * Get qr string data. Only available in qr modes.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphIDResult.prototype.getQRData = function () {
    return this.qrData;
};

/**
 * Get template raw  data.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphIDResult.prototype.getTemplateRaw = function () {
    return this.templateRaw;
};

/**
 * Get the best quality image from sequence.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphIDResult.prototype.getBestImage = function () {
    return this.bestImage;
};

/**
 * Get the best quality image from sequence with the face cropped.
 *
 * @property getQRData
 * @type     String
 */
SdkSelphIDResult.prototype.getBestImageCropped = function () {
    return this.bestImageCropped;
};

module.exports.SdkSelphIDResult = SdkSelphIDResult;

});
