'use client';

import React from 'react';
import Link from 'next/link';
import { AfyaPassLogo } from '@/components/AfyaPassBrand';
import { IcUser, IcBuilding, IcBarChart, IcShield } from '@/components/icons';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <AfyaPassLogo variant="compact" markSize={34} />
          <span className="hidden sm:inline px-2.5 py-0.5 text-[10px] font-semibold bg-teal-50 text-teal-700 rounded-md border border-teal-100">
            Murang&apos;a Pilot
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link href="/patient" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-all">
            <IcUser className="w-4 h-4" />
            Patient Portal
          </Link>
          <Link href="/facility" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-all">
            <IcBuilding className="w-4 h-4" />
            Facility Portal
          </Link>
          <Link href="/county" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-all">
            <IcBarChart className="w-4 h-4" />
            County Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-border">
            <IcShield className="h-4 w-4 text-teal-600" />
            <span>Secure RLS Sandbox</span>
          </div>
          <Link
            href="/facility"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all shadow-md hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #00B5AD, #0D2B55)' }}
          >
            Access Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
