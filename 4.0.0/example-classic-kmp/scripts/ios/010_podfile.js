#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function run(context) {
  const projectRoot = context?.opts?.projectRoot || process.cwd();
  const iosPlatformPath = path.join(projectRoot, 'platforms', 'ios');

  if (!fs.existsSync(iosPlatformPath)) {
    console.log('[Podfile Hook] No existe carpeta iOS todavía.');
    return;
  }

  // buscar Podfile en plataformas iOS
  const podfilePath = findPodfile(iosPlatformPath);

  if (!podfilePath) {
    console.log('[Podfile Hook] No se encontró Podfile en iOS.');
    return;
  }

  let podfileContent = fs.readFileSync(podfilePath, 'utf8');

  const pluginLine = `plugin 'cocoapods-art', :sources => ['cocoa-pro-fphi']`;
  const sourceLine = `source 'https://cdn.cocoapods.org/'`;

  if (!podfileContent.includes(pluginLine)) {
    podfileContent = `${pluginLine}\n${podfileContent}`;
  }

  if (!podfileContent.includes(sourceLine)) {
    podfileContent = `${sourceLine}\n${podfileContent}`;
  }

  fs.writeFileSync(podfilePath, podfileContent, 'utf8');
  console.log(`[Podfile Hook] Líneas agregadas en ${podfilePath}`);
}

function findPodfile(iosPath) {
  const files = fs.readdirSync(iosPath);
  for (const file of files) {
    const fullPath = path.join(iosPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const candidate = path.join(fullPath, 'Podfile');
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }
  const direct = path.join(iosPath, 'Podfile');
  return fs.existsSync(direct) ? direct : null;
}

// ✅ Si Cordova lo invoca, exporta la función
if (typeof module !== 'undefined' && module.exports) {
  module.exports = run;
}

// ✅ Si lo corres con node directamente, ejecuta la función
if (require.main === module) {
  run(null);
}
