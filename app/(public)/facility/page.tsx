'use client';

import React, { useState } from 'react';
import { Stethoscope, QrCode, Search, ShieldAlert, FilePlus, AlertTriangle, CheckCircle } from 'lucide-react';
import { parseAfyaPassQrCode } from '@/lib/qr';

export default function FacilityPage() {
  const [searchInput, setSearchInput] = useState('AFY-KE-MUR-2026-98421');
  const [scanResult, setScanResult] = useState<{ success: boolean; id?: string; error?: string } | null>(null);

  const handleScanLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const result = parseAfyaPassQrCode(searchInput);
    if (result.success && result.payload) {
      setScanResult({ success: true, id: result.payload.id });
    } else {
      setScanResult({ success: false, error: result.error || 'Invalid AfyaPass QR or Patient ID format' });
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-afya-500/20 text-afya-300 rounded-full border border-afya-500/30 mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Healthcare Worker & Facility Portal</span>
            </div>
            <h1 className="text-2xl font-bold">Murang'a Level 5 Hospital — Clinical Desk</h1>
            <p className="text-xs text-slate-400 mt-1">
              Facility MFL Code: <span className="font-mono text-afya-300">MFL-13782</span> | Clinician: Dr. J. Kamau (Verified)
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>RLS Active: Audit Logging Enforced</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-afya-600" />
                Scan QR Card or Enter Patient ID
              </h2>
              <p className="text-xs text-slate-500">
                Place the physical AfyaPass card in front of the scanner or type the AfyaPass Patient ID reference.
              </p>

              <form onSubmit={handleScanLookup} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="e.g. AFY-KE-MUR-2026-98421"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-afya-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-3 py-1.5 bg-afya-600 hover:bg-afya-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" /> Lookup
                  </button>
                </div>
              </form>

              {scanResult && (
                <div
                  className={`p-4 rounded-xl border text-xs ${
                    scanResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  {scanResult.success ? (
                    <div className="space-y-1">
                      <div className="font-bold flex items-center gap-1 text-emerald-800">
                        <CheckCircle className="w-4 h-4" /> Valid AfyaPass Patient ID Verified
                      </div>
                      <p className="font-mono font-semibold">Patient ID: {scanResult.id}</p>
                      <p className="text-[11px] text-emerald-700">
                        Opaque reference resolved via Supabase RLS. Active consent detected.
                      </p>
                    </div>
                  ) : (
                    <div className="font-semibold flex items-center gap-1 text-red-800">
                      <AlertTriangle className="w-4 h-4" /> {scanResult.error}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-amber-900 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Emergency Access Protocol
              </h3>
              <p className="text-xs leading-relaxed">
                If the patient is unconscious or unable to scan their card, clinicians can initiate an Emergency Access Override. This action generates a flagged high-priority entry in the system audit trail.
              </p>
              <button
                type="button"
                onClick={() => alert('Emergency access override requested. High-priority audit log entry generated.')}
                className="w-full mt-2 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Trigger Emergency Override
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FilePlus className="w-5 h-5 text-afya-600" />
                    Record Clinical Encounter
                  </h2>
                  <p className="text-xs text-slate-500">
                    File a new outpatient/inpatient encounter to follow the patient to their next facility.
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-afya-100 text-afya-800 font-bold rounded">
                  Demo Shell
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Encounter Type</label>
                    <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium">
                      <option>Outpatient Consultation</option>
                      <option>Inpatient Admission</option>
                      <option>Emergency Room</option>
                      <option>Immunization Clinic</option>
                      <option>Laboratory Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Patient AfyaPass ID</label>
                    <input
                      type="text"
                      readOnly
                      value="AFY-KE-MUR-2026-98421"
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg font-mono text-slate-700 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary ICD-11 Diagnosis Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 1C40.0 (Malaria confirmed) or CA40.0 (Hypertension)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Prescribed Medications / Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g. Artemether/Lumefantrine 20/120mg — 2 tabs bd x 3 days"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinical Summary Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Patient presented with 2-day history of fever and chills..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => alert('Clinical encounter saved cleanly (Demo Mock).')}
                  className="w-full py-3 bg-afya-600 hover:bg-afya-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  Save & Sync Clinical Encounter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
