'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IO_CONNECT_ASSETS } from '@/lib/io-connect-brand';

interface GdgLondonBrandProps {
  variant?: 'footer' | 'inline';
  showLink?: boolean;
}

/** GDG London logo + attribution — shared across landing and wizard screens. */
export function GdgLondonBrand({
  variant = 'footer',
  showLink = true,
}: GdgLondonBrandProps) {
  const content = (
    <span
      className={`inline-flex items-center gap-3 ${
        variant === 'footer' ? 'flex-col sm:flex-row' : ''
      }`}
    >
      <Image
        src={IO_CONNECT_ASSETS.gdgLondonLogo}
        alt="GDG London Berlin 2026"
        width={variant === 'footer' ? 160 : 120}
        height={variant === 'footer' ? 200 : 150}
        className={
          variant === 'footer'
            ? 'h-24 sm:h-28 w-auto object-contain'
            : 'h-20 w-auto object-contain'
        }
      />
      <span
        className={
          variant === 'footer'
            ? 'text-base sm:text-lg text-white/55'
            : 'text-sm text-white/50'
        }
      >
        Made with ❤️ by <strong className="text-white/80 font-semibold">GDG London</strong>
      </span>
    </span>
  );

  if (!showLink) return content;

  return (
    <Link
      href="https://gdg.community.dev/gdg-london/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex hover:opacity-90 transition-opacity"
    >
      {content}
    </Link>
  );
}
