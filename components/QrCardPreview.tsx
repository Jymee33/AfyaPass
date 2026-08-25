'use client';

import React from 'react';
import { QrCode, ShieldCheck } from 'lucide-react';

interface QrCardPreviewProps {
  patientName?: string;
  afyaPassId?: string;
  county?: string;
}

export function QrCardPreview({
  patientName = "Demo Patient",
  afyaPassId = "AFY-KE-MUR-2026-98421",
  county = "Murang'a County",
}: QrCardPreviewProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-afya-950 p-6 rounded-2xl border border-slate-700 shadow-xl text-white relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-1.5 font-bold text-lg text-white">
            <span>Afya</span><span className="text-afya-400">Pass</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Digital Portable Patient Card</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
            {county}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 items-center bg-white text-slate-900 p-4 rounded-xl shadow-inner">
        <div className="col-span-7 space-y-2">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Patient Name</div>
            <div className="text-sm font-bold text-slate-900 truncate">{patientName}</div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">AfyaPass Patient ID</div>
            <div className="text-xs font-mono font-bold text-afya-700 tracking-wider">
              {afyaPassId}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Issue Date</div>
            <div className="text-[11px] font-medium text-slate-600">2026-08-25</div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col items-center justify-center p-2 bg-slate-950 rounded-lg">
          <div className="w-24 h-24 bg-white p-1.5 rounded flex items-center justify-center">
            <div className="grid grid-cols-4 gap-1 w-full h-full p-1 bg-slate-900 rounded-sm">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${
                    i % 3 === 0 ? 'bg-white' : 'bg-afya-400'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-[9px] font-mono text-slate-400 mt-1 flex items-center gap-1">
            <QrCode className="w-2.5 h-2.5 text-afya-400" />
            <span>Ref ID QR</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Non-Identifying QR Payload</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">v1.0.0</span>
      </div>
    </div>
  );
}
