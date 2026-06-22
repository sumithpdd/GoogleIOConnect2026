/**
 * Application configuration — Google I/O Connect Berlin 2026 photo booth.
 */

import { backgrounds } from '@/data/backgrounds';
import { prompts } from '@/data/prompts';
import type { Background, PhotoPrompt } from '@/types';

export interface BrandingConfig {
  eventTitle: string;
  eventSubtitle: string;
  eventTagline: string;
  eventLocation: string;
  eventDate: string;
  eventUrl: string;
  logoPath: string;
  backdropPath: string;
  watermarkText: string;
  photoCodePrefix: string;
  storagePathPrefix: string;
  copyrightHolder: string;
}

export interface FeatureFlags {
  gallery: boolean;
  admin: boolean;
  summaryPage: boolean;
  /** Share to social UI on result + admin (native share + optional LinkedIn). */
  socialShare: boolean;
  /** LinkedIn OAuth share with AI caption (requires LINKEDIN_CLIENT_ID). */
  linkedInShare: boolean;
  /** Server-side: LinkedIn app credentials present (set in /api/config only). */
  linkedInConfigured?: boolean;
}

export interface BrandRulesConfig {
  enabled: boolean;
  locationPrompt: string;
  logoPrompt: string;
  backdropPrompt: string;
  imageBrandRules: string;
}

export interface AppConfig {
  branding: BrandingConfig;
  features: FeatureFlags;
  brandRules: BrandRulesConfig;
  backgrounds: Background[];
  prompts: PhotoPrompt[];
}

function parseBoolEnv(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === '') return defaultValue;
  return value === 'true' || value === '1';
}

/** Google I/O Connect Berlin 2026 defaults */
export function getIoConnectPreset(): Partial<AppConfig> {
  return {
    branding: {
      eventTitle: process.env.APP_EVENT_TITLE ?? 'Google I/O Connect Photo Booth',
      eventSubtitle: process.env.APP_EVENT_SUBTITLE ?? 'Berlin 2026 · GDG London',
      eventTagline: process.env.APP_EVENT_TAGLINE ?? 'Berlin · 2026',
      eventLocation: process.env.APP_EVENT_LOCATION ?? 'Berlin',
      eventDate: process.env.APP_EVENT_DATE ?? '2026',
      eventUrl:
        process.env.APP_EVENT_URL ??
        'https://rsvp.withgoogle.com/events/ioconnect-berlin-2026',
      logoPath: process.env.APP_LOGO_PATH ?? '/branding/gdg-london-berlin-2026.png',
      backdropPath: process.env.APP_BACKDROP_PATH ?? '/branding/page-backdrop-official.jpg',
      watermarkText: process.env.APP_WATERMARK_TEXT ?? 'I/O CONNECT',
      photoCodePrefix: process.env.APP_PHOTO_CODE_PREFIX ?? 'IO26',
      storagePathPrefix: process.env.APP_STORAGE_PREFIX ?? 'io-connect-2026',
      copyrightHolder: process.env.APP_COPYRIGHT_HOLDER ?? 'GDG London',
    },
    features: {
      gallery: parseBoolEnv(process.env.NEXT_PUBLIC_ENABLE_GALLERY, true),
      admin: parseBoolEnv(process.env.NEXT_PUBLIC_ENABLE_ADMIN, true),
      summaryPage: parseBoolEnv(process.env.NEXT_PUBLIC_ENABLE_SUMMARY, true),
      socialShare: true,
      linkedInShare:
        parseBoolEnv(process.env.NEXT_PUBLIC_ENABLE_LINKEDIN_SHARE, false) ||
        Boolean(process.env.LINKEDIN_CLIENT_ID?.trim()),
    },
    brandRules: {
      enabled: false,
      locationPrompt: '',
      logoPrompt: '',
      backdropPrompt: '',
      imageBrandRules: '',
    },
  };
}

/** Server-side config from environment + static data. */
export function getDefaultAppConfig(): AppConfig {
  const preset = getIoConnectPreset();
  return {
    branding: preset.branding!,
    features: preset.features!,
    brandRules: preset.brandRules!,
    backgrounds,
    prompts,
  };
}

/** Merge preset + env overrides for server routes. */
export function resolveAppConfig(): AppConfig {
  return getDefaultAppConfig();
}
