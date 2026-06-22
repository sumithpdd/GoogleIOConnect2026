import { GoogleGenAI, Modality } from '@google/genai';
import { IO_CONNECT_IMAGE_RULES } from '@/lib/io-connect-brand';

/** GA image model; override with GEMINI_IMAGE_MODEL (e.g. gemini-3.1-flash-image). */
export const DEFAULT_GEMINI_IMAGE_MODEL = 'gemini-2.5-flash-image';

const safetyBase = `Output must be appropriate for all ages: no violence, explicit content, or disturbing imagery.
People must remain fully clothed. Keep faces recognizable.`;

function getSafetySystemInstruction(): string {
  return `You edit photos for the Google I/O Connect Berlin 2026 developer photo booth — presented by GDG London.
${safetyBase}
Always remove the subject's original background and integrate the person into the requested scene as one seamless portrait — never return a collage with the raw input photo pasted on top.
${IO_CONNECT_IMAGE_RULES}`;
}

export function getGeminiImageModel(): string {
  return process.env.GEMINI_IMAGE_MODEL?.trim() || DEFAULT_GEMINI_IMAGE_MODEL;
}

function buildImageEditPrompt(prompt: string, background: string): string {
  const theme = background?.trim()
    ? ` Scene / background direction: ${background}.`
    : '';

  return `Using the provided portrait photo, apply this edit: ${prompt}${theme}

Make the transformation clearly visible (environment, lighting, style, or effects as described).
Preserve the person's face and identity so they remain recognizable. Keep the full head and shoulders visible — do not crop the top of the head.

CRITICAL — subject integration (single unified photo, NOT a collage):
- Remove the entire original background from the input (room, wall, bed, furniture, ceiling, indoor clutter).
- Extract only the person and blend them seamlessly into the generated scene with matching lighting, shadows, color grade, and perspective.
- Do NOT paste the raw input photo as a separate rectangle, strip, or panel (especially not at the bottom of the frame).
- Do NOT leave any part of the webcam/indoor background visible around the person.
- Output one photorealistic portrait where the person clearly belongs in the new environment.

CRITICAL — output format:
- Vertical PORTRAIT only (taller than wide), aspect ratio 2:3 (100×148 mm postcard).
- Do not add logos, stickers, watermarks, or text overlays — branding is applied after generation.

Scenes must feel like Google I/O Connect Berlin 2026 — developer conference in Berlin with Google gradient accents.
Prefer Berlin landmarks, Hello Berlin art, and official I/O Connect Berlin visuals. Do not add new logos or text overlays to the scene.

${IO_CONNECT_IMAGE_RULES}`;
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
