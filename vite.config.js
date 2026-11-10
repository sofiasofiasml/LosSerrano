import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ts from 'typescript';

// Pure JS TypeScript transpiler plugin so builds & dev server work even if esbuild.exe is blocked
function typescriptTranspilePlugin() {
  return {
    name: 'ts-transpile-fallback',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.ts') || id.endsWith('.tsx')) {
        const result = ts.transpileModule(code, {
          fileName: id,
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

export default defineConfig({
  plugins: [typescriptTranspilePlugin(), react()],
  esbuild: false,
  optimizeDeps: {
    disabled: true,
  },
  build: {
    minify: false,
  },
});
