import { NextResponse } from 'next/server';
import { resolveAppConfig } from '@/lib/core/app-config';
import { isLinkedInConfigured } from '@/lib/linkedin/auth';
import { resolveSocialPostCopy } from '@/lib/linkedin/social-post-copy';

/**
 * GET /api/config
 * Public read-only app configuration for client bootstrap.
 */
export async function GET() {
  try {
    const config = resolveAppConfig();

    return NextResponse.json({
      success: true,
      data: {
        branding: config.branding,
        features: {
          ...config.features,
          linkedInConfigured: isLinkedInConfigured(),
          linkedInShare:
            config.features.linkedInShare || isLinkedInConfigured(),
          socialShare: true,
        },
        backgrounds: config.backgrounds,
        prompts: config.prompts,
        brandRulesEnabled: config.brandRules.enabled,
        socialShare: {
          hashtagHint: resolveSocialPostCopy().hashtagHint,
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
