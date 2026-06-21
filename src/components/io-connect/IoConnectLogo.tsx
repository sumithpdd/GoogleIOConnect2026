'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IO_CONNECT_ASSETS } from '@/lib/io-connect-brand';

interface IoConnectLogoProps {
  href?: string;
  size?: 'sm' | 'md';
}

const SIZES = {
  sm: { width: 280, height: 72, className: 'h-14 w-auto max-w-[280px]' },
  md: { width: 380, height: 98, className: 'h-16 md:h-[4.75rem] w-auto max-w-[380px]' },
} as const;

/** Google I/O Connect Berlin banner — top-left header logo. */
export function IoConnectLogo({ href = '/', size = 'md' }: IoConnectLogoProps) {
  const dim = SIZES[size];

  const content = (
    <Image
      src={IO_CONNECT_ASSETS.mainLogo}
      alt="Google I/O Connect Berlin"
      width={dim.width}
      height={dim.height}
      className={`${dim.className} object-contain object-left`}
      priority
    />
  );

  return (
    <Link href={href} className="inline-flex hover:opacity-90 transition-opacity shrink-0">
      {content}
    </Link>
  );
}
