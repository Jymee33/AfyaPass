'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { IcQr, IcShieldCheck, IcStethoscope } from '@/components/icons';

interface QrCardPreviewProps {
  patientName?: string;
  afyaPassId?: string;
  patientId?: string;
  county?: string;
  facilityName?: string;
  issueDate?: string;
  expiryDate?: string;
  status?: 'active' | 'revoked' | 'expired';
  variant?: 'default' | 'hero';
  className?: string;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  return name
    .replace(/\(.*\)/, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

/** Deterministic QR-style grid from patient ID (visual only, not scannable). */
function QrCodeVisual({ value, className }: { value: string; className?: string }) {
  const modules = 21;
  const cells = useMemo(() => {
    const h = hashString(value);
    const grid: boolean[][] = [];
    for (let r = 0; r < modules; r++) {
      grid[r] = [];
      for (let c = 0; c < modules; c++) {
        const inTopLeft = r < 7 && c < 7;
        const inTopRight = r < 7 && c >= modules - 7;
        const inBottomLeft = r >= modules - 7 && c < 7;

        if (inTopLeft || inTopRight || inBottomLeft) {
          const lr = inTopRight ? r : r >= modules - 7 ? r - (modules - 7) : r;
          const lc = inTopRight ? c - (modules - 7) : inBottomLeft ? c : c;
          const outer = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const inner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          grid[r][c] = outer || inner;
        } else {
          const bit = (h >> ((r * modules + c) % 30)) & 1;
          const timing = r === 6 || c === 6;
          grid[r][c] = timing ? bit === 1 : ((h + r * 17 + c * 31) % 3) !== 0;
        }
      }
    }
    return grid;
  }, [value]);

  const cellSize = 100 / modules;

  return (
    <svg viewBox="0 0 100 100" className={cn('w-full h-full', className)} aria-hidden="true">
      <rect width="100" height="100" fill="white" rx="4" />
      {cells.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize + 0.2}
              y={r * cellSize + 0.2}
              width={cellSize - 0.4}
              height={cellSize - 0.4}
              fill="#0F172A"
              rx={0.3}
            />
          ) : null
        )
      )}
    </svg>
  );
}

function ChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 28" className={className} aria-hidden="true">
      <rect x="1" y="1" width="34" height="26" rx="4" fill="url(#chipGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <line x1="12" y1="1" x2="12" y2="27" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      <line x1="24" y1="1" x2="24" y2="27" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      <line x1="1" y1="9" x2="35" y2="9" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      <line x1="1" y1="19" x2="35" y2="19" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
    </svg>
  );
}

const statusStyles = {
  active: 'bg-emerald-400/20 text-emerald-100 border-emerald-400/30',
  revoked: 'bg-red-400/20 text-red-100 border-red-400/30',
  expired: 'bg-amber-400/20 text-amber-100 border-amber-400/30',
};

export function QrCardPreview({
  patientName = 'Demo Patient',
  afyaPassId,
  patientId = 'AFY-KE-MUR-2026-98421',
  county = "Murang'a County",
  facilityName,
  issueDate = '2026-08-25',
  expiryDate = '2031-08-25',
  status = 'active',
  variant = 'default',
  className,
}: QrCardPreviewProps) {
  const displayId = afyaPassId || patientId;
  const initials = getInitials(patientName);

  const card = (
    <div
      className={cn(
        'relative w-full max-w-[400px] aspect-[1.586/1] rounded-[20px] overflow-hidden',
        'shadow-[0_20px_60px_-12px_rgba(37,99,235,0.35),0_8px_24px_-8px_rgba(15,23,42,0.2)]',
        variant === 'hero' && 'lg:rotate-2 hover:rotate-0 transition-transform duration-500',
        className
      )}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-medic-600 via-medic-500 to-afya-500" />

      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-afya-400/20 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Card content */}
      <div className="relative h-full flex flex-col p-5 text-white">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
              <IcStethoscope className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-base leading-tight tracking-tight">AfyaPass</p>
              <p className="text-[10px] text-white/70 font-medium truncate">Digital Health ID</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                'text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border',
                statusStyles[status]
              )}
            >
              {status}
            </span>
            <ChipIcon className="w-9 h-7 opacity-90" />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex gap-4 min-h-0">
          <div className="flex-1 flex flex-col justify-center min-w-0 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center font-display font-bold text-sm shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">Patient</p>
                <p className="font-display font-bold text-sm leading-tight truncate">{patientName}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60 font-semibold mb-0.5">AfyaPass ID</p>
              <p className="font-mono text-xs font-bold tracking-wide text-white/95 break-all leading-snug">
                {displayId}
              </p>
            </div>

            <div className="flex gap-4 text-[10px]">
              <div>
                <p className="text-white/50 uppercase tracking-wider font-semibold">Issued</p>
                <p className="font-medium text-white/90">{issueDate}</p>
              </div>
              <div>
                <p className="text-white/50 uppercase tracking-wider font-semibold">Expires</p>
                <p className="font-medium text-white/90">{expiryDate}</p>
              </div>
            </div>

            {(county || facilityName) && (
              <p className="text-[10px] text-white/60 truncate">
                {facilityName ? `${facilityName} · ` : ''}{county}
              </p>
            )}
          </div>

          {/* QR panel */}
          <div className="shrink-0 flex flex-col items-center justify-center">
            <div className="bg-white rounded-xl p-2 shadow-lg w-[88px] h-[88px]">
              <QrCodeVisual value={displayId} />
            </div>
            <div className="flex items-center gap-1 mt-1.5 text-[9px] text-white/60 font-medium">
              <IcQr className="h-3 w-3" />
              <span>Scan to verify</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/15 text-[10px]">
          <div className="flex items-center gap-1.5 text-white/70">
            <IcShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span>Opaque ref only · No PHI in QR</span>
          </div>
          <span className="font-mono text-white/40">v1.0</span>
        </div>
      </div>
    </div>
  );

  if (variant === 'hero') {
    return (
      <div className="relative mx-auto">
        <div className="absolute inset-4 bg-medic-500/20 rounded-[24px] blur-2xl scale-95" />
        {card}
      </div>
    );
  }

  return card;
}
