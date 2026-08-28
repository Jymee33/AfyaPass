'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  AfyaPassWordmark,
  AfyaPassWatermark,
  AfyaPassQrLogo,
  AFYA_NAVY,
  AFYA_TEAL,
} from '@/components/AfyaPassBrand';
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

const DEMO_PHOTO = '/images/patient-demo.jpg';

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
  const modules = 29;
  const cells = useMemo(() => {
    const h = hashString(value);
    const grid: boolean[][] = [];
    const cs = 10;
    const ce = 19;

    for (let r = 0; r < modules; r++) {
      grid[r] = [];
      for (let c = 0; c < modules; c++) {
        const inCenter = r >= cs && r <= ce && c >= cs && c <= ce;
        if (inCenter) {
          grid[r][c] = false;
          continue;
        }
        const inTL = r < 7 && c < 7;
        const inTR = r < 7 && c >= modules - 7;
        const inBL = r >= modules - 7 && c < 7;
        if (inTL || inTR || inBL) {
          const lr = inTR ? r : r >= modules - 7 ? r - (modules - 7) : r;
          const lc = inTR ? c - (modules - 7) : inBL ? c : c;
          grid[r][c] = lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
        } else {
          grid[r][c] = ((h + r * 13 + c * 29) % 5) !== 0;
        }
      }
    }
    return grid;
  }, [value]);

  const cell = 100 / modules;

  return (
    <div className={cn('relative bg-white rounded-lg shadow-md', className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full block rounded-lg" aria-hidden="true">
        {cells.map((row, r) =>
          row.map((filled, c) =>
            filled ? (
              <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#111827" />
            ) : null
          )
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <AfyaPassQrLogo />
      </div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  active: 'text-white',
  revoked: 'text-white',
  expired: 'text-white',
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
  const photo = patientPhotoUrl || DEMO_PHOTO;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-[16px] border border-white/10">
      {/* ── White header strip ── */}
      <div className="bg-white px-5 py-3 flex items-center justify-between shrink-0 z-20">
        <AfyaPassWordmark size="md" />
        <span
          className={cn(
            'text-[11px] font-semibold lowercase px-4 py-1 rounded-full',
            statusStyles[status] ?? statusStyles.active
          )}
          style={{ backgroundColor: AFYA_TEAL }}
        >
          {status}
        </span>
      </div>

      {/* ── Gradient body ── */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{ background: `linear-gradient(105deg, ${AFYA_NAVY} 0%, #0a4a5e 45%, ${AFYA_TEAL} 100%)` }}
      >
        {/* Watermark emblem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AfyaPassWatermark />
        </div>
        {/* Corner text watermarks */}
        <span className="absolute bottom-3 left-4 text-white/[0.07] font-display font-extrabold text-[22px] tracking-widest select-none pointer-events-none">
          AfyaPass
        </span>
        <span className="absolute bottom-3 right-4 text-white/[0.07] font-display font-extrabold text-[22px] tracking-widest select-none pointer-events-none">
          AfyaPass
        </span>

        <div className="relative z-10 px-5 pt-3 pb-2 h-full flex flex-col">
          <p className="text-white text-[13px] font-medium mb-3">Digital Health ID</p>

          <div className="flex gap-4 flex-1 min-h-0 items-start">
            {/* Left: patient + info */}
            <div className="flex-1 flex flex-col min-w-0 gap-3">
              {/* Patient row */}
              <div className="flex items-center gap-3">
                <div className="relative w-[68px] h-[68px] rounded-full overflow-hidden shrink-0 ring-2 ring-white/25 shadow-lg">
                  <Image src={photo} alt="" fill className="object-cover" sizes="68px" />
                  {/* Initials overlay — left half only */}
                  <div
                    className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center"
                    style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.55) 70%, transparent)' }}
                  >
                    <span className="text-white font-display font-extrabold text-xl leading-none drop-shadow-md">
                      {initials}
                    </span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-white/65 text-[11px]">Patient:</p>
                  <p className="text-white font-bold text-[15px] leading-snug">{patientName}</p>
                </div>
              </div>

              {/* Info table */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg mt-auto text-[11px]">
                {[
                  { label: 'AfyaPass ID', value: displayId, mono: true },
                  { label: 'Issued', value: issueDate },
                  { label: 'Expires', value: expiryDate },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className={cn('flex border-b border-slate-100 last:border-0', i % 2 === 0 ? 'bg-white' : 'bg-slate-50')}
                  >
                    <span className="w-[80px] shrink-0 px-3 py-2 text-slate-500 font-medium">{row.label}</span>
                    <span
                      className={cn(
                        'flex-1 px-3 py-2 font-bold text-slate-900',
                        row.mono && 'font-mono text-[10px] leading-tight'
                      )}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: QR */}
            <div className="shrink-0 flex flex-col items-center pt-1">
              <QrCodeWithLogo value={displayId} className="w-[118px] h-[118px] p-1.5" />
              <p className="text-white/85 text-[10px] font-medium mt-2">Scan to verify</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navy footer ── */}
      <div className="px-5 py-2 flex items-center justify-between shrink-0 z-20" style={{ backgroundColor: AFYA_NAVY }}>
        <div className="flex items-center gap-2">
          <span className="text-white/45 text-[10px] font-bold tracking-[0.2em]">DEBIT</span>
          {/* Lion crest */}
          <svg viewBox="0 0 32 32" className="w-5 h-5 text-amber-400/90" aria-hidden="true">
            <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.15" />
            <path
              fill="currentColor"
              d="M16 6c-3 0-5.5 2.5-5.5 5.5 0 2 .8 3.8 2.2 4.8L10 22h12l-2.7-5.7C21.7 15.3 22.5 13.5 22.5 11.5 22.5 8.5 20 6 16 6zm-2 14v2h4v-2h-4z"
            />
          </svg>
        </div>
        <p className="text-white/40 text-[9px]">Opaque ref only · No PHI in QR</p>
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
    <div
      className="relative w-full h-full flex flex-col overflow-hidden rounded-[16px] border border-white/10"
      style={{ background: `linear-gradient(160deg, ${AFYA_TEAL} 0%, #0a4a5e 40%, ${AFYA_NAVY} 100%)` }}
    >
      {/* Magnetic stripe */}
      <div className="h-8 bg-[#111] shrink-0" />

      {/* Header */}
      <div className="px-4 py-2 flex items-center gap-2 shrink-0 bg-black/20">
        <AfyaPassWordmark size="sm" onDark />
        <span className="text-white/75 text-[9px] font-medium leading-tight">
          Global Medical Emergency Information
        </span>
      </div>

      <div className="relative flex-1 px-4 py-2 flex flex-col gap-2 min-h-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-display font-extrabold text-[52px] text-white/[0.04] rotate-[-12deg] whitespace-nowrap">
            AfyaPass
          </span>
        </div>

        {/* Signature + emergency */}
        <div className="flex gap-2 relative z-10">
          <div
            className="flex-[1.1] h-[68px] rounded-lg border border-white/15 overflow-hidden"
            style={{
              background: 'repeating-linear-gradient(-45deg, #f1f5f9, #f1f5f9 5px, #dde3ea 5px, #dde3ea 10px)',
            }}
          >
            <p className="font-serif italic text-[#0D2B55] text-xl px-3 pt-7 leading-none">{signature}</p>
          </div>
          <div className="flex-1 rounded-lg p-2.5 text-white" style={{ backgroundColor: AFYA_NAVY }}>
            <p className="text-[8px] font-bold uppercase tracking-wide mb-1">Emergency Contact:</p>
            <p className="text-[9px] font-semibold leading-snug">
              {contact.name} ({contact.relation})
            </p>
            <p className="text-[8px] text-white/75 flex items-center gap-1 mt-1">
              <IcPhone className="w-2.5 h-2.5 shrink-0" />
              Tel: {contact.phone}
            </p>
            <p className="text-[8px] text-white/75 flex items-center gap-1">
              <IcMail className="w-2.5 h-2.5 shrink-0" />
              {contact.email}
            </p>
          </div>
        </div>

        {/* Important information */}
        <div className="relative z-10 flex-1 min-h-0 flex flex-col">
          <div className="rounded-t-lg px-3 py-1.5 text-center" style={{ backgroundColor: AFYA_TEAL }}>
            <p className="text-white text-[9px] font-bold uppercase tracking-wide">Important Information</p>
          </div>
          <div className="bg-white rounded-b-lg overflow-hidden border border-teal-600/20 flex-1">
            {infoRows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  'px-2.5 py-1.5 text-[7.5px] text-slate-700 leading-snug border-b border-slate-100 last:border-0',
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                )}
              >
                {row}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end gap-2 pt-1">
          <p className="text-white/50 text-[7px] leading-tight max-w-[58%]">
            This side provides emergency contact and card issuer details. No PHI is visible on this surface.
          </p>
          <div className="text-right shrink-0">
            <p className="text-white text-[8px] font-bold uppercase">Reward Program:</p>
            <p className="text-white/65 text-[7px]">Participating Pharmacies &amp; Labs</p>
            <svg viewBox="0 0 28 20" className="w-6 h-4 text-amber-300 ml-auto mt-0.5" aria-hidden="true">
              <circle cx="7" cy="13" r="5" fill="currentColor" opacity="0.9" />
              <circle cx="14" cy="10" r="5" fill="currentColor" opacity="0.7" />
              <circle cx="21" cy="13" r="4" fill="currentColor" opacity="0.5" />
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
  const sig =
    signature ??
    `${initials.charAt(0)}. ${patientName.split(' ').pop()?.replace(/\(.*\)/, '') ?? 'Patient'}`;

  const shell = (children: React.ReactNode) => (
    <div
      className={cn(
        'relative w-full max-w-[460px]',
        flipable && 'pb-7',
        className
      )}
    >
      <div
        className={cn(
          'relative w-full aspect-[1.586/1] rounded-[18px] overflow-hidden',
          'shadow-[0_20px_50px_-10px_rgba(13,43,85,0.45),0_8px_20px_-6px_rgba(0,181,173,0.25)]',
          variant === 'hero' && 'lg:rotate-1 hover:rotate-0 transition-transform duration-500',
          flipable && 'cursor-pointer'
        )}
        onClick={flipable ? () => setFlipped((f) => !f) : undefined}
        role={flipable ? 'button' : undefined}
        tabIndex={flipable ? 0 : undefined}
        onKeyDown={flipable ? (e) => e.key === 'Enter' && setFlipped((f) => !f) : undefined}
        aria-label={flipable ? 'Flip AfyaPass card' : undefined}
      >
        {children}
      </div>
      {flipable && (
        <p className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-slate-400">
          Tap to flip card
        </p>
      )}
    </div>
  );

  if (showBack && !flipable) {
    return shell(<CardBack signature={sig} emergencyContact={emergencyContact} />);
  }

  if (flipable) {
    return shell(
      <div className="relative w-full h-full [perspective:1200px]">
        <div
          className="relative w-full h-full transition-transform duration-600 ease-in-out [transform-style:preserve-3d]"
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
        <div
          className="absolute inset-6 rounded-[24px] blur-3xl opacity-40"
          style={{ background: `linear-gradient(135deg, ${AFYA_TEAL}, ${AFYA_NAVY})` }}
        />
        {shell(front)}
      </div>
    );
  }

  return shell(front);
}

export { AfyaPassLogo } from '@/components/AfyaPassBrand';
