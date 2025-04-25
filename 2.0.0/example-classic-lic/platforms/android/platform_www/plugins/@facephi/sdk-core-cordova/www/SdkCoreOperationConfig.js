cordova.define("@facephi/sdk-core-cordova.SdkCoreOperationConfig", function(require, exports, module) {
/**
* Modifies the Widget Core configuration.
* @param String customerId "add definitions...".
*/
/* global SdkCoreOperationConfig:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkCoreOperationConfig = function () {
    this.customerId = '';
    this.type = '';
    this.steps = '';
};

SdkCoreOperationConfig.prototype.setType = function (value) {
    this.type = value;
};

SdkCoreOperationConfig.prototype.setCustomerId = function (customerId) {
    this.customerId = customerId;
};

SdkCoreOperationConfig.prototype.setSteps = function (value) {
    this.steps = value;
};

/**
* Returns params in JSON string format
*
* @method toString
* @return String Widget params JSON structure in string format
*/
SdkCoreOperationConfig.prototype.toString = function () {
    var output = [
        { type: +String(this.type) },
        { customerId: +String(this.customerId) },
        { steps: +String(this.steps) }
    ];

    return JSON.stringify(output);
};

module.exports.SdkCoreOperationConfig = SdkCoreOperationConfig;

});
