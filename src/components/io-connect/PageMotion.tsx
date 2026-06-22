'use client';

import { ReactNode } from 'react';

interface PageMotionProps {
  children: ReactNode;
  className?: string;
  /** Stagger entrance for direct children (grids, lists). */
  stagger?: boolean;
}

/** Wizard page wrapper — fade/slide in with optional staggered children. */
export function PageMotion({
  children,
  className = '',
  stagger = false,
}: PageMotionProps) {
  return (
    <div
      className={`io-page-content ${stagger ? 'io-stagger-block' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
}

/** Grid/list with per-item staggered reveal. */
export function StaggerGrid({ children, className = '' }: StaggerGridProps) {
  return <div className={`io-stagger-grid ${className}`.trim()}>{children}</div>;
}

interface HeadingMotionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

/** Animated page heading block (eyebrow → title → subtitle). */
export function HeadingMotion({
  eyebrow,
  title,
  subtitle,
  className = '',
}: HeadingMotionProps) {
  return (
    <div className={`io-heading-block text-center space-y-2 ${className}`.trim()}>
      {eyebrow && <div className="io-heading-block__eyebrow">{eyebrow}</div>}
      <h2 className="wizard-title io-heading-block__title">{title}</h2>
      {subtitle && <p className="wizard-subtitle io-heading-block__subtitle">{subtitle}</p>}
    </div>
  );
}
