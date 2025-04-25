cordova.define("@facephi/sdk-selphid-cordova.SdkSelphid", function(require, exports, module) {
var exec = require('cordova/exec');

exports.launchSelphID = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{ config_id: cfg }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkSelphid', 'launchSelphID', config);
    });
};

exports.setSelphidFlow = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkSelphid', 'setSelphidFlow', config);
    });
};

});
