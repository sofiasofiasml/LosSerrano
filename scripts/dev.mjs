import { build, preview } from 'vite';
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

function pureJsVitePlugin() {
  return {
    name: 'pure-js-ts-and-define',
    enforce: 'pre',
    configResolved(config) {
      for (const plugin of config.plugins) {
        if (plugin.name === 'vite:define') {
          plugin.transform = (code) => {
            if (code.includes('process.env.NODE_ENV')) {
              return code.replaceAll('process.env.NODE_ENV', JSON.stringify('production'));
            }
            return null;
          };
        }
      }
    },
    transform(code, id) {
      const cleanId = id.split('?')[0];
      if (cleanId.endsWith('.ts') || cleanId.endsWith('.tsx')) {
        const result = ts.transpileModule(code, {
          fileName: cleanId,
          compilerOptions: {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.ESNext,
            jsx: ts.JsxEmit.ReactJSX,
            sourceMap: true,
          },
        });
        return {
          code: result.outputText,
          map: result.sourceMapText ? JSON.parse(result.sourceMapText) : null,
        };
      }
      return null;
    },
  };
}

async function runBuild() {
  await build({
    configFile: false,
    logLevel: 'warn',
    plugins: [pureJsVitePlugin()],
    esbuild: false,
    build: {
      minify: false,
    },
  });
}

await runBuild();

const previewServer = await preview({
  configFile: false,
  preview: {
    port: 5173,
    host: true,
  },
});

previewServer.printUrls();

// Watch src/ for live rebuilds
let building = false;
fs.watch(path.resolve('src'), { recursive: true }, async () => {
  if (building) return;
  building = true;
  try {
    console.log('🔄 Detectado cambio en src/, reconstruyendo...');
    await runBuild();
    console.log('✅ Actualizado en http://localhost:5173/');
  } catch (err) {
    console.error('Error al reconstruir:', err);
  } finally {
    building = false;
  }
});
