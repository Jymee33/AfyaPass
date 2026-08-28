import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const AFYA_TEAL = '#00A9A4';
export const AFYA_NAVY = '#002D4F';

const LOGO = '/images/afyapass-logo.png';

interface LogoMarkProps {
  className?: string;
  size?: number;
}

/** Icon-only crop from official PNG logo */
export function AfyaPassLogoMark({ className, size = 44 }: LogoMarkProps) {
  return (
    <div
      className={cn('relative overflow-hidden shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={LOGO}
        alt=""
        width={Math.round(size * 1.2)}
        height={Math.round(size * 3.2)}
        className="absolute left-1/2 -translate-x-1/2 top-0 h-auto max-w-none select-none"
        style={{ width: Math.round(size * 1.15) }}
        aria-hidden
        draggable={false}
      />
    </div>
  );
}

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onDark?: boolean;
}

export function AfyaPassWordmark({ className, size = 'md', onDark = false }: WordmarkProps) {
  const sizes = { sm: 'text-[17px]', md: 'text-[22px]', lg: 'text-[26px]' };
  return (
    <span className={cn('font-display font-extrabold tracking-tight leading-none', sizes[size], className)}>
      <span style={{ color: onDark ? '#5EEAD4' : AFYA_TEAL }}>Afya</span>
      <span style={{ color: onDark ? '#fff' : AFYA_NAVY }}>Pass</span>
    </span>
  );
}

interface AfyaPassLogoProps {
  variant?: 'full' | 'compact' | 'wordmark' | 'icon';
  className?: string;
  markSize?: number;
}

export function AfyaPassLogo({ variant = 'compact', className, markSize = 38 }: AfyaPassLogoProps) {
  if (variant === 'full') {
    return (
      <Image
        src={LOGO}
        alt="AfyaPass — One Patient. One Record. Any Health Center."
        width={240}
        height={280}
        className={cn('h-auto w-[180px] object-contain', className)}
        priority
      />
    );
  }

  if (variant === 'icon') {
    return <AfyaPassLogoMark size={markSize} className={className} />;
  }

  if (variant === 'wordmark') {
    return <AfyaPassWordmark className={className} />;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <AfyaPassLogoMark size={markSize} />
      <AfyaPassWordmark size="md" />
    </div>
  );
}

/** Large centred watermark on card body */
export function AfyaPassWatermark({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none select-none flex items-center justify-center', className)}>
      <AfyaPassLogoMark size={150} className="opacity-[0.22]" />
    </div>
  );
}

/** Logo inside QR code centre */
export function AfyaPassQrLogo({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded p-[2px] shadow-sm ring-1 ring-slate-100', className)}>
      <AfyaPassLogoMark size={30} />
    </div>
  );
}

export function AfyaPassEmblem({ className, variant }: { className?: string; variant?: 'full' | 'compact' }) {
  return <AfyaPassLogoMark className={className} size={variant === 'compact' ? 30 : 120} />;
}
