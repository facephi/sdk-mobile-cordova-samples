var ENABLED_DOCUMENT_TYPES = [
    { value: "ID_CARD", label: "IDCARD" },
    { value: "PASSPORT", label: "PASSPORT" },
    { value: "DRIVERS_LICENSE", label: "DRIVERSLICENSE" },
    { value: "FOREIGN_CARD", label: "FOREIGNCARD" },
    { value: "CREDIT_CARD", label: "CREDITCARD" },
    { value: "CUSTOM", label: "CUSTOM" },
    { value: "VISA", label: "VISA" }
];

var selphiSettings = createStandardSelphiSettings();
var selphidSettings = createStandardSelphidSettings();

function createStandardSelphiSettings() {
    return {
        livenessMode: "PASSIVE",
        extractionDuration: "",
        cameraPreferred: "FRONT",
        compressFormat: "jpeg",
        jpgQuality: "0.95",
        cropPercent: "1",
        cameraId: "",
        videoFilename: "",
        resourcesPath: "",
        enableGenerateTemplateRaw: true,
        qrMode: false,
        showTutorial: false,
        showPreviousTip: false,
        showResultAfterCapture: null,
        showDiagnostic: false,
        vibrationEnabled: null,
        debug: null,
        logImages: null,
        stabilizationMode: null,
        templateRawOptimized: null,
        fullscreen: null,
        cameraFlashEnabled: null,
        cropImageDebug: null,
        moveSuccessfulAttempts: "",
        moveFailedAttempts: ""
    };
}

function createStandardSelphidSettings() {
    return {
        documentType: "DT_IDCard",
        documentSide: "",
        scanMode: "Generic",
        specificData: "",
        timeout: "Short",
        wizardMode: true,
        showTutorial: false,
        tutorialOnly: null,
        showPreviousTip: null,
        showResultAfterCapture: true,
        showDiagnostic: true,
        vibrationEnabled: null,
        generateRawImages: true,
        encodedDataFocusEnabled: null,
        debug: null,
        showDocumentSelector: null,
        fullscreen: null,
        enabledDocumentTypes: [],
        enabledCountries: "",
        compressFormat: "jpeg",
        jpgQuality: "0.95",
        tokenImageQuality: "",
        cameraId: "",
        videoFileName: "",
        resourcesPath: ""
    };
}

function configSettings(name) {
    return name === "selphi" ? selphiSettings : selphidSettings;
}

function buildSelphiConfig() {
    var settings = selphiSettings;
    var config = new SdkSelphiConfig();

    assignNumber(function (value) { config.setJPGQuality(value); }, settings.jpgQuality);
    assignNumber(function (value) { config.setCropPercent(value); }, settings.cropPercent);
    assignNumber(function (value) { config.setCameraId(value); }, settings.cameraId);
    config.setEnableGenerateTemplateRaw(!!settings.enableGenerateTemplateRaw);
    config.setQRMode(!!settings.qrMode);
    if (settings.cameraPreferred) config.setCameraPreferred(settings.cameraPreferred);
    if (settings.livenessMode) config.setLivenessMode(settings.livenessMode);
    if (settings.extractionDuration) config.setExtractionDuration(settings.extractionDuration);
    if (settings.compressFormat) config.setCompressFormat(settings.compressFormat);
    if (settings.videoFilename) config.setVideoFilename(settings.videoFilename);
    if (settings.resourcesPath) config.setResourcesPath(settings.resourcesPath);
    assignBool(function (value) { config.setShowTutorial(value); }, settings.showTutorial);
    assignBool(function (value) { config.setShowPreviousTip(value); }, settings.showPreviousTip);
    assignBool(function (value) { config.setShowResultAfterCapture(value); }, settings.showResultAfterCapture);
    assignBool(function (value) { config.setShowDiagnostic(value); }, settings.showDiagnostic);
    assignBool(function (value) { config.setVibrationEnabled(value); }, settings.vibrationEnabled);
    assignBool(function (value) { config.setDebug(value); }, settings.debug);
    assignBool(function (value) { config.setLogImages(value); }, settings.logImages);
    assignBool(function (value) { config.setStabilizationMode(value); }, settings.stabilizationMode);
    assignBool(function (value) { config.setTemplateRawOptimized(value); }, settings.templateRawOptimized);
    assignBool(function (value) { config.setEnableFullscreen(value); }, settings.fullscreen);
    assignBool(function (value) { config.setCameraFlashEnabled(value); }, settings.cameraFlashEnabled);
    assignBool(function (value) { config.setCropImageDebug(value); }, settings.cropImageDebug);

    if (settings.livenessMode === "MOVE") {
        assignNumber(function (value) { config.setMoveSuccessfulAttempts(value); }, settings.moveSuccessfulAttempts);
        assignNumber(function (value) { config.setMoveFailedAttempts(value); }, settings.moveFailedAttempts);
    }

    return config;
}

function buildSelphidConfig() {
    var settings = selphidSettings;
    var config = new SdkSelphIDConfig();

    if (settings.documentType) config.setDocumentType(settings.documentType);
    if (settings.documentSide) config.setDocumentSide(settings.documentSide);
    if (settings.scanMode) config.setScanMode(settings.scanMode);
    if (settings.timeout) config.setTimeout(settings.timeout);
    if (settings.scanMode === "Specific" && settings.specificData) config.setSpecificData(settings.specificData);
    assignBool(function (value) { config.setWizardMode(value); }, settings.wizardMode);
    assignBool(function (value) { config.setShowTutorial(value); }, settings.showTutorial);
    assignBool(function (value) { config.setTutorialOnly(value); }, settings.tutorialOnly);
    assignBool(function (value) { config.setShowPreviousTip(value); }, settings.showPreviousTip);
    assignBool(function (value) { config.setShowResultAfterCapture(value); }, settings.showResultAfterCapture);
    assignBool(function (value) { config.setShowDiagnostic(value); }, settings.showDiagnostic);
    assignBool(function (value) { config.setVibrationEnabled(value); }, settings.vibrationEnabled);
    assignBool(function (value) { config.setGenerateRawImages(value); }, settings.generateRawImages);
    assignBool(function (value) { config.setEncodedDataFocusEnabled(value); }, settings.encodedDataFocusEnabled);
    assignBool(function (value) { config.setDebug(value); }, settings.debug);
    assignBool(function (value) { config.setShowDocumentSelector(value); }, settings.showDocumentSelector);
    assignBool(function (value) { config.setFullscreen(value); }, settings.fullscreen);

    if (settings.showDocumentSelector === true) {
        if (settings.enabledDocumentTypes.length) {
            config.setEnabledDocumentTypes(settings.enabledDocumentTypes.slice());
        }
        var countries = String(settings.enabledCountries || "")
            .split(",")
            .map(function (item) { return item.trim().toUpperCase(); })
            .filter(function (item) { return item.length > 0; });
        if (countries.length) config.setEnabledCountries(countries);
    }

    if (settings.compressFormat) config.setCompressFormat(settings.compressFormat);
    assignNumber(function (value) { config.setJPGQuality(value); }, settings.jpgQuality);
    assignNumber(function (value) { config.setTokenImageQuality(value); }, settings.tokenImageQuality);
    assignNumber(function (value) { config.setCameraId(value); }, settings.cameraId);
    if (settings.videoFileName) {
        config.setVideoFileName(settings.videoFileName);
        config.videoFilename = settings.videoFileName;
    }
    if (settings.resourcesPath) config.setResourcesPath(settings.resourcesPath);

    return config;
}

function restoreSelphiSettings() {
    selphiSettings = createStandardSelphiSettings();
    syncConfigForm("selphi");
}

function restoreSelphidSettings() {
    selphidSettings = createStandardSelphidSettings();
    syncConfigForm("selphid");
}

function openSelphiConfig() {
    pulse();
    syncConfigForm("selphi");
    openSheet("selphiSheet");
}

function openSelphidConfig() {
    pulse();
    syncConfigForm("selphid");
    openSheet("selphidSheet");
}

function syncConfigForm(name) {
    var settings = configSettings(name);
    var root = document.getElementById(name === "selphi" ? "selphiSheet" : "selphidSheet");
    var fields = root.querySelectorAll("[data-key]");
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var key = field.getAttribute("data-key");
        if (field.classList.contains("config-chip")) {
            var selected = settings[key] || [];
            field.classList.toggle("selected", selected.indexOf(field.getAttribute("data-value")) !== -1);
        } else if (field.classList.contains("config-switch")) {
            field.querySelector(".switch").classList.toggle("on", settings[key] === true);
        } else if (field.value !== String(settings[key] == null ? "" : settings[key])) {
            field.value = settings[key] == null ? "" : settings[key];
        }
    }
    if (name === "selphi") {
        document.getElementById("selphiMoveFields").style.display = settings.livenessMode === "MOVE" ? "" : "none";
    } else {
        document.getElementById("selphidSelectorFields").style.display = settings.showDocumentSelector === true ? "" : "none";
        document.getElementById("selphidSpecificFields").style.display = settings.scanMode === "Specific" ? "" : "none";
    }
}

function onConfigField(event) {
    var field = event.target;
    if (!field.getAttribute || !field.getAttribute("data-key") || field.classList.contains("config-chip")) return;
    var name = field.getAttribute("data-config");
    var key = field.getAttribute("data-key");
    var value = field.value;
    if (field.getAttribute("data-decimal") === "true") {
        value = value.replace(/[^\d.]/g, "");
        var parts = value.split(".");
        if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("");
        if (field.value !== value) field.value = value;
    } else if (field.getAttribute("data-digits") === "true") {
        value = value.replace(/\D/g, "");
        if (field.value !== value) field.value = value;
    }
    if (field.getAttribute("data-upper") === "true") {
        var upper = value.toUpperCase();
        if (field.value !== upper) field.value = upper;
        value = upper;
    }
    configSettings(name)[key] = value;
    if (field.tagName === "SELECT") syncConfigForm(name);
}

function toggleConfigFlag(button) {
    var name = button.getAttribute("data-config");
    var settings = configSettings(name);
    var key = button.getAttribute("data-key");
    settings[key] = settings[key] !== true;
    syncConfigForm(name);
}

function toggleDocumentChip(button) {
    var name = button.getAttribute("data-config");
    var settings = configSettings(name);
    var key = button.getAttribute("data-key");
    var value = button.getAttribute("data-value");
    var selected = settings[key].slice();
    var index = selected.indexOf(value);
    if (index >= 0) {
        selected.splice(index, 1);
    } else {
        selected.push(value);
    }
    settings[key] = selected;
    syncConfigForm(name);
}

function renderDocumentChips(containerId, key) {
    var container = document.getElementById(containerId);
    ENABLED_DOCUMENT_TYPES.forEach(function (option) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "config-chip";
        button.setAttribute("data-config", "selphid");
        button.setAttribute("data-key", key);
        button.setAttribute("data-value", option.value);
        button.textContent = option.label;
        container.appendChild(button);
    });
}

function bindLongPress(id, launch, openConfig) {
    var element = document.getElementById(id);
    var state = { timer: null, origin: null, fired: false };

    element.addEventListener("pointerdown", function (event) {
        try { element.setPointerCapture(event.pointerId); } catch (e) {}
        state.fired = false;
        state.origin = { x: event.clientX, y: event.clientY };
        clearPress(state);
        state.timer = setTimeout(function () {
            state.timer = null;
            state.fired = true;
            openConfig();
        }, 450);
    });

    element.addEventListener("pointermove", function (event) {
        var dx = state.origin ? event.clientX - state.origin.x : null;
        var dy = state.origin ? event.clientY - state.origin.y : null;
        window.__press = { dx: dx, dy: dy, timer: !!state.timer, origin: state.origin };
        if (!state.origin || !state.timer) return;
        if (dx * dx + dy * dy > 144) clearPress(state);
    });

    function endPress(event) {
        if (element.hasPointerCapture && element.hasPointerCapture(event.pointerId)) {
            element.releasePointerCapture(event.pointerId);
        }
        clearPress(state);
    }

    element.addEventListener("pointerup", endPress);
    element.addEventListener("pointercancel", endPress);
    element.addEventListener("contextmenu", function (event) { event.preventDefault(); });
    element.addEventListener("click", function (event) {
        if (state.fired) {
            event.preventDefault();
            event.stopPropagation();
            state.fired = false;
            return;
        }
        launch();
    });
}

function clearPress(state) {
    if (state.timer) {
        clearTimeout(state.timer);
        state.timer = null;
    }
    state.origin = null;
}

function bindConfigSheet(id) {
    var root = document.getElementById(id);
    root.addEventListener("click", function (event) {
        var chip = event.target.closest(".config-chip");
        if (chip) {
            toggleDocumentChip(chip);
            return;
        }
        var button = event.target.closest(".config-switch");
        if (button) toggleConfigFlag(button);
    });
    root.addEventListener("input", onConfigField);
    root.addEventListener("change", onConfigField);
    root.addEventListener("focusin", function (event) {
        if (event.target.tagName === "INPUT") {
            setTimeout(function () { event.target.scrollIntoView({ block: "center" }); }, 300);
        }
    });
}

function pulse() {
    if (navigator.vibrate) navigator.vibrate(15);
}

function assignBool(setter, value) {
    if (typeof value === "boolean") setter(value);
}

function assignNumber(setter, value) {
    if (value == null || String(value).trim() === "") return;
    var parsed = Number(value);
    if (isFinite(parsed)) setter(parsed);
}

$(function () {
    renderDocumentChips("selphidEnabledDocumentTypes", "enabledDocumentTypes");
    bindConfigSheet("selphiSheet");
    bindConfigSheet("selphidSheet");
    bindLongPress("cardSelphi", callSelphi, openSelphiConfig);
    bindLongPress("cardSelphid", callSelphID, openSelphidConfig);
    syncConfigForm("selphi");
    syncConfigForm("selphid");
});
