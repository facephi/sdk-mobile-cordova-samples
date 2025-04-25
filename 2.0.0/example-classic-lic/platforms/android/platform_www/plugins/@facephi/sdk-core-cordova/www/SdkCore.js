cordova.define("@facephi/sdk-core-cordova.SdkCore", function(require, exports, module) {
var exec = require('cordova/exec');

exports.launchStartFlow = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchStartFlow', config);
    });
};

exports.launchInitFlow = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchInitFlow', config);
    });
};

exports.launchCloseSession = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchCloseSession', config);
    });
};

exports.launchInitSession = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchInitSession', config);
    });
};

exports.launchInitOperation = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchInitOperation', config);
    });
};

exports.launchGetExtraData = function () {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchGetExtraData', config);
    });
};

exports.launchGetOperationId = function () {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchGetOperationId', config);
    });
};

exports.launchGetSessionId = function () {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchGetSessionId', config);
    });
};

exports.launchSetCustomerId = function (cfg) {
    return new Promise((resolve, reject) => {
        var config = [];
        try {
            config = [{
                config: cfg
            }];
        } catch (e) {
            console.log(e);
        }

        exec(resolve, reject, 'SdkCore', 'launchSetCustomerId', config);
    });
};

});
