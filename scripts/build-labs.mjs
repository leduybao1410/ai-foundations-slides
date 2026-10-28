import { build } from 'esbuild';
import { mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
process.chdir(root);
await mkdir('lessons/labs',{recursive:true});
await build({entryPoints:{bootstrap:'src/labs/bootstrap.mjs',runtime:'src/labs/runtime.mjs',terrain:'src/labs/terrain.mjs'},outdir:'lessons/labs',bundle:true,format:'iife',target:['es2020'],minify:true,supported:{'template-literal':false},legalComments:'linked',logLevel:'info'});
await copyFile('src/labs/styles.css','lessons/labs/labs.css');
const notices=[];
for(const name of ['gsap','three']){
 const dir=path.join(root,'node_modules',name);let license='';
 for(const file of ['LICENSE','LICENSE.md','LICENSE.txt'])try{license=await readFile(path.join(dir,file),'utf8');break;}catch{}
 if(!license){const metadata=JSON.parse(await readFile(path.join(dir,'package.json'),'utf8'));const source=await readFile(path.join(dir,'gsap-core.js'),'utf8');license=metadata.license+'\n'+(source.match(/\/\*![\s\S]*?\*\//)?.[0]||'');}
 notices.push(name+'\n'+license);
}
await writeFile('lessons/labs/THIRD-PARTY-NOTICES.txt',notices.join('\n\n'));
