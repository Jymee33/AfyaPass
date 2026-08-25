'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Activity, User, Building2, BarChart3 } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-afya-600 to-afya-400 flex items-center justify-center text-white shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <span className="tracking-tight">Afya<span className="text-afya-600">Pass</span></span>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
            Murang'a Pilot
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/patient" className="flex items-center gap-1.5 hover:text-afya-600 transition-colors">
            <User className="w-4 h-4" />
            Patient Portal
          </Link>
          <Link href="/facility" className="flex items-center gap-1.5 hover:text-afya-600 transition-colors">
            <Building2 className="w-4 h-4" />
            Facility Portal
          </Link>
          <Link href="/county" className="flex items-center gap-1.5 hover:text-afya-600 transition-colors">
            <BarChart3 className="w-4 h-4" />
            County Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Shield className="w-3.5 h-3.5 text-afya-600" />
            <span>Secure RLS Sandbox</span>
          </div>
          <Link
            href="/facility"
            className="px-4 py-2 text-sm font-medium text-white bg-afya-600 hover:bg-afya-700 rounded-lg shadow-sm transition-colors"
          >
            Access Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
