# CLAUDE.md

Guidance for Claude and other AI assistants in this repository.

## Project

**Google I/O Connect Photo Booth** — AI event photo booth for **Google I/O Connect Berlin 2026** (GDG London).

- **Stack:** Next.js 14, React 18, TypeScript, Zustand, Firebase, Gemini
- **Preset:** `APP_PRESET=io-connect-2026`
- **Deploy:** Vercel (primary)

## User Flow

1. Landing — “Send a Smile From Berlin”; **Go beyond the basics** (generate/list AI social posts by email)
2. Input — name, email, workshop track, optional takeaway, GDPR consent
3. Camera — webcam or upload
4. Scenes — curated background + Gemini magic in one step (`/scenes`; legacy `/backgrounds` + `/prompts` redirect here)
5. Processing — AI compositing + GDG watermark (top-right)
6. Result — download, print, share, cached social captions, gallery

## Key Files

| Area | Path |
|------|------|
| Config | `src/lib/core/app-config.ts` |
| Branding | `src/lib/io-connect-brand.ts`, `src/lib/branding.ts` |
| Gemini | `src/lib/gemini-image.ts`, `src/app/api/composit-image/route.ts` |
| Scenes | `src/data/booth-scenes.ts`, `src/app/scenes/page.tsx` |
| Backgrounds/prompts | `src/data/backgrounds.ts`, `src/data/prompts.ts` |
| Workshops / hashtags | `src/data/io-connect-workshops.ts` |
| Social captions | `src/lib/linkedin/caption.ts`, `src/lib/linkedin/social-post-copy.ts` |
| Social post cache | `src/lib/social-posts-storage.ts` |
| Landing social UI | `src/components/io-connect/LandingBeyondSocial.tsx` |
| Booth social UI | `src/components/photo-booth/SocialSharePanel.tsx` |
| State | `src/store/photo-booth.ts` |
| Theme | `src/components/providers/theme-provider.tsx`, `ThemePullSwitch` |

## Rules

- Server-only: `GOOGLE_GEMINI_API_KEY`, Firebase Admin credentials
- No secrets in code or committed docs
- Berlin-first content; I/O Connect Berlin 2026 only
- Match existing `wizard-*` / `landing-*` UI patterns
- Social posts: cache in localStorage by email; avoid repeat Gemini calls for saved captions

## Docs

See `docs/` and `AGENTS.md` for full architecture and setup.
