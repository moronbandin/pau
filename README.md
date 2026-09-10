# PAU Clásicas — sitio de recursos e creador de exames

Sitio estático (xerado con [Eleventy](https://www.11ty.dev/)) con todo o material da PAU de Latín e Grego: textos por autor con vocabulario e tradución, latinismos e helenismos, banco de preguntas de literatura, arquivo de exames por ano e o creador de exames.

## Estrutura

```
src/
  _data/           # todo o contido en JSON (textos, expresións, helenismos, preguntas, exames)
  _includes/       # layout base (nav, footer)
  css/, js/        # estilos e scripts do sitio
  index.njk        # inicio
  latin/, grego/   # seccións de cada materia (textos, expresións/helenismos, literatura, exames)
  creador/         # páxina que incrusta o creador de exames
public/
  creador-exames.html   # a ferramenta de creación de exames (autocontida)
.eleventy.js       # configuración de Eleventy
```

## Editar contido

Todo o contido vive en `src/_data/*.json`. Para engadir, corrixir ou ampliar:

- **Textos**: `latinTexts.json` / `greekTexts.json` — cada entrada ten `text`, `translation`, e (grego) `notes`.
- **Latinismos**: `latinExpressions.json` (lista simple) e `latinPrefixExamples.json`.
- **Helenismos**: `helenismos.json` — `{cat, term, base, meaning, examples}`.
- **Preguntas de literatura**: `litQuestions.json`, agrupadas por `latin`/`greek` e xénero.
- **Exames por ano**: `examArchive.json`. Para engadir unha nova convocatoria:

  ```json
  { "label": "Xuño 2024 (ordinaria)", "file": "/exames/latin/2024-ordinaria.pdf" }
  ```

  e coloca o PDF en `public/exames/latin/` (ou `grego/`). Aparecerá automaticamente na páxina correspondente.

Despois de calquera cambio, executa `npm run build` (ou deixa que GitHub Pages o faga automaticamente en cada push).

## Desenvolvemento local

```bash
npm install
npm run serve   # http://localhost:8080 con recarga automática
npm run build   # xera o sitio final en _site/
```

## Despregue en GitHub Pages

1. **Crea ou usa o repositorio de GitHub** e sube este contido:

   ```bash
   git init
   git add .
   git commit -m "Sitio inicial PAU Clásicas"
   git branch -M main
   git remote add origin git@github.com:moronbandin/pau.git
   git push -u origin main
   ```

2. **Activa GitHub Pages**:
   - Entra no repo en GitHub → Settings → Pages.
   - En "Build and deployment", escolle **GitHub Actions** como fonte.
   - O workflow `.github/workflows/pages.yml` constrúe Eleventy e publica `_site`.

3. **Actualizacións futuras**: calquera `git push` a `main` volve despregar o sitio automaticamente.

## Notas de contido

- As traducións, as notas de vocabulario latino e o banco de preguntas de literatura son elaboración de apoio ao estudo, non material oficial da CIUG.
- As notas de vocabulario grego proceden dos materiais oficiais fornecidos.
- A sección "Exames por ano" está lista pero baleira: engade os PDF oficiais reais seguindo as instrucións de arriba.
