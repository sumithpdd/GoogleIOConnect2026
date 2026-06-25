/**
 * I/O Connect Berlin 2026 — workshop / lounge tracks for social sharing.
 */

export const WORKSHOP_TRACKS = [
  {
    id: 'ai',
    label: 'AI',
    description: 'Workshop across Gemini, ML & generative AI',
  },
  {
    id: 'android',
    label: 'Android',
    description: 'Workshop across Android development',
  },
  {
    id: 'chrome',
    label: 'Chrome',
    description: 'Workshop across Chrome & the web platform',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    description: 'Workshop across Google Cloud',
  },
  {
    id: 'view-lounge',
    label: 'View Lounge',
    description: 'Session completed at the View Lounge',
  },
] as const;

export type WorkshopTrackId = (typeof WORKSHOP_TRACKS)[number]['id'];

export const SOCIAL_SHARE_HASHTAGS = [
  '#GoogleIOConnect',
  '#BuildWithGemini',
  '#IOConnect2026',
  '#GoogleDevelopers',
  '#GDGLondon',
  '#Berlin',
] as const;

export function getWorkshopTrackLabel(id?: string): string | undefined {
  if (!id) return undefined;
  return WORKSHOP_TRACKS.find((t) => t.id === id)?.label;
}

export function getWorkshopTrackDescription(id?: string): string | undefined {
  if (!id) return undefined;
  return WORKSHOP_TRACKS.find((t) => t.id === id)?.description;
}
