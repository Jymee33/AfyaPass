import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Plus, Activity, Heart, Thermometer, Wind } from 'lucide-react';
import { mockVitalSigns } from '@/lib/mock-data';

export default function VitalSignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Vital Signs Records</h1>
          <p className="text-sm text-gray-500 mt-1">Track patient vitals and clinical measurements</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Record Vitals
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput placeholder="Search patient..." className="w-full" />
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
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Recorded Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Blood Pressure</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Heart Rate</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Temperature</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">SpO2</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-500">Provider & Facility</th>
              </tr>
            </thead>
            <tbody>
              {/* MOCK DATA — Replace with Supabase query when backend integration is implemented */}
              {mockVitalSigns.map((vital) => {
                const isHighBP = vital.bloodPressureSystolic && vital.bloodPressureSystolic > 130;
                
                return (
                  <tr key={vital.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(vital.recordedAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900 font-medium">{vital.patientId.substring(0,8)}...</div>
                    </td>
                    <td className="py-3 px-4">
                      {vital.bloodPressureSystolic && vital.bloodPressureDiastolic ? (
                        <div className={`flex items-center gap-1.5 text-sm font-medium ${isHighBP ? 'text-red-600' : 'text-gray-900'}`}>
                          <Activity className="w-4 h-4" />
                          {vital.bloodPressureSystolic}/{vital.bloodPressureDiastolic} mmHg
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {vital.heartRate ? (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                          <Heart className="w-4 h-4 text-rose-500" />
                          {vital.heartRate} bpm
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {vital.temperature ? (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                          <Thermometer className="w-4 h-4 text-orange-500" />
                          {vital.temperature} °C
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {vital.oxygenSaturation ? (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                          <Wind className="w-4 h-4 text-blue-500" />
                          {vital.oxygenSaturation} %
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">Dr. {vital.recordedBy.substring(0,6)}...</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
