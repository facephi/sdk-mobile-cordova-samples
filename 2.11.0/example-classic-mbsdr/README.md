# Onboarding Example

Aplicación Cordova de ejemplo (v2.11.0) para los plugins Facephi **SDK Core**, **Selphi IAD** y **SelphID MBSDR** en iOS y Android.

Los botones de `www/index.html` llaman a las funciones de `www/js/`. Cada llamada comprueba que el plugin esté cargado y devuelve una `Promise`.

## Plugins

| Plugin | Namespace | Uso en la demo |
|--------|-----------|----------------|
| `@facephi/sdk-core-cordova` | `facephi.plugins.sdkcore` | Sesión, operación, extra data y flow |
| `@facephi/sdk-selphi-iad-cordova` | `facephi.plugins.sdkselphi` | Captura facial (liveness pasivo) |
| `@facephi/sdk-selphid-mbsdr-cordova` | `facephi.plugins.sdkselphid` | Captura y OCR de documento |

Los plugins se resuelven desde rutas locales en `package.json` (`file:../2.11.0/...`).

## Requisitos

- Cordova CLI
- Android: API 24+, compile/target SDK 36
- iOS: deployment target 13.0, CocoaPods, Xcode
- Credenciales de licencia Facephi (`licenseUrl` + `licenseApiKey`)

## Arranque

```bash
npm install
cordova platform add android
cordova platform add ios
cordova run android
# o
cordova run ios
```

En iOS, si hace falta regenerar el Podfile:

```bash
npm run fix:podfile
```

Al recibir `deviceready`, `www/js/index.js` llama a `callInitSession()`.

## Configuración

Edita las constantes de `www/js/strings.js`:

| Constante | Uso |
|-----------|-----|
| `CUSTOMER_ID` | Identificador de cliente |
| `LICENSE_URL` | Endpoint de licencias |
| `LICENSE_APIKEY_ANDROID` / `LICENSE_APIKEY_IOS` | API key según plataforma |

No subas claves reales al repositorio.

## Botones de la demo

| Botón | Función | Archivo |
|-------|---------|---------|
| SELPHID | `callSelphID()` | `www/js/selphid.js` |
| SELPHI | `callSelphi()` | `www/js/selphi.js` |
| INIT OPERATION | `callInitOperation()` | `www/js/core.js` |
| INIT SESSION | `callInitSession()` | `www/js/core.js` |
| CLOSE SESSION | `callCloseSession()` | `www/js/core.js` |
| GET EXTRA DATA | `callGetExtraData()` | `www/js/core.js` |
| FLOW | `callFlow()` | `www/js/core.js` |

`www/js/events.js` suscribe los listeners de tracking y de flow dos segundos después de cargar la página.

## SDK Core

```javascript
// Sesión (se lanza sola en deviceready)
const apiKey = window.cordova.platformId.toUpperCase() === "IOS"
    ? LICENSE_APIKEY_IOS
    : LICENSE_APIKEY_ANDROID;

facephi.plugins.sdkcore.launchInitSession({
    licenseUrl: LICENSE_URL,
    licenseApiKey: apiKey,
    enableTracking: true
}).then((result) => {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Error) {
        showErrorUI(result.errorType);
    }
});

// Operación de onboarding
facephi.plugins.sdkcore.launchInitOperation({
    customerId: CUSTOMER_ID,
    type: SdkMobileOperationType.ONBOARDING,
    steps: ""
});

// Cierre
facephi.plugins.sdkcore.launchCloseSession({
    operationEventTracking: SdkMobileEventTracking.Success
});

// Extra data para las llamadas de backend
facephi.plugins.sdkcore.launchGetExtraData().then((result) => {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Ok) {
        const extraData = result.data;
    }
});
```

Enums globales de Core:

| Enum | Valores |
|------|---------|
| `SdkMobileFinishStatus` | `Ok` (1), `Error` (2), `CancelByUser` (3), `Timeout` (4) |
| `SdkMobileOperationType` | `ONBOARDING`, `AUTHENTICATION` |
| `SdkMobileEventTracking` | `Success`, `Denied` |

Listeners (no devuelven `Promise`; reciben un callback por cada evento nativo):

```javascript
facephi.plugins.sdkcore.startListeningTrackingEvents(
    (event) => { console.log(event); },
    (err) => { console.error(err); }
);

facephi.plugins.sdkcore.startListeningFlowEvents(
    (event) => { console.log(event); },
    (err) => { console.error(err); }
);
```

## Selphi

Captura facial en modo liveness pasivo. El resultado OK pinta `bestImage` en la pantalla.

```javascript
var config = new SdkSelphiConfig();
config.setLivenessMode(facephi.plugins.livenessmode.SdkSelphiLivenessMode.PassiveMode);
config.setDebug(false);
config.setEnableFullscreen(true);
config.setResourcesPath("fphi-selphi-widget-resources-sdk.zip");
config.setShowDiagnostic(false);

facephi.plugins.sdkselphi.launchSelphi(config).then((result) => {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Ok) {
        // result.bestImage es JPEG en base64
    }
});
```

`SdkSelphiLivenessMode`: `PassiveMode` (`PASSIVE`), `MoveMode` (`MOVE`), `None` (`NONE`).

## SelphID

Captura de documento (DNI) en modo búsqueda, con tutorial apagado y resultado tras la captura.

```javascript
var config = new SdkSelphIDConfig();
config.showResultAfterCapture = true;
config.showTutorial = false;
config.scanMode = facephi.plugins.scanmode.SdkSelphIDScanMode.SearchMode;
config.timeout = facephi.plugins.selphid.timeout.SdkSelphIDTimeout.Short;
config.documentType = facephi.plugins.doctype.SdkSelphIDDocumentType.IDCard;
config.resourcesPath = "fphi-selphid-widget-resources-sdk.zip";
config.specificData = "AR|<ALL>";
config.encodedDataFocusEnabled = true;

facephi.plugins.sdkselphid.launchSelphID(config).then((result) => {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Ok) {
        // result.documentData          JSON de OCR
        // result.frontDocumentImage    anverso, base64
        // result.backDocumentImage     reverso, base64
        // result.faceImage             cara del documento, base64
        // result.tokenFaceImage        token para el backend
    }
});
```

| Enum | Namespace | Valores usados |
|------|-----------|----------------|
| `SdkSelphIDScanMode` | `facephi.plugins.scanmode` | `GenericMode`, `SpecificMode`, `SearchMode` |
| `SdkSelphIDTimeout` | `facephi.plugins.selphid.timeout` | `Short`, `Medium`, `Long`, `VeryLong` |
| `SdkSelphIDDocumentType` | `facephi.plugins.doctype` | `IDCard`, `Passport`, `DriversLicense`, `ForeignCard`, `CreditCard`, `Custom`, `Visa` |

## Flow

`callFlow()` encadena los tres plugins. Cada paso espera al anterior.

```javascript
await facephi.plugins.sdkcore.launchInitFlow({
    customerId: CUSTOMER_ID,
    flow: "<flow-id>"
});
await facephi.plugins.sdkselphid.setSelphidFlow();
await facephi.plugins.sdkselphi.setSelphiFlow();
await facephi.plugins.sdkcore.launchStartFlow();
```

## Orden recomendado

1. `launchInitSession`
2. `launchInitOperation`
3. `launchSelphID` y/o `launchSelphi`
4. `launchGetExtraData` (usa la imagen de Selphi y el token de SelphID)
5. `launchCloseSession`

`GET EXTRA DATA` llama a `passiveLivenessEvaluate()` y `authenticateFacialDocument()` en `www/js/api/serverApiCall.js`. Esas peticiones necesitan `cordova-plugin-advanced-http` y un endpoint configurado en `URL2`.
