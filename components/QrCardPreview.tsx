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
  issueDate?: string;
  expiryDate?: string;
  status?: 'active' | 'revoked' | 'expired';
  variant?: 'default' | 'hero';
  showBack?: boolean;
  flipable?: boolean;
  patientPhotoUrl?: string;
  emergencyContact?: { name: string; relation: string; phone: string; email: string };
  signature?: string;
  className?: string;
}

const DEMO_PHOTO = '/images/patient-demo.jpg';

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i) | 0;
  return Math.abs(h);
}

function getInitials(name: string): string {
  return name.replace(/\(.*\)/, '').trim().split(/\s+/).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

function QrCodeWithLogo({ value, className }: { value: string; className?: string }) {
  const modules = 29;
  const cells = useMemo(() => {
    const h = hashString(value);
    const grid: boolean[][] = [];
    const cs = 10, ce = 19;
    for (let r = 0; r < modules; r++) {
      grid[r] = [];
      for (let c = 0; c < modules; c++) {
        if (r >= cs && r <= ce && c >= cs && c <= ce) { grid[r][c] = false; continue; }
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
    <div className={cn('relative bg-white rounded-xl shadow-lg', className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full block rounded-xl" aria-hidden="true">
        {cells.map((row, r) => row.map((filled, c) => filled ? (
          <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1a1a1a" />
        ) : null))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <AfyaPassQrLogo />
      </div>
    </div>
  );
}

function CardFront({
  patientName, displayId, initials, issueDate, expiryDate, status, patientPhotoUrl,
}: {
  patientName: string; displayId: string; initials: string;
  issueDate: string; expiryDate: string; status: string; patientPhotoUrl?: string;
}) {
  const photo = patientPhotoUrl || DEMO_PHOTO;
  const rows = [
    { label: 'AfyaPass ID', value: displayId, mono: true },
    { label: 'Issued', value: issueDate },
    { label: 'Expires', value: expiryDate },
  ];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-[14px] bg-white">
      {/* ── Header ── */}
      <div className="bg-white px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-slate-100">
        <AfyaPassWordmark size="md" />
        <span
          className="text-[11px] font-semibold lowercase text-white px-3.5 py-1 rounded-full"
          style={{ backgroundColor: AFYA_TEAL }}
        >
          {status}
        </span>
      </div>

      {/* ── Body (includes footer) ── */}
      <div
        className="relative flex-1 flex flex-col overflow-hidden"
        style={{ background: `linear-gradient(118deg, ${AFYA_NAVY} 0%, #004d5e 42%, ${AFYA_TEAL} 100%)` }}
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pt-2">
          <AfyaPassWatermark />
        </div>
        <span className="absolute bottom-8 left-3 text-white/[0.06] font-display font-extrabold text-xl tracking-[0.25em] select-none pointer-events-none rotate-[-8deg]">
          AfyaPass
        </span>
        <span className="absolute bottom-6 right-3 text-white/[0.06] font-display font-extrabold text-xl tracking-[0.25em] select-none pointer-events-none rotate-[8deg]">
          AfyaPass
        </span>

        <div className="relative z-10 flex-1 flex flex-col px-4 pt-2 pb-2 min-h-0">
          <p className="text-white text-[12px] font-semibold mb-2">Digital Health ID</p>

          <div className="flex gap-3 flex-1 min-h-0">
            {/* Left */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-start gap-2.5 mb-2">
                <div className="relative w-[62px] h-[62px] rounded-full overflow-hidden shrink-0 ring-2 ring-white/30 shadow-md">
                  <Image src={photo} alt="" fill className="object-cover" sizes="62px" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-white font-extrabold text-base leading-none drop-shadow">
                    {initials}
                  </span>
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-white/70 text-[10px]">Patient:</p>
                  <p className="text-white font-bold text-[13px] leading-snug">{patientName}</p>
                </div>
              </div>

              {/* Grey info box */}
              <div className="mt-auto rounded-xl overflow-hidden shadow-md" style={{ backgroundColor: '#d4dde4' }}>
                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex text-[10px]"
                    style={{ backgroundColor: i % 2 === 0 ? '#e8edf1' : '#dce4ea' }}
                  >
                    <span className="w-[76px] shrink-0 px-2.5 py-1.5 text-slate-500 font-medium">{row.label}</span>
                    <span className={cn('flex-1 px-2 py-1.5 font-bold text-slate-900', row.mono && 'font-mono text-[9px] leading-tight')}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* QR */}
            <div className="shrink-0 flex flex-col items-center">
              <QrCodeWithLogo value={displayId} className="w-[108px] h-[108px] p-1.5" />
              <p className="text-white/90 text-[9px] font-medium mt-1.5">Scan to verify</p>
            </div>
          </div>

          {/* Footer on gradient */}
          <div className="relative z-10 flex items-center justify-between mt-2 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-white/50 text-[9px] font-bold tracking-[0.18em]">DEBIT</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300/80" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                <path fill="currentColor" d="M12 5c-2.5 0-4.5 2-4.5 4.5 0 1.5.6 2.8 1.6 3.7L8 18h8l-2.1-4.8c1-.9 1.6-2.2 1.6-3.7C15.5 7 13.5 5 12 5z" opacity="0.85" />
              </svg>
            </div>
            <p className="text-white/45 text-[8px] absolute left-1/2 -translate-x-1/2 bottom-0 whitespace-nowrap">
              Opaque ref only · No PHI in QR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack({ signature, emergencyContact }: {
  signature: string;
  emergencyContact: QrCardPreviewProps['emergencyContact'];
}) {
  const contact = emergencyContact ?? {
    name: 'John Doe', relation: 'Brother', phone: '+254 7XX XXXXXX', email: 'jdoe@provider.com',
  };
  const infoRows = [
    'Valid at all participating "AfyaPass" network health centers.',
    'Use of this card is subject to the terms and conditions available at www.afyapass.com/terms.',
    'Cards remain the property of the issuer.',
    'For Support and Verification, call: +254 2XX XXXXXX.',
  ];

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden rounded-[14px]"
      style={{ background: `linear-gradient(165deg, ${AFYA_TEAL} 0%, #006878 35%, ${AFYA_NAVY} 100%)` }}
    >
      <div className="h-7 bg-black shrink-0" />

      <div className="px-3 py-1.5 flex items-center gap-1.5 shrink-0">
        <AfyaPassWordmark size="sm" onDark />
        <span className="text-white/80 text-[8px] font-medium">Global Medical Emergency Information</span>
      </div>

      <div className="relative flex-1 px-3 pb-2 flex flex-col gap-1.5 min-h-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.05]">
          <span className="font-display font-extrabold text-5xl text-white rotate-[-10deg]">AfyaPass</span>
        </div>

        <div className="flex gap-1.5 relative z-10">
          <div
            className="flex-[1.15] h-[60px] rounded-md border border-white/20 overflow-hidden"
            style={{ background: 'repeating-linear-gradient(-45deg, #eef2f6, #eef2f6 4px, #d5dde6 4px, #d5dde6 8px)' }}
          >
            <p className="font-serif italic text-[#002D4F] text-lg px-2.5 pt-6 leading-none">{signature}</p>
          </div>
          <div className="flex-1 rounded-md p-2 text-white border border-white/10" style={{ backgroundColor: AFYA_NAVY }}>
            <p className="text-[7px] font-bold uppercase tracking-wide mb-0.5">Emergency Contact:</p>
            <p className="text-[8px] font-semibold leading-tight">{contact.name} ({contact.relation})</p>
            <p className="text-[7px] text-white/75 flex items-center gap-0.5 mt-0.5">
              <IcPhone className="w-2 h-2 shrink-0" /> Tel: {contact.phone}
            </p>
            <p className="text-[7px] text-white/75 flex items-center gap-0.5 truncate">
              <IcMail className="w-2 h-2 shrink-0" /> {contact.email}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex-1 min-h-0 flex flex-col border-2 border-white/25 rounded-lg overflow-hidden">
          <div className="px-2 py-1 text-center shrink-0" style={{ backgroundColor: AFYA_TEAL }}>
            <p className="text-white text-[8px] font-bold uppercase tracking-wide">Important Information</p>
          </div>
          <div className="bg-white flex-1 flex flex-col">
            {infoRows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  'px-2 py-1 text-[7px] text-slate-700 leading-snug border-b border-slate-200/80 last:border-0 flex-1 flex items-center',
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                )}
              >
                {row}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-end gap-1 pt-0.5">
          <p className="text-white/55 text-[6.5px] leading-tight max-w-[55%]">
            This side provides emergency contact and card issuer details. No PHI is visible on this surface.
          </p>
          <div className="text-right shrink-0">
            <p className="text-white text-[7px] font-bold uppercase">Reward Program:</p>
            <p className="text-white/70 text-[6.5px]">Participating Pharmacies &amp; Labs</p>
            <svg viewBox="0 0 24 18" className="w-5 h-3.5 text-white/80 ml-auto mt-0.5" aria-hidden="true">
              <path fill="currentColor" d="M8 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-10 4a4 4 0 0 1 8 0H6z" opacity="0.9" />
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

  const shell = (children: React.ReactNode) => (
    <div className={cn('relative w-full max-w-[480px]', flipable && 'pb-7', className)}>
      <div
        className={cn(
          'relative w-full aspect-[1.586/1] rounded-[16px] overflow-hidden',
          'shadow-[0_16px_48px_-8px_rgba(0,45,79,0.5),0_4px_16px_rgba(0,169,164,0.2)]',
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
      {flipable && <p className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-slate-400">Tap to flip card</p>}
    </div>
  );

  const frontProps = { patientName, displayId, initials, issueDate, expiryDate, status, patientPhotoUrl };

  if (showBack && !flipable) return shell(<CardBack signature={sig} emergencyContact={emergencyContact} />);

  if (flipable) {
    return shell(
      <div className="relative w-full h-full [perspective:1200px]">
        <div
          className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]"><CardFront {...frontProps} /></div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <CardBack signature={sig} emergencyContact={emergencyContact} />
          </div>
        </div>
      </div>
    );
  }

  const front = <CardFront {...frontProps} />;
  if (variant === 'hero') {
    return (
      <div className="relative mx-auto">
        <div className="absolute inset-6 rounded-3xl blur-3xl opacity-30" style={{ background: `linear-gradient(135deg, ${AFYA_TEAL}, ${AFYA_NAVY})` }} />
        {shell(front)}
      </div>
    );
  }
  return shell(front);
}

export { AfyaPassLogo } from '@/components/AfyaPassBrand';
