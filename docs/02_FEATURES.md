# Features Guide — Google I/O Connect Photo Booth

Overview of the booth flow, AI pipeline, gallery, admin, and social sharing for **Google I/O Connect Berlin 2026** (GDG London community).

## Booth flow (4 wizard steps)

| # | Route | Purpose |
|---|-------|---------|
| 1 | `/input` | Name, email, workshop/session, optional takeaway, GDPR → session created |
| 2 | `/camera` | Webcam or file upload; portrait 3:4 capture |
| 3 | `/scenes` | Pick curated **scene + magic** pair (or custom prompt) |
| 4 | `/processing` → `/result` | AI compositing, Firebase upload, download/share |

**Entry:** `/` landing · **Optional:** `/summary` keepsake · **Public:** `/gallery` · **Staff:** `/admin`

Legacy `/backgrounds` and `/prompts` **redirect** to `/scenes`.

---

## 1. Landing page

**Files:** `src/app/page.tsx` · `src/components/io-connect/LandingBeyondSocial.tsx`

- Black I/O Connect theme with Google gradient accents
- Animated decorations: floating orbs, `{ }` braces, festive string lights
- Hero: **“Send a Smile From Berlin”** — GDG London at I/O Connect Berlin 2026
- Staggered step cards and pulsing CTA
- **Go beyond the basics** — interactive social post generator (see [Social sharing](#social-sharing--go-beyond-the-basics))
- Footer: GDG London attribution + link to [RSVP page](https://rsvp.withgoogle.com/events/ioconnect-berlin-2026)

---

## 2. User input

**File:** `src/app/input/page.tsx`

- Collects **full name** and **email** (validated with Zod)
- **Workshop / session attended** (required): AI, Android, Chrome, Cloud, or View Lounge — feeds AI social captions
- Optional **key takeaway / light-bulb moment** (max 280 chars)
- GDPR terms + optional gallery sharing consent
- Creates booth session in Zustand + `POST /api/session`
- Attendee profile includes `workshopTrack` and `sessionTakeaway` (persisted to Firestore via session upload)

---

## 3. Camera

**File:** `src/app/camera/page.tsx` · **Hook:** `src/lib/hooks.ts`

- Live webcam preview with **GDG watermark top-right** (small; does not block the face)
- Pulsing capture ring while camera is active
- Portrait capture: center-crop to **3:4**, full-frame
- Upload from gallery as alternative
- Retake clears hook + store state and restarts camera

---

## 4. Scene selection (background + magic)

**File:** `src/app/scenes/page.tsx` · **Data:** `src/data/booth-scenes.ts`, `src/data/backgrounds.ts`, `src/data/prompts.ts`

One tap selects a **curated experience** — background image + Gemini prompt together.

**Filters:** All · **Berlin** · **I/O Connect**

Featured scenes include Hello Berlin Portal, Buddy Bears, East Side Gallery, I/O Connect braces studio, Gemini sparkle, and more.

- **Custom magic** option — write your own prompt (sanitized server-side)
- Cards use gradient-rim design with staggered grid animation
- Sets both `selectedBackground` and `selectedPrompt` in Zustand before processing

---

## 5. AI processing

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

## 6. Result & sharing

**File:** `src/app/result/page.tsx` · **Component:** `src/components/photo-booth/SocialSharePanel.tsx`

- Side-by-side **Original** and **AI Enhanced** when both exist
- Photo code (prefix **`IO26`**) for gallery lookup
- Download, print, **Regenerate AI Photo**
- **Social share panel** — see below
- Optional `/summary` keepsake page with social panel

---

## Social sharing — Go beyond the basics

Attendees share what they learned at I/O Connect with AI-written captions. **No login** — posts are listed by **email** and stored in the browser.

### Where it appears

| Location | Component |
|----------|-----------|
| Home `/` | `LandingBeyondSocial` |
| Result `/result` | `SocialSharePanel` |
| Summary `/summary` | `SocialSharePanel` |
| Gallery modal | `SocialSharePanel` (compact) |
| Admin preview | `SocialSharePanel` (compact) |

### Workshop context

**Data:** `src/data/io-connect-workshops.ts`

| Track | Label |
|-------|--------|
| `ai` | AI — Gemini, ML & generative AI |
| `android` | Android development |
| `chrome` | Chrome & web platform |
| `cloud` | Google Cloud |
| `view-lounge` | View Lounge session |

Captured on `/input`; passed to caption generation as `workshopTrackLabel`.

### Hashtags (appended automatically)

`#GoogleIOConnect` · `#BuildWithGemini` · `#IOConnect2026` · `#GoogleDevelopers` · `#GDGLondon` · `#Berlin` · `@GoogleDevelopers`

**Copy:** `src/lib/linkedin/social-post-copy.ts`  
**Generation:** `src/lib/linkedin/caption.ts` · `POST /api/social/caption`

Photo codes and internal IDs are **not** included in generated post text.

### Saved posts (localStorage)

**File:** `src/lib/social-posts-storage.ts`  
**Key:** `io_connect_social_posts_v1` (object keyed by normalized email)

Each saved post stores: caption, timestamp, optional `photoCode`, workshop label, takeaway, scene metadata.

**Behaviour:**

- On load, if a saved post exists for **email + photo code** → use it (**no Gemini call**)
- **Regenerate with AI** → new Gemini call → new entry in the list
- User can **select any saved post** from the list to load its caption
- Home page and booth flow share the **same list** per email on that device
- Last-used email remembered: `io_connect_last_email_v1`

**Limit:** 40 posts per email (oldest trimmed).

### Optional LinkedIn OAuth

When `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` are set, result/gallery panels offer **Connect LinkedIn** and post image + caption to the member feed.

---

## Gallery

**File:** `src/app/gallery/page.tsx` · **API:** `GET /api/gallery`

- Public grid of shared photos (respects moderation flags)
- Search by name or photo code
- Filter: All · Berlin · I/O Connect
- Tap to open preview modal — download, print, social share (with saved posts if `userEmail` on record)
- Staggered card grid animation

---

## Admin moderation

**File:** `src/app/admin/page.tsx` · **API:** `/api/admin/*`

- Protected by **`ADMIN_SECRET`** (signed session cookie)
- Hide/show/delete photos from public gallery
- View composited images, metadata, and social share panel

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
