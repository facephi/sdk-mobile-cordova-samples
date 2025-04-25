cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-file.DirectoryEntry",
      "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryReader",
      "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryReader"
      ]
    },
    {
      "id": "cordova-plugin-file.Entry",
      "file": "plugins/cordova-plugin-file/www/Entry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Entry"
      ]
    },
    {
      "id": "cordova-plugin-file.File",
      "file": "plugins/cordova-plugin-file/www/File.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.File"
      ]
    },
    {
      "id": "cordova-plugin-file.FileEntry",
      "file": "plugins/cordova-plugin-file/www/FileEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.FileError",
      "file": "plugins/cordova-plugin-file/www/FileError.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileError"
      ]
    },
    {
      "id": "cordova-plugin-file.FileReader",
      "file": "plugins/cordova-plugin-file/www/FileReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileReader"
      ]
    },
    {
      "id": "cordova-plugin-file.FileSystem",
      "file": "plugins/cordova-plugin-file/www/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadOptions",
      "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadOptions"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadResult",
      "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadResult"
      ]
    },
    {
      "id": "cordova-plugin-file.FileWriter",
      "file": "plugins/cordova-plugin-file/www/FileWriter.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileWriter"
      ]
    },
    {
      "id": "cordova-plugin-file.Flags",
      "file": "plugins/cordova-plugin-file/www/Flags.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Flags"
      ]
    },
    {
      "id": "cordova-plugin-file.LocalFileSystem",
      "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.LocalFileSystem"
      ],
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.Metadata",
      "file": "plugins/cordova-plugin-file/www/Metadata.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Metadata"
      ]
    },
    {
      "id": "cordova-plugin-file.ProgressEvent",
      "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.ProgressEvent"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems",
      "file": "plugins/cordova-plugin-file/www/fileSystems.js",
      "pluginId": "cordova-plugin-file"
    },
    {
      "id": "cordova-plugin-file.requestFileSystem",
      "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.requestFileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.resolveLocalFileSystemURI",
      "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.isChrome",
      "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.androidEntry",
      "file": "plugins/cordova-plugin-file/www/android/Entry.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "Entry"
      ]
    },
    {
      "id": "cordova-plugin-file.androidFileSystem",
      "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems-roots",
      "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.fileSystemPaths",
      "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "cordova"
      ],
      "runs": true
    },
    {
      "id": "cordova-plugin-broadcaster.broadcaster",
      "file": "plugins/cordova-plugin-broadcaster/www/broadcaster.js",
      "pluginId": "cordova-plugin-broadcaster",
      "clobbers": [
        "broadcaster"
      ]
    },
    {
      "id": "cordova-plugin-advanced-http.cookie-handler",
      "file": "plugins/cordova-plugin-advanced-http/www/cookie-handler.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.dependency-validator",
      "file": "plugins/cordova-plugin-advanced-http/www/dependency-validator.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.error-codes",
      "file": "plugins/cordova-plugin-advanced-http/www/error-codes.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.global-configs",
      "file": "plugins/cordova-plugin-advanced-http/www/global-configs.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.helpers",
      "file": "plugins/cordova-plugin-advanced-http/www/helpers.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.js-util",
      "file": "plugins/cordova-plugin-advanced-http/www/js-util.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.local-storage-store",
      "file": "plugins/cordova-plugin-advanced-http/www/local-storage-store.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.lodash",
      "file": "plugins/cordova-plugin-advanced-http/www/lodash.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.messages",
      "file": "plugins/cordova-plugin-advanced-http/www/messages.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.ponyfills",
      "file": "plugins/cordova-plugin-advanced-http/www/ponyfills.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.public-interface",
      "file": "plugins/cordova-plugin-advanced-http/www/public-interface.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.tough-cookie",
      "file": "plugins/cordova-plugin-advanced-http/www/umd-tough-cookie.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.url-util",
      "file": "plugins/cordova-plugin-advanced-http/www/url-util.js",
      "pluginId": "cordova-plugin-advanced-http"
    },
    {
      "id": "cordova-plugin-advanced-http.http",
      "file": "plugins/cordova-plugin-advanced-http/www/advanced-http.js",
      "pluginId": "cordova-plugin-advanced-http",
      "clobbers": [
        "cordova.plugin.http"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkCore",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkCore.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.sdkcore"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkUtils",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkUtils.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.utils"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkErrorType",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkErrorType.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.sdkErrorType"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkMobileFinishStatus",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkMobileFinishStatus.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.sdkFinishStatus"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkMobileOperationType",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkMobileOperationType.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.sdkOperationType"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkMobileTimeOutType",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkMobileTimeOutType.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.timeout"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkCoreOperationConfig",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkCoreOperationConfig.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.configOperation"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkCoreInitConfig",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkCoreInitConfig.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.configInit"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkCoreFlowConfig",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkCoreFlowConfig.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.configFlow"
      ]
    },
    {
      "id": "@facephi/sdk-core-cordova.SdkMobileEventTracking",
      "file": "plugins/@facephi/sdk-core-cordova/www/SdkMobileEventTracking.js",
      "pluginId": "@facephi/sdk-core-cordova",
      "clobbers": [
        "facephi.plugins.eventTracking"
      ]
    },
    {
      "id": "@facephi/sdk-selphi-cordova.SdkSelphi",
      "file": "plugins/@facephi/sdk-selphi-cordova/www/SdkSelphi.js",
      "pluginId": "@facephi/sdk-selphi-cordova",
      "clobbers": [
        "facephi.plugins.sdkselphi"
      ]
    },
    {
      "id": "@facephi/sdk-selphi-cordova.SdkSelphiConfig",
      "file": "plugins/@facephi/sdk-selphi-cordova/www/SdkSelphiConfig.js",
      "pluginId": "@facephi/sdk-selphi-cordova",
      "clobbers": [
        "facephi.plugins.selphiconfig"
      ]
    },
    {
      "id": "@facephi/sdk-selphi-cordova.SdkSelphiResult",
      "file": "plugins/@facephi/sdk-selphi-cordova/www/SdkSelphiResult.js",
      "pluginId": "@facephi/sdk-selphi-cordova",
      "clobbers": [
        "facephi.plugins.selphiResult"
      ]
    },
    {
      "id": "@facephi/sdk-selphi-cordova.SdkSelphiLivenessMode",
      "file": "plugins/@facephi/sdk-selphi-cordova/www/SdkSelphiLivenessMode.js",
      "pluginId": "@facephi/sdk-selphi-cordova",
      "clobbers": [
        "facephi.plugins.livenessmode"
      ]
    },
    {
      "id": "@facephi/sdk-selphi-cordova.SdkSelphiCompressFormat",
      "file": "plugins/@facephi/sdk-selphi-cordova/www/SdkSelphiCompressFormat.js",
      "pluginId": "@facephi/sdk-selphi-cordova",
      "clobbers": [
        "facephi.plugins.compressformat"
      ]
    },
    {
      "id": "@facephi/sdk-selphi-cordova.SdkExtractionDuration",
      "file": "plugins/@facephi/sdk-selphi-cordova/www/SdkExtractionDuration.js",
      "pluginId": "@facephi/sdk-selphi-cordova",
      "clobbers": [
        "facephi.plugins.extractionduration"
      ]
    },
    {
      "id": "@facephi/sdk-selphi-cordova.SdkSelphiCamera",
      "file": "plugins/@facephi/sdk-selphi-cordova/www/SdkSelphiCamera.js",
      "pluginId": "@facephi/sdk-selphi-cordova",
      "clobbers": [
        "facephi.plugins.camera"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphid",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphid.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.sdkselphid"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidCompressFormat",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidCompressFormat.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.compressformat"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidConfig",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidConfig.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.selphIDConfig"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidDocumentSide",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidDocumentSide.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.docside"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidDocumentType",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidDocumentType.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.doctype"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidOperation",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidOperation.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.operation"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidResult",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidResult.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.selphIDResult"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidScanMode",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidScanMode.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.scanmode"
      ]
    },
    {
      "id": "@facephi/sdk-selphid-cordova.SdkSelphidTimeout",
      "file": "plugins/@facephi/sdk-selphid-cordova/www/SdkSelphidTimeout.js",
      "pluginId": "@facephi/sdk-selphid-cordova",
      "clobbers": [
        "facephi.plugins.selphid.timeout"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-file": "8.0.1",
    "cordova-plugin-broadcaster": "5.1.0",
    "cordova-plugin-advanced-http": "3.3.1",
    "cordova-plugin-statusbar": "4.0.0",
    "cordova-plugin-add-swift-support": "2.0.2",
    "@facephi/sdk-core-cordova": "2.2.3",
    "@facephi/sdk-selphi-cordova": "2.2.5",
    "@facephi/sdk-selphid-cordova": "2.2.2"
  };
});