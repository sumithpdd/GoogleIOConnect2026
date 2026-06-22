/**
 * Event branding exports — Google I/O Connect Berlin 2026.
 * Prefer useAppConfig() in client components and resolveAppConfig() on the server.
 */

import { IO_CONNECT_ASSETS, IO_CONNECT_EVENT } from '@/lib/io-connect-brand';

export const BRAND = {
  eventTitle: IO_CONNECT_EVENT.title,
  eventSubtitle: IO_CONNECT_EVENT.subtitle,
  eventTagline: IO_CONNECT_EVENT.tagline,
  eventLocation: IO_CONNECT_EVENT.location,
  eventDate: IO_CONNECT_EVENT.date,
  eventUrl: IO_CONNECT_EVENT.url,
} as const;

/** Brand assets for I/O Connect Berlin 2026 booth */
export const BRAND_ASSETS = {
  mainLogo: IO_CONNECT_ASSETS.mainLogo,
  heroLogo: IO_CONNECT_ASSETS.heroLogo,
  helloBerlin: IO_CONNECT_ASSETS.helloBerlin,
  gdgLondonLogo: IO_CONNECT_ASSETS.gdgLondonLogo,
  photoWatermarkLogo: IO_CONNECT_ASSETS.photoWatermarkLogo,
  pageBackdrop: IO_CONNECT_ASSETS.pageBackdrop,
  berlinBanner: IO_CONNECT_ASSETS.berlinBanner,
  ioMark: IO_CONNECT_ASSETS.ioMark,
  samplePhotos: IO_CONNECT_ASSETS.samplePhotos,
} as const;

export type BrandAssetKey = keyof typeof BRAND_ASSETS;
