# Features Guide — Google I/O Connect Photo Booth

Overview of the booth flow, AI pipeline, gallery, admin, and social sharing for **Google I/O Connect Berlin 2026** (GDG London community).

## Booth flow (7 steps)

| # | Route | Purpose |
|---|-------|---------|
| 1 | `/` | Landing — animated hero, start CTA, gallery link |
| 2 | `/input` | Name, email, GDPR consent → session created |
| 3 | `/camera` | Webcam or file upload; portrait 3:4 capture |
| 4 | `/backgrounds` | Pick Berlin landmark or I/O Connect scene |
| 5 | `/prompts` | Pick Gemini preset or write custom prompt |
| 6 | `/processing` | AI compositing + Firebase upload |
| 7 | `/result` | Download, print, share, regenerate |

Optional: `/summary` keepsake page (enabled in `io-connect-2026` preset).

---

## 1. Landing page

**File:** `src/app/page.tsx`

- Black I/O Connect theme with Google gradient accents
- Animated decorations: floating orbs, `{ }` braces, festive string lights
- Hero: **“Send a Smile From Berlin”** — GDG London at I/O Connect Berlin 2026
- Staggered step cards and pulsing CTA
- Footer: GDG London attribution + link to [RSVP page](https://rsvp.withgoogle.com/events/ioconnect-berlin-2026)

---

## 2. User input

**File:** `src/app/input/page.tsx`

- Collects **full name** and **email** (validated with Zod)
- GDPR terms + optional gallery sharing consent
- Creates booth session in Zustand + `POST /api/session`
- Twinkling sparkle icons and staggered form entrance

---

## 3. Camera

**File:** `src/app/camera/page.tsx` · **Hook:** `src/lib/hooks.ts`

- Live webcam preview with **I/O Connect Berlin banner** centered on feed
- Pulsing capture ring while camera is active
- Portrait capture: center-crop to **3:4**, full-frame (no tiny corner thumbnail)
- Upload from gallery as alternative
- Retake clears hook + store state and restarts camera

---

## 4. Background selection

**File:** `src/app/backgrounds/page.tsx` · **Data:** `src/data/backgrounds.ts`

**Filters:** All · **Berlin** · **I/O Connect**

Berlin scenes include Brandenburg Gate, TV Tower, Reichstag, East Side Gallery, Oberbaum Bridge, United Buddy Bears, Hello Berlin art, and more.

I/O Connect scenes include gradient braces studio, Berlin landmarks collage, GDG sticker art, Gemini sparkle studio.

Cards use gradient-rim design with staggered grid animation and hover lift.

---

## 5. Magic / prompts

**File:** `src/app/prompts/page.tsx` · **Data:** `src/data/prompts.ts`

**Categories:**

| Filter | Content |
|--------|---------|
| **Berlin** | Hello Berlin, Buddy Bears, East Side Gallery, GDG London at I/O Connect stage, etc. |
| **I/O Connect** | Official event art, Gemini sparkle, community motifs |
| **Share** | Berlin postcard, LinkedIn-ready headshot |

- Preset cards or **custom prompt** (sanitized server-side)
- Quick suggestion chips for common Berlin prompts
- All prompts instruct Gemini to **remove the webcam background** and blend the person into the scene

---

## 6. AI processing

**Files:** `src/app/processing/page.tsx` · `src/app/api/composit-image/route.ts` · `src/lib/gemini-image.ts`

**Pipeline:**

1. Portrait input normalized (`preparePortraitInputForGeneration`)
2. **Gemini native image generation** with Berlin / I/O Connect prompt + guardrails
3. **GDG London · Berlin 2026 sticker** composited **top-right** (Sharp)
4. Print portrait normalization (100×148 mm @ 300 dpi)
5. Upload original + composited to Firebase (`POST /api/upload-photo`)

**Fallback:** If Gemini fails, Sharp applies theme-based enhancement (dev/events without API key).

**Loader:** Animated Gemini orbs on processing screen.

**Env:** `GOOGLE_GEMINI_API_KEY`, optional `GEMINI_IMAGE_MODEL`, `API_SECRET` for secured API.

---

## 7. Result & sharing

**File:** `src/app/result/page.tsx`

- Side-by-side **Original** and **AI Enhanced** when both exist
- Photo code (prefix **`IO26`**) for gallery lookup
- Download, print, **Regenerate AI Photo**
- **Social share panel** (`SocialSharePanel`):
  - AI-generated LinkedIn post about **I/O Connect Berlin 2026** + GDG London
  - Hashtags: `#GoogleIOConnect #IOConnect2026 #GoogleDevelopers #GDGLondon #BuildWithGemini #Berlin`
  - Optional LinkedIn OAuth post with image

**Caption generation:** `src/lib/linkedin/social-post-copy.ts` + `src/lib/linkedin/caption.ts`

---

## Gallery

**File:** `src/app/gallery/page.tsx` · **API:** `GET /api/gallery`

- Public grid of shared photos (respects moderation flags)
- Search by name or photo code
- Filter: All · Berlin · I/O Connect
- Tap to open preview modal (animated entrance)
- Staggered card grid animation

---

## Admin moderation

**File:** `src/app/admin/page.tsx` · **API:** `/api/admin/*`

- Protected by **`ADMIN_SECRET`**
- Hide/show/delete photos from public gallery
- View composited images and metadata

---

## Configuration preset

**`APP_PRESET=io-connect-2026`** (default) enables:

- Berlin-first branding and copy
- Gallery, admin, summary, social share
- Storage prefix `io-connect-2026/`
- Photo code prefix `IO26`
- Watermark: `public/branding/gdg-london-berlin-2026.png`

---

## Related docs

- [Architecture](./01_ARCHITECTURE.md) — folders, API routes, state
- [Branding & motion](./BRANDING_GUIDE.md) — colors, assets, animations
- [Firebase setup](./FIREBASE_SETUP.md) — Firebase project & env vars
- [API security](./06_API_SECURITY.md) — `API_SECRET`, admin auth
