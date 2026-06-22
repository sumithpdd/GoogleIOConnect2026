import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';
import { resolveAppConfig } from '@/lib/core/app-config';
import { requireApiAuth } from '@/lib/core/api-auth';
import { sanitizePrompt } from '@/lib/prompt-sanitizer';
import {
  generateTransformedImage,
  getGeminiImageModel,
} from '@/lib/gemini-image';
import { normalizeImageForPrintPortrait, preparePortraitInputForGeneration } from '@/lib/print-portrait';
import { devLog, devWarn, publicErrorMessage } from '@/lib/safe-log';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function mimeTypeFromDataUrl(photo: string): string {
  const match = photo.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
  return match?.[1] ?? 'image/jpeg';
}

/**
 * Process image with Gemini native image generation (@google/genai).
 * @see https://ai.google.dev/gemini-api/docs/image-generation
 */
interface ProcessingContext {
  watermarkText: string;
  eventTagline: string;
  logoPath: string;
}

async function processWithGemini(
  imageBase64: string,
  prompt: string,
  background: string,
  mimeType: string,
  ctx: ProcessingContext
): Promise<string> {
  try {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.warn('⚠️ Gemini API key not configured, using fallback enhancement');
      return enhanceImageWithSharp(
        imageBase64,
        prompt,
        background,
        ctx.watermarkText,
        ctx.eventTagline
      );
    }

    const model = getGeminiImageModel();
    devLog('[GEMINI] Calling native image generation', { model });

    const base64Data = await generateTransformedImage(
      imageBase64,
      prompt,
      background,
      mimeType
    );

    if (!base64Data) {
      devWarn('[GEMINI] No image in response — falling back to Sharp');
      return enhanceImageWithSharp(
        imageBase64,
        prompt,
        background,
        ctx.watermarkText,
        ctx.eventTagline
      );
    }

    devLog('[GEMINI] Successfully generated image');
    return base64Data;
  } catch (error) {
    devWarn('[GEMINI] Error — falling back to Sharp', publicErrorMessage(error, 'generation failed'));
    return enhanceImageWithSharp(
      imageBase64,
      prompt,
      background,
      ctx.watermarkText,
      ctx.eventTagline
    );
  }
}

/**
 * Fallback: Apply theme-based image transformation with Sharp
 */
async function enhanceImageWithSharp(
  imageBase64: string,
  prompt: string,
  background: string,
  watermarkText: string,
  eventTagline: string
): Promise<string> {
  try {
    devLog('[SHARP] Starting fallback enhancement');

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 800;
    devLog('[SHARP] Image dimensions', { width, height });

    // Apply theme-based effects with stronger transformations
    let enhanced = sharp(imageBuffer);
    const promptLower = prompt.toLowerCase();
    const bgLower = background.toLowerCase();

    // Heritage theme: Vintage/sepia effect
    if (promptLower.includes('heritage') || promptLower.includes('vintage') || promptLower.includes('history') || bgLower.includes('heritage')) {
      devLog('[SHARP] Applying HERITAGE effect');
      enhanced = enhanced
        .modulate({ brightness: 1.15, saturation: 0.4, hue: 20 })
        .blur(0.4)
        .sharpen();
    }
    // Innovation theme: High saturation/vibrant effect
    else if (promptLower.includes('innovation') || promptLower.includes('future') || promptLower.includes('tech') || bgLower.includes('innovation')) {
      devLog('[SHARP] Applying INNOVATION effect');
      enhanced = enhanced
        .modulate({ brightness: 1.1, saturation: 1.5 })
        .sharpen({ sigma: 2 });
    }
    // Celebration theme: Bright and very colorful
    else if (promptLower.includes('celebrat') || promptLower.includes('joyful') || promptLower.includes('years') || bgLower.includes('celebration')) {
      devLog('[SHARP] Applying CELEBRATION effect');
      enhanced = enhanced
        .modulate({ brightness: 1.2, saturation: 1.5 })
        .sharpen({ sigma: 1.5 });
    }
    // Default: Balanced enhancement
    else {
      devLog('[SHARP] Applying DEFAULT enhancement');
      enhanced = enhanced.modulate({
        brightness: 1.1,
        saturation: 1.2,
      }).sharpen();
    }

    // Create text banner
    const promptText = prompt.substring(0, 60);
    const textBanner = await sharp({
      create: {
        width: width,
        height: 140,
        channels: 3,
        background: { r: 0, g: 0, b: 0 },
      },
    })
      .composite([
        {
          input: Buffer.from(`
            <svg width="${width}" height="140" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:rgba(0,0,0,0.8);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:rgba(0,0,0,0.4);stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="${width}" height="140" fill="url(#bgGrad)"/>
              <text x="30" y="60" font-family="Arial,sans-serif" font-size="36" font-weight="bold" fill="white">${watermarkText}</text>
              <text x="30" y="90" font-family="Arial,sans-serif" font-size="14" fill="#C0C0C0">${promptText}</text>
              <text x="30" y="120" font-family="Arial,sans-serif" font-size="12" fill="#A0A0A0">${eventTagline}</text>
            </svg>
          `),
          top: height - 140,
          left: 0,
        },
      ])
      .png()
      .toBuffer();

    // Composite image with banner
    const result = await enhanced
      .composite([
        {
          input: textBanner,
          top: height - 140,
          left: 0,
        },
      ])
      .jpeg({ quality: 95 })
      .toBuffer();

    devLog('[SHARP] Enhancement complete');
    const base64Result = result.toString('base64');

    return base64Result;
  } catch (error) {
    devWarn('[SHARP] Enhancement error', publicErrorMessage(error, 'sharp failed'));
    throw error;
  }
}

/**
 * Add GDG London · Berlin 2026 sticker watermark — top-right corner.
 */
async function addLogoToImage(
  imageBuffer: Buffer,
  logoPath: string
): Promise<Buffer> {
  try {
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 1800;

    const resolvedLogo = path.join(
      process.cwd(),
      'public',
      logoPath.replace(/^\//, '')
    );
    const maxLogoWidth = Math.round(width * 0.26);
    const maxLogoHeight = Math.round(height * 0.12);
    const padding = Math.round(width * 0.035);

    const logo = await sharp(resolvedLogo)
      .resize(maxLogoWidth, maxLogoHeight, { fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer();

    const logoMeta = await sharp(logo).metadata();
    const logoW = logoMeta.width ?? maxLogoWidth;
    const logoH = logoMeta.height ?? maxLogoHeight;
    const left = width - logoW - padding;
    const top = padding;

    return await sharp(imageBuffer)
      .composite([
        {
          input: logo,
          top: Math.max(padding, top),
          left: Math.max(padding, left),
        },
      ])
      .jpeg({ quality: 95 })
      .toBuffer();
  } catch (error) {
    devWarn('[API] Failed to add logo', publicErrorMessage(error, 'logo overlay failed'));
    return imageBuffer;
  }
}

export async function POST(request: NextRequest) {
  const auth = requireApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    devLog('[API] /api/composit-image called');

    const appConfig = resolveAppConfig();
    const branding = appConfig.branding;
    const ctx: ProcessingContext = {
      watermarkText: branding.watermarkText,
      eventTagline: `${branding.eventSubtitle}${branding.eventDate ? ` • ${branding.eventDate}` : ''}`,
      logoPath: branding.logoPath,
    };

    const body = await request.json();
    const { photo, backgroundDescription, prompt } = body;

    devLog('[API] Request received', {
      hasPhoto: Boolean(photo),
      hasPrompt: Boolean(prompt),
      hasBackground: Boolean(backgroundDescription),
    });

    if (!photo || !prompt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: photo and prompt' },
        { status: 400 }
      );
    }

    const sanitizationResult = sanitizePrompt(prompt, backgroundDescription);
    if (!sanitizationResult.isValid) {
      devWarn('[API] Prompt validation failed', sanitizationResult.reason);
      return NextResponse.json(
        { success: false, error: `Prompt validation failed: ${sanitizationResult.reason}` },
        { status: 400 }
      );
    }
    const finalPrompt = sanitizationResult.sanitizedPrompt || prompt;

    const mimeType = mimeTypeFromDataUrl(photo);
    const photoBase64 =
      photo.includes(',') && photo.startsWith('data:image')
        ? photo.split(',')[1]
        : photo;

    const portraitInputBase64 = await preparePortraitInputForGeneration(photoBase64);

    devLog('[API] Processing with Gemini');
    const compositedBase64 = await processWithGemini(
      portraitInputBase64,
      finalPrompt,
      backgroundDescription ?? '',
      'image/jpeg',
      ctx
    );

    const imageBuffer = Buffer.from(compositedBase64, 'base64');
    const imageWithLogo = await addLogoToImage(imageBuffer, ctx.logoPath);
    devLog('[API] Normalizing for portrait print');
    const printReady = await normalizeImageForPrintPortrait(imageWithLogo);
    const finalBase64WithLogo = printReady.toString('base64');

    // Ensure base64 is properly formatted
    const finalBase64 = finalBase64WithLogo.includes('data:')
      ? finalBase64WithLogo
      : `data:image/jpeg;base64,${finalBase64WithLogo}`;

    devLog('[API] Processing complete');

    return NextResponse.json({
      success: true,
      data: {
        compositedPhoto: finalBase64,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    devWarn('[API] composit-image failed', publicErrorMessage(error, 'unknown error'));
    return NextResponse.json(
      {
        success: false,
        error: `Failed to process image: ${publicErrorMessage(error, 'Processing failed')}`,
      },
      { status: 500 }
    );
  }
}
