'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { mockMedications } from '@/lib/mock-data';

export default function MedicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Prescriptions & Medication Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor active and historical patient prescriptions</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput placeholder="Search drug name or patient..." className="w-full" />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Completed' },
                { value: 'discontinued', label: 'Discontinued' },
              ]}
              value="all"
              onChange={() => {}}
            />
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Drug Name & Dosage</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Route & Frequency</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Prescribing Clinician</th>
              </tr>
            </thead>
            <tbody>
              {/* MOCK DATA — Replace with Supabase query when backend integration is implemented */}
              {mockMedications.map((med) => (
                <tr key={med.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm text-gray-900">{med.drugName}</div>
                    <div className="text-xs text-gray-500">{med.dosage}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">{med.patientId.substring(0,8)}...</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">{med.route}</div>
                    <div className="text-xs text-gray-500">{med.frequency}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <div>{new Date(med.startDate).toLocaleDateString()} to</div>
                    <div>{med.endDate ? new Date(med.endDate).toLocaleDateString() : 'Ongoing'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={
                      med.status === 'Active' ? 'success' : 
                      med.status === 'Discontinued' ? 'destructive' : 'secondary'
                    }>
                      {med.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    Dr. {med.prescribedBy.substring(0,8)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
