import esbuild from 'esbuild';
import process from 'process';
import { copyFileSync, mkdirSync } from 'fs';

const prod = process.argv[2] === 'production';
const outDir = '../.obsidian/plugins/travis-os-dashboard';

mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian', 'electron', '@codemirror/*', '@lezer/*', 'node:*'],
  format: 'cjs',
  target: 'es2018',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  outfile: `${outDir}/main.js`,
  minify: prod,
});

copyFileSync('styles.css', `${outDir}/styles.css`);
console.log('Build complete.');
