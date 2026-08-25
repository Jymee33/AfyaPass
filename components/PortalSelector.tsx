'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Building2, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';

export function PortalSelector() {
  const [activePortal, setActivePortal] = useState<'patient' | 'facility' | 'county'>('facility');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-semibold text-afya-700 uppercase tracking-widest mb-2">
            Tailored Access Portals
          </h2>
          <p className="text-3xl font-bold text-slate-900">
            Choose Your Ecosystem View
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 gap-2">
            <button
              onClick={() => setActivePortal('patient')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activePortal === 'patient'
                  ? 'bg-white text-afya-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              Patient Portal
            </button>
            <button
              onClick={() => setActivePortal('facility')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activePortal === 'facility'
                  ? 'bg-white text-afya-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Facility Portal
            </button>
            <button
              onClick={() => setActivePortal('county')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activePortal === 'county'
                  ? 'bg-white text-afya-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              County Admin
            </button>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 border border-slate-800 shadow-xl max-w-4xl mx-auto">
          {activePortal === 'patient' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-afya-400 font-semibold text-sm">
                <User className="w-5 h-5" />
                <span>Patient Self-Service Concept</span>
              </div>
              <h3 className="text-2xl font-bold">Manage Your AfyaPass ID & Digital Health Consent</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Patients can log in to view their digital AfyaPass card, track facility visit history, update consent authorizations, and inspect who accessed their health record.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  View laminated card QR code & AfyaPass ID reference
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Revoke or grant facility-level access permissions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Full access log history showing facility, clinician & timestamp
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/patient"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-afya-500 hover:bg-afya-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors"
                >
                  Explore Patient Portal Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {activePortal === 'facility' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-afya-400 font-semibold text-sm">
                <Building2 className="w-5 h-5" />
                <span>Healthcare Worker & Facility Portal</span>
              </div>
              <h3 className="text-2xl font-bold">Fast QR Identification & Clinical Encounter Filing</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Designed for doctors, nurses, and lab technicians in Murang'a County facilities. Instantly scan a patient's AfyaPass card to review allergies, past visits, and record new clinical encounters.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Instant QR card scan & AfyaPass ID lookup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Log vitals, ICD-11 diagnosis codes, prescriptions & referrals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Emergency access override protocol with mandatory audit logging
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/facility"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-afya-500 hover:bg-afya-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors"
                >
                  Explore Facility Portal Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {activePortal === 'county' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-afya-400 font-semibold text-sm">
                <BarChart3 className="w-5 h-5" />
                <span>County Administration & Public Health</span>
              </div>
              <h3 className="text-2xl font-bold">De-Identified Epidemiological & Facility Metrics</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Empowers Murang'a County health leadership with real-time, anonymized data on facility workloads, disease incidence, and referral pathways without accessing individual medical records.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Sub-county facility encounter volume charts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  MFL registered facility status & staff audit summary
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  De-identified public health surveillance reporting
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/county"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-afya-500 hover:bg-afya-400 text-slate-950 font-semibold rounded-lg text-sm transition-colors"
                >
                  Explore County Dashboard Demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
