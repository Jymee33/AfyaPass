'use client';

import React from 'react';
import Link from 'next/link';
import { IcQr, IcShieldCheck, IcStethoscope, IcArrowRight } from '@/components/icons';

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

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-afya-600 flex items-center justify-center text-white font-bold text-sm">
                    AP
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">AfyaPass Card</div>
                    <div className="text-xs text-slate-400">Official Patient Identifier</div>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-afya-500/20 text-afya-300 rounded font-mono">PILOT</span>
              </div>

              <div className="bg-white rounded-xl p-4 text-slate-900 text-center shadow-inner space-y-3">
                <div className="font-mono text-sm font-bold tracking-wider text-slate-700">
                  AFY-KE-MUR-2026-98421
                </div>
                <div className="w-40 h-40 mx-auto bg-slate-950 p-2 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2 bg-white rounded">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          i % 2 === 0 || i % 7 === 0 ? 'bg-slate-900' : 'bg-afya-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Scan at any participating facility in Murang'a County
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700 text-xs text-slate-400 flex items-center justify-between">
                <span>Security Payload: Opaque Ref ID</span>
                <span className="text-emerald-400 font-semibold">No Medical Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
