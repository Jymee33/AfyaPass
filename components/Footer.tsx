'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg text-white">
              <div className="w-7 h-7 rounded-lg bg-afya-600 flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span>Afya<span className="text-afya-500">Pass</span></span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Digital portable patient health-record platform. Empowering seamless healthcare continuity across participating facilities in Murang'a County, Kenya.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pilot Target: Murang'a County, Kenya</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/patient" className="hover:text-afya-400 transition-colors">
                  Patient Portal
                </Link>
              </li>
              <li>
                <Link href="/facility" className="hover:text-afya-400 transition-colors">
                  Healthcare Worker Portal
                </Link>
              </li>
              <li>
                <Link href="/county" className="hover:text-afya-400 transition-colors">
                  County Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Documentation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#security" className="hover:text-afya-400 transition-colors">
                  Security Principles
                </a>
              </li>
              <li>
                <a href="#qr-spec" className="hover:text-afya-400 transition-colors">
                  QR Payload Specification
                </a>
              </li>
              <li>
                <a href="#rls" className="hover:text-afya-400 transition-colors">
                  Row Level Security (RLS)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AfyaPass Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with care for public health in Kenya</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
