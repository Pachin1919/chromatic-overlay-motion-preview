import { mkdir, copyFile, writeFile } from "node:fs/promises";
for (const route of ["editions", "editions/current-one", "process"]) { await mkdir("dist/"+route,{recursive:true}); await copyFile("dist/index.html","dist/"+route+"/index.html"); }
await copyFile("dist/index.html","dist/404.html");
await writeFile("dist/.nojekyll","");
