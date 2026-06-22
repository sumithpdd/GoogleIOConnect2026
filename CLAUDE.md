# CLAUDE.md

Guidance for Claude and other AI assistants in this repository.

## Project

**Google I/O Connect Photo Booth** — AI event photo booth for **Google I/O Connect Berlin 2026** (GDG London).

- **Stack:** Next.js 14, React 18, TypeScript, Zustand, Firebase, Gemini
- **Preset:** `APP_PRESET=io-connect-2026`
- **Deploy:** Vercel (primary)

## User Flow

1. Landing — “Send a Smile From Berlin”
2. Input — name, email, GDPR consent
3. Camera — webcam or upload
4. Backgrounds — Berlin landmarks + I/O Connect art
5. Prompts — Gemini presets or custom prompt
6. Processing — AI compositing + GDG watermark (top-right)
7. Result — download, print, share, gallery

## Key Files

| Area | Path |
|------|------|
| Config | `src/lib/core/app-config.ts` |
| Branding | `src/lib/io-connect-brand.ts`, `src/lib/branding.ts` |
| Gemini | `src/lib/gemini-image.ts`, `src/app/api/composit-image/route.ts` |
| Backgrounds/prompts | `src/data/backgrounds.ts`, `src/data/prompts.ts` |
| State | `src/store/photo-booth.ts` |
| Theme | `src/components/providers/theme-provider.tsx`, `ThemePullSwitch` |

## Rules

- Server-only: `GOOGLE_GEMINI_API_KEY`, Firebase Admin credentials
- No secrets in code or committed docs
- Berlin-first content; I/O Connect Berlin 2026 only
- Match existing `wizard-*` / `landing-*` UI patterns

## Docs

See `docs/` and `AGENTS.md` for full architecture and setup.
