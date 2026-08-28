import React from 'react';
import { IcBarChart, IcHospital, IcUsers, IcActivity, IcShieldCheck, IcMapPin } from '@/components/icons';

export default function CountyPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-900 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 mb-2">
              <IcMapPin className="h-4 w-4" />
              <span>Murang'a County Health Department</span>
            </div>
            <h1 className="text-2xl font-bold">County Executive Dashboard & Facility Analytics</h1>
            <p className="text-xs text-emerald-200 mt-1">
              De-Identified Epidemiological Monitoring & Interoperability Analytics
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-emerald-900 px-3 py-2 rounded-lg border border-emerald-800 text-emerald-200">
            <IcShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anonymized Data Stream</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Registered Facilities</span>
              <IcHospital className="w-5 h-5 text-afya-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">142</div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">Public, Private & Faith-Based</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active AfyaPass IDs</span>
              <IcUsers className="w-5 h-5 text-afya-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">28,450</div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">+1,240 this week</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Encounters Filed</span>
              <IcActivity className="w-5 h-5 text-afya-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">84,910</div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">100% Audit Logged</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Cross-Facility Visits</span>
              <IcBarChart className="w-5 h-5 text-afya-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">34.2%</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">Continuity Rate</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sub-County Facility Coverage (Murang'a Pilot)</h2>
              <p className="text-xs text-slate-500">Breakdown of participating healthcare centers by level and sub-county.</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded">
              Pilot Overview
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900">Kiharu Sub-County</div>
              <div className="text-xs text-slate-600">32 Facilities Active</div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-afya-600 h-full w-[85%]" />
              </div>
              <div className="text-[11px] text-slate-500 text-right">85% Digital Sync</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900">Kandara Sub-County</div>
              <div className="text-xs text-slate-600">28 Facilities Active</div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-afya-600 h-full w-[72%]" />
              </div>
              <div className="text-[11px] text-slate-500 text-right">72% Digital Sync</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900">Maragua Sub-County</div>
              <div className="text-xs text-slate-600">24 Facilities Active</div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-afya-600 h-full w-[90%]" />
              </div>
              <div className="text-[11px] text-slate-500 text-right">90% Digital Sync</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
