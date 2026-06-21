'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { IoConnectLogo } from './IoConnectLogo';
import { GdgLondonBrand } from './GdgLondonBrand';
import { LandingDecorations } from './LandingDecorations';

interface WizardLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  backHref?: string;
  title?: string;
  wide?: boolean;
  /** Wider column for form-heavy steps (between default and wide). */
  formWide?: boolean;
  hideProgress?: boolean;
}

export function WizardLayout({
  children,
  step,
  totalSteps,
  backHref = '/',
  title,
  wide = false,
  formWide = false,
  hideProgress = false,
}: WizardLayoutProps) {
  const progress = hideProgress ? 0 : Math.round((step / totalSteps) * 100);
  const innerClass = wide
    ? 'wizard-inner wizard-inner--wide'
    : formWide
      ? 'wizard-inner wizard-inner--form'
      : 'wizard-inner';

  return (
    <div className="wizard-shell min-h-screen flex flex-col">
      <LandingDecorations />

      <header className="wizard-header relative z-20 shrink-0">
        <div className={`${innerClass} space-y-5`}>
          <div className="flex items-center justify-between gap-4">
            <IoConnectLogo size="md" />
            <Link href={backHref} className="wizard-back-btn shrink-0" aria-label="Go back">
              ←
            </Link>
          </div>
          <div>
            <p className="text-sm font-medium text-white/60 mb-3">
              {hideProgress ? title : `Step ${step} of ${totalSteps}`}
            </p>
            {!hideProgress && (
              <>
                <div className="flex items-center justify-between text-xs font-medium text-white/45 mb-2">
                  <span>{title ?? `Step ${step}`}</span>
                  <span>{progress}%</span>
                </div>
                <div className="wizard-progress-track">
                  <div className="wizard-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 md:py-8">
        <div className={`${innerClass} w-full flex flex-col items-center`}>{children}</div>
      </main>

      <footer className="wizard-footer relative z-20 shrink-0">
        <div className={`${innerClass} flex justify-center`}>
          <GdgLondonBrand />
        </div>
      </footer>
    </div>
  );
}
