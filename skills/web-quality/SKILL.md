---
name: web-quality
description: Audit and raise UI quality for accessibility, responsiveness, performance, SEO, and motion. Use when reviewing UI, checking accessibility, verifying the site in a browser, polishing layout, or finishing a web change.
paths: app/**/*.{tsx,ts,css},components/**/*.tsx,public/**
---

# Web Quality

Use this skill whenever UI, layout, styling, routing, or rendered content changes. Design intent lives in `frontend-design`; this skill is the quality floor and verification loop.

## Before calling the work done

1. Read the changed files and related routes that share state or components.
2. Optionally fetch latest Web Interface Guidelines and apply them:

   `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`

3. Verify in the browser (or the closest substitute). A single screenshot is not enough — confirm behavior.

## Quality floor

- Semantic HTML: one `h1`, heading order, landmarks (`header`, `nav`, `main`, `footer`).
- Keyboard: all interactive elements reachable; visible `:focus-visible`; no keyboard traps.
- Motion: honor `prefers-reduced-motion`; prefer transform/opacity over layout-thrashing animation.
- Contrast: text vs background readable; do not rely on color alone.
- Images: real `width`/`height` or aspect-ratio, descriptive `alt`, no distortion; lazy-load below the fold.
- Responsive: no accidental horizontal scroll; test ~375px and ~1280px.
- Touch: tap targets at least ~44px where practical; hover is not the only affordance.
- Performance: avoid extra dependencies for tiny effects; optimize images; do not block LCP with unused fonts.
- i18n: if the app has language switching, keep copy, `lang`, and dates consistent on every surface.
- SEO: title, description, Open Graph, and favicon stay accurate.

## Browser verification

When browser tools exist:

1. Open the running app and exercise the changed flow as a user would (click, type, navigate).
2. Check every page/route that shares the state, data, or components you touched.
3. Probe empty, error, and language variants when relevant.
4. For layout/styling, check desktop and mobile viewports.
5. If something breaks, fix it and re-check before finishing.

If browser tools are unavailable, use tests, curl, or a render script, and say what you could not verify.

## Output for audits

When the user asks for a review, report findings as:

`path:line — severity — issue — fix`

Severities: `critical` (blocks use or a11y), `serious`, `minor`.
