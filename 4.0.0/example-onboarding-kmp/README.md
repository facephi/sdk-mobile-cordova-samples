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
| INIT SESSION | `callInitSession()` | `www/js/core.js` |
| CLOSE SESSION | `callCloseSession()` | `www/js/core.js` |
| INIT OPERATION | `callInitOperation()` | `www/js/core.js` |
| SELPHI | `callSelphi()` | `www/js/selphi.js` |
| SELPHID | `callSelphID()` | `www/js/selphid.js` |
| EXTRADATA | `callGetExtraData()` | `www/js/core.js` |
| FLOW | `callFlow()` | `www/js/core.js` |

Orden habitual del onboarding manual:

1. `launchInitSession`
2. `launchInitOperation`
3. `launchSelphID` y `launchSelphi`
4. `launchGetExtraData`
5. `launchCloseSession`

`FLOW` es la alternativa: el SDK encadena SelphID y Selphi con un identificador de flow.

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

Captura facial en modo liveness pasivo. La configuración del ejemplo está en `callSelphi()` (`www/js/selphi.js`):

```javascript
var config = new SdkSelphiConfig();
config.setLivenessMode(facephi.plugins.livenessmode.SdkSelphiLivenessMode.PassiveMode);
config.setEnableFullscreen(true);
config.setResourcesPath("fphi-selphi-widget-resources-sdk.zip");
config.setShowDiagnostic(false);

facephi.plugins.sdkselphi.launchSelphi(config).then(function (result) {
    if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Ok) {
        var bestImage = result.bestImage; // JPEG en Base64
    } else if (parseInt(result.finishStatus) === SdkMobileFinishStatus.Error) {
        console.error(result.errorType);
    }
});
```

El ZIP de recursos viaja con el plugin (`fphi-selphi-widget-resources-sdk.zip`).

### Modos de liveness

`facephi.plugins.livenessmode.SdkSelphiLivenessMode`:

| Clave | Valor |
|-------|-------|
| `LivenessNone` | `LIVENESS_NONE` |
| `LivenessNoneStabilized` | `LIVENESS_NONE_STABILIZED` |
| `Liveness passive` | `LIVENESS_PASSIVE` |
| `LivenessMove` | `LIVENESS_MOVE` |

Este ejemplo usa `PassiveMode`. El valor nativo de liveness pasivo es `LIVENESS_PASSIVE`.

### Otros parámetros habituales

`SdkSelphiConfig` (`facephi.plugins.selphiconfig`):

| Setter | Uso |
|--------|-----|
| `setShowTutorial(boolean)` | Tutorial previo |
| `setCameraPreferred(value)` | `FRONT` o `BACK` |
| `setCameraShape(value)` | `CIRCULAR` o `SQUARE` |
| `setEnableGenerateTemplateRaw(boolean)` | Incluye `templateRaw` en el resultado |
| `setJPGQuality(number)` | Calidad JPG (0–100). Default `95` |
| `setCompressFormat(value)` | `jpeg` o `png` |
| `setShowResultAfterCapture(boolean)` | Pantalla de resultado |
| `setExtractionTime(value)` | `SHORT`, `MEDIUM`, `LONG` |

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

Captura de DNI en modo búsqueda, timeout corto y país `AR`. La configuración del ejemplo está en `callSelphID()` (`www/js/selphid.js`):

```javascript
var config = new SdkSelphIDConfig();
config.showResultAfterCapture = true;
config.showTutorial = false;
config.scanMode = facephi.plugins.scanmode.SdkSelphIDScanMode.SearchMode;
config.timeout = facephi.plugins.selphid.timeout.SdkSelphIDTimeout.Short;
config.documentType = facephi.plugins.doctype.SdkSelphIDDocumentType.IDCard;
config.resourcesPath = "fphi-selphid-widget-resources-sdk.zip";
config.specificData = "AR|<ALL>";

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

El ZIP de recursos viaja con el plugin (`fphi-selphid-widget-resources-sdk.zip`).

La misma configuración con los setters de `SdkSelphIDConfig` (`facephi.plugins.selphIDConfig`):

```javascript
var config = new SdkSelphIDConfig();
config.setShowResultAfterCapture(true);
config.setShowTutorial(false);
config.setTimeout(facephi.plugins.selphid.timeout.SdkSelphIDTimeout.Short);
config.setCaptureMode(facephi.plugins.capturemode.SdkSelphIDCaptureMode.FRONT);
```

### Enums

Timeout (`facephi.plugins.selphid.timeout.SdkSelphIDTimeout`): `Short`, `Medium`, `Long`, `VeryLong`.

Tipo de documento (`facephi.plugins.doctype.SdkSelphIDDocumentType`): `IDCard`, `Passport`, `DriversLicense`, `ForeignCard`, `CreditCard`, `Custom`, `Visa`.

Modo de captura (`facephi.plugins.capturemode.SdkSelphIDCaptureMode`): `FRONT`, `MRZ`, `STANDARD`.

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
    flow: "YOUR_FLOW_ID"
});

await facephi.plugins.sdkselphid.setSelphidFlow();
await facephi.plugins.sdkselphi.setSelphiFlow();
await facephi.plugins.sdkcore.launchStartFlow();
```

`flow` es el identificador del flow configurado en la plataforma Facephi.

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

La sesión se inicia sola. El resto de pasos se lanzan con los botones de la pantalla.
