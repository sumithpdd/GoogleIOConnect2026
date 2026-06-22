'use client';

import Link from 'next/link';
import { useAppConfig } from '@/components/providers/app-config-provider';
import { WizardLayout } from '@/components/io-connect/WizardLayout';
import { GDPR_SECTIONS, GDPR_SUMMARY } from '@/lib/gdpr';

export default function PrivacyPage() {
  const { branding } = useAppConfig();

  return (
    <WizardLayout step={1} totalSteps={5} backHref="/input" title="Privacy & Terms" hideProgress>
      <div className="wizard-card space-y-6 w-full animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="wizard-title">Privacy & Terms</h1>
          <p className="wizard-subtitle">
            {branding.eventTitle} · {branding.eventTagline}
          </p>
        </div>

        <p className="text-io-muted leading-relaxed text-sm">{GDPR_SUMMARY}</p>

        {GDPR_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-base font-bold text-io-text mb-2">{section.title}</h2>
            <p className="text-sm text-io-muted leading-relaxed">{section.body}</p>
          </section>
        ))}

        <Link href="/input" className="wizard-primary-btn w-full text-center block">
          Back to booth
        </Link>
      </div>
    </WizardLayout>
  );
}
