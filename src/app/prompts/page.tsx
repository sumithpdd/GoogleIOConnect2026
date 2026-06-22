'use client';

import { useRouter } from 'next/navigation';
import { usePhotoBoothStore } from '@/store/photo-booth';
import { prompts, CITY_CATEGORIES, getPromptsByCategory, PROMPT_GUARDRAILS } from '@/data/prompts';
import { sanitizePrompt } from '@/lib/prompt-sanitizer';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { HeadingMotion, PageMotion } from '@/components/io-connect/PageMotion';
import { IconArrowRight, IconSparkles } from '@/components/icons/BoothIcons';
import { useEffect, useState } from 'react';

const SUGGESTION_PROMPTS = [
  {
    label: 'Portal moment',
    text: 'Stepping through giant Google gradient code braces with Brandenburg Gate behind — face lit by portal glow, welcoming arrival at I/O Connect Berlin',
  },
  {
    label: 'Bear hug',
    text: 'High-fiving a colorful United Buddy Bear on a sunny Berlin street — laughing, face beaming, community party energy',
  },
  {
    label: 'Gemini orbit',
    text: 'Gemini sparkle stars orbiting my head like satellites — face sharp, inspired expression, yellow AI halo on black',
  },
  {
    label: 'Keynote stage',
    text: 'Mid-gesture on I/O Connect Berlin main stage — spotlight on my face, confident speaker energy, GDG London audience bokeh',
  },
  {
    label: 'Mural cameo',
    text: 'My photoreal face at center of East Side Gallery street art — brush strokes around shoulders, reaching toward the mural',
  },
  {
    label: 'Code storm',
    text: 'Gradient code and braces swirling around me — calm focused face at the eye of the storm, developer power portrait',
  },
];

function promptPreviewText(fullPrompt: string): string {
  const idx = fullPrompt.indexOf(PROMPT_GUARDRAILS);
  const trimmed = idx >= 0 ? fullPrompt.slice(0, idx).trim() : fullPrompt.trim();
  if (!trimmed) return fullPrompt.slice(0, 160);
  return trimmed.length > 160 ? `${trimmed.slice(0, 157)}…` : trimmed;
}

export default function PromptsPage() {
  const router = useRouter();
  const session = usePhotoBoothStore((state) => state.session);
  const capturedPhoto = usePhotoBoothStore((state) => state.capturedPhoto);
  const selectedBackground = usePhotoBoothStore((state) => state.selectedBackground);
  const selectedPrompt = usePhotoBoothStore((state) => state.selectedPrompt);
  const setSelectedPrompt = usePhotoBoothStore((state) => state.setSelectedPrompt);

  const [selectedCategory, setSelectedCategory] = useState<string>('innovation');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [promptError, setPromptError] = useState<string>('');
  const categoryPrompts = getPromptsByCategory(selectedCategory as 'innovation');

  const hasCustom = customPrompt.trim().length > 0;
  const canContinue = hasCustom || selectedPrompt;

  useEffect(() => {
    if (!session || !capturedPhoto || !selectedBackground) {
      router.push('/input');
    }
  }, [session, capturedPhoto, selectedBackground, router]);

  const handleSelect = (prompt: (typeof prompts)[0]) => {
    setSelectedPrompt(prompt);
    setCustomPrompt('');
    setPromptError('');
  };

  const validateAndContinue = () => {
    if (hasCustom) {
      const result = sanitizePrompt(customPrompt, selectedBackground?.name);
      if (!result.isValid) {
        setPromptError(result.reason || 'Invalid prompt');
        return;
      }
      const sanitized = result.sanitizedPrompt || customPrompt;
      setSelectedPrompt({
        id: 'custom',
        title: 'Custom Prompt',
        description: customPrompt.substring(0, 50) + '...',
        fullPrompt: sanitized,
        category: 'custom',
        emoji: '✨',
      });
      router.push('/processing');
    } else if (selectedPrompt) {
      router.push('/processing');
    }
  };

  if (!session || !capturedPhoto || !selectedBackground) return null;

  const selectionLabel = hasCustom
    ? 'Custom prompt'
    : selectedPrompt?.title ?? 'None selected';

  return (
    <WizardLayout step={4} totalSteps={5} backHref="/backgrounds" title="Choose Magic" wide>
      <PageMotion className="w-full space-y-6" stagger>
        <HeadingMotion
          title="Choose Your Magic ✨"
          subtitle="Berlin or I/O Connect magic — pick a preset or describe your vision"
        />
        {selectedBackground && (
          <p className="text-sm text-io-subtle text-center animate-fade-in">
            Scene:{' '}
            <span className="font-medium text-io-muted">{selectedBackground.name}</span>
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          {CITY_CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedCategory(id)}
              className={`wizard-category-pill ${
                selectedCategory === id ? 'wizard-category-pill--active' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 io-stagger-block">
          <div className="wizard-card wizard-card--gradient">
            <div className="wizard-card__inner space-y-3">
              <h3 className="io-card-heading text-left">Preset magic</h3>
              <p className="io-card-subheading text-left mt-0">
                Tap a card to apply Gemini transforms
              </p>
              <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1 io-stagger-grid">
                {categoryPrompts.map((prompt) => {
                  const isSelected = selectedPrompt?.id === prompt.id && !hasCustom;
                  return (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => handleSelect(prompt)}
                      className={`wizard-prompt-card ${
                        isSelected ? 'wizard-prompt-card--selected' : ''
                      }`}
                    >
                      <div
                        className={`io-gradient-rim ${
                          isSelected ? 'io-gradient-rim--active' : ''
                        }`}
                      >
                        <div className="io-gradient-rim__inner">
                          <div className="io-gradient-rim__body">
                            <div className="wizard-prompt-card__header">
                              {prompt.emoji && (
                                <span className="wizard-prompt-card__emoji">{prompt.emoji}</span>
                              )}
                              <span className="wizard-prompt-card__title">{prompt.title}</span>
                            </div>
                            <p className="wizard-prompt-card__desc">{prompt.description}</p>
                            <div className="io-inset-panel">
                              <span className="io-inset-panel__label">Gemini direction</span>
                              <p className="io-inset-panel__text">
                                {promptPreviewText(prompt.fullPrompt)}
                              </p>
                            </div>
                            <span
                              className={`io-btn-white io-btn-white--sm ${
                                isSelected ? '' : 'io-btn-white--muted'
                              }`}
                            >
                              {isSelected ? 'Selected ✓' : 'Use this magic'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="wizard-card wizard-card--gradient">
            <div className="wizard-card__inner space-y-3">
              <h3 className="io-card-heading text-left">Or create your own</h3>
              <p className="io-card-subheading text-left mt-0">
                Start from a suggestion or write freely
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTION_PROMPTS.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => {
                      setCustomPrompt(suggestion.text);
                      setPromptError('');
                    }}
                    className="io-chip"
                  >
                    <span className="io-chip__title">{suggestion.label}</span>
                  </button>
                ))}
              </div>
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
                  }}
                  placeholder="Describe your vision…"
                  maxLength={2000}
                  className="io-textarea-inset"
                />
              </div>
              {promptError && (
                <p className="text-red-400 text-sm" role="alert">
                  {promptError}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="io-gradient-rim io-gradient-rim--active max-w-md w-full animate-bounce-in">
            <div className="io-gradient-rim__inner io-gradient-rim__body">
              <span className="io-inset-panel__label">Selected magic</span>
              <p className="io-card-heading flex items-center justify-center gap-2">
                <IconSparkles size={18} className="text-google-yellow shrink-0" />
                {selectionLabel}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={validateAndContinue}
            disabled={!canContinue}
            className="io-btn-white min-w-[240px] inline-flex items-center justify-center gap-2"
          >
            Create Magic
            <IconArrowRight size={20} />
          </button>
        </div>
      </PageMotion>
    </WizardLayout>
  );
}
