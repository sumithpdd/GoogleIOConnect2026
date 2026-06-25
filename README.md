# Google I/O Connect Photo Booth

AI-powered event photo booth for **Google I/O Connect Berlin 2026**, presented by **GDG London**.

Guests capture a selfie, pick a curated **Berlin / I/O Connect scene** (background + Gemini magic in one step), then download, print, or share. **Gemini** also writes ready-to-post social captions — on the home page or after your photo. Posts are saved per email in the browser (no login). Photos upload to Firebase for a public gallery and staff moderation.

**Repository:** [github.com/sumithpdd/GoogleIOConnect2026](https://github.com/sumithpdd/GoogleIOConnect2026)  
**Live (example):** [google-io-connect2026.vercel.app](https://google-io-connect2026.vercel.app)  
**Event:** [Google I/O Connect Berlin 2026 RSVP](https://rsvp.withgoogle.com/events/ioconnect-berlin-2026)  
**UX inspiration:** [GDG London Christmas Photobooth](https://christmas-photobooth.web.app/)

## What it does

| Step | Screen | Description |
|------|--------|-------------|
| 1 | Landing (`/`) | Hero — “Send a Smile From Berlin”; **Go beyond the basics** — generate AI social posts & view saved captions by email |
| 2 | Your details (`/input`) | Name, email, workshop/session attended, optional takeaway, GDPR consent |
| 3 | Camera (`/camera`) | Webcam capture or upload; GDG watermark top-right on live preview |
| 4 | Scenes (`/scenes`) | One-tap **scene + magic** pairs (Berlin landmarks & I/O Connect art); optional custom prompt |
| 5 | Processing (`/processing`) | AI compositing + Firebase upload |
| 6 | Result (`/result`) | Download, print, gallery, cached AI social posts, optional LinkedIn OAuth share |

**Also:** `/gallery` · `/summary` (keepsake) · `/admin` (staff moderation)

Legacy routes `/backgrounds` and `/prompts` redirect to `/scenes`.

## Go beyond the basics (social posts)

On the **home page** and in the **booth result flow**, attendees can:

- Pick a workshop track: **AI**, **Android**, **Chrome**, **Cloud**, or **View Lounge**
- Add a key takeaway, new feature, or light-bulb moment
- **Generate** an AI caption with `#GoogleIOConnect`, `#BuildWithGemini`, and other event hashtags
- **Reuse saved posts** — captions are stored in **localStorage** keyed by email (no account login)
- **Regenerate** for a new variant without re-calling AI for posts already saved

See [Features — Social sharing](docs/02_FEATURES.md#social-sharing--go-beyond-the-basics).

## Quick start

```bash
git clone https://github.com/sumithpdd/GoogleIOConnect2026.git
cd GoogleIOConnect2026
npm install
copy .env.example .env.local
# Add Firebase + GOOGLE_GEMINI_API_KEY — see docs/FIREBASE_SETUP.md
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Preset **`APP_PRESET=io-connect-2026`** is the default in `.env.example`. Gallery, admin, summary, and standalone mode are built into that preset.

| Variable | Purpose |
|----------|---------|
| `APP_PRESET` | `io-connect-2026` (Berlin booth defaults) |
| `NEXT_PUBLIC_FIREBASE_*` | Client Firebase config from Console |
| `FIREBASE_*` or `FIREBASE_SERVICE_ACCOUNT_KEY` | Admin SDK (upload, gallery, admin) |
| `GOOGLE_GEMINI_API_KEY` | Gemini image generation + social post text |
| `ADMIN_SECRET` | Staff admin panel password |
| `API_SECRET` | Recommended for public Vercel deploy |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | Optional OAuth “Post to LinkedIn” |

**Firebase:** configure via `.env.local` — see [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md)  
**Storage prefix:** `io-connect-2026/` · **Firestore:** `photobooth`, `photobooth_sessions`

Full setup: [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md)

## AI & branding highlights

- **Gemini image edit** — subject background removed and blended into Berlin / I/O Connect scenes (not a pasted collage)
- **Curated scenes** — `src/data/booth-scenes.ts` pairs backgrounds + prompts for a shorter 4-step booth flow
- **Watermark** — `gdg-london-berlin-2026.png` applied **top-right** on composited portraits
- **Social share** — AI captions about I/O Connect Berlin 2026 + workshop context; hashtags include `#GoogleIOConnect` and `#BuildWithGemini`
- **Local post cache** — `src/lib/social-posts-storage.ts` (browser localStorage, keyed by email)
- **Motion** — page entrances, staggered cards, progress shimmer — see [Branding & motion](docs/BRANDING_GUIDE.md)

## Security — do not commit

These files are **gitignored** and must stay local or in Vercel env vars only:

- `.env.local` and any `.env*` with real values
- `*-firebase-adminsdk-*.json` (Firebase service account keys)
- API keys, private keys, credentials

Use `.env.example` as a template with placeholder values only.

## Documentation

| Doc | Description |
|-----|-------------|
| [Getting started](docs/00_GETTING_STARTED.md) | Local dev setup |
| [Firebase setup](docs/FIREBASE_SETUP.md) | Firebase project & env vars |
| [Architecture](docs/01_ARCHITECTURE.md) | App structure |
| [Features](docs/02_FEATURES.md) | Booth flow, scenes, social posts |
| [Branding & motion](docs/BRANDING_GUIDE.md) | Colors, assets, animations |
| [Vercel deploy](docs/VERCEL_DEPLOY.md) | Production deployment |
| [Troubleshooting](docs/04_TROUBLESHOOTING.md) | Common fixes |

## Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Zustand · Google Gemini · Firebase · Vercel

## License & credits

Built for **GDG London** at **Google I/O Connect Berlin 2026**.  
Gemini AI · Firebase · Google I/O Connect branding.

Made with ❤️ by GDG London
