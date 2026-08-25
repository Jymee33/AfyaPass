'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockReferrals, mockFacilities, mockPatients } from '@/lib/mock-data';
import { Filter, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function IncomingReferralsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // MOCK DATA - Replace with actual user's facility ID when auth is integrated
  const myFacilityId = 'fac-001'; 
  
  const incoming = mockReferrals.filter(r => r.targetFacilityId === myFacilityId);

  const filtered = incoming.filter(r => {
    const patient = mockPatients.find(p => p.id === r.patientId);
    const searchMatch = patient?.givenName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        patient?.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        patient?.afyaPassId.toLowerCase().includes(searchTerm.toLowerCase());
    const urgencyMatch = urgencyFilter === 'All' || r.urgency === urgencyFilter;
    const statusMatch = statusFilter === 'All' || r.status === statusFilter;
    return searchMatch && urgencyMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Incoming Patient Referrals</h1>
        <p className="text-sm text-gray-500 mt-1">Review and manage patients referred to your facility</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by patient name or ID..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select 
                value={urgencyFilter} 
                onChange={(e) => setUrgencyFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Urgencies' },
                  { value: 'Routine', label: 'Routine' },
                  { value: 'Urgent', label: 'Urgent' },
                  { value: 'Emergency', label: 'Emergency' }
                ]}
              />
            </div>
            <div className="w-full md:w-48">
              <Select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Statuses' },
                  { value: 'Pending', label: 'Pending' },
                  { value: 'Accepted', label: 'Accepted' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Completed', label: 'Completed' }
                ]}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referral ID</TableHead>
                <TableHead>Patient Details</TableHead>
                <TableHead>Source Facility</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Date & Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((referral) => {
                const patient = mockPatients.find(p => p.id === referral.patientId);
                const source = mockFacilities.find(f => f.id === referral.sourceFacilityId);
                
                return (
                  <TableRow key={referral.id}>
                    <TableCell className="font-mono text-xs">{referral.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{patient?.givenName} {patient?.familyName}</div>
                      <div className="text-xs text-gray-500">{patient?.afyaPassId}</div>
                    </TableCell>
                    <TableCell>{source?.name}</TableCell>
                    <TableCell>
                      <Badge variant={referral.urgency === 'Emergency' ? 'danger' : referral.urgency === 'Urgent' ? 'warning' : 'default'}>
                        {referral.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(referral.referralDate).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]" title={referral.reason}>
                        {referral.reason}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={referral.status === 'Completed' ? 'success' : referral.status === 'Pending' ? 'warning' : 'default'}>
                        {referral.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {referral.status === 'Pending' ? (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                              <CheckCircle className="w-4 h-4 mr-1" /> Accept
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                              <XCircle className="w-4 h-4 mr-1" /> Decline
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" /> View Chart
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No incoming referrals found matching your criteria.
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
