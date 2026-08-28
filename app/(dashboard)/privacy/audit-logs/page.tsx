'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Search, Filter } from 'lucide-react';
import { AuditLogEntry } from '@/types';
import { mockHealthcareWorkers, mockFacilities, mockPatients } from '@/lib/mock-data';

// Mock data for audit logs
const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-08-25T10:15:00Z',
    actorId: 'hw-001',
    actorRole: 'healthcare_worker',
    facilityId: 'fac-001',
    patientId: 'pat-001',
    action: 'RECORD_VIEW',
    resourcePath: '/patients/pat-001/chart',
    ipAddressHash: '8f4e2b...9a1c',
    status: 'SUCCESS'
  },
  {
    id: 'log-002',
    timestamp: '2026-08-25T09:30:00Z',
    actorId: 'hw-004',
    actorRole: 'healthcare_worker',
    facilityId: 'fac-005',
    patientId: 'pat-004',
    action: 'EMERGENCY_OVERRIDE',
    resourcePath: '/patients/pat-004/emergency-access',
    ipAddressHash: '2c7d9a...4f3e',
    status: 'SUCCESS'
  },
  {
    id: 'log-003',
    timestamp: '2026-08-24T16:45:00Z',
    actorId: 'hw-007',
    actorRole: 'patient', // Mocking a patient attempting to view someone else's record (or unauthorized HW)
    facilityId: 'fac-001',
    patientId: 'pat-002',
    action: 'RECORD_VIEW',
    resourcePath: '/patients/pat-002/chart',
    ipAddressHash: '5b1a8f...2d7c',
    status: 'DENIED',
    denialReason: 'No consent granted for cross-facility read'
  },
  {
    id: 'log-004',
    timestamp: '2026-08-24T14:20:00Z',
    actorId: 'hw-002',
    actorRole: 'healthcare_worker',
    facilityId: 'fac-002',
    patientId: 'pat-008',
    action: 'QR_SCAN',
    resourcePath: '/auth/qr-verify',
    ipAddressHash: '1e3d5c...9b8a',
    status: 'SUCCESS'
  },
  {
    id: 'log-005',
    timestamp: '2026-08-23T11:10:00Z',
    actorId: 'hw-003',
    actorRole: 'healthcare_worker',
    facilityId: 'fac-003',
    patientId: 'pat-002',
    action: 'ENCOUNTER_CREATE',
    resourcePath: '/encounters/new',
    ipAddressHash: '7a9b2c...5f4e',
    status: 'SUCCESS'
  }
];

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLogs = mockAuditLogs.filter(log => {
    const actor = mockHealthcareWorkers.find(w => w.id === log.actorId);
    const searchMatch = log.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        actor?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const actionMatch = actionFilter === 'All' || log.action === actionFilter;
    const statusMatch = statusFilter === 'All' || log.status === statusFilter;
    return searchMatch && actionMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">System Audit Trail & Security Logs</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor system access, consent overrides, and security events</p>
        </div>
        <div className="flex items-center gap-2 bg-danger-50 text-danger-700 px-3 py-1.5 rounded-full text-sm font-medium border border-danger-200">
          <ShieldCheck className="w-4 h-4" />
          Restricted Access: System Auditors & County Administrators Only
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by actor or log ID..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select 
                value={actionFilter} 
                onChange={(e) => setActionFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Actions' },
                  { value: 'QR_SCAN', label: 'QR Scan' },
                  { value: 'RECORD_VIEW', label: 'Record View' },
                  { value: 'ENCOUNTER_CREATE', label: 'Encounter Create' },
                  { value: 'CONSENT_UPDATE', label: 'Consent Update' },
                  { value: 'EMERGENCY_OVERRIDE', label: 'Emergency Override' }
                ]}
              />
            </div>
            <div className="w-full md:w-40">
              <Select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Statuses' },
                  { value: 'SUCCESS', label: 'Success' },
                  { value: 'DENIED', label: 'Denied' }
                ]}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor & Role</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource / IP</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const actor = mockHealthcareWorkers.find(w => w.id === log.actorId) || { fullName: 'Unknown', roleTitle: log.actorRole };
                const facility = mockFacilities.find(f => f.id === log.facilityId);
                const patient = mockPatients.find(p => p.id === log.patientId);
                
                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{actor.fullName}</div>
                      <div className="text-xs text-slate-500 uppercase">{log.actorRole}</div>
                    </TableCell>
                    <TableCell className="text-sm">{facility?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={
                        log.action === 'EMERGENCY_OVERRIDE' ? 'danger' :
                        log.action === 'CONSENT_UPDATE' ? 'warning' : 'default'
                      }>
                        {log.action}
                      </Badge>
                      {patient && <div className="text-xs text-slate-500 mt-1">Target: {patient.afyaPassId}</div>}
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-xs bg-slate-50 p-1 rounded border border-slate-100 max-w-[200px] truncate" title={log.resourcePath}>
                        {log.resourcePath}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">IP: {log.ipAddressHash}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={log.status === 'SUCCESS' ? 'success' : 'danger'} className="w-max">
                          {log.status}
                        </Badge>
                        {log.denialReason && (
                          <span className="text-xs text-danger-600 truncate max-w-[150px]" title={log.denialReason}>
                            {log.denialReason}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No audit logs found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
