cordova.define("@facephi/sdk-core-cordova.SdkCoreFlowConfig", function(require, exports, module) {
/**
* Modifies the Widget Core configuration.
* @param String customerId "add definitions...".
*/

/* global SdkCoreFlowConfig:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkCoreFlowConfig = function () {
    this.customerId = '';
    this.flow = '';
    this.preview = false;
};

SdkCoreFlowConfig.prototype.setCustomerId = function (customerId) {
    this.customerId = customerId;
};

SdkCoreFlowConfig.prototype.setFlow = function (value) {
    this.flow = value;
};

SdkCoreFlowConfig.prototype.setPreview = function (value) {
    this.preview = value;
};

/**
* Returns params in JSON string format
*
* @method toString
* @return String Widget params JSON structure in string format
*/
SdkCoreFlowConfig.prototype.toString = function () {
    var output = [
        { customerId: +String(this.customerId) },
        { flow: +String(this.flow) },
        { preview: +String(this.preview) }
    ];

    return JSON.stringify(output);
};

module.exports.SdkCoreFlowConfig = SdkCoreFlowConfig;

});
