/**
 * Mitigación para Vite 7 + Astro + @astrojs/react:
 * https://github.com/vitejs/vite/issues/21162
 * Tras configResolved, vite-plugin-react puede quitar el hook `transform`; si el
 * contenedor de plugins aún lo intenta, `handler` es undefined y falla .call().
 *
 * Idempotente: no duplica el guard si ya existe.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'node_modules', 'vite', 'dist', 'node', 'chunks', 'config.js');

const anchor = '\t\t\tconst handler = getHookHandler(plugin.transform);\n';
const guard = `${anchor}\t\t\tif (!handler) continue;\n`;

function main() {
  if (!fs.existsSync(file)) {
    console.warn('[patch-vite] skip: node_modules/vite/dist/.../config.js no encontrado (¿npm ci?)');
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(guard)) return;
  const beforeTry = anchor + '\t\t\ttry {';
  if (!content.includes(beforeTry)) {
    console.warn(
      '[patch-vite] skip: patrón no encontrado (¿otra versión de Vite?). Si sigues viendo "reading \'call\'", actualiza este script o Vite.',
    );
    return;
  }
  content = content.replace(beforeTry, `${guard}\t\t\ttry {`);
  fs.writeFileSync(file, content);
  console.info('[patch-vite] Aplicado guard en pluginContainer.transform (vite #21162).');
}

main();
