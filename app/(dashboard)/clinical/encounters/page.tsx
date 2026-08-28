'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { IcPlus } from '@/components/icons';
import { mockEncounters } from '@/lib/mock-data';

export default function EncountersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Clinical Encounters</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and view patient visits and encounters</p>
        </div>
        <Button>
          <IcPlus className="w-4 h-4 mr-2" />
          File New Encounter
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput placeholder="Search encounters..." className="w-full" />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'Outpatient', label: 'Outpatient' },
                { value: 'Inpatient', label: 'Inpatient' },
                { value: 'Emergency', label: 'Emergency' },
              ]}
              value="all"
              onChange={() => {}}
            />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Facilities' },
                { value: 'nh', label: 'Nairobi Hospital' },
                { value: 'knh', label: 'Kenyatta National Hospital' },
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
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Date/Time</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Facility & Provider</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Type</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Primary Diagnosis</th>
                <th className="text-right py-3 px-4 font-medium text-sm text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* MOCK DATA — Replace with Supabase query when backend integration is implemented */}
              {mockEncounters.map((encounter) => (
                <tr key={encounter.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">
                    {new Date(encounter.encounterDate).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm text-slate-900">{encounter.patientId.substring(0,8)}...</div>
                    <div className="text-xs text-slate-500">{encounter.patientId}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-900">{encounter.facilityId}</div>
                    <div className="text-xs text-slate-500">Dr. {encounter.workerId.substring(0,6)}...</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={encounter.encounterType === 'Emergency' ? 'destructive' : 'primary'}>
                      {encounter.encounterType}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {encounter.summaryNote || 'No primary diagnosis recorded'}
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
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
