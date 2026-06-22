'use client';

import { useCallback, useRef, useState } from 'react';
import { useTheme } from '@/components/providers/theme-provider';

/**
 * Pull-string light bulb — tug to switch between light and dark booth themes.
 */
export function ThemePullSwitch() {
  const { theme, toggleTheme } = useTheme();
  const [pulling, setPulling] = useState(false);
  const busyRef = useRef(false);

  const pull = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    setPulling(true);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const delay = prefersReduced ? 0 : 320;
    window.setTimeout(() => {
      toggleTheme();
      setPulling(false);
      busyRef.current = false;
    }, delay);
  }, [toggleTheme]);

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <div className="theme-pull-switch" data-pulling={pulling || undefined}>
      <div className="theme-pull-switch__mount" aria-hidden />

      <button
        type="button"
        className="theme-pull-switch__control"
        onClick={pull}
        aria-label={label}
        aria-pressed={isDark}
        title={label}
      >
        <span className="theme-pull-switch__cord" aria-hidden />
        <span
          className={`theme-pull-switch__bulb ${isDark ? 'theme-pull-switch__bulb--on' : ''}`}
          aria-hidden
        >
          <svg viewBox="0 0 48 72" className="theme-pull-switch__bulb-svg" focusable="false">
            <defs>
              <radialGradient id="bulb-glow" cx="50%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fbbc04" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#f29900" stopOpacity="0.2" />
              </radialGradient>
              <filter id="bulb-blur" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse
              className="theme-pull-switch__bulb-halo"
              cx="24"
              cy="28"
              rx="20"
              ry="22"
              fill="url(#bulb-glow)"
            />
            <path
              className="theme-pull-switch__bulb-glass"
              d="M24 6c-9.5 0-17 7.2-17 16.2 0 5.8 2.8 10.8 7 13.8v6.5c0 1.2 1 2.2 2.2 2.2h15.6c1.2 0 2.2-1 2.2-2.2v-6.5c4.2-3 7-8 7-13.8C34 13.2 26.5 6 24 6z"
            />
            <path
              className="theme-pull-switch__bulb-filament"
              d="M20 22c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.5-1.5 4.5-3 6.5"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <rect className="theme-pull-switch__bulb-base" x="14" y="48" width="20" height="8" rx="2" />
            <rect className="theme-pull-switch__bulb-screw" x="16" y="56" width="16" height="6" rx="1.5" />
            <line
              className="theme-pull-switch__bulb-string"
              x1="24"
              y1="62"
              x2="24"
              y2="72"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="theme-pull-switch__tassel" aria-hidden>
          Pull
        </span>
      </button>
    </div>
  );
}
