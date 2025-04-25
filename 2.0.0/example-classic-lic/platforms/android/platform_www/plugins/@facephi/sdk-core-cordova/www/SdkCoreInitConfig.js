cordova.define("@facephi/sdk-core-cordova.SdkCoreInitConfig", function(require, exports, module) {
/**
 * Modifies the Widget Core configuration.
 * @param String license "add definitions...".
 */

/* global SdkCoreInitConfig:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkCoreInitConfig = function () {
    this.license = '';
    this.licenseUrl = '';
    this.licenseApiKey = '';
    this.enableTracking = true;
    this.enableFlow = false;
    this.locale = '';
};

SdkCoreInitConfig.prototype.setLocale = function (value) {
    this.locale = value;
};

SdkCoreInitConfig.prototype.setEnableFlow = function (value) {
    this.enableFlow = value;
};

SdkCoreInitConfig.prototype.setLicense = function (value) {
    this.license = value;
};

SdkCoreInitConfig.prototype.setLicenseUrl = function (value) {
    this.licenseUrl = value;
};

SdkCoreInitConfig.prototype.setLicenseApiKey = function (value) {
    this.licenseApiKey = value;
};

SdkCoreInitConfig.prototype.setEnableTracking = function (value) {
    this.enableTracking = value;
};

/**
* Returns params in JSON string format
*
* @method toString
* @return String Widget params JSON structure in string format
*/

SdkCoreInitConfig.prototype.toString = function () {
    var output = [
        { license: +String(this.license) },
        { licenseUrl: +String(this.licenseUrl) },
        { licenseApiKey: +String(this.licenseApiKey) },
        { enableTracking: +String(this.enableTracking) },
        { enableFlow: +String(this.enableFlow) },
        { locale: +String(this.locale) }
    ];

    return JSON.stringify(output);
};

module.exports.SdkCoreInitConfig = SdkCoreInitConfig;

});
