import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/* Brand colours extracted from official AfyaPass logo */
export const AFYA_TEAL = '#00B5AD';
export const AFYA_NAVY = '#0D2B55';

interface LogoMarkProps {
  className?: string;
  size?: number;
}

/** Cropped emblem from the official logo artwork */
export function AfyaPassLogoMark({ className, size = 40 }: LogoMarkProps) {
  return (
    <div
      className={cn('relative overflow-hidden shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/afyapass-logo.jpg"
        alt=""
        width={size * 2.4}
        height={size * 5}
        className="absolute left-1/2 -translate-x-1/2 top-0 object-cover object-top"
        style={{ width: size * 2.4, height: size * 5 }}
        aria-hidden
      />
    </div>
  );
}

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Use on dark backgrounds */
  onDark?: boolean;
}

/** "Afya" teal + "Pass" navy — matches physical card header */
export function AfyaPassWordmark({ className, size = 'md', onDark = false }: WordmarkProps) {
  const sizes = {
    sm: 'text-base',
    md: 'text-[22px]',
    lg: 'text-[28px]',
  };
  return (
    <span className={cn('font-display font-extrabold tracking-tight leading-none', sizes[size], className)}>
      <span style={{ color: onDark ? '#5EEAD4' : AFYA_TEAL }}>Afya</span>
      <span style={{ color: onDark ? '#FFFFFF' : AFYA_NAVY }}>Pass</span>
    </span>
  );
}

interface AfyaPassLogoProps {
  variant?: 'full' | 'compact' | 'wordmark';
  className?: string;
  markSize?: number;
}

/** Navbar / sidebar logo lockup */
export function AfyaPassLogo({ variant = 'compact', className, markSize = 36 }: AfyaPassLogoProps) {
  if (variant === 'full') {
    return (
      <Image
        src="/images/afyapass-logo.jpg"
        alt="AfyaPass — One Patient. One Record. Any Health Center."
        width={220}
        height={160}
        className={cn('h-auto w-[200px] object-contain', className)}
        priority
      />
    );
  }

  if (variant === 'wordmark') {
    return <AfyaPassWordmark className={className} />;
  }

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <AfyaPassLogoMark size={markSize} />
      <AfyaPassWordmark size="md" />
    </div>
  );
}

/** Large watermark emblem for card background */
export function AfyaPassWatermark({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none select-none', className)}>
      <AfyaPassLogoMark size={140} className="opacity-[0.18]" />
    </div>
  );
}

/** Emblem for QR code centre */
export function AfyaPassQrLogo({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded-md p-0.5 shadow-sm', className)}>
      <AfyaPassLogoMark size={28} />
    </div>
  );
}

// Legacy export kept for compatibility
export function AfyaPassEmblem({ className, variant }: { className?: string; variant?: 'full' | 'compact' }) {
  return <AfyaPassLogoMark className={className} size={variant === 'compact' ? 28 : 120} />;
}
