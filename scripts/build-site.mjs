import { readFile, mkdir, copyFile, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');process.chdir(root);
const manifest=JSON.parse(await readFile('lessons/manifest.json','utf8'));
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
await copyFile('index.html','dist/index.html');await cp('lessons','dist/lessons',{recursive:true});await cp('agents','dist/agents',{recursive:true});
for(const lesson of manifest.lessons){
 const html=await readFile(lesson.output,'utf8');
 if(lesson.lab&&html.split('data-learning-lab="'+lesson.id+'"').length!==2)throw new Error(`Rebuild lesson ${lesson.id} with npm run build:lessons before deploying`);
 for(const name of [lesson.output,lesson.sourcePdf]){const target=path.join('dist',name);await mkdir(path.dirname(target),{recursive:true});await copyFile(name,target);}
}
console.log(`Prepared ${manifest.lessons.length} lessons and three offline labs in dist`);
