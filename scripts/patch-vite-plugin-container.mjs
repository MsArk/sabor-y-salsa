#!/usr/bin/env node
/**
 * Mitigación para https://github.com/vitejs/vite/issues/21162 (transform undefined → .call).
 * Inserta `if (!handler) continue` en el bucle de `EnvironmentPluginContainer.transform`
 * dentro de `vite/dist/node/chunks/config.js` para las copias instaladas bajo node_modules.
 */
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const rootNm = resolve(process.cwd(), 'node_modules');

function collectViteConfigChunks(nmDir, out) {
	const chunk = join(nmDir, 'vite', 'dist', 'node', 'chunks', 'config.js');
	if (existsSync(chunk)) out.add(chunk);
	try {
		for (const name of readdirSync(nmDir)) {
			const p = join(nmDir, name);
			if (!statSync(p).isDirectory()) continue;
			const inner = join(p, 'node_modules');
			if (existsSync(inner)) collectViteConfigChunks(inner, out);
		}
	} catch {
		/* ignore */
	}
}

/** @returns {'patched' | 'skipped' | 'no-match'} */
function patchChunk(filePath) {
	let src = readFileSync(filePath, 'utf8');
	if (
		/if \(!handler\) continue;/.test(src) &&
		src.includes('const handler = getHookHandler(plugin.transform);')
	) {
		return 'skipped';
	}
	const re = /(const handler = getHookHandler\(plugin\.transform\);\n)(\t+)try \{/;
	if (!re.test(src)) return 'no-match';
	src = src.replace(re, (_, before, tabs) => `${before}${tabs}if (!handler) continue;\n${tabs}try {`);
	writeFileSync(filePath, src, 'utf8');
	return 'patched';
}

function main() {
	if (!existsSync(rootNm)) {
		console.warn('patch-vite-plugin-container: no node_modules, skip');
		return;
	}
	const files = new Set();
	collectViteConfigChunks(rootNm, files);
	if (files.size === 0) {
		console.warn('patch-vite-plugin-container: no Vite dist chunk found');
		return;
	}

	let patched = 0;
	let skipped = 0;
	let noMatch = 0;
	for (const f of files) {
		const r = patchChunk(f);
		if (r === 'patched') {
			patched++;
			console.log(`patch-vite-plugin-container: patched ${f}`);
		} else if (r === 'skipped') skipped++;
		else noMatch++;
	}

	if (noMatch > 0) {
		console.warn(
			`patch-vite-plugin-container: ${noMatch} chunk(s) did not match (Vite layout changed?). See https://github.com/vitejs/vite/issues/21162`,
		);
	}
	if (patched === 0 && noMatch > 0) {
		process.exitCode = 1;
	}
}

main();
