'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { IcFileText, IcPrint } from '@/components/icons';
import { mockLabOrders } from '@/lib/mock-data';

export default function LabResultsPage() {
  // Filter only completed orders for results view
  const completedResults = mockLabOrders.filter(order => order.status === 'Completed' && order.results);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Laboratory Test Results</h1>
          <p className="text-sm text-slate-500 mt-1">View and print completed laboratory reports</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput placeholder="Search test or patient..." className="w-full" />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Dates' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
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
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Test Name</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Result Summary</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Result Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Resulted By</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Status</th>
                <th className="text-right py-3 px-4 font-medium text-sm text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* MOCK DATA — Replace with Supabase query when backend integration is implemented */}
              {completedResults.map((result) => (
                <tr key={result.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm text-slate-900">{result.testName || 'Unknown Test'}</div>
                    <div className="text-xs text-slate-500">{result.testCode}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {result.patientId.substring(0,8)}...
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-slate-900 truncate max-w-[200px]" title={result.results}>
                      {result.results}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">
                    {result.resultDate ? new Date(result.resultDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-900">{result.resultedBy ? `Tech. ${result.resultedBy.substring(0,6)}...` : '-'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success">Completed</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" title="View Report" aria-label="View Report">
                        <IcFileText className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Print Report" aria-label="Print Report">
                        <IcPrint className="w-4 h-4 text-slate-500" />
                      </Button>
                    </div>
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
