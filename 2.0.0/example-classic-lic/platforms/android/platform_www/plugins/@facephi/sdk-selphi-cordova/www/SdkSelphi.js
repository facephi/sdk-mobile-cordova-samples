cordova.define("@facephi/sdk-selphi-cordova.SdkSelphi", function(require, exports, module) {
var exec = require('cordova/exec');

exports.launchSelphi = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkSelphi', 'launchSelphi', config);
    });
};

exports.launchSignatureSelphi = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkSelphi', 'launchSignatureSelphi', config);
    });
};

exports.setSelphiFlow = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkSelphi', 'setSelphiFlow', config);
    });
};

exports.setSignatureSelphiFlow = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkSelphi', 'setSignatureSelphiFlow', config);
    });
};

});
