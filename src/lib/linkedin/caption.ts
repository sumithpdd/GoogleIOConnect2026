import { GoogleGenAI } from '@google/genai';
import {
  fallbackSocialCaption,
  resolveSocialPostCopy,
} from '@/lib/linkedin/social-post-copy';
import { formatSocialPost } from '@/lib/linkedin/social-post-format';

export interface LinkedInCaptionContext {
  userName: string;
  promptTitle?: string;
  backgroundName?: string;
  company?: string;
  companyDescription?: string;
  role?: string;
  headline?: string;
  workshopTrackLabel?: string;
  sessionTakeaway?: string;
}

/** Append required hashtags and mention for the active preset. */
export function formatLinkedInPost(body: string): string {
  return formatSocialPost(body);
}

export async function generateLinkedInCaption(
  context: LinkedInCaptionContext
): Promise<string> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
  const body = apiKey
    ? await generateWithGemini(apiKey, context)
    : fallbackSocialCaption(context);

  return formatLinkedInPost(body);
}

async function generateWithGemini(
  apiKey: string,
  context: LinkedInCaptionContext
): Promise<string> {
  const { captionSystem, eventPrompt } = resolveSocialPostCopy();
  const model = process.env.GEMINI_QUOTE_MODEL?.trim() || 'gemini-2.5-flash';
  const bits = [
    `Name: ${context.userName}`,
    context.company && `Company: ${context.company}`,
    context.companyDescription && `About company: ${context.companyDescription}`,
    context.role && `Role: ${context.role}`,
    context.headline && `LinkedIn headline: ${context.headline}`,
    context.workshopTrackLabel &&
      `Workshop or session attended: ${context.workshopTrackLabel}`,
    context.sessionTakeaway &&
      `Key takeaway / new feature / light-bulb moment: ${context.sessionTakeaway}`,
    context.promptTitle && `AI photo theme: ${context.promptTitle}`,
    context.backgroundName && `Scene background: ${context.backgroundName}`,
  ]
    .filter(Boolean)
    .join('\n');

  const prompt = `${eventPrompt}

Attendee sharing their AI-enhanced event photo on LinkedIn:
${bits}

Write the LinkedIn post body (first person).`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model,
      contents: [{ text: prompt }],
      config: { systemInstruction: captionSystem },
    });

    const text =
      response.text?.trim() ??
      response.candidates?.[0]?.content?.parts
        ?.map((p) => ('text' in p ? p.text : ''))
        .join('')
        .trim();

    if (text && text.length > 20) {
      return text.replace(/^["']|["']$/g, '').slice(0, 700);
    }
  } catch (error) {
    console.warn('[linkedin-caption] Gemini failed, using fallback:', error);
  }

  return fallbackSocialCaption(context);
}
