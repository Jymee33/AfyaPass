import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { mockDiagnoses } from '@/lib/mock-data';

export default function DiagnosesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">ICD-11 Diagnoses Registry</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage patient diagnoses using ICD-11 standard</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput placeholder="Search ICD code or description..." className="w-full" />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'chronic', label: 'Chronic' },
              ]}
              value="all"
              onChange={() => {}}
            />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
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
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">ICD-11 Code</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Description</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Type & Status</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Diagnosed Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Provider & Facility</th>
              </tr>
            </thead>
            <tbody>
              {/* MOCK DATA — Replace with Supabase query when backend integration is implemented */}
              {mockDiagnoses.map((diagnosis) => (
                <tr key={diagnosis.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {diagnosis.icdCode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {diagnosis.description}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">{diagnosis.patientId.substring(0,8)}...</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Badge variant="outline">{diagnosis.type}</Badge>
                      <Badge variant={diagnosis.status === 'Active' ? 'success' : 'secondary'}>
                        {diagnosis.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(diagnosis.diagnosedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">{diagnosis.diagnosedBy.substring(0,8)}...</div>
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
