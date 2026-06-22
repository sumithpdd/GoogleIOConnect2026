# AGENTS.md

Guidance for AI agents (Cursor) working in this repository. Human docs live in `docs/`.

## Project Overview

**Google I/O Connect Photo Booth** — React/Next.js event photo booth for **I/O Connect Berlin 2026**, presented by **GDG London**.

**Preset:** `APP_PRESET=io-connect-2026` (default)

**Flow:** `/` → `/input` → `/camera` → `/backgrounds` → `/prompts` → `/processing` → `/result` · `/gallery` · `/admin` · `/summary`

**Flutter reference** (feature parity): `C:\code\flutter\photo_booth_ai`

## Documentation Map

| Doc | Use when |
|-----|----------|
| [docs/00_GETTING_STARTED.md](docs/00_GETTING_STARTED.md) | Setup, env vars |
| [docs/01_ARCHITECTURE.md](docs/01_ARCHITECTURE.md) | Structure, data flow |
| [docs/02_FEATURES.md](docs/02_FEATURES.md) | Feature behavior |
| [docs/03_DEVELOPMENT.md](docs/03_DEVELOPMENT.md) | Add pages/components |
| [docs/04_TROUBLESHOOTING.md](docs/04_TROUBLESHOOTING.md) | Common fixes |
| [docs/SECURITY.md](docs/SECURITY.md) | Secrets, env, git |
| [docs/BRANDING_GUIDE.md](docs/BRANDING_GUIDE.md) | I/O Connect theme, assets, animations |
| [docs/VERCEL_DEPLOY.md](docs/VERCEL_DEPLOY.md) | Production deploy |
| [docs/06_API_SECURITY.md](docs/06_API_SECURITY.md) | Secure API patterns |

## Tech Stack

- Next.js 14 (App Router), React 18, TypeScript
- Zustand (session UI) + TanStack Query (server data)
- Firebase (Firestore, Storage, Admin on server)
- Google Gemini — image compositing + social captions (**server-only**)
- Tailwind CSS, React Hook Form + Zod

## API Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/config` | Branding + backgrounds/prompts |
| GET | `/api/auth/session` | API session cookie (`API_SECRET`) |
| POST | `/api/composit-image` | Gemini compositing |
| POST | `/api/upload-photo` | Firebase Storage + Firestore |
| GET | `/api/gallery` | Gallery list |
| POST | `/api/admin/login` | Staff → signed httpOnly cookie |
| GET/PATCH/DELETE | `/api/admin/photos` | Moderation |

## Folder Structure

```
src/
├── app/                 # Pages + API routes
├── components/
│   ├── io-connect/      # Brand UI, WizardLayout, ThemePullSwitch
│   ├── booth/           # BoothLogo, BoothBackdrop
│   ├── photo-booth/     # SocialSharePanel, PhotoPreviewModal
│   └── providers/       # AppConfig, Theme, ApiSessionBootstrap
├── lib/
│   ├── core/            # app-config, api-auth, api-client
│   ├── io-connect-brand.ts
│   └── branding.ts
├── store/photo-booth.ts
└── data/                # backgrounds.ts, prompts.ts, io-connect-facts.ts
```

## Patterns

- **Zustand** for booth session state; **TanStack Query** for API data.
- Never call Gemini or Firebase Admin from client components.
- `resolveAppConfig()` on server; `useAppConfig()` on client.
- `apiFetch` for secured routes when `API_SECRET` is set.
- Berlin-first scenes; GDG London community (not London skyline theme).
- UI: `wizard-*`, `landing-*`, `google-*` tokens — see `docs/BRANDING_GUIDE.md`.

## Security

- Never commit `.env.local`, `*firebase-adminsdk*`, or API keys.
- Use `devLog` / `publicErrorMessage` from `src/lib/safe-log.ts` in API routes.
- Admin login uses **signed** session cookie — not raw `ADMIN_SECRET`.
- Run `/safety-check` before pushing.

## Cursor

- **Rules:** `.cursor/rules/*.mdc`
- **Skills:** `.cursor/skills/io-connect-booth/`, `io-connect-security/`
- **Commands:** `/verify`, `/safety-check`, `/update-docs`

---

**Last updated:** June 2026
