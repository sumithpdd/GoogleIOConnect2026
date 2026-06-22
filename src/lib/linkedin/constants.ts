import { resolveSocialPostCopy } from '@/lib/linkedin/social-post-copy';

const copy = resolveSocialPostCopy();

/** Required hashtags on every booth LinkedIn post (preset-aware). */
export const LINKEDIN_HASHTAGS = copy.hashtags;

export const LINKEDIN_MENTION = copy.mention;

export const LINKEDIN_ACCESS_COOKIE = 'linkedin_access_token';
export const LINKEDIN_PERSON_COOKIE = 'linkedin_person_id';
export const LINKEDIN_EXPIRES_COOKIE = 'linkedin_expires_at';
export const LINKEDIN_OAUTH_STATE_COOKIE = 'linkedin_oauth_state';

export const LINKEDIN_SCOPES = ['openid', 'profile', 'w_member_social'];
