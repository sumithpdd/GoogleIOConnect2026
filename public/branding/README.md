# Branding assets — Google I/O Connect 2026

Static images for the GDG London photo booth.

| File | Use |
|------|-----|
| `io-connect-main-logo.png` | Header wordmark (I/O Connect Berlin banner) |
| `io-connect-berlin-logo.png` | I/O Connect Berlin art with gradient braces |
| `hello-berlin.png` | Hello Berlin official event graphic |
| `gdg-london-berlin-2026.png` | GDG London sticker — footer + **photo watermark** on prints |
| `gdg-london-logo.png` | Legacy GDG London logo (superseded by sticker) |
| `sample-photo-1.png` … `3.png` | Landing page sample portraits |
| `io-mark.png` | Browser favicon (I/O mark) |

**Photo watermark:** composited images receive `gdg-london-berlin-2026.png` via `logoPath` in the `io-connect-2026` preset (see `src/app/api/composit-image/route.ts`).

Do not commit Firebase service account JSON files — store credentials in `.env.local` only.
