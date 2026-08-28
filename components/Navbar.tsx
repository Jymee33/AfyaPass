'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IcUser, IcBuilding, IcBarChart, IcShield } from '@/components/icons';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/afyapass-logo.jpg"
            alt="AfyaPass"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="hidden sm:inline px-2 py-0.5 text-[10px] font-semibold bg-medic-50 text-medic-700 rounded-md border border-medic-100">
            Murang&apos;a Pilot
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link href="/patient" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-medic-600 hover:bg-medic-50 transition-all">
            <IcUser className="w-4 h-4" />
            Patient Portal
          </Link>
          <Link href="/facility" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-medic-600 hover:bg-medic-50 transition-all">
            <IcBuilding className="w-4 h-4" />
            Facility Portal
          </Link>
          <Link href="/county" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-medic-600 hover:bg-medic-50 transition-all">
            <IcBarChart className="w-4 h-4" />
            County Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-border">
            <IcShield className="h-4 w-4 text-medic-600" />
            <span>Secure RLS Sandbox</span>
          </div>
          <Link
            href="/facility"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-medic-600 to-medic-500 hover:from-medic-700 hover:to-medic-600 rounded-xl shadow-icon transition-all"
          >
            Access Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
