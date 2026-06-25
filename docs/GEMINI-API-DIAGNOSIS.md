# Gemini API Image Generation — I/O Connect Berlin 2026

How the booth uses **Google Gemini** for portrait compositing at **Google I/O Connect Berlin 2026** (GDG London).

## Architecture

```
User Photo + Prompt + Background
  ↓
/api/composit-image
  ├─ Sanitize prompt (block unsafe keywords)
  └─ Call Gemini image model (default: gemini-2.5-flash-image)
       ├─ Analyze original portrait
       ├─ Remove webcam/indoor background
       ├─ Generate Berlin / I/O Connect scene blend
       └─ Return base64 encoded result
  ↓
Add GDG London · Berlin 2026 sticker (Sharp, top-right)
  ↓
Print portrait normalization (100×148 mm @ 300 dpi)
  ↓
Save to Firebase Storage (io-connect-2026/)
  ↓
Display in Gallery
```

## Model

Default: **`gemini-2.5-flash-image`** — override with `GEMINI_IMAGE_MODEL` in env.

Capabilities used by the booth:

- Image analysis (understand portrait content)
- Image editing / generation (scene blend, not collage)
- Multimodal input: text prompt + portrait photo

## How It Works

### 1. User Submits Photo + Prompt

```
Photo: selfie.jpg
Prompt: "Hello Berlin — Brandenburg Gate with gradient code braces"
Background: "Brandenburg Gate"
```

### 2. API Route Processes

```typescript
// Sanitize (block inappropriate content)
const sanitizationResult = sanitizePrompt(prompt);

// Call Gemini with portrait + Berlin / I/O Connect guardrails
const result = await generateImageWithGemini({
  photoBase64,
  prompt,
  backgroundDescription,
});

// Extract generated image
const generatedImageBase64 = extractImageBase64FromResponse(result);
```

Guardrails live in `src/lib/io-connect-brand.ts` (`IO_CONNECT_IMAGE_RULES`) and `src/lib/gemini-image.ts`.

### 3. Post-Processing

```
Generated Image
  ↓ (GDG London · Berlin 2026 sticker — top-right, Sharp)
  ↓ (Print portrait normalization)
Final composited portrait
```

### 4. Store & Display

- **Firebase Storage:** `io-connect-2026/{sessionId}/` — original + composited
- **Firestore:** `photobooth` collection — gallery metadata
- **Gallery:** `/gallery` — public grid with moderation flags

## Testing

```bash
npm test -- composit-image.test.ts
```

Tests verify:

1. Gemini connectivity (when `GOOGLE_GEMINI_API_KEY` is set)
2. Response format (base64 image in candidates)
3. Berlin / I/O Connect prompt guardrails applied

## Environment

```bash
# .env.local
GOOGLE_GEMINI_API_KEY=your_actual_api_key
# Optional:
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image
API_SECRET=long-random-string   # recommended on public Vercel deploy
```

## Booth workflow

1. **User enters name & email** (`/input`)
2. **Captures/uploads portrait** (`/camera`)
3. **Selects scene** (`/scenes`) — background + magic preset in one step
4. **Processing** (`/processing`) — Gemini compositing, watermark, Firebase upload
5. **Result** — download, print, cached AI social posts, gallery (`/result`)

## Troubleshooting

### "No image in response"

- Verify `GOOGLE_GEMINI_API_KEY` is valid
- Check request format (`inlineData` with base64 JPEG)
- Ensure prompt is not filtered as unsafe
- Review Google AI quota

### "Collage / pasted photo strip"

- Guardrails require seamless background removal — check `IO_CONNECT_IMAGE_RULES`
- Retry with a clearer preset from `src/data/prompts.ts`

### "API rate limit"

- Event load: plan for peak concurrent users at the booth
- Consider `API_SECRET` + edge rate limiting on Vercel

## Production checklist

- `GOOGLE_GEMINI_API_KEY` on Vercel
- `APP_PRESET=io-connect-2026`
- Firebase credentials configured (same project for client + Admin SDK)
- End-to-end test on live URL before event day

---

**Last updated:** June 2026  
**Event:** Google I/O Connect Berlin 2026 · GDG London
