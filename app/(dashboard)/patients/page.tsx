'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';
import { mockPatients } from '@/lib/mock-data';
import { PatientProfile } from '@/types';
import { getInitials } from '@/lib/utils';

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Patient Directory</h1>
          <p className="text-slate-500">Manage and search for registered AfyaPass patients across the county.</p>
        </div>
        <Link href="/patients/register">
          <Button className="bg-afya-600 hover:bg-afya-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Register New Patient
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by name or AfyaPass ID..." 
            className="pl-9 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select className="flex h-10 w-full md:w-40 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
            <option>All Sub-Counties</option>
            <option>Kiharu</option>
            <option>Kangema</option>
            <option>Maragua</option>
            <option>Kandara</option>
            <option>Gatanga</option>
          </select>
          <select className="flex h-10 w-full md:w-36 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
            <option>Status: All</option>
            <option>Active</option>
            <option>Consent Granted</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Patient Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer hover:text-slate-800">
                  Patient Name <ArrowUpDown className="w-3 h-3" />
                </th>
                <th className="px-6 py-4 font-medium">AfyaPass ID</th>
                <th className="px-6 py-4 font-medium">DOB</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Consent</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPatients.map((patient: PatientProfile) => (
                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-slate-100 text-slate-600">
                        {getInitials(patient.givenName + ' ' + patient.familyName)}
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-900">{patient.givenName} {patient.familyName}</div>
                        <div className="text-xs text-slate-500">{patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-mono text-xs bg-slate-50">
                      {patient.afyaPassId}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {patient.dateOfBirth}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900">{patient.subCounty}</div>
                    <div className="text-xs text-slate-500">{patient.county}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={patient.consentGranted ? 'success' : 'default'} className="text-xs">
                      {patient.consentGranted ? 'Granted' : 'Revoked'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/patients/${patient.id}`}>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View Profile
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50">
          <div>Showing 1-{mockPatients.length} of {mockPatients.length} patients</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
