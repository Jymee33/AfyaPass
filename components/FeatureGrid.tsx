'use client';

import React from 'react';
import { Lock, RefreshCw, Layers, ShieldAlert, FileText, Activity } from 'lucide-react';

const FEATURES = [
  {
    icon: RefreshCw,
    title: 'Cross-Facility Continuity',
    description: 'Patient records follow the patient seamlessly across public, private, and faith-based healthcare centers.',
  },
  {
    icon: Lock,
    title: 'Opaque QR Identification',
    description: 'Physical QR cards hold zero clinical data. They act as cryptographically signed pointers to authenticated records.',
  },
  {
    icon: Layers,
    title: 'Role-Based Access Control',
    description: 'Granular policy separation between Patients, Healthcare Workers, Facility Admins, and County Officials.',
  },
  {
    icon: ShieldAlert,
    title: 'Immutable Audit Trail',
    description: 'Every record access, scan, and emergency override is recorded in an unalterable system audit log.',
  },
  {
    icon: FileText,
    title: 'Consent-Driven Access',
    description: 'Patients retain visibility and consent control over which facilities can access their history.',
  },
  {
    icon: Activity,
    title: 'County Analytics Engine',
    description: 'Provides de-identified epidemiological and facility workload analytics for Murang\'a County health management.',
  },
];

export function FeatureGrid() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-semibold text-afya-700 uppercase tracking-widest mb-2">
            Core Architecture Principles
          </h2>
          <p className="text-3xl font-bold text-slate-900">
            Engineered for Security, Interoperability & Portability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-afya-50 text-afya-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
