var lastDocumentData = null;
var selectedFlowId = "";

function applyTheme(theme) {
    if (theme === "dark" || theme === "light") {
        document.documentElement.setAttribute("data-theme", theme);
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
    var button = document.getElementById("themeToggle");
    var isDark = document.documentElement.getAttribute("data-theme") === "dark"
        || (document.documentElement.getAttribute("data-theme") !== "light"
            && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (button) {
        button.setAttribute("aria-label", isDark ? "Tema claro" : "Tema oscuro");
    }
}

function toggleTheme() {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark"
        || (document.documentElement.getAttribute("data-theme") !== "light"
            && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var next = isDark ? "light" : "dark";
    try { localStorage.setItem("onboarding-theme", next); } catch (e) {}
    applyTheme(next);
}

function clearStatus() {
    $("#messageResult").text("").hide();
}

function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
}

function isOpen(id) {
    return document.getElementById(id).style.display !== "none";
}

function refreshCaptureState() {
    var ready = selphiResponse != null && selphiResponse.bestImage && tokenFaceImage != null && String(tokenFaceImage).length > 0;
    $("#btnExtra").prop("disabled", !ready);
    $("#extraHint").toggle(!ready);
    $("#results").toggle(isOpen("authenticationResponse") || isOpen("selphidResponse"));
}

function resetUi() {
    selphiResponse = null;
    tokenFaceImage = null;
    lastDocumentData = null;
    selectedFlowId = "";
    $("#bestImg, #frontImg, #backImg, #selfieImg").attr("src", "");
    $("#authenticationResponse, #selphidResponse, #results, #flowSelected, #frontBlock, #backBlock, #faceBlock, #btnDocData").hide();
    $("#cardSelphi, #cardSelphid").removeClass("is-done");
    $("#flowLabel").text("");
    $("#btnLaunchFlow").prop("disabled", true);
    refreshCaptureState();
}

function openSheet(id) {
    $("#" + id).show();
}

function closeSheet(id) {
    $("#" + id).hide();
}

function openDocumentSheet() {
    if (!lastDocumentData) return;
    var body = $("#docSheetBody").empty();
    $.each(lastDocumentData, function (key, value) {
        var text = typeof value === "object" ? JSON.stringify(value) : value;
        body.append(
            "<div class='data-row'><p class='data-key'>" + escapeHtml(key) +
            "</p><p class='data-value'>" + escapeHtml(text) + "</p></div>"
        );
    });
    openSheet("docSheet");
}

function showFlowList(list) {
    var body = $("#flowsSheetBody").empty();
    if (!list || !list.length) {
        body.append("<p class='sheet-empty'>No hay resultados</p>");
        openSheet("flowsSheet");
        return;
    }
    $.each(list, function (_, item) {
        var id = item.id || "";
        var name = item.name || "(sin nombre)";
        var operation = item.operationType || "";
        var subtitle = [id, operation].filter(Boolean).join(" · ");
        var selected = selectedFlowId === id ? " is-selected" : "";
        body.append(
            "<button type='button' class='flow-item" + selected + "' data-flow-id='" + escapeHtml(id) + "'>" +
            "<span><strong>" + escapeHtml(name) + "</strong><small>" + escapeHtml(subtitle) + "</small></span>" +
            (selected ? "<span class='flow-check'></span>" : "") +
            "</button>"
        );
    });
    openSheet("flowsSheet");
}

function selectFlow(id) {
    selectedFlowId = id;
    $("#flowLabel").text(id);
    $("#flowSelected").show();
    $("#btnLaunchFlow").prop("disabled", !id);
    closeSheet("flowsSheet");
}

$(function () {
    var saved = null;
    try { saved = localStorage.getItem("onboarding-theme"); } catch (e) {}
    applyTheme(saved);
    $("#flowsSheetBody").on("click", ".flow-item", function () {
        selectFlow($(this).attr("data-flow-id"));
    });
});
