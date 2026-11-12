# Onboarding Example

Aplicación Cordova de ejemplo (`com.facephi.sdk.demo`, SDK **4.0.0**) que integra los plugins Facephi para onboarding: sesión, captura facial (Selphi), captura de documento (SelphID) y flow.

Los plugins se exponen en `window` después de `deviceready`. Toda llamada nativa debe hacerse a partir de ese evento.

## Plugins

| Plugin | Namespace | Uso en este ejemplo |
|--------|-----------|---------------------|
| `@facephi/sdk-core-cordova` | `facephi.plugins.sdkcore` | Sesión, operación, extra data y flow |
| `@facephi/sdk-selphi-cordova` | `facephi.plugins.sdkselphi` | Captura facial y liveness |
| `@facephi/sdk-selphid-cordova` | `facephi.plugins.sdkselphid` | Captura y OCR de documento |

El core entra como dependencia de Selphi y SelphID. En este proyecto se instalan desde rutas locales (`package.json`).

## Requisitos

- Cordova 9+ y Node.js
- Android API 24+ o iOS 13+
- Permiso de cámara
- Credenciales de licencia Facephi (URL y API key por plataforma)
- En Android, acceso a Artifactory Facephi (`USERNAME_ARTIFACTORY` y `TOKEN_ARTIFACTORY`) para resolver las dependencias nativas

## Instalación

```bash
npm install
cordova platform add android
cordova platform add ios
```

Instalación explícita de los plugins:

```bash
cordova plugin add ../4.0.0/sdk-selphi-cordova --variable CAMERA_USAGE_DESCRIPTION="This app needs camera access"
cordova plugin add ../4.0.0/sdk-selphid-cordova --variable CAMERA_USAGE_DESCRIPTION="This app needs camera access"
```

`CAMERA_USAGE_DESCRIPTION` se escribe en `NSCameraUsageDescription` de iOS.

## Credenciales

Configura la licencia en `www/js/strings.js` antes de ejecutar:

```javascript
const LICENSE_APIKEY_ANDROID = "YOUR_ANDROID_API_KEY";
const LICENSE_APIKEY_IOS     = "YOUR_IOS_API_KEY";
const LICENSE_URL            = "https://license.identity-platform.io";
const CUSTOMER_ID            = "your-customer-id";
```

Al arrancar, `www/js/index.js` llama a `callInitSession()` en `deviceready`.

## Flujo de la pantalla

La UI (`www/index.html`) llama a estas funciones:

| Botón | Función | Archivo |
|-------|---------|---------|
| Init Session | `callInitSession()` | `www/js/core.js` |
| Init Operation | `callInitOperation()` | `www/js/core.js` |
| Close Session | `callCloseSession()` | `www/js/core.js` |
| Selphi | `callSelphi()` | `www/js/selphi.js` |
| SelphID | `callSelphID()` | `www/js/selphid.js` |
| Get ExtraData | `callGetExtraData()` | `www/js/core.js` |
| Get Flows | `callGetFlows()` | `www/js/core.js` |
| Launch Flow | `callFlow()` | `www/js/core.js` |

Mantener pulsada la tarjeta Selphi o SelphID abre su hoja de configuración (`www/js/config.js`). Un toque corto lanza el widget con esos valores. Restaurar valores vuelve al arranque de este ejemplo.

Orden habitual del onboarding manual:

1. `launchInitSession`
2. `launchInitOperation`
3. `launchSelphi` y `launchSelphID`
4. `launchGetExtraData`
5. `launchCloseSession`

Get Flows lista los flujos disponibles. Launch Flow es la alternativa: el SDK encadena SelphID y Selphi con el identificador elegido.

## Core

Namespace: `facephi.plugins.sdkcore`.

### Iniciar sesión

Elige la API key según la plataforma y resuelve la licencia por URL:

```javascript
const apiKey = window.cordova.platformId.toUpperCase() === "IOS"
    ? LICENSE_APIKEY_IOS
    : LICENSE_APIKEY_ANDROID;

facephi.plugins.sdkcore.launchInitSession({
    licenseUrl: LICENSE_URL,
    licenseApiKey: apiKey,
    enableTracking: true
}).then(function (result) {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Error) {
        console.error(result.errorType);
    }
});
```

También se puede pasar `license` con el JSON de licencia en lugar de `licenseUrl` y `licenseApiKey`.

Otras opciones de init (`SdkCoreInitConfig` en `facephi.plugins.configInit`): `enableDebugMode`, `locale`, `orientation`, `integrationId`, `enableLocation`, `enableLoggerBackend`.

### Iniciar operación

```javascript
facephi.plugins.sdkcore.launchInitOperation({
    customerId: CUSTOMER_ID,
    type: SdkMobileOperationType.ONBOARDING,
    steps: ""
});
```

`SdkMobileOperationType` (`facephi.plugins.sdkOperationType`): `ONBOARDING`, `AUTHENTICATION`.

### Cerrar sesión

```javascript
facephi.plugins.sdkcore.launchCloseSession({
    operationEventTracking: SdkMobileEventTracking.Success
});
```

`SdkMobileEventTracking`: `Success`, `Denied`.

### Extra data

Después de Selphi y SelphID, `launchGetExtraData()` devuelve el payload que el backend usa junto con la imagen y el token del documento:

```javascript
facephi.plugins.sdkcore.launchGetExtraData().then(function (result) {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Ok) {
        var extraData = result.data;
    }
});
```

Otros métodos del core: `launchGetSessionId()`, `launchGetOperationId()`, `launchSetCustomerId(config)`, `launchGetFlowIntegrationData()`.

## Selphi

Namespace: `facephi.plugins.sdkselphi`.

Captura facial en modo liveness pasivo. `callSelphi()` lanza la configuración que arma `buildSelphiConfig()` (`www/js/config.js`):

```javascript
var config = buildSelphiConfig();

facephi.plugins.sdkselphi.launchSelphi(config).then(function (result) {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Ok) {
        var bestImage = result.bestImage; // JPEG en Base64
    } else if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Error) {
        console.error(result.errorType);
    }
});
```

Valores con los que arranca este ejemplo:

| Campo | Valor |
|-------|-------|
| `livenessMode` | `LIVENESS_PASSIVE` |
| `cameraPreferred` | `front` |
| `jpgQuality` | `95` |
| `enableGenerateTemplateRaw` | `true` |
| `showTutorial` | `false` |
| `showPreviousTip` | `false` |
| `showDiagnostic` | `false` |
| `qrMode` | `false` |

### Modos de liveness

`facephi.plugins.livenessmode.SdkSelphiLivenessMode`:

| Clave | Valor |
|-------|-------|
| `LivenessNone` | `LIVENESS_NONE` |
| `LivenessNoneStabilized` | `LIVENESS_NONE_STABILIZED` |
| `Liveness passive` | `LIVENESS_PASSIVE` |
| `LivenessMove` | `LIVENESS_MOVE` |

Este ejemplo envía `LIVENESS_PASSIVE`. La clave del enum es `Liveness passive`.

### Otros parámetros habituales

`SdkSelphiConfig` (`facephi.plugins.selphiconfig`):

| Setter | Uso |
|--------|-----|
| `setLivenessMode(value)` | `LIVENESS_PASSIVE`, `LIVENESS_MOVE`, `LIVENESS_NONE`, `LIVENESS_NONE_STABILIZED` |
| `setExtractionDuration(value)` | `SHORT`, `MEDIUM`, `LONG` |
| `setCameraPreferred(value)` | `front` o `back` |
| `setCameraShape(value)` | `CIRCULAR` o `SQUARE` |
| `setEnableGenerateTemplateRaw(boolean)` | Incluye `templateRaw` en el resultado |
| `setJPGQuality(number)` | Calidad JPG (0–100). En este ejemplo, `95` |
| `setCompressFormat(value)` | `jpeg` o `png` |
| `setShowTutorial(boolean)` | Tutorial previo |
| `setShowResultAfterCapture(boolean)` | Pantalla de resultado |
| `setQrMode(boolean)` | Lector QR antes del escaneo facial |

### Resultado

Campos que consume este ejemplo (`www/js/selphi.js` y `www/js/api/serverApiCall.js`):

| Campo | Contenido |
|-------|-----------|
| `finishStatus` | Estado final |
| `errorType` | Tipo de error si `finishStatus` es `Error` |
| `bestImage` | Mejor imagen, Base64 |
| `bestImageTemplateRaw` | Mejor imagen tokenizada |
| `templateRaw` | Template biométrico |

También se puede envolver la respuesta con `facephi.plugins.selphiResult.SdkSelphiResult`.

Otros métodos: `launchSignatureSelphi(config)`, `setSelphiFlow(config)`, `setSignatureSelphiFlow(config)`.

## SelphID

Namespace: `facephi.plugins.sdkselphid`.

Captura de documento en modo `STANDARD`, timeout corto y país `AR`. `callSelphID()` lanza la configuración que arma `buildSelphidConfig()` (`www/js/config.js`):

```javascript
var config = buildSelphidConfig();

facephi.plugins.sdkselphid.launchSelphID(config).then(function (result) {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Ok) {
        var ocr = JSON.parse(result.documentData.replace(/\\/g, ""));
        var front = result.frontDocumentImage;
        var back = result.backDocumentImage;
        var face = result.faceImage;
        var tokenFaceImage = result.tokenFaceImage;
    }
});
```

Valores con los que arranca este ejemplo:

| Campo | Valor |
|-------|-------|
| `documentTypes` | `["ID_Card"]` |
| `defaultDocumentType` | `ID_Card` |
| `defaultCountry` | `AR` |
| `captureMode` | `STANDARD` |
| `timeout` | `SHORT` |
| `showTutorial` | `false` |
| `showResultAfterCapture` | `true` |
| `showDiagnostic` | `true` |
| `generateRawImages` | `true` |
| `compressFormat` | `jpeg` |
| `jpgQuality` | `95` |

### Enums

Timeout (`facephi.plugins.selphid.timeout.SdkSelphIDTimeout`): `Short`, `Medium`, `Long`, `VeryLong`.

Tipo de documento (`facephi.plugins.doctype.SdkSelphIDDocumentType`). Este ejemplo envía el valor, no la clave: `ID_Card`, `Passport`, `Drivers_License`, `Foreign_Card`, `Credit_Card`, `Custom`, `Visa`, `ALL`.

Modo de captura (`facephi.plugins.capturemode.SdkSelphIDCaptureMode`): `STANDARD`, `FRONT`, `MRZ`. Este ejemplo usa `STANDARD`.

### Resultado

| Campo | Contenido |
|-------|-----------|
| `finishStatus` | Estado final |
| `errorType` | Tipo de error |
| `documentData` | JSON de OCR (string) |
| `frontDocumentImage` | Anverso, Base64 |
| `backDocumentImage` | Reverso, Base64 |
| `faceImage` | Rostro recortado del documento, Base64 |
| `tokenFaceImage` | Token facial para autenticar contra Selphi |

También se puede envolver la respuesta con `facephi.plugins.selphIDResult.SdkSelphIDResult`.

## Flow

`callFlow()` registra SelphID y Selphi en un flow y lo arranca:

```javascript
await facephi.plugins.sdkcore.launchInitFlow({
    customerId: CUSTOMER_ID,
    flow: selectedFlowId
});

await facephi.plugins.sdkselphid.setSelphidFlow();
await facephi.plugins.sdkselphi.setSelphiFlow();
await facephi.plugins.sdkcore.launchStartFlow();
```

`selectedFlowId` es el identificador elegido en Get Flows. `launchGetFlowIntegrationData()` devuelve esa lista.

## Eventos

`www/js/events.js` se suscribe al arrancar. Cada callback se ejecuta por cada evento nativo:

```javascript
facephi.plugins.sdkcore.startListeningTrackingEvents(
    function (event) { console.log(event); },
    function (err) { console.error(err); }
);

facephi.plugins.sdkcore.startListeningFlowEvents(
    function (event) { console.log(event); },
    function (err) { console.error(err); }
);
```

Hay que registrarlos después de `deviceready`, cuando `facephi.plugins.sdkcore` ya existe.

## Estado final

`SdkMobileFinishStatus` (`facephi.plugins.sdkFinishStatus`):

| Clave | Valor | Significado |
|-------|-------|-------------|
| `Ok` | `1` | Proceso correcto |
| `Error` | `2` | Error. Revisar `errorType` |
| `CancelByUser` | `3` | El usuario canceló |
| `Timeout` | `4` | Timeout |

`errorType` usa `SdkErrorType` (`facephi.plugins.sdkErrorType`): permiso de cámara, licencia, timeout, cancelación, etc.

## Ejecutar

```bash
cordova run android
cordova run ios
```

La sesión se inicia sola. El resto de pasos se lanzan con los botones de la pantalla. Mantener pulsada Selphi o SelphID cambia la configuración antes de lanzarlas.
