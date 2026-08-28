'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AfyaPassEmblem, AfyaPassWordmark } from '@/components/AfyaPassBrand';
import { IcPhone, IcMail } from '@/components/icons';

export interface QrCardPreviewProps {
  patientName?: string;
  afyaPassId?: string;
  patientId?: string;
  county?: string;
  facilityName?: string;
  issueDate?: string;
  expiryDate?: string;
  status?: 'active' | 'revoked' | 'expired';
  variant?: 'default' | 'hero';
  showBack?: boolean;
  flipable?: boolean;
  patientPhotoUrl?: string;
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
    email: string;
  };
  signature?: string;
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

function QrCodeWithLogo({ value, className }: { value: string; className?: string }) {
  const modules = 25;
  const cells = useMemo(() => {
    const h = hashString(value);
    const grid: boolean[][] = [];
    const centerStart = 9;
    const centerEnd = 16;

    for (let r = 0; r < modules; r++) {
      grid[r] = [];
      for (let c = 0; c < modules; c++) {
        const inCenter = r >= centerStart && r <= centerEnd && c >= centerStart && c <= centerEnd;
        if (inCenter) {
          grid[r][c] = false;
          continue;
        }

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
          grid[r][c] = ((h + r * 17 + c * 31) % 4) !== 0;
        }
      }
    }
    return grid;
  }, [value]);

  const cellSize = 100 / modules;

  return (
    <div className={cn('relative bg-white rounded-lg p-1', className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        {cells.map((row, r) =>
          row.map((filled, c) =>
            filled ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#0F172A"
              />
            ) : null
          )
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-md p-0.5 shadow-sm">
          <AfyaPassEmblem variant="compact" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

const statusBadge: Record<string, string> = {
  active: 'bg-[#14B8A6] text-white',
  revoked: 'bg-red-500 text-white',
  expired: 'bg-amber-500 text-white',
};

function CardFront({
  patientName,
  displayId,
  initials,
  issueDate,
  expiryDate,
  status,
  patientPhotoUrl,
}: {
  patientName: string;
  displayId: string;
  initials: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  patientPhotoUrl?: string;
}) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-[18px]">
      {/* White header */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between shrink-0 z-10">
        <AfyaPassWordmark size="md" />
        <span className={cn('text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full', statusBadge[status] ?? statusBadge.active)}>
          {status}
        </span>
      </div>

      {/* Gradient body */}
      <div className="relative flex-1 bg-gradient-to-br from-[#0D9488] via-[#0F766E] to-[#1E3A5F] overflow-hidden">
        {/* Watermark emblem */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AfyaPassEmblem className="w-36 h-36 opacity-[0.12]" />
        </div>
        {/* AfyaPass text watermark */}
        <div className="absolute bottom-2 left-3 text-white/[0.06] font-display font-extrabold text-2xl tracking-widest select-none">
          AfyaPass
        </div>
        <div className="absolute bottom-2 right-3 text-white/[0.06] font-display font-extrabold text-2xl tracking-widest select-none">
          AfyaPass
        </div>

        <div className="relative z-10 px-4 pt-2 pb-3 h-full flex flex-col">
          <p className="text-white/90 text-[11px] font-medium mb-2">Digital Health ID</p>

          <div className="flex gap-3 flex-1 min-h-0">
            {/* Left column */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-white/40 shadow-md">
                  {patientPhotoUrl ? (
                    <Image src={patientPhotoUrl} alt="" fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="font-display font-bold text-white text-lg drop-shadow">{initials}</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-white/70 text-[10px]">Patient:</p>
                  <p className="text-white font-bold text-sm leading-tight truncate">{patientName}</p>
                </div>
              </div>

              {/* Info box */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg text-[10px] mt-auto">
                <div className="flex border-b border-slate-100">
                  <span className="w-[72px] shrink-0 px-2.5 py-1.5 text-slate-500 font-medium bg-slate-50">AfyaPass ID</span>
                  <span className="flex-1 px-2.5 py-1.5 font-bold text-slate-900 font-mono text-[9px] leading-tight">{displayId}</span>
                </div>
                <div className="flex border-b border-slate-100">
                  <span className="w-[72px] shrink-0 px-2.5 py-1.5 text-slate-500 font-medium">Issued</span>
                  <span className="flex-1 px-2.5 py-1.5 font-bold text-slate-900">{issueDate}</span>
                </div>
                <div className="flex">
                  <span className="w-[72px] shrink-0 px-2.5 py-1.5 text-slate-500 font-medium bg-slate-50">Expires</span>
                  <span className="flex-1 px-2.5 py-1.5 font-bold text-slate-900">{expiryDate}</span>
                </div>
              </div>
            </div>

            {/* QR column */}
            <div className="shrink-0 flex flex-col items-center justify-start pt-1">
              <QrCodeWithLogo value={displayId} className="w-[100px] h-[100px]" />
              <p className="text-white/80 text-[9px] font-medium mt-1.5 text-center">Scan to verify</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navy footer */}
      <div className="bg-[#1E3A5F] px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-white/50 text-[9px] font-bold tracking-widest">DEBIT</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400/80" aria-hidden="true">
            <path fill="currentColor" d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
        </div>
        <p className="text-white/40 text-[8px]">Opaque ref only · No PHI in QR</p>
      </div>
    </div>
  );
}

function CardBack({
  signature,
  emergencyContact,
}: {
  signature: string;
  emergencyContact: QrCardPreviewProps['emergencyContact'];
}) {
  const contact = emergencyContact ?? {
    name: 'John Doe',
    relation: 'Brother',
    phone: '+254 7XX XXXXXX',
    email: 'jdoe@provider.com',
  };

  const infoRows = [
    'Valid at all participating "AfyaPass" network health centers.',
    'Use of this card is subject to the terms and conditions available at www.afyapass.com/terms.',
    'Cards remain the property of the issuer.',
    'For Support and Verification, call: +254 2XX XXXXXX.',
  ];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-[18px] bg-gradient-to-b from-[#0F766E] to-[#1E3A5F]">
      {/* Magnetic stripe */}
      <div className="h-7 bg-[#1a1a1a] shrink-0" />

      {/* Header */}
      <div className="px-3 py-1.5 flex items-baseline gap-2 shrink-0">
        <AfyaPassWordmark size="sm" className="!text-base" />
        <span className="text-white/80 text-[9px] font-medium">Global Medical Emergency Information</span>
      </div>

      <div className="relative flex-1 px-3 pb-2 flex flex-col gap-2 min-h-0">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
          <span className="font-display font-extrabold text-4xl text-white rotate-[-15deg]">AfyaPass</span>
        </div>

        {/* Signature + Emergency */}
        <div className="flex gap-2 relative z-10">
          <div
            className="flex-1 h-16 rounded-lg border border-white/20 overflow-hidden"
            style={{
              background: 'repeating-linear-gradient(-45deg, #f8fafc, #f8fafc 4px, #e2e8f0 4px, #e2e8f0 8px)',
            }}
          >
            <p className="text-[#1E3A5F] font-serif italic text-lg px-3 pt-6">{signature}</p>
          </div>
          <div className="flex-1 bg-[#1E3A5F] rounded-lg p-2 text-white">
            <p className="text-[8px] font-bold uppercase tracking-wide mb-1">Emergency Contact:</p>
            <p className="text-[9px] font-semibold">{contact.name} ({contact.relation})</p>
            <p className="text-[8px] text-white/80 flex items-center gap-1 mt-0.5">
              <IcPhone className="w-2.5 h-2.5" /> Tel: {contact.phone}
            </p>
            <p className="text-[8px] text-white/80 flex items-center gap-1">
              <IcMail className="w-2.5 h-2.5" /> {contact.email}
            </p>
          </div>
        </div>

        {/* Important information */}
        <div className="relative z-10 flex-1 min-h-0">
          <div className="bg-[#0D9488] rounded-t-lg px-2 py-1">
            <p className="text-white text-[9px] font-bold uppercase tracking-wide text-center">Important Information</p>
          </div>
          <div className="bg-white rounded-b-lg overflow-hidden border border-[#0D9488]/30">
            {infoRows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  'px-2 py-1.5 text-[7.5px] text-slate-700 leading-snug border-b border-slate-100 last:border-0',
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                )}
              >
                {row}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer */}
        <div className="relative z-10 flex justify-between items-end gap-2 pt-1">
          <p className="text-white/50 text-[6.5px] leading-tight max-w-[55%]">
            This side provides emergency contact and card issuer details. No PHI is visible on this surface.
          </p>
          <div className="text-right">
            <p className="text-white text-[8px] font-bold uppercase">Reward Program:</p>
            <p className="text-white/70 text-[7px]">Participating Pharmacies &amp; Labs</p>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-300 ml-auto mt-0.5" aria-hidden="true">
              <circle cx="8" cy="14" r="4" fill="currentColor" opacity="0.9" />
              <circle cx="14" cy="12" r="4" fill="currentColor" opacity="0.7" />
              <circle cx="18" cy="15" r="3" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QrCardPreview({
  patientName = 'Demo Patient',
  afyaPassId,
  patientId = 'AFY-KE-MUR-2026-98421',
  issueDate = '2026-08-25',
  expiryDate = '2031-08-25',
  status = 'active',
  variant = 'default',
  showBack = false,
  flipable = false,
  patientPhotoUrl,
  emergencyContact,
  signature,
  className,
}: QrCardPreviewProps) {
  const [flipped, setFlipped] = useState(false);
  const displayId = afyaPassId || patientId;
  const initials = getInitials(patientName);
  const sig = signature ?? `${initials.charAt(0)}. ${patientName.split(' ').pop()?.replace(/\(.*\)/, '') ?? 'Patient'}`;

  const cardShell = (children: React.ReactNode) => (
    <div
      className={cn(
        'relative w-full max-w-[420px] aspect-[1.586/1] rounded-[20px] overflow-hidden',
        'shadow-[0_16px_48px_-8px_rgba(13,148,136,0.35),0_8px_24px_-8px_rgba(30,58,95,0.25)]',
        variant === 'hero' && 'lg:rotate-1 hover:rotate-0 transition-transform duration-500',
        flipable && 'cursor-pointer',
        className
      )}
      onClick={flipable ? () => setFlipped((f) => !f) : undefined}
      role={flipable ? 'button' : undefined}
      tabIndex={flipable ? 0 : undefined}
      onKeyDown={flipable ? (e) => e.key === 'Enter' && setFlipped((f) => !f) : undefined}
    >
      {children}
      {flipable && (
        <p className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-slate-400">
          Tap to flip card
        </p>
      )}
    </div>
  );

  if (showBack && !flipable) {
    return cardShell(
      <CardBack signature={sig} emergencyContact={emergencyContact} />
    );
  }

  if (flipable) {
    return cardShell(
      <div className="relative w-full h-full [perspective:1000px]">
        <div
          className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <CardFront
              patientName={patientName}
              displayId={displayId}
              initials={initials}
              issueDate={issueDate}
              expiryDate={expiryDate}
              status={status}
              patientPhotoUrl={patientPhotoUrl}
            />
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <CardBack signature={sig} emergencyContact={emergencyContact} />
          </div>
        </div>
      </div>
    );
  }

  const front = (
    <CardFront
      patientName={patientName}
      displayId={displayId}
      initials={initials}
      issueDate={issueDate}
      expiryDate={expiryDate}
      status={status}
      patientPhotoUrl={patientPhotoUrl}
    />
  );

  if (variant === 'hero') {
    return (
      <div className="relative mx-auto">
        <div className="absolute inset-4 bg-teal-500/15 rounded-[24px] blur-2xl scale-95" />
        {cardShell(front)}
      </div>
    );
  }

  return cardShell(front);
}

/** Full AfyaPass logo image for marketing / navbar */
export function AfyaPassLogoImage({ className }: { className?: string }) {
  return (
    <Image
      src="/images/afyapass-logo.jpg"
      alt="AfyaPass — One Patient. One Record. Any Health Center."
      width={280}
      height={200}
      className={cn('object-contain', className)}
      priority
    />
  );
}
