'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { usePhotoBoothStore } from '@/store/photo-booth';
import {
  BOOTH_SCENES,
  CUSTOM_SCENE_BACKGROUND_ID,
  SCENE_FILTERS,
  filterScenes,
  resolveBoothScene,
  type BoothScene,
} from '@/data/booth-scenes';
import { getBackgroundById } from '@/data/backgrounds';
import { sanitizePrompt } from '@/lib/prompt-sanitizer';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { HeadingMotion, PageMotion, StaggerGrid } from '@/components/io-connect/PageMotion';
import { IconArrowRight, IconSparkles } from '@/components/icons/BoothIcons';

const CITY_BADGE_CLASS: Record<string, string> = {
  Berlin: 'scene-card__city--berlin',
  'I/O Connect': 'scene-card__city--connect',
};

export default function ScenesPage() {
  const router = useRouter();
  const session = usePhotoBoothStore((s) => s.session);
  const capturedPhoto = usePhotoBoothStore((s) => s.capturedPhoto);
  const selectedBackground = usePhotoBoothStore((s) => s.selectedBackground);
  const selectedPrompt = usePhotoBoothStore((s) => s.selectedPrompt);
  const setSelectedBackground = usePhotoBoothStore((s) => s.setSelectedBackground);
  const setSelectedPrompt = usePhotoBoothStore((s) => s.setSelectedPrompt);

  const [category, setCategory] = useState('all');
  const [pendingScene, setPendingScene] = useState<BoothScene | null>(() => {
    if (!selectedBackground || !selectedPrompt) return null;
    return (
      BOOTH_SCENES.find(
        (s) =>
          s.backgroundId === selectedBackground.id && s.promptId === selectedPrompt.id
      ) ?? null
    );
  });
  const [customPrompt, setCustomPrompt] = useState(
    selectedPrompt?.id === 'custom' ? selectedPrompt.fullPrompt : ''
  );
  const [showCustom, setShowCustom] = useState(selectedPrompt?.id === 'custom');
  const [promptError, setPromptError] = useState('');

  const visibleScenes = useMemo(() => filterScenes(category), [category]);

  useEffect(() => {
    if (!session || !capturedPhoto) {
      router.push('/input');
    }
  }, [session, capturedPhoto, router]);

  const hasCustom = customPrompt.trim().length > 0;
  const canContinue = hasCustom || Boolean(pendingScene);

  const handleSelectScene = (scene: BoothScene) => {
    setPendingScene(scene);
    setCustomPrompt('');
    setPromptError('');
    setShowCustom(false);
  };

  const handleContinue = () => {
    if (hasCustom) {
      const bg =
        getBackgroundById(pendingScene?.backgroundId ?? CUSTOM_SCENE_BACKGROUND_ID) ??
        getBackgroundById(CUSTOM_SCENE_BACKGROUND_ID);
      if (!bg) return;

      const result = sanitizePrompt(customPrompt, bg.name);
      if (!result.isValid) {
        setPromptError(result.reason || 'Invalid prompt');
        return;
      }

      setSelectedBackground(bg);
      setSelectedPrompt({
        id: 'custom',
        title: 'Custom magic',
        description: customPrompt.slice(0, 50) + '…',
        fullPrompt: result.sanitizedPrompt || customPrompt,
        category: 'custom',
        emoji: '✨',
      });
      router.push('/processing');
      return;
    }

    if (!pendingScene) return;
    const resolved = resolveBoothScene(pendingScene);
    if (!resolved) return;

    setSelectedBackground(resolved.background);
    setSelectedPrompt(resolved.prompt);
    router.push('/processing');
  };

  if (!session || !capturedPhoto) return null;

  const selectionLabel = hasCustom
    ? 'Custom magic'
    : pendingScene?.title ?? 'Pick a scene';

  return (
    <WizardLayout step={3} totalSteps={4} backHref="/camera" title="Scene & Magic" wide>
      <PageMotion className="w-full space-y-6" stagger>
        <HeadingMotion
          className="space-y-3 max-w-2xl mx-auto"
          eyebrow={<p className="backgrounds-page__eyebrow">Step 3 · One tap does both</p>}
          title="Pick your Berlin moment ✨"
          subtitle="Each card sets your scene and Gemini magic together — fewer steps, same amazing portraits"
        />

        <div className="flex flex-wrap justify-center gap-2.5 io-stagger-block">
          {SCENE_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={`wizard-category-pill ${
                category === id ? 'wizard-category-pill--active' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleScenes.map((scene) => {
            const resolved = resolveBoothScene(scene);
            if (!resolved) return null;
            const { background, prompt } = resolved;
            const isSelected = pendingScene?.id === scene.id && !hasCustom;
            const cityClass = background.city ? CITY_BADGE_CLASS[background.city] : '';

            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleSelectScene(scene)}
                className={`scene-card scene-card--background scene-card--io ${
                  isSelected ? 'scene-card--selected' : ''
                }`}
              >
                <div
                  className={`io-gradient-rim ${isSelected ? 'io-gradient-rim--active' : ''}`}
                >
                  <div className="io-gradient-rim__inner">
                    <div className="scene-card__image scene-card__image--tall">
                      <div
                        className={`scene-card__preview-bg ${background.previewClass ?? ''}`}
                        style={{ backgroundImage: `url(${background.imageUrl})` }}
                        aria-hidden
                      />
                      <div className="scene-card__preview-overlay" aria-hidden />
                      {background.city && (
                        <span className={`scene-card__city ${cityClass}`}>{background.city}</span>
                      )}
                      {scene.featured && (
                        <span className="scene-card__badge">Popular</span>
                      )}
                    </div>
                    <div className="io-gradient-rim__body scene-card__body">
                      <h3 className="io-card-heading flex items-center justify-center gap-2">
                        <span aria-hidden>{scene.emoji}</span>
                        {scene.title}
                      </h3>
                      <p className="io-card-subheading">{scene.description}</p>
                      <div className="io-inset-panel">
                        <span className="io-inset-panel__label">Gemini magic</span>
                        <p className="io-inset-panel__text">
                          {prompt.emoji} {prompt.title}
                        </p>
                      </div>
                      <span
                        className={`io-btn-white io-btn-white--sm ${
                          isSelected ? '' : 'io-btn-white--muted'
                        }`}
                      >
                        {isSelected ? 'Selected ✓' : 'Use this scene'}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </StaggerGrid>

        <div className="wizard-card wizard-card--gradient max-w-2xl mx-auto">
          <div className="wizard-card__inner space-y-3">
            <button
              type="button"
              onClick={() => setShowCustom((v) => !v)}
              className="w-full flex items-center justify-between gap-2 text-left"
            >
              <span className="io-card-heading text-base">Or write your own magic</span>
              <span className="text-io-subtle text-sm">{showCustom ? 'Hide' : 'Show'}</span>
            </button>
            {showCustom && (
              <>
                <p className="io-card-subheading text-left mt-0">
                  Optional — uses the gradient studio scene if you skip a preset card
                </p>
                <div className="io-inset-panel mb-0">
                  <label className="io-inset-panel__label" htmlFor="custom-prompt">
                    Your prompt
                  </label>
                  <textarea
                    id="custom-prompt"
                    value={customPrompt}
                    onChange={(e) => {
                      setCustomPrompt(e.target.value);
                      setPromptError('');
                      if (e.target.value.trim()) setPendingScene(null);
                    }}
                    placeholder="Describe your vision…"
                    maxLength={2000}
                    className="io-textarea-inset"
                    rows={4}
                  />
                </div>
                {promptError && (
                  <p className="text-red-400 text-sm" role="alert">
                    {promptError}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pb-2">
          <div className="io-gradient-rim io-gradient-rim--active max-w-md w-full animate-bounce-in">
            <div className="io-gradient-rim__inner io-gradient-rim__body">
              <span className="io-inset-panel__label">Ready to create</span>
              <p className="io-card-heading flex items-center justify-center gap-2">
                <IconSparkles size={18} className="text-google-yellow shrink-0" />
                {selectionLabel}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="io-btn-white min-w-[260px] inline-flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Create Magic
            <IconArrowRight size={20} />
          </button>
        </div>
      </PageMotion>
    </WizardLayout>
  );
}
