// Bundles the game into single files:
//   dist/index.html     the whole game in one file, ready to host anywhere
//   dist/artifact.html  the same page without the document shell, for publishing on claude.ai
import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const { outputFiles } = await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  target: ['es2020', 'safari15'],
  minify: true,
  write: false,
  legalComments: 'none',
});
const script = outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const styles = await readFile('styles/main.css', 'utf8');
const page = await readFile('index.html', 'utf8');

const swap = (text, find, replacement) => {
  if (!text.includes(find)) throw new Error(`index.html no longer contains: ${find}`);
  return text.replace(find, () => replacement);
};
let html = swap(page, '<link rel="stylesheet" href="styles/main.css">', `<style>\n${styles}</style>`);
html = swap(html, '<script type="module" src="src/main.js"></script>', `<script>\n${script}</script>`);

// claude.ai wraps a published page in its own doctype, head and body, so strip ours.
const SHELL = new Set(['<!doctype html>', '<html lang="en">', '<head>', '</head>', '<body>', '</body>', '</html>', '<meta charset="utf-8">']);
const artifact = html
  .split('\n')
  .filter((line) => !SHELL.has(line.trim()) && !line.trim().startsWith('<meta name="viewport"'))
  .join('\n');

await mkdir('dist', { recursive: true });
await writeFile('dist/index.html', html);
await writeFile('dist/artifact.html', artifact);
console.log(`dist/index.html     ${(html.length / 1024).toFixed(0)} KB`);
console.log(`dist/artifact.html  ${(artifact.length / 1024).toFixed(0)} KB`);
