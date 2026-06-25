'use client';

import {
  SOCIAL_SHARE_HASHTAGS,
} from '@/data/io-connect-workshops';
import { SOCIAL_SHARE_MENTION } from '@/lib/linkedin/social-post-format';

interface SocialPostTagsBlockProps {
  compact?: boolean;
}

/** Shows required hashtags and mention included in every AI social post. */
export function SocialPostTagsBlock({ compact = false }: SocialPostTagsBlockProps) {
  return (
    <div
      className={`social-post-tags-block ${compact ? 'social-post-tags-block--compact' : ''}`}
      aria-label="Required hashtags and mention for your post"
    >
      <p className="social-post-tags-block__label">Included in your post</p>
      <div className="social-post-tags-block__hashtags">
        {SOCIAL_SHARE_HASHTAGS.map((tag) => (
          <span
            key={tag}
            className={
              tag === '#GoogleIOConnect' || tag === '#BuildWithGemini'
                ? 'landing-hashtag landing-hashtag--primary'
                : 'landing-hashtag'
            }
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="social-post-tags-block__mention">{SOCIAL_SHARE_MENTION}</p>
    </div>
  );
}
