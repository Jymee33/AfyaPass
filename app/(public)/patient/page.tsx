import React from 'react';
import { QrCardPreview } from '@/components/QrCardPreview';
import { IcShieldCheck, IcHistory, IcLock, IcUserCheck, IcAlertCircle } from '@/components/icons';

export default function PatientPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-afya-50 text-afya-700 rounded-full border border-afya-200 mb-2">
              <IcUserCheck className="h-4 w-4" />
              <span>Patient Portal Concept</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Patient Dashboard & Digital Card</h1>
            <p className="text-sm text-slate-500">
              Manage your AfyaPass Patient ID, inspect facility visit logs, and set data authorization preferences.
            </p>
          </div>
          <div className="text-xs bg-warning-50 text-warning-800 p-3 rounded-lg border border-warning-200 flex items-center gap-2 max-w-sm">
            <IcAlertCircle className="w-4 h-4 text-warning-600 shrink-0" />
            <span>Demo Placeholder: Clearly marked mock data for application shell testing.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Digital AfyaPass Card</h2>
            <QrCardPreview
              patientName="Wanjiku Njuguna (Demo)"
              afyaPassId="AFY-KE-MUR-2026-98421"
              county="Murang'a County"
            />
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <IcLock className="w-4 h-4 text-afya-600" />
                Data Access Consent Policy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                By default, healthcare providers in registered Murang'a County facilities can read your clinical history upon physical QR card presentation. You can toggle global facility access at any time.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <span className="font-medium text-slate-700">Participating Facility Read Access:</span>
                <span className="px-2 py-0.5 bg-success-100 text-success-800 font-bold rounded">ENABLED</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <IcHistory className="w-5 h-5 text-afya-600" />
                    Access & Audit History
                  </h2>
                  <p className="text-xs text-slate-500">
                    Transparent log of all healthcare workers and facilities that accessed your health record.
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-400">Showing last 3 events</span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-900">Murang'a Level 5 Hospital</div>
                    <div className="text-xs text-slate-500">Dr. James Kamau — Outpatient Encounter</div>
                    <div className="text-[11px] font-mono text-afya-700 mt-1">Action: ENCOUNTER_CREATE</div>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="text-xs font-medium text-slate-600">2026-08-24 14:30 EAT</div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-success-700 bg-success-50 px-2 py-0.5 rounded font-medium border border-success-200 mt-1">
                      <IcShieldCheck className="h-4 w-4" /> SUCCESS
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-900">Kenol Sub-County Hospital</div>
                    <div className="text-xs text-slate-500">Nurse Grace Wambui — Immunization Visit</div>
                    <div className="text-[11px] font-mono text-afya-700 mt-1">Action: RECORD_VIEW</div>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="text-xs font-medium text-slate-600">2026-08-18 09:15 EAT</div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-success-700 bg-success-50 px-2 py-0.5 rounded font-medium border border-success-200 mt-1">
                      <IcShieldCheck className="h-4 w-4" /> SUCCESS
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-900">Maragua Health Centre</div>
                    <div className="text-xs text-slate-500">QR Scan Verification</div>
                    <div className="text-[11px] font-mono text-afya-700 mt-1">Action: QR_SCAN</div>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="text-xs font-medium text-slate-600">2026-08-01 11:02 EAT</div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-success-700 bg-success-50 px-2 py-0.5 rounded font-medium border border-success-200 mt-1">
                      <IcShieldCheck className="h-4 w-4" /> SUCCESS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
