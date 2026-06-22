'use client';

import { useAppConfig } from '@/components/providers/app-config-provider';

/** Configurable page backdrop texture for secondary pages (admin, summary, privacy). */
export function BoothBackdrop() {
  const { branding } = useAppConfig();

  return (
    <div className="booth-backdrop" aria-hidden>
      <div
        className="booth-backdrop__texture"
        style={{ backgroundImage: `url('${branding.backdropPath}')` }}
      />
      <div className="booth-backdrop__vignette" />
    </div>
  );
}
