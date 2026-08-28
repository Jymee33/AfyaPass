'use client';

import React from 'react';
import Link from 'next/link';
import { IcQr, IcShieldCheck, IcStethoscope, IcArrowRight } from '@/components/icons';
import { QrCardPreview } from '@/components/QrCardPreview';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-afya-900/40 via-slate-900 to-slate-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-afya-500/10 text-afya-300 border border-afya-500/20">
              <IcShieldCheck className="w-4 h-4 text-afya-400" />
              <span>Digital Portable Health Record Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Your Health. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-afya-300 to-emerald-400">
                Wherever You Go.
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">
              Connecting patients across public, private, and faith-based healthcare facilities. Empowering seamless clinical encounters in Murang'a County with secure QR-assisted patient identification.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/patient"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-900 bg-afya-400 hover:bg-afya-300 shadow-lg shadow-afya-500/25 transition-all"
              >
                <IcQr className="w-5 h-5" />
                View Patient AfyaPass Card
              </Link>
              <Link
                href="/facility"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                <IcStethoscope className="w-5 h-5 text-afya-400" />
                Open Facility Portal
                <IcArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-white">Murang'a</div>
                <div className="text-xs text-slate-400">Pilot County</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Level 1–5</div>
                <div className="text-xs text-slate-400">Facility Network</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Consent Protected</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <QrCardPreview
              variant="hero"
              flipable
              patientName="Wanjiku Njuguna"
              afyaPassId="AFY-KE-MUR-2026-98421"
              county="Murang'a County"
              facilityName="Murang'a Level 5"
              signature="W. Njuguna"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
