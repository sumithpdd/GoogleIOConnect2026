import { GoogleGenAI, Modality } from '@google/genai';
import { IO_CONNECT_IMAGE_RULES } from '@/lib/io-connect-brand';
import { SITECORE_IMAGE_BRAND_RULES } from '@/lib/sitecore-brand';

/** GA image model; override with GEMINI_IMAGE_MODEL (e.g. gemini-3.1-flash-image). */
export const DEFAULT_GEMINI_IMAGE_MODEL = 'gemini-2.5-flash-image';

function isIoConnectPreset(): boolean {
  return process.env.APP_PRESET === 'io-connect-2026';
}

function imageBrandRules(): string {
  return isIoConnectPreset() ? IO_CONNECT_IMAGE_RULES : SITECORE_IMAGE_BRAND_RULES;
}

const safetyBase = `Output must be appropriate for all ages: no violence, explicit content, or disturbing imagery.
People must remain fully clothed. Keep faces recognizable.`;

function getSafetySystemInstruction(): string {
  if (isIoConnectPreset()) {
    return `You edit photos for the Google I/O Connect London & Berlin 2026 developer photo booth.
${safetyBase}
${IO_CONNECT_IMAGE_RULES}`;
  }
  return `You edit photos for the Sitecore Silver 25-year anniversary celebration photo booth in Copenhagen.
${safetyBase}
${SITECORE_IMAGE_BRAND_RULES}`;
}

export function getGeminiImageModel(): string {
  return process.env.GEMINI_IMAGE_MODEL?.trim() || DEFAULT_GEMINI_IMAGE_MODEL;
}

function buildImageEditPrompt(prompt: string, background: string): string {
  const theme = background?.trim()
    ? ` Scene / background direction: ${background}.`
    : '';

  const sceneLine = isIoConnectPreset()
    ? `Scenes must feel like Google I/O Connect 2026 in London and/or Berlin — developer community event with Google gradient accents (not Copenhagen or Sitecore Silver).
Do not add new logos or text overlays to the scene.`
    : `Scenes must feel like the Sitecore Silver Celebration in Copenhagen, Denmark in 2026 (Tivoli / Nordic anniversary event — not other cities).
Do not change, remove, replace, redraw, or be creative with the Sitecore logo or any brand logos. Do not add new logos to the scene.
Do not show calendar years other than 2026 in the image.`;

  return `Using the provided portrait photo, apply this edit: ${prompt}${theme}

Make the transformation clearly visible (environment, lighting, style, or effects as described).
Preserve the person's face and identity so they remain recognizable. Keep the full head and shoulders visible — do not crop the top of the head.

CRITICAL — output format:
- Vertical PORTRAIT only (taller than wide), aspect ratio 2:3 (100×148 mm postcard).
- The scene MUST fill the entire image edge to edge — no white borders, no empty margins, no letterboxing at top/bottom or sides.
- Extend background, sky, and environment to all four edges of the frame.
- Compose the person in the center with the celebration scene filling the full portrait canvas.

${sceneLine}
Output a new edited portrait image — do not return the original unchanged.

${imageBrandRules()}`;
}

export function extractImageBase64FromResponse(response: {
  candidates?: Array<{
    content?: { parts?: Array<{ inlineData?: { data?: string } }> };
  }>;
}): string | null {
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts?.length) return null;

  let lastImage: string | null = null;
  for (const part of parts) {
    if (part.inlineData?.data) {
      lastImage = part.inlineData.data;
    }
  }
  return lastImage;
}

export function isSameImageBase64(a: string, b: string): boolean {
  if (a === b) return true;
  try {
    const bufA = Buffer.from(a, 'base64');
    const bufB = Buffer.from(b, 'base64');
    return bufA.length === bufB.length && bufA.equals(bufB);
  } catch {
    return false;
  }
}

export async function generateTransformedImage(
  imageBase64: string,
  prompt: string,
  background: string,
  mimeType: string = 'image/jpeg'
): Promise<string | null> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = getGeminiImageModel();
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model,
    contents: [
      { text: buildImageEditPrompt(prompt, background) },
      {
        inlineData: {
          mimeType,
          data: imageBase64,
        },
      },
    ],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
      systemInstruction: getSafetySystemInstruction(),
    },
  });

  const generated = extractImageBase64FromResponse(response);
  if (!generated) {
    return null;
  }

  if (isSameImageBase64(generated, imageBase64)) {
    console.warn('⚠️ [GEMINI] Model returned image identical to input');
    return null;
  }

  return generated;
}
