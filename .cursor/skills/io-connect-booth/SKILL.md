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

`/` → `/input` → `/camera` → `/scenes` → `/processing` → `/result` · `/gallery` · `/admin` · `/summary`

(`/backgrounds` and `/prompts` redirect to `/scenes`.)

## Key files

| Area | Path |
|------|------|
| App config / preset | `src/lib/core/app-config.ts` |
| Brand tokens | `src/lib/io-connect-brand.ts` |
| Curated scenes | `src/data/booth-scenes.ts`, `src/app/scenes/page.tsx` |
| Backgrounds | `src/data/backgrounds.ts` (Berlin + I/O Connect only) |
| AI prompts | `src/data/prompts.ts` |
| Workshop tracks | `src/data/io-connect-workshops.ts` |
| Gemini compositing | `src/lib/gemini-image.ts`, `src/app/api/composit-image/route.ts` |
| Social copy | `src/lib/linkedin/social-post-copy.ts`, `caption.ts` |
| Social post cache | `src/lib/social-posts-storage.ts` |
| Landing social UI | `src/components/io-connect/LandingBeyondSocial.tsx` |
| Booth social UI | `src/components/photo-booth/SocialSharePanel.tsx` |
| Motion | `src/components/io-connect/PageMotion.tsx`, `src/app/globals.css` |
| Session state | `src/store/photo-booth.ts` |

## Conventions

- **Berlin-first** scenes and copy; no London landmark backgrounds.
- **GDG logo** on composited images: **top-right** watermark.
- **4-step booth** — scene picker merges background + prompt.
- **Social posts** — keyed by attendee email in localStorage; avoid repeat Gemini calls for saved captions.
- **Hashtags** — always include `#GoogleIOConnect` and `#BuildWithGemini`.
- **Colors**: Google four-color (`google-blue`, `google-red`, etc.) — see `docs/BRANDING_GUIDE.md`.
- **Animations**: use existing motion components; honor `prefers-reduced-motion`.
- **Secrets**: server-only env; see `io-connect-security` skill before deploy.

## Docs

`README.md`, `AGENTS.md`, `docs/02_FEATURES.md`, `docs/BRANDING_GUIDE.md`, `docs/VERCEL_DEPLOY.md`
