#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function run(context) {
  const projectRoot = context?.opts?.projectRoot || process.cwd();
  const iosPath = path.join(projectRoot, 'platforms', 'ios');

  if (!fs.existsSync(iosPath)) {
    console.log('[Podfile Hook] No existe carpeta iOS todavía.');
    return;
  }

  const podfilePath = path.join(iosPath, "Podfile");

  console.warn("⚠️ RUNNING AFTER_PLUGIN_ADD:");
  if (!fs.existsSync(podfilePath)) {
    console.warn("⚠️ No se encontró el Podfile en:", podfilePath);
    return;
  }

  let content = fs.readFileSync(podfilePath, "utf8");

  // 0️⃣ Agregar plugin 'cocoapods-art' si no existe
  const cocoapodsArtLine = "plugin 'cocoapods-art', :sources => ['cocoa-pro-fphi']";
  const cocoapodsOrgLine = "source 'https://cdn.cocoapods.org/'";

  if (!content.includes(cocoapodsArtLine)) {
    content = cocoapodsArtLine + "\n" + content;
    console.log("ℹ️ Se agregó plugin 'cocoapods-art'");
  }

  if (!content.includes(cocoapodsOrgLine)) {
    content = cocoapodsOrgLine + "\n" + content;
    console.log("ℹ️ Se agregó url 'https://cdn.cocoapods.org/'");
  }

  // 1️⃣ Pods de Facephi
  const facephiPods = [
    "pod 'FPHISDKMainComponent', '~> 2.3.0'",
    "pod 'FPHISDKLicensingComponent', '~> 2.3.0'",
    "pod 'FPHISDKTrackingComponent', '~> 2.3.0'",
    "pod 'FPHISDKTokenizeComponent', '~> 2.3.0'",
    "pod 'FPHISDKStatusComponent', '~> 2.3.0'",
    "pod 'FPHISDKSelphiComponent', '~> 2.3.0'",
    "pod 'FPHISDKSelphIDMBSDRComponent', '~> 2.3.0'"
  ];

  // 2️⃣ Buscar el primer target que encuentre
  const targetRegex = /(target\s+['"][^'"]+['"]\s+do)([\s\S]*?)(end)/;
  const match = content.match(targetRegex);

  if (match) {
    let [fullMatch, targetStart, targetBody, targetEnd] = match;

    // Si hay línea project '...', mantenerla
    const projectLineRegex = /project\s+['"][^'"]+['"]/;
    const projectLineMatch = targetBody.match(projectLineRegex);
    let projectLine = projectLineMatch ? projectLineMatch[0] : null;

    // Insertar pods que falten
    const missingPods = facephiPods.filter(pod => !targetBody.includes(pod));
    if (missingPods.length > 0) {
      const podsBlock = missingPods.map(p => "  " + p).join("\n");

      if (targetBody.includes("use_native_modules!")) {
        targetBody = targetBody.replace(/(use_native_modules!)/, `$1\n${podsBlock}`);
      } else {
        targetBody = podsBlock + "\n" + targetBody;
      }

      // Reconstruir target con project line si existía
      if (projectLine && !targetBody.includes(projectLine)) {
        targetBody = projectLine + "\n" + targetBody;
      }

      console.log(`ℹ️ Se agregaron los pods de Facephi dentro del primer target: ${missingPods.join(", ")}`);
    }

    // Reconstruir el target
    const newTargetBlock = `${targetStart}${targetBody}${targetEnd}`;
    content = content.replace(targetRegex, newTargetBlock);

  } else {
    console.warn("⚠️ No se encontró ningún target en el Podfile. Pods no agregados.");
  }

  fs.writeFileSync(podfilePath, content, "utf8");
  console.log("✔ Hook ejecutado: Podfile actualizado con Facephi y cocoapods-art");
}

// ✅ Exportar para Cordova
if (typeof module !== 'undefined' && module.exports) {
  module.exports = run;
}

// ✅ Ejecutar directamente con Node
if (require.main === module) {
  run(null);
}
