# Historical Lovable build evidence

Original Lovable-managed preview, before GitHub Pages adaptation. Current deployment: docs/GITHUB-PAGES.md.

# CHROMA QA

Verified locally on 2026-10-06 against `http://localhost:8080` using Chromium.

## Routes and page health

| Route | HTTP | Document title | Horizontal overflow |
| --- | ---: | --- | --- |
| `/` | 200 | CHROMA — Art Editions | None |
| `/editions` | 200 | Current One — CHROMA Editions | None |
| `/editions/current-one` | 200 | Current One — Edition Detail \| CHROMA | None |
| `/process` | 200 | Process — CHROMA Art Editions | None |

- Direct entry to `/editions/current-one` rendered the complete detail page.
- Four consecutive home → detail → back-to-editions cycles completed successfully.
- Page errors and console errors: **0**.
- Settled route resources: artwork, fonts, CSS and scripts loaded. Development-module requests aborted only during deliberate rapid navigation; no missing or failed user-facing resource remained on a settled page.
- Route tests: **4 passed** (`src/test/app-routing.test.tsx`).
- Latest preview build: **OK**.

## Viewports and language

- Desktop checked at **1440 × 900**.
- Tall editorial view checked at **1440 × 1800**.
- Mobile checked at **390 × 844** with touch enabled.
- English and Simplified Chinese copy checked in context on the home, catalogue and detail flows.
- Language choice persisted after navigation and reload through local storage.
- The complete Noto Sans CJK SC face covers new Chinese copy; it is served through a Lovable asset pointer because the binary exceeds the repository file limit.

## Interaction and accessibility

- Pointer movement changed the soft aligned reveal position.
- Touch changed the reveal position in a touch-enabled mobile context.
- Arrow keys moved the reveal after keyboard focus.
- Pause toggled `aria-pressed` and retained its functional still state.
- Chromatic, Silver and Compare fixed-state controls changed the detail viewer and exposed pressed state.
- Reduced-motion mode presented a still comparison and disabled the motion control with a clear label.
- All image content has descriptive alt text or intentionally empty alt text for duplicate layers.
- Navigation, state controls and return links are keyboard-reachable with visible focus.

## Effect cleanup evidence

- The reveal component owns one animation-frame handle and one intersection observer.
- On unmount it calls `cancelAnimationFrame`, disconnects the observer, removes media-query and visibility listeners, and clears the stored frame handle.
- Four route-remount cycles completed without duplicate controls, page errors, or stale interaction state.
- Animation work stops when the document is hidden or the reveal is outside the viewport; no particles or canvas loops are used.

## Captures

- `QA/screenshots/desktop-hero.png`
- `QA/screenshots/desktop-long-page.png`
- `QA/screenshots/mobile-home.png`
- `QA/screenshots/detail-silver.png`