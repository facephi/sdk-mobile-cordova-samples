cordova.define("@facephi/sdk-selphid-cordova.SdkSelphidScanMode", function(require, exports, module) {
/**
 * Enum for scan mode. Generic mode: It searches in all the documents templates. Specific: It searches in the document
 *
 * @class SdkSelphIDScanMode
 * @constructor
 */

/* global SdkSelphIDScanMode:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkSelphIDScanMode = Object.freeze({ GenericMode: 'Generic', SpecificMode: 'Specific', SearchMode: 'Search' });

// Exports enum for APP visibility
module.exports.SdkSelphIDScanMode = SdkSelphIDScanMode;

});
