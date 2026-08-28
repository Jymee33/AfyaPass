'use client';

import React from 'react';
import { IcShieldAlert, IcCheckCircle, IcLock, IcEyeOff } from '@/components/icons';

export function SecurityNotice() {
  return (
    <section className="py-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-700 pb-6 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <IcShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Security & Privacy Guardrails</h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  Prototype Guardrails
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                AfyaPass is built with day-one security principles to protect patient privacy in accordance with Kenyan data protection principles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-afya-300">
                <IcEyeOff className="w-4 h-4" />
                <span>Zero Medical Info in QR</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                QR cards hold an opaque reference string (`AFY-KE-MUR-...`) and issuer signature. Medical charts remain strictly inside encrypted backend databases.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-afya-300">
                <IcLock className="w-4 h-4" />
                <span>Database Row-Level Security</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                PostgreSQL RLS policies block unauthorized patient chart access. National ID or phone numbers cannot unlock records directly.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-afya-300">
                <IcCheckCircle className="w-4 h-4" />
                <span>Immutable Audit Trail</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every record lookup, QR scan, and clinical encounter logs timestamp, clinician ID, facility, and status to an append-only audit trail.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700 text-[11px] text-slate-400 text-center sm:text-left">
            Notice: This codebase is an engineering prototype for the Murang'a County pilot and requires legal/privacy audit approval prior to live clinical deployment.
          </div>
        </div>
      </div>
    </section>
  );
}
