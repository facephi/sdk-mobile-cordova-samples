# Onboarding Example

Ejemplo Cordova (`com.facephi.sdk.demo`, versión 2.11.0) que muestra el uso de los plugins Facephi en Android e iOS.

| Plugin | Uso en el ejemplo |
|---|---|
| `@facephi/sdk-core-cordova` | Sesión, operación, extra data y flow |
| `@facephi/sdk-selphi-cordova` | Captura facial con liveness pasivo |
| `@facephi/sdk-selphid-cordova` | Captura y OCR de documento |

Los plugins se resuelven desde las rutas locales `../2.11.0/sdk-*-cordova` definidas en `package.json`.

## Licencia

Al arrancar, `deviceready` llama a `callInitSession()` (`www/js/index.js`). La configuración está en `www/js/strings.js`:

- `LICENSE_URL`
- `LICENSE_APIKEY_ANDROID` y `LICENSE_APIKEY_IOS` (se elige según `cordova.platformId`)

`launchInitSession` envía `licenseUrl`, `licenseApiKey` y `enableTracking: true`. Si `finishStatus` es error, la UI muestra `errorType`.

## Botones de la pantalla

| Botón | Función | Plugin |
|---|---|---|
| INIT SESSION | `callInitSession()` | `facephi.plugins.sdkcore.launchInitSession` |
| INIT OPERATION | `callInitOperation()` | `facephi.plugins.sdkcore.launchInitOperation` |
| SELPHI | `callSelphi()` | `facephi.plugins.sdkselphi.launchSelphi` |
| SELPHID | `callSelphID()` | `facephi.plugins.sdkselphid.launchSelphID` |
| EXTRADATA | `callGetExtraData()` | `facephi.plugins.sdkcore.launchGetExtraData` |
| CLOSE SESSION | `callCloseSession()` | `facephi.plugins.sdkcore.launchCloseSession` |
| FLOW | `callFlow()` | Core + SelphID + Selphi |

`isStartingSDK` evita lanzar otro proceso mientras uno está en curso.

## Sesión y operación

Init operation (`www/js/core.js`):

```javascript
facephi.plugins.sdkcore.launchInitOperation({
    customerId: "cordoba@facephi.com",
    type: SdkMobileOperationType.ONBOARDING,
    steps: ""
});
```

Cerrar sesión marca el tracking como éxito:

```javascript
facephi.plugins.sdkcore.launchCloseSession({
    operationEventTracking: SdkMobileEventTracking.Success
});
```

## Selphi

`www/js/selphi.js` arma un `SdkSelphiConfig` y lanza el widget:

- Liveness: `facephi.plugins.livenessmode.SdkSelphiLivenessMode.PassiveMode`
- Recursos: `fphi-selphi-widget-resources-sdk.zip`
- `setDebug(false)`, `setEnableFullscreen(true)`, `setShowDiagnostic(false)`

Con `finishStatus` OK se muestra `result.bestImage` (JPEG en base64). El objeto queda en `selphiResponse` para las llamadas posteriores.

## SelphID

`www/js/selphid.js` arma un `SdkSelphIDConfig`:

| Campo | Valor |
|---|---|
| `showResultAfterCapture` | `true` |
| `showTutorial` | `false` |
| `scanMode` | `SdkSelphIDScanMode.SearchMode` |
| `timeout` | `SdkSelphIDTimeout.Short` |
| `documentType` | `SdkSelphIDDocumentType.IDCard` |
| `resourcesPath` | `fphi-selphid-widget-resources-sdk.zip` |
| `specificData` | `AR\|<ALL>` |

Con `finishStatus` OK se pintan frente, dorso y selfie (`frontDocumentImage`, `backDocumentImage`, `faceImage`) y se listan los campos de `documentData`. `tokenFaceImage` se guarda para la autenticación facial contra el documento.

## Extra data

`EXTRADATA` llama a `launchGetExtraData()`. Si el estado es OK, `result.data` se usa en `www/js/api/serverApiCall.js`:

- `passiveLivenessEvaluate()` envía `extraData` y `selphiResponse.bestImage`
- `authenticateFacialDocument()` envía además `tokenFaceImage` como `documentTemplate`

Esas peticiones salen por `cordova-plugin-advanced-http` hacia el endpoint definido en `URL2`.

## Flow

`FLOW` encadena cuatro promesas:

1. `sdkcore.launchInitFlow` con `customerId` y el id de flow
2. `sdkselphid.setSelphidFlow()`
3. `sdkselphi.setSelphiFlow()`
4. `sdkcore.launchStartFlow()`

## Eventos y resultado

`www/js/events.js` registra, dos segundos después de cargar:

- `sdkcore.startListeningTrackingEvents`
- `sdkcore.startListeningFlowEvents`

Los resultados de widget se leen con `parseInt(result.finishStatus)`:

- `SdkMobileFinishStatus.Ok`
- `SdkMobileFinishStatus.Error` (`errorType` se muestra en `#messageResult`)

Cualquier otro estado usa el mensaje `fphi_str_unknown_error`.
