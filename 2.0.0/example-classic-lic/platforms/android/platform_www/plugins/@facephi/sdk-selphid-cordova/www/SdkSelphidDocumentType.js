cordova.define("@facephi/sdk-selphid-cordova.SdkSelphidDocumentType", function(require, exports, module) {
/**
 * Enum for document type (IDCard or Passport).
 *
 * @class SdkSelphIDDocumentType
 * @constructor
 */

/* global SdkSelphIDDocumentType:writable */
/* eslint no-undef: "error" */
/* eslint no-global-assign: "error" */
SdkSelphIDDocumentType = Object.freeze({ IDCard: 'DT_IDCard', Passport: 'DT_Passport', DriversLicense: 'DT_DriversLicense', ForeignCard: 'DT_ForeignCard', CreditCard: 'DT_CreditCard', Custom: 'DT_Custom' });

// Exports enum for APP visibility
module.exports.SdkSelphIDDocumentType = SdkSelphIDDocumentType;

});
