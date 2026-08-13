# Behavior Example — Widget Behavior 360 en Ionic/Cordova

App Ionic/Cordova mínima que sirve como **referencia de integración** del `@fip360/widget-behavior-cordova` (Widget Behavior 360 de Facephi): biometría de comportamiento y prevención de fraude.

Esta guía explica cómo instalar el plugin en una app Cordova/Ionic y cómo usarlo, apoyándose en el código real de este ejemplo. Para el detalle completo de la API JS, consulta el README del propio plugin.

## 1. Qué contiene el ejemplo

Tres pantallas muy simples que recorren el ciclo de vida típico del widget:

| Pantalla | Archivo | Qué hace con Behavior |
|----------|---------|------------------------|
| Login | [login.page.ts](src/app/login/login.page.ts) | `initialize`, `setSessionId`, `setAutoLogoutAction`, `registerField` sobre el input de usuario, `clearSessionData` |
| Home | [home.page.ts](src/app/home/home.page.ts) | `setPosition('Dashboard' / 'Login')` al navegar |
| Dashboard | [dashboard.page.ts](src/app/dashboard/dashboard.page.ts) | `setPosition('Home' / 'Login')` al navegar |

Toda la lógica de llamadas al plugin está aislada en un servicio Angular, que es el punto de entrada recomendado a copiar en tu propia app:

- [behavior.service.ts](src/app/services/behavior/behavior.service.ts) — wrapper sobre `facephi.plugins.wgt.behavior`
- [behavior.config.ts](src/app/services/behavior/behavior.config.ts) — forma de la configuración de inicialización
- [behavior.service.result.ts](src/app/services/behavior/behavior.service.result.ts) — forma de las respuestas del SDK

## 2. Requisitos previos

- Node.js + Ionic CLI (`npm i -g @ionic/cli`).
- Proyecto **Apache Cordova** (este mismo ejemplo, o el tuyo) con las plataformas que necesites.
- **Android:** Kotlin habilitado en el proyecto (`GradlePluginKotlinEnabled`, ya configurado en [config.xml](config.xml)).
- **iOS:** CocoaPods instalado (el plugin declara el pod `FPHIBehavior`).
- Una **clave de licencia** del Widget Behavior 360 proporcionada por Facephi (una para Android y otra para iOS; en este ejemplo ambas son iguales, ver punto 7).

## 3. Instalar y arrancar el ejemplo

```bash
npm install
ionic cordova platform add android
ionic cordova platform add ios   # si vas a compilar para iOS
```

`npm install` resuelve la dependencia `@fip360/widget-behavior-cordova` declarada en [package.json](package.json) y, al estar también listada en el bloque `cordova.plugins` de ese mismo archivo, Cordova la instala automáticamente en cada `prepare` — no hace falta un `cordova plugin add` aparte en este proyecto.

Para compilar / ejecutar, ver la sección [9. Comandos de build y ejecución](#9-comandos-de-build-y-ejecución) (recopilados en [ionic_cordova_helper.txt](ionic_cordova_helper.txt)).

## 4. Instalar el plugin en tu propia app

En un proyecto nuevo (no este ejemplo), añade el plugin con:

```bash
ionic cordova plugin add @fip360/widget-behavior-cordova
```

Si aún no está publicado en un registro accesible para ti, instálalo desde un tarball o ruta local que te facilite Facephi:

```bash
ionic cordova plugin add <ruta-o-tarball-del-plugin>
```

Personaliza en el mismo momento los textos de permisos de ubicación de iOS (ver punto 6):

```bash
ionic cordova plugin add @fip360/widget-behavior-cordova \
  --variable LOCATION_WHEN_IN_USE_USAGE_DESCRIPTION="Usamos la ubicación para proteger tu sesión mientras usas la app." \
  --variable LOCATION_ALWAYS_AND_WHEN_IN_USE_USAGE_DESCRIPTION="Usamos la ubicación para proteger tu sesión."
```

## 5. Configuración específica de Android

### 5.1 Clase `Application` (obligatorio)

El SDK debe arrancar **antes** de que el WebView / bridge de Cordova lo usen. Este ejemplo ya lo tiene resuelto en [platforms/android/app/src/main/java/com/demo/behavior/BehaviorApplication.kt](platforms/android/app/src/main/java/com/demo/behavior/BehaviorApplication.kt):

```kotlin
package com.demo.behavior

import android.app.Application
import com.facephi.wgt.behavior.wgtbehavior.WgtBehaviorApplication

class BehaviorApplication : Application()
{
    override fun onCreate()
    {
        super.onCreate()
        WgtBehaviorApplication().initialize(this)
    }
}
```

Y registrada en `platforms/android/app/src/main/AndroidManifest.xml`, en el tag `<application>`:

```xml
<application android:name=".BehaviorApplication" ... >
```

**Importante:** `platforms/android` se regenera con `cordova platform rm/add android` (o al restaurar el proyecto desde cero). Esa clase vive dentro de la plataforma generada, así que **no sobrevive** a esa operación — hay que volver a crear el archivo y volver a añadir `android:name=".BehaviorApplication"` cada vez. En un proyecto real conviene automatizarlo con un hook `after_prepare` de Cordova.

### 5.2 Permisos

El `plugin.xml` del plugin ya declara los permisos necesarios; tras `cordova prepare` deberían aparecer en el manifest generado (puedes verificarlo en el de este ejemplo).

| Categoría | Permisos | Notas |
|-----------|----------|-------|
| Básicos (automáticos) | `INTERNET`, `ACCESS_NETWORK_STATE`, `ACCESS_WIFI_STATE`, `CHANGE_WIFI_STATE` | Red / conectividad |
| Runtime (pedir consentimiento en API 23+) | `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`, `READ_PHONE_STATE` | El SDK puede operar con menos permisos, pero con menor capacidad de detección |
| Especiales / sensibles | `QUERY_ALL_PACKAGES`, `BLUETOOTH_SCAN` (Android 12+), `DETECT_SCREEN_RECORDING` (Android 15+) | `QUERY_ALL_PACKAGES` requiere justificación explícita en Play Console; puede provocar rechazo si no está bien documentado |

Decide de forma consciente si incluyes `QUERY_ALL_PACKAGES` (mejor detección de malware vs. más esfuerzo de compliance).

## 6. Configuración específica de iOS

Apple exige textos de uso claros para ubicación. El plugin escribe estas claves en el `Info.plist`:

| Clave `Info.plist` | Variable del plugin | Uso |
|---|---|---|
| `NSLocationWhenInUseUsageDescription` | `LOCATION_WHEN_IN_USE_USAGE_DESCRIPTION` | Análisis de comportamiento mientras se usa la app |
| `NSLocationAlwaysAndWhenInUseUsageDescription` | `LOCATION_ALWAYS_AND_WHEN_IN_USE_USAGE_DESCRIPTION` | Análisis de comportamiento en segundo plano |

En este ejemplo se personalizan en [package.json](package.json) (bloque `cordova.plugins["@fip360/widget-behavior-cordova"]`). Sin textos propios (o con los genéricos por defecto), iOS puede bloquear el acceso a ubicación o Apple puede rechazar la app en revisión.

CocoaPods (`pod install`) se ejecuta automáticamente al hacer `cordova prepare ios` / `ionic cordova platform add ios`, ya que el plugin declara el pod `FPHIBehavior` vía `cordova-plugin-cocoapod-support` (ver dependencia en [config.xml](config.xml)).

## 7. Licencia del SDK

La clave de licencia se configura en [src/app/constants.ts](src/app/constants.ts) (`LICENSE_APIKEY_ANDROID`, `LICENSE_APIKEY_IOS`) y el servicio la selecciona según plataforma en [behavior.service.ts](src/app/services/behavior/behavior.service.ts):

```typescript
const licenseKey = this.platform.is('ios') ? LICENSE_APIKEY_IOS : LICENSE_APIKEY_ANDROID;
```

Sustituye esos valores por la licencia que Facephi te entregue para tu `applicationId` / bundle id — las que trae el ejemplo son de un entorno de pruebas y no válidas para producción.

## 8. Cómo se usa el widget en el código

### 8.1 Servicio wrapper

[behavior.service.ts](src/app/services/behavior/behavior.service.ts) envuelve la API global `facephi.plugins.wgt.behavior` en métodos Angular tipados (`initialize`, `destroy`, `checkInitialization`, `setUserId`, `setPosition`, `setSessionId`, `clearSessionData`, `setAutoLogoutAction`, `registerField`, `addEventsListener`) y expone `finishOk` / `finishError` para comparar el `finishStatus` de cada respuesta. Copia este patrón en tu app en lugar de llamar a `facephi.*` directamente desde los componentes.

### 8.2 Flujo de Login

En [login.page.ts](src/app/login/login.page.ts):

1. `ngOnInit` espera a `platform.ready()`, registra el listener de eventos (`addEventsListener`) y, si no hay sesión, llama a `launchInitialize()`.
2. `launchInitialize()` llama a `behaviorService.initialize()`. Si `finishStatus === finishOk`, encadena `setSessionId` → `setAutoLogoutAction` → `setPosition('Login')`.
3. `launchSetSessionId()` obtiene un `sessionId` de tu backend (`fip360Service.getSessionId('/api/init', {})`) o, si no hay backend, genera uno con `behaviorService.generateUUID()`.
4. `ngAfterViewInit` → `registerTypingField()` obtiene el elemento nativo del `ion-input` (`await ionInput.getInputElement()`) y llama a `behaviorService.initializeRegisterField(input, 'user')` para que el SDK monitorice el tecleo.
5. Al enviar el formulario (`handleSubmit`), se hace `setUserId(user)` y `setPosition('Home')` antes de navegar.
6. El botón "Clear Session" llama a `clearSessionData()` y limpia el `sessionId` local.

### 8.3 Navegación entre pantallas

En [home.page.ts](src/app/home/home.page.ts) y [dashboard.page.ts](src/app/dashboard/dashboard.page.ts): cada navegación llama primero a `behaviorService.setPosition(<pantalla>)` (`'Home'`, `'Dashboard'`, `'Login'`) y solo si tiene éxito navega con el `Router`. Esto mantiene al SDK informado de en qué pantalla está el usuario en todo momento.

### 8.4 Cierre de sesión

`onLogout()` (en Home y Dashboard) limpia el `userId` local y hace `setPosition('Login')` antes de volver a la pantalla de login.

### 8.5 Eventos nativos (auto-logout de seguridad)

`behaviorService.addEventsListener(callback)` (usado en `login.page.ts`) se apoya en `startListeningBehaviorEvents`, que **no** es una Promise: el callback se invoca una vez por cada evento nativo mientras la sesión esté activa. Hoy el único evento tipado es `data === 'AUTO_LOGOUT'`, emitido tras registrar `setAutoLogoutAction()`; úsalo para forzar el cierre de sesión en tu app cuando el SDK detecte una regla de seguridad.

## 9. Comandos de build y ejecución

```bash
npm run build
ionic cordova prepare android
ionic cordova run android -l              # live reload en dispositivo/emulador

ionic cordova prepare ios
ionic cordova run ios --livereload --external
```

Más variantes (hot reload, ejecución en dispositivo iOS concreto, symlinks necesarios con `cordova-ios` 8) están recopiladas en [ionic_cordova_helper.txt](ionic_cordova_helper.txt).

## 10. Problemas frecuentes

- **`AUTO_LOGOUT` nunca llega / `initialize` parece no arrancar en Android:** revisa que `AndroidManifest.xml` siga teniendo `android:name=".BehaviorApplication"` — se pierde cada vez que se regenera `platforms/android` (punto 5.1).
- **App Store / Play Store rechaza la app por permisos:** revisa que los textos de uso de ubicación en iOS sean específicos de tu app (punto 6) y que `QUERY_ALL_PACKAGES` esté justificado si lo mantienes (punto 5.2).
- **`setSessionId` / `registerField` fallan silenciosamente:** confirma que `initialize()` devolvió `finishStatus === finishOk` antes de encadenar cualquier otra llamada; el SDK nativo debe estar inicializado primero.
- **Permisos runtime de Android (ubicación, teléfono):** declararlos en el manifest no basta en API 23+; tu app debe solicitarlos en tiempo de ejecución antes de que dependan de ellos las capacidades de detección.

## 11. Referencia completa de la API

Este README cubre la instalación y el recorrido de uso con el ejemplo. Para la referencia exhaustiva de cada método, el shape de `WgtBehaviorConfig`, los payloads de evento y las utilidades (`generateUUID`, `WgtFinishStatus`), consulta el README del plugin: `widget-behavior-cordova/README.md` (paquete `@fip360/widget-behavior-cordova`).
