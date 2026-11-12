# Onboarding Example

Ejemplo Cordova (`com.facephi.sdk.demo`, versión 4.0.0) de onboarding con los plugins **classic** de Facephi en Android e iOS. La sesión se abre al arrancar. Desde la pantalla se lanza la captura facial, la captura de documento, la extracción de extra data y un flujo ya configurado.

| Plugin | Uso en el ejemplo |
|---|---|
| `@facephi/sdk-core-cordova` | Sesión, operación, extra data y flujos |
| `@facephi/sdk-selphi-classic-cordova` | Captura facial y liveness |
| `@facephi/sdk-selphid-classic-cordova` | Captura y OCR de documento |

En `package.json` esos tres paquetes apuntan a `../4.0.0/sdk-*-cordova`. Cordova los toma desde `node_modules` después de instalar.

## Requisitos

- Node.js y Cordova CLI 13
- Android: API 24 como mínimo, compile y target SDK 36, Android Studio
- iOS: 13.0+, Xcode y CocoaPods, con el repo `cocoa-dev-fphi` de CocoaPods Art
- Credenciales de Artifactory Facephi para las dependencias nativas de Android y para el registry npm `@facephi`

## Puesta en marcha

`platforms/android/cordova/Api.js` hace `require('cordova-android')`. Sin `node_modules`, `cordova prepare` falla con `Could not load API for android project`.

```bash
npm install
cordova prepare
cordova run android
cordova run ios
```

`cordova prepare` prepara las plataformas instaladas. `cordova prepare android` omite el `pod install` de iOS.

## Licencia

Al recibir `deviceready`, `www/js/index.js` llama a `callInitSession()`. Los datos están en `www/js/strings.js`:

- `LICENSE_URL`
- `LICENSE_APIKEY_ANDROID` y `LICENSE_APIKEY_IOS`, según `cordova.platformId`

`launchInitSession` envía `licenseUrl`, `licenseApiKey` y `enableTracking: true`. Si `finishStatus` es error, la UI muestra `errorType`.

## Pantalla

| Acción | Función | Plugin |
|---|---|---|
| Arranque | `callInitSession()` | `facephi.plugins.sdkcore.launchInitSession` |
| Init Session | `callInitSession()` | `facephi.plugins.sdkcore.launchInitSession` |
| Init Operation | `callInitOperation()` | `facephi.plugins.sdkcore.launchInitOperation` |
| Selphi | `callSelphi()` | `facephi.plugins.sdkselphi.launchSelphi` |
| SelphID | `callSelphID()` | `facephi.plugins.sdkselphid.launchSelphID` |
| Get ExtraData | `callGetExtraData()` | `facephi.plugins.sdkcore.launchGetExtraData` |
| Close Session | `callCloseSession()` | `facephi.plugins.sdkcore.launchCloseSession` |
| Get Flows | `callGetFlows()` | `facephi.plugins.sdkcore.launchGetFlowIntegrationData` |
| Launch Flow | `callFlow()` | Core + SelphID + Selphi |

Mantener pulsada la tarjeta Selphi o SelphID abre su hoja de configuración. Un toque corto lanza el widget. `isStartingSDK` impide lanzar otro proceso mientras uno está en curso. Get ExtraData permanece desactivado hasta que hay `bestImage` y `tokenFaceImage`.

## Configuración classic

`www/js/config.js` construye `SdkSelphiConfig` y `SdkSelphIDConfig` con los valores de la hoja. Los vacíos no se envían y el widget usa su valor por defecto. La calidad JPG va de 0 a 1.

Valores iniciales de Selphi:

| Campo | Valor |
|---|---|
| `livenessMode` | `PASSIVE` |
| `cameraPreferred` | `FRONT` |
| `compressFormat` | `jpeg` |
| `jpgQuality` | `0.95` |
| `cropPercent` | `1` |
| `enableGenerateTemplateRaw` | `true` |
| `qrMode` | `false` |
| `showTutorial` | `false` |

Con liveness `MOVE` la hoja muestra `moveSuccessfulAttempts` y `moveFailedAttempts`.

Valores iniciales de SelphID:

| Campo | Valor |
|---|---|
| `documentType` | `DT_IDCard` |
| `scanMode` | `Generic` |
| `timeout` | `Short` |
| `wizardMode` | `true` |
| `showTutorial` | `false` |
| `showResultAfterCapture` | `true` |
| `showDiagnostic` | `true` |
| `generateRawImages` | `true` |
| `compressFormat` | `jpeg` |
| `jpgQuality` | `0.95` |

`specificData` solo se envía con `scanMode` `Specific`. El selector de documento, cuando está activo, usa los nombres nativos `ID_CARD`, `PASSPORT`, `DRIVERS_LICENSE`, `FOREIGN_CARD`, `CREDIT_CARD`, `CUSTOM` y `VISA`. Los países se escriben separados por coma.

Estos valores no son los del SDK nuevo: `LIVENESS_PASSIVE`, `captureMode` `STANDARD` o una calidad `95` no los interpreta el componente classic.

## Sesión y operación

Init operation (`www/js/core.js`) usa el cliente de demostración y el tipo onboarding:

```javascript
facephi.plugins.sdkcore.launchInitOperation({
    customerId: "cordoba@facephi.com",
    type: SdkMobileOperationType.ONBOARDING,
    steps: ""
});
```

Cerrar sesión marca el tracking como éxito y vacía la UI:

```javascript
facephi.plugins.sdkcore.launchCloseSession({
    operationEventTracking: SdkMobileEventTracking.Success
});
```

## Resultados de captura

Selphi guarda el resultado en `selphiResponse` y muestra `bestImage` como JPEG en base64.

SelphID muestra `frontDocumentImage`, `backDocumentImage` y `faceImage` cuando vienen en el resultado, abre `documentData` en una hoja y guarda `tokenFaceImage` para la autenticación contra el documento.

Los dos widgets leen `parseInt(result.finishStatus)`:

- `SdkMobileFinishStatus.Ok`
- `SdkMobileFinishStatus.Error`, y entonces se muestra `errorType` en `#messageResult`

Cualquier otro estado usa `fphi_str_unknown_error`.

## Extra data

Get ExtraData llama a `launchGetExtraData()`. Con estado OK, `result.data` alimenta `www/js/api/serverApiCall.js`:

- `passiveLivenessEvaluate()` envía `extraData` y `selphiResponse.bestImage`
- `authenticateFacialDocument()` envía además `tokenFaceImage` como `documentTemplate`

Las peticiones salen por `cordova-plugin-advanced-http` hacia `URL2`.

## Flujos

Get Flows pide `launchGetFlowIntegrationData()` y lista los flujos. Al elegir uno se habilita Launch Flow, que encadena:

1. `sdkcore.launchInitFlow` con `CUSTOMER_ID` y el id seleccionado
2. `sdkselphid.setSelphidFlow()`
3. `sdkselphi.setSelphiFlow()`
4. `sdkcore.launchStartFlow()`

`www/js/events.js` registra, dos segundos después de cargar, `startListeningTrackingEvents` y `startListeningFlowEvents`.

## Estructura

| Archivo | Contenido |
|---|---|
| `www/index.html` | Pantalla y hojas de configuración |
| `www/js/config.js` | Valores y builders classic de Selphi y SelphID |
| `www/js/selphi.js` | Lanzamiento y resultado facial |
| `www/js/selphid.js` | Lanzamiento y resultado de documento |
| `www/js/core.js` | Sesión, operación, extra data y flujos |
| `www/js/strings.js` | Licencia, cliente y mensajes |
| `www/js/events.js` | Escucha de tracking y de flow |
| `www/js/api/serverApiCall.js` | Liveness y autenticación facial contra el documento |
