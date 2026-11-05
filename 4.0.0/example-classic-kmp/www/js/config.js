var DOCUMENT_TYPE_OPTIONS = [
    { value: "ID_Card", label: "IDCARD" },
    { value: "Passport", label: "PASSPORT" },
    { value: "Drivers_License", label: "DRIVERSLICENSE" },
    { value: "Foreign_Card", label: "FOREIGNCARD" },
    { value: "Credit_Card", label: "CREDITCARD" },
    { value: "Custom", label: "CUSTOM" },
    { value: "Visa", label: "VISA" },
    { value: "ALL", label: "ALL" }
];

var selphiSettings = createStandardSelphiSettings();
var selphidSettings = createStandardSelphidSettings();

function createStandardSelphiSettings() {
    return {
        livenessMode: "LIVENESS_PASSIVE",
        extractionDuration: "",
        cameraPreferred: "front",
        cameraShape: "",
        compressFormat: "",
        progressMode: "",
        jpgQuality: "95",
        enableGenerateTemplateRaw: true,
        iadEnabled: false,
        qrMode: false,
        showTutorial: false,
        showPreviousTip: false,
        showResultAfterCapture: null,
        showDiagnostic: false,
        vibrationEnabled: null,
        qrCameraPreferred: "back",
        showQrTutorial: null,
        showQrDiagnostic: null,
        showQrPreviousTip: null,
        qrTimeout: "",
        moveSuccessfulAttempts: "",
        moveFailedAttempts: "",
        bundleTimeoutMs: "",
        maxAttempts: ""
    };
}

function createStandardSelphidSettings() {
    return {
        documentTypes: ["ID_Card"],
        enabledDocumentTypes: [],
        enabledCountries: "",
        captureMode: "STANDARD",
        timeout: "SHORT",
        showTutorial: false,
        showPreviousTip: null,
        showResultAfterCapture: true,
        showDiagnostic: true,
        vibrationEnabled: null,
        generateRawImages: true,
        debug: null,
        showDocumentSelector: null,
        compressFormat: "jpeg",
        jpgQuality: "95",
        mode: "",
        perAttemptTimeoutMs: "",
        maxAttempts: ""
    };
}

function configSettings(name) {
    return name === "selphi" ? selphiSettings : selphidSettings;
}

function buildSelphiConfig() {
    var settings = selphiSettings;
    var config = new SdkSelphiConfig();

    assignNumber(function (value) { config.setJPGQuality(value); }, settings.jpgQuality);
    config.setEnableGenerateTemplateRaw(!!settings.enableGenerateTemplateRaw);
    config.setIadEnabled(!!settings.iadEnabled);
    config.setQrMode(!!settings.qrMode);
    if (settings.cameraPreferred) config.setCameraPreferred(settings.cameraPreferred);
    if (settings.livenessMode) config.setLivenessMode(settings.livenessMode);
    if (settings.extractionDuration) config.setExtractionDuration(settings.extractionDuration);
    if (settings.cameraShape) config.setCameraShape(settings.cameraShape);
    if (settings.compressFormat) config.setCompressFormat(settings.compressFormat);
    if (settings.progressMode) config.setProgressModeExtraction(settings.progressMode);
    assignBool(function (value) { config.setShowTutorial(value); }, settings.showTutorial);
    assignBool(function (value) { config.setShowPreviousTip(value); }, settings.showPreviousTip);
    assignBool(function (value) { config.setShowResultAfterCapture(value); }, settings.showResultAfterCapture);
    assignBool(function (value) { config.setShowDiagnostic(value); }, settings.showDiagnostic);
    assignBool(function (value) { config.setVibrationEnabled(value); }, settings.vibrationEnabled);

    if (settings.qrMode) {
        if (settings.qrCameraPreferred) config.setQrCameraPreferred(settings.qrCameraPreferred);
        assignBool(function (value) { config.setShowQrTutorial(value); }, settings.showQrTutorial);
        assignBool(function (value) { config.setShowQrDiagnostic(value); }, settings.showQrDiagnostic);
        assignBool(function (value) { config.setShowQrPreviousTip(value); }, settings.showQrPreviousTip);
        assignNumber(function (value) { config.setQrTimeout(value); }, settings.qrTimeout);
    }

    if (settings.livenessMode === "LIVENESS_MOVE") {
        assignNumber(function (value) { config.setMoveSuccessfulAttempts(value); }, settings.moveSuccessfulAttempts);
        assignNumber(function (value) { config.setMoveFailedAttempts(value); }, settings.moveFailedAttempts);
        assignNumber(function (value) { config.setBundleTimeoutMs(value); }, settings.bundleTimeoutMs);
        assignNumber(function (value) { config.setMaxAttempts(value); }, settings.maxAttempts);
    }

    return config;
}

function buildSelphidConfig() {
    var settings = selphidSettings;
    var config = new SdkSelphIDConfig();
    var documentTypes = settings.documentTypes.length ? settings.documentTypes.slice() : ["ID_Card"];

    config.setDocumentTypes(documentTypes);
    config.setDefaultDocumentType(documentTypes[0]);
    config.setDefaultCountry("AR");
    if (settings.captureMode) config.setCaptureMode(settings.captureMode);
    if (settings.timeout) config.setTimeout(settings.timeout);
    assignBool(function (value) { config.setShowTutorial(value); }, settings.showTutorial);
    assignBool(function (value) { config.setShowPreviousTip(value); }, settings.showPreviousTip);
    assignBool(function (value) { config.setShowResultAfterCapture(value); }, settings.showResultAfterCapture);
    assignBool(function (value) { config.setShowDiagnostic(value); }, settings.showDiagnostic);
    assignBool(function (value) { config.setVibrationEnabled(value); }, settings.vibrationEnabled);
    assignBool(function (value) { config.setGenerateRawImages(value); }, settings.generateRawImages);
    assignBool(function (value) { config.setDebug(value); }, settings.debug);
    assignBool(function (value) { config.setShowDocumentSelector(value); }, settings.showDocumentSelector);

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
    else delete config.compressFormat;
    assignNumber(function (value) { config.setJPGQuality(value); }, settings.jpgQuality);
    if (settings.mode) config.setMode(settings.mode);
    assignNumber(function (value) { config.setPerAttemptTimeoutMs(value); }, settings.perAttemptTimeoutMs);
    assignNumber(function (value) { config.setMaxAttempts(value); }, settings.maxAttempts);

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
        document.getElementById("selphiQrFields").style.display = settings.qrMode ? "" : "none";
        document.getElementById("selphiMoveFields").style.display = settings.livenessMode === "LIVENESS_MOVE" ? "" : "none";
    } else {
        document.getElementById("selphidSelectorFields").style.display = settings.showDocumentSelector === true ? "" : "none";
    }
}

function onConfigField(event) {
    var field = event.target;
    if (!field.getAttribute || !field.getAttribute("data-key") || field.classList.contains("config-chip")) return;
    var name = field.getAttribute("data-config");
    var key = field.getAttribute("data-key");
    var value = field.value;
    if (field.getAttribute("data-digits") === "true") {
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
        if (key === "documentTypes" && selected.length === 1) return;
        selected.splice(index, 1);
    } else {
        selected.push(value);
    }
    settings[key] = selected;
    syncConfigForm(name);
}

function renderDocumentChips(containerId, key) {
    var container = document.getElementById(containerId);
    DOCUMENT_TYPE_OPTIONS.forEach(function (option) {
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
    renderDocumentChips("selphidDocumentTypes", "documentTypes");
    renderDocumentChips("selphidEnabledDocumentTypes", "enabledDocumentTypes");
    bindConfigSheet("selphiSheet");
    bindConfigSheet("selphidSheet");
    bindLongPress("cardSelphi", callSelphi, openSelphiConfig);
    bindLongPress("cardSelphid", callSelphID, openSelphidConfig);
    syncConfigForm("selphi");
    syncConfigForm("selphid");
});
