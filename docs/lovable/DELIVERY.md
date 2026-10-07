# Historical Lovable build evidence

Original Lovable-managed preview, before GitHub Pages adaptation. Current deployment: docs/GITHUB-PAGES.md.

# CHROMA Delivery

## Source reference

- Project: **CHROMA — Art Editions**
- Original repository: `https://github.com/Pachin1919/chromatic-overlay-motion-preview`
- Authoritative source commit: `1fc2b4a87bfea88fead71178ac9c24cbbfc52610`
- Source SHA-256 checks:
  - `chromatic-current.png`: `94b4b7a2c95837f2a09b173a9b67c616c84aad03f7182ddf1ee84937dd03196e`
  - `silver-current.png`: `dbae90229b7e1c9613904b186421f7539f97ba15352b2d0971b935ff3eaf336e`
  - `index.html`: `f5e2046db984c1c7b848b75351201ad5c87e98d8e80a1b8c97fdcb69bbf6756c`
  - `style.css`: `40867d2e5b2cdfc818b2060256a345550b06f07b287dd5d70bd8d0252c70cb69`
  - `app.js`: `c9bd736020d54ee097399d76fe35f5c6a3d07ab27bd80c7d7fa9ad23e7757d51`

## Implemented routes

- `/` — launch cover with preserved aligned reveal and print-oriented editorial sections.
- `/editions` — catalogue explanation of the Chromatic and Silver readings.
- `/editions/current-one` — fixed-state selector, interactive close viewer, conceptual format notes and credits.
- `/process` — composition, translation, reveal and publication process.

## Asset provenance and portability

- `public/assets/chroma/chromatic-current.png` and `silver-current.png` are unchanged portable copies from the authorized source archive.
- Original Barlow Condensed and IBM Plex Sans webfonts, plus their license notices, are stored under `public/assets/fonts` and `public/assets/licenses`.
- The original HTML, CSS, JavaScript and bundled GSAP file are preserved as portable source references under `public/assets/source`; the expansion itself uses browser-native React/CSS and does not require GSAP.
- Noto Sans CJK SC provides complete coverage for new Chinese copy. Its 15.7 MB binary is stored as a Lovable asset pointer at `public/assets/fonts/NotoSansCJKsc-Regular.otf.asset.json`; its OFL notice is portable in the repository.
- No stock imagery, generated replacement art, database, API, authentication, CMS, payments, analytics or audio was added.

## Known gaps

- Material and format language is intentionally conceptual; no production specification, inventory, scarcity, price or availability is claimed.
- The CJK font depends on the project-scoped Lovable asset URL rather than a portable in-repository binary because of the 10 MB file limit.
- No production publish was performed.

## Project revision

- Verified implementation commit: `4dac252f2dd75495a8dbaef79395f1722438b566`.
- This SHA contains the implemented experience and delivery documentation available at verification time; Lovable may create a follow-up managed revision containing the saved QA screenshots.