// Publica la landing en GitHub Pages: exporta el sitio estático a `out/` y lo sube a la rama
// `gh-pages` del repositorio `origin`. Uso: `npm run publicar`.
//
// La rama gh-pages solo contiene la página compilada y se reemplaza completa en cada
// publicación; el código fuente vive en `main`.
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const correr = (cmd, opciones = {}) => execSync(cmd, { stdio: "inherit", ...opciones });
const leer = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remoto = leer("git remote get-url origin");
const repositorio = remoto.replace(/\.git$/, "").split("/").pop();
const basePath = `/${repositorio}`;

console.log(`\nCompilando para GitHub Pages en ${basePath} ...\n`);
rmSync("out", { recursive: true, force: true });
correr("npx next build", { env: { ...process.env, EXPORTAR: "1", NEXT_PUBLIC_BASE_PATH: basePath } });

// Sin .nojekyll, GitHub Pages ignora la carpeta _next y la página sale sin estilos.
writeFileSync(join("out", ".nojekyll"), "");

const temporal = mkdtempSync(join(tmpdir(), "b2b-pages-"));
try {
  cpSync("out", temporal, { recursive: true });
  const git = (cmd) => correr(`git ${cmd}`, { cwd: temporal });
  git("init -q -b gh-pages");
  git("add -A");
  git(`commit -q -m "Publicar landing (${new Date().toISOString().slice(0, 16).replace("T", " ")})"`);
  git(`push -f "${remoto}" gh-pages`);
} finally {
  rmSync(temporal, { recursive: true, force: true });
}

console.log("\nListo. GitHub Pages actualiza la página en uno o dos minutos.\n");
