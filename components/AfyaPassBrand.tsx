import React from 'react';
import { cn } from '@/lib/utils';

interface AfyaPassEmblemProps {
  className?: string;
  variant?: 'full' | 'compact';
}

/** AfyaPass medical emblem — cross, figure, crown, stethoscope arc, supporting hand */
export function AfyaPassEmblem({ className, variant = 'full' }: AfyaPassEmblemProps) {
  if (variant === 'compact') {
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="none" stroke="url(#emblemGrad)" strokeWidth="2" opacity="0.9" />
        <path d="M24 8 L26 12 L30 12 L27 15 L28 19 L24 17 L20 19 L21 15 L18 12 L22 12 Z" fill="url(#emblemGrad)" />
        <rect x="21" y="16" width="6" height="14" rx="1" fill="url(#emblemGrad)" />
        <rect x="17" y="20" width="14" height="6" rx="1" fill="url(#emblemGrad)" />
        <circle cx="24" cy="22" r="3" fill="white" />
        <path d="M24 25 v4 M22 27 h4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 32 Q24 38 34 32" fill="none" stroke="url(#emblemGrad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="emblemGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="50%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      {/* Stethoscope arc */}
      <path
        d="M20 55 C20 30 40 18 60 18 C80 18 100 30 100 55"
        fill="none"
        stroke="url(#emblemGradFull)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="100" cy="58" r="8" fill="url(#emblemGradFull)" />
      <circle cx="100" cy="58" r="4" fill="white" opacity="0.5" />
      {/* Crown */}
      <path d="M52 22 L56 30 L60 24 L64 30 L68 22 L68 34 L52 34 Z" fill="url(#emblemGradFull)" />
      {/* Cross */}
      <rect x="52" y="36" width="16" height="36" rx="2" fill="url(#emblemGradFull)" />
      <rect x="42" y="46" width="36" height="16" rx="2" fill="url(#emblemGradFull)" />
      {/* Figure */}
      <circle cx="60" cy="50" r="5" fill="white" />
      <path d="M60 55 L55 68 L65 68 Z" fill="white" />
      <path d="M55 62 L50 72 M65 62 L70 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Supporting hand */}
      <path
        d="M35 78 Q60 92 85 78 Q75 88 60 90 Q45 88 35 78"
        fill="url(#emblemGradFull)"
        opacity="0.85"
      />
    </svg>
  );
}

interface AfyaPassWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/** "Afya" teal + "Pass" navy wordmark as on the physical card */
export function AfyaPassWordmark({ className, size = 'md' }: AfyaPassWordmarkProps) {
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' };
  return (
    <span className={cn('font-display font-extrabold tracking-tight', sizes[size], className)}>
      <span className="text-[#14B8A6]">Afya</span>
      <span className="text-[#1E3A5F]">Pass</span>
    </span>
  );
}
