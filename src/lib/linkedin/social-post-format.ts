/**
 * Format AI social post text with required hashtags and mentions.
 * Safe to import from client components (no Gemini / server-only deps).
 */

import { SOCIAL_SHARE_HASHTAGS } from '@/data/io-connect-workshops';
import { resolveSocialPostCopy } from '@/lib/linkedin/social-post-copy';

export const SOCIAL_SHARE_MENTION = '@GoogleDevelopers';

/** Remove any photo-code lines the model may still emit. */
export function stripPhotoCodeFromBody(body: string): string {
  return body
    .trim()
    .replace(/photo\s*code\s*:\s*[^\n.]+[.\s]*/gi, '')
    .replace(/\bIO\d{2}[A-Z0-9]+\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** True when every required hashtag and the mention appear in the caption. */
export function hasRequiredSocialTags(caption: string): boolean {
  const text = caption.trim();
  if (!text) return false;
  const lower = text.toLowerCase();
  const tagsOk = SOCIAL_SHARE_HASHTAGS.every((tag) =>
    lower.includes(tag.toLowerCase())
  );
  const mentionOk = text.includes(SOCIAL_SHARE_MENTION);
  return tagsOk && mentionOk;
}

/**
 * Append required hashtags and @mention for I/O Connect Berlin 2026.
 * Idempotent — strips duplicate tags from the body, then appends the canonical set.
 */
export function formatSocialPost(body: string): string {
  const { hashtags, mention } = resolveSocialPostCopy();
  const cleaned = stripPhotoCodeFromBody(body)
    .replace(/#\w+/g, '')
    .replace(/@\w+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) {
    return `${hashtags}\n\n${mention}`;
  }

  return `${cleaned}\n\n${hashtags}\n\n${mention}`;
}

/** Ensure caption includes all required tags and mention (for cache / user edits). */
export function ensureSocialPostFormatted(caption: string): string {
  const trimmed = caption.trim();
  if (!trimmed) return formatSocialPost('');
  if (hasRequiredSocialTags(trimmed)) return trimmed;
  return formatSocialPost(trimmed);
}

export function getSocialPostTagLine(): string {
  return SOCIAL_SHARE_HASHTAGS.join(' ');
}
