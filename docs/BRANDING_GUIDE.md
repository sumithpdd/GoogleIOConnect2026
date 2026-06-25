# Branding & Motion — Google I/O Connect Berlin 2026

Visual identity and animation system for the GDG London photo booth at **Google I/O Connect Berlin 2026**.

**Event reference:** [RSVP — I/O Connect Berlin](https://rsvp.withgoogle.com/events/ioconnect-berlin-2026)

---

## Brand positioning

| Aspect | Value |
|--------|--------|
| **Event** | Google I/O Connect Berlin 2026 |
| **Location / scenes** | Berlin landmarks and official Hello Berlin / I/O Connect art |
| **Community** | **GDG London** (Google Developer Group London) |
| **Tagline** | Berlin · GDG London · 2026 |
| **Hero** | “Send a Smile From Berlin” |

Scenes and AI prompts are **Berlin-first**. GDG London is the hosting community group, not a London skyline theme.

---

## Color palette (Google four-color)

| Token | Hex | Usage |
|-------|-----|--------|
| Google Blue | `#4285F4` | Accents, pills, progress, links |
| Google Red | `#EA4335` | Gradient rims, decorations |
| Google Yellow | `#FBBC04` | CTAs, eyebrows, highlights |
| Google Green | `#34A853` | Promo banners, gradient accents |
| Background | `#000000` | Page shell, cards |
| Surface | `rgba(255,255,255,0.06)` | Cards, inputs |

Defined in `src/app/globals.css` (`--google-*`) and `tailwind.config.ts` (`google.*`).

---

## Typography

- **Font stack:** Google Sans Flex → Google Sans → system UI (`layout.tsx`, `globals.css`)
- **Hero title:** `landing-hero-title` — large, bold, white
- **Gradient accent:** `landing-gradient-text` — animated shimmer on key phrase
- **Wizard:** `wizard-title`, `wizard-subtitle` on black wizard shell

---

## Logo & assets

All static files live in **`public/branding/`** — see [public/branding/README.md](../public/branding/README.md).

| Asset | Use |
|-------|-----|
| `io-connect-main-logo.png` | Header wordmark (I/O Connect Berlin banner) |
| `io-connect-berlin-logo.png` | I/O Connect Berlin art with gradient braces |
| `hello-berlin.png` | Hello Berlin event graphic |
| `gdg-london-berlin-2026.png` | Footer sticker + **photo watermark (top-right)** |
| `io-mark.png` | Favicon |
| `sample-photo-*.png` | Landing photo stack |

**Config:** `src/lib/io-connect-brand.ts`, preset in `src/lib/core/app-config.ts` (`getIoConnectPreset()`).

**Watermark:** Applied in `src/app/api/composit-image/route.ts` via Sharp — **top-right corner**, ~26% max width.

---

## UI components

| Component | Path | Role |
|-----------|------|------|
| `IoConnectLogo` | `components/io-connect/IoConnectLogo.tsx` | Header banner (subtle float animation) |
| `GdgLondonBrand` | `components/io-connect/GdgLondonBrand.tsx` | Footer — “GDG London · I/O Connect Berlin 2026” |
| `WizardLayout` | `components/io-connect/WizardLayout.tsx` | Booth shell, progress bar, decorations |
| `LandingDecorations` | `components/io-connect/LandingDecorations.tsx` | Orbs + animated `{ }` braces |
| `FestiveLights` | `components/io-connect/LandingDecorations.tsx` | SVG string lights with glowing bulbs |
| `PageMotion` | `components/io-connect/PageMotion.tsx` | Page enter + stagger wrappers |

**Card system:** `.io-gradient-rim`, `.io-inset-panel`, `.io-btn-white` — gradient border cards on scenes/gallery pages.

---

## Motion system

Animations respect **`prefers-reduced-motion`** (disabled automatically for users who opt out).

### Tailwind utilities (`tailwind.config.ts`)

| Class | Effect |
|-------|--------|
| `animate-fade-in` | Opacity fade |
| `animate-slide-up` | Fade + rise |
| `animate-slide-down` | Fade + drop (header) |
| `animate-scale-in` | Scale up reveal |
| `animate-bounce-in` | Bouncy entrance |
| `animate-pulse-soft` | Gentle opacity pulse (capture CTA, processing title) |
| `animate-shimmer` | Gradient shimmer |

### CSS motion classes (`globals.css`)

| Class | Effect |
|-------|--------|
| `.io-page-content` | Wizard page fade/slide in |
| `.io-stagger-block` | Stagger direct children (sections, form blocks) |
| `.io-stagger-grid` | Stagger grid items (scenes, gallery) |
| `.io-heading-block` | Eyebrow → title → subtitle cascade |
| `.io-modal-backdrop` / `.io-modal-panel` | Gallery preview modal |
| `.io-logo-float` | Header logo gentle float |
| `.io-footer-enter` | Footer fade up |
| `.camera-preview-frame--live` | Pulsing blue ring on live camera |
| `.camera-preview-logo` | Breathing I/O Connect overlay on camera |
| `.wizard-progress-fill::after` | Shimmer on progress bar |
| `.landing-cta-btn` | Pulsing glow on primary CTA |
| `.landing-brace` | Drifting gradient `{ }` braces |
| `.gemini-loader` | Processing spinner (orbiting Google colors) |

### Usage in pages

```tsx
import { PageMotion, StaggerGrid, HeadingMotion } from '@/components/io-connect/PageMotion';

<PageMotion stagger>
  <HeadingMotion title="Choose Background" subtitle="Berlin & I/O Connect" />
  <StaggerGrid className="grid ...">
    {items.map(...)}
  </StaggerGrid>
</PageMotion>
```

---

## Social post branding

LinkedIn / share copy is generated for **I/O Connect Berlin 2026**.

- **System prompt:** `src/lib/linkedin/social-post-copy.ts`
- **Hashtags:** `#GoogleIOConnect #IOConnect2026 #GoogleDevelopers #GDGLondon #BuildWithGemini #Berlin`
- **Mention:** `@GoogleDevelopers`

Regenerate on the result page after deploy to refresh cached text.

---

## Gemini image guardrails

**Rules:** `IO_CONNECT_IMAGE_RULES` in `src/lib/io-connect-brand.ts`

- Berlin / I/O Connect scenes only — not London landmarks in generated art
- Remove subject’s indoor/webcam background; seamless blend into scene
- No logos drawn in scene (watermark added post-generation)
- Portrait 2:3, edge-to-edge, no letterboxing

---

## Quick checklist for designers

- [ ] Add/update PNGs in `public/branding/` (never commit Firebase JSON)
- [ ] Keep black-background aesthetic aligned with [Berlin RSVP art](https://rsvp.withgoogle.com/events/ioconnect-berlin-2026)
- [ ] Test motion with and without `prefers-reduced-motion`
- [ ] Verify watermark position on a sample print (top-right sticker)
