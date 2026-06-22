/**
 * Social post copy — Google I/O Connect Berlin 2026.
 * @see https://rsvp.withgoogle.com/events/ioconnect-berlin-2026/
 */

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
  hashtags:
    '#GoogleIOConnect #IOConnect2026 #GoogleDevelopers #GDGLondon #BuildWithGemini #Berlin',
  mention: '@GoogleDevelopers',
  hashtagHint:
    'Includes #GoogleIOConnect #IOConnect2026 #GoogleDevelopers #GDGLondon #BuildWithGemini #Berlin and @GoogleDevelopers',
  captionSystem: `You write a short LinkedIn post (2-4 sentences, max 600 characters) for someone sharing their AI-enhanced photo from Google I/O Connect Berlin 2026 — the event is in Berlin, presented by the GDG London developer community group.
Tone: professional, enthusiastic, authentic first-person. Draw inspiration from the official Berlin event: keynotes, hands-on sessions, and community networking across Android, Web, Cloud, and Gemini AI. Mention learning, building, or connecting with developers in Berlin — not salesy.
Do NOT include hashtags or @mentions — those are added automatically.
Do not wrap the whole post in quotation marks. Return only the post body text.`,
  eventPrompt: `Event: Google I/O Connect Berlin 2026 — Google's developer conference in Berlin, Germany.
Community host: GDG London (Google Developer Group London) — attending and celebrating at the Berlin event.
Themes: Build with Gemini, Android, Web, Cloud, AI/ML, keynotes, workshops, developer networking in Berlin.
Official page: https://rsvp.withgoogle.com/events/ioconnect-berlin-2026/`,
  linkedInMediaTitle: 'Google I/O Connect Photo Booth',
  linkedInMediaDescription: 'Google I/O Connect Berlin 2026 · GDG London',
};

export function resolveSocialPostCopy(): SocialPostCopy {
  return IO_CONNECT_COPY;
}

export function fallbackSocialCaption(userName: string): string {
  const first = userName.split(' ')[0] || 'I';
  return `${first} had an amazing time at Google I/O Connect Berlin 2026 with GDG London — connecting with the developer community in Berlin, exploring what's new in Gemini, Android, and Cloud, and capturing this AI-powered memory at the photo booth. Grateful for the energy, the sessions, and the people building what's next.`;
}
