---
name: io-connect-booth
description: Google I/O Connect Berlin 2026 GDG London photo booth — preset, flow, branding, and Berlin-first content. Use when editing UI, scenes, prompts, social copy, compositing, or event-specific behavior.
---

# I/O Connect Photo Booth

## Event context

| Item | Value |
|------|--------|
| Event | Google I/O Connect Berlin 2026 |
| Community | GDG London (host group — not London skyline theme) |
| Preset | `APP_PRESET=io-connect-2026` |
| Firebase | Your project (see `docs/FIREBASE_SETUP.md`) |
| Hero | “Send a Smile From Berlin” |

## User flow

`/` → `/input` → `/camera` → `/backgrounds` → `/prompts` → `/processing` → `/result` · `/gallery` · `/admin`

## Key files

| Area | Path |
|------|------|
| App config / preset | `src/lib/core/app-config.ts` |
| Brand tokens | `src/lib/io-connect-brand.ts` |
| Backgrounds | `src/data/backgrounds.ts` (Berlin + I/O Connect only) |
| AI prompts | `src/data/prompts.ts` |
| Gemini compositing | `src/lib/gemini-image.ts`, `src/app/api/composit-image/route.ts` |
| Social / LinkedIn copy | `src/lib/linkedin/social-post-copy.ts` |
| Motion | `src/components/io-connect/PageMotion.tsx`, `src/app/globals.css` |
| Session state | `src/store/photo-booth.ts` |

## Conventions

- **Berlin-first** scenes and copy; removed London landmark backgrounds.
- **GDG logo** on composited images: **top-right** watermark.
- **Colors**: Google four-color (`google-blue`, `google-red`, etc.) — see `docs/BRANDING_GUIDE.md`.
- **Animations**: use existing motion components; honor `prefers-reduced-motion`.
- **Secrets**: server-only env; see `io-connect-security` skill before deploy.

## Docs

`README.md`, `AGENTS.md`, `docs/BRANDING_GUIDE.md`, `docs/VERCEL_DEPLOY.md`
