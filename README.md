# Google I/O Connect Photo Booth

AI-powered event photo booth for **Google I/O Connect London & Berlin 2026**, presented by **GDG London**.

Live at event kiosks: guests capture a selfie, pick a London / Berlin / I/O Connect scene, apply Gemini “magic”, then download, print, or share. Photos upload to Firebase for a public gallery and staff moderation.

**Repository:** [github.com/sumithpdd/GoogleIOConnect2026](https://github.com/sumithpdd/GoogleIOConnect2026)  
**Event:** [Google I/O Connect Berlin 2026 RSVP](https://rsvp.withgoogle.com/events/ioconnect-berlin-2026)  
**UX inspiration:** [GDG London Christmas Photobooth](https://christmas-photobooth.web.app/)

## What it does

| Step | Screen | Description |
|------|--------|-------------|
| 1 | Landing | Animated hero — “Send a Smile From London & Berlin” |
| 2 | Your details | Name, email, GDPR consent |
| 3 | Camera | Webcam capture or file upload |
| 4 | Backgrounds | London landmarks, Berlin scenes (Buddy Bears, Brandenburg Gate, etc.), I/O Connect art |
| 5 | Magic | Gemini presets for London, Berlin, Connect, or custom prompt |
| 6 | Processing | AI compositing + GDG London · Berlin 2026 sticker watermark |
| 7 | Result | Download, print, gallery, optional LinkedIn share |

**Admin:** `/admin` — hide/show/delete gallery photos (protected by `ADMIN_SECRET`).

## Quick start

```bash
git clone https://github.com/sumithpdd/GoogleIOConnect2026.git
cd GoogleIOConnect2026
npm install
copy .env.example .env.local
# Add Firebase (ioconnect2026) + GOOGLE_GEMINI_API_KEY — see docs/FIREBASE_SETUP.md
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Preset **`APP_PRESET=io-connect-2026`** is the default in `.env.example`. Gallery, admin, summary, and standalone mode are built into that preset.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_FIREBASE_*` | Client Firebase config from Console |
| `FIREBASE_*` or `FIREBASE_SERVICE_ACCOUNT_KEY` | Admin SDK (upload, gallery, admin) |
| `GOOGLE_GEMINI_API_KEY` | Gemini image generation |
| `ADMIN_SECRET` | Staff admin panel password |
| `API_SECRET` | Recommended for public Vercel deploy |

**Firebase project:** `ioconnect2026` · web app **`GoogleIOConnect2026`**  
**Storage prefix:** `io-connect-2026/` · **Firestore:** `photobooth`, `photobooth_sessions`

Full setup: [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md)

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
| [Firebase setup](docs/FIREBASE_SETUP.md) | `ioconnect2026` project & env vars |
| [Architecture](docs/01_ARCHITECTURE.md) | App structure |
| [Features](docs/02_FEATURES.md) | Feature overview |
| [Vercel deploy](docs/VERCEL_DEPLOY.md) | Production deployment |

## Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Zustand · Google Gemini · Firebase · Vercel

## License & credits

Built for **GDG London** and **Google I/O Connect 2026**.  
Gemini AI · Firebase · Google I/O Connect branding.

Made with ❤️ by GDG London
