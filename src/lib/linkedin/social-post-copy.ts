/**
 * Social post copy — Google I/O Connect Berlin 2026.
 * @see https://rsvp.withgoogle.com/events/ioconnect-berlin-2026/
 */

import { SOCIAL_SHARE_HASHTAGS } from '@/data/io-connect-workshops';

export interface SocialPostCopy {
  hashtags: string;
  mention: string;
  hashtagHint: string;
  captionSystem: string;
  eventPrompt: string;
  linkedInMediaTitle: string;
  linkedInMediaDescription: string;
}

const IO_CONNECT_COPY: SocialPostCopy = {
  hashtags: SOCIAL_SHARE_HASHTAGS.join(' '),
  mention: '@GoogleDevelopers',
  hashtagHint:
    'Includes #GoogleIOConnect, #BuildWithGemini, and other event hashtags plus @GoogleDevelopers — appended automatically',
  captionSystem: `You write a short LinkedIn post (2-4 sentences, max 600 characters) for someone sharing their AI-enhanced photo from Google I/O Connect Berlin 2026 — the event is in Berlin, presented by the GDG London developer community group.
Tone: professional, enthusiastic, authentic first-person. Draw inspiration from the official Berlin event: keynotes, hands-on sessions, and community networking across Android, Web, Cloud, and Gemini AI.
Weave in what they learned or built: a key takeaway, a new feature they discovered, or a light-bulb moment from their workshop or View Lounge session — when that context is provided.
Mention their AI photo creation as something they are proud to share online.
Do NOT include hashtags or @mentions — those are added automatically.
Do NOT mention photo codes, booth reference numbers, or internal IDs.
Do not wrap the whole post in quotation marks. Return only the post body text.`,
  eventPrompt: `Event: Google I/O Connect Berlin 2026 — Google's developer conference in Berlin, Germany.
Community host: GDG London (Google Developer Group London) — attending and celebrating at the Berlin event.
Themes: Build with Gemini, Android, Web, Cloud, AI/ML, keynotes, workshops, developer networking in Berlin.
Attendees complete a workshop across AI, Android, Chrome, or Cloud — or a session at the View Lounge — then share what they created with a takeaway online.
Official page: https://rsvp.withgoogle.com/events/ioconnect-berlin-2026/`,
  linkedInMediaTitle: 'Google I/O Connect Photo Booth',
  linkedInMediaDescription: 'Google I/O Connect Berlin 2026 · GDG London',
};

export function resolveSocialPostCopy(): SocialPostCopy {
  return IO_CONNECT_COPY;
}

export function fallbackSocialCaption(context: {
  userName: string;
  workshopTrackLabel?: string;
  sessionTakeaway?: string;
}): string {
  const first = context.userName.split(' ')[0] || 'I';
  const track = context.workshopTrackLabel
    ? ` after the ${context.workshopTrackLabel} session`
    : '';
  const takeaway = context.sessionTakeaway?.trim();
  const insight = takeaway
    ? ` My light-bulb moment: ${takeaway}`
    : ' — exploring what is new in Gemini, Android, and Cloud';
  return `${first} had an amazing time at Google I/O Connect Berlin 2026 with GDG London${track}.${insight} I created this AI-powered keepsake at the photo booth and cannot wait to share it with the developer community.`;
}
