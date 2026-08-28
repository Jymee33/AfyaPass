'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockReferrals, mockFacilities, mockPatients } from '@/lib/mock-data';
import { IcPlus, IcArrows, IcArrowIncoming, IcArrowOutgoing, IcActivity } from '@/components/icons';
import Link from 'next/link';

export default function ReferralsOverviewPage() {
  const incomingCount = mockReferrals.filter(r => r.targetFacilityId === 'fac-001').length;
  const outgoingCount = mockReferrals.filter(r => r.sourceFacilityId === 'fac-001').length;
  const pendingCount = mockReferrals.filter(r => r.status === 'Pending').length;
  const urgentCount = mockReferrals.filter(r => r.urgency === 'Emergency' || r.urgency === 'Urgent').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Cross-Facility Referral Network</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track patient transfers across facilities</p>
        </div>
        <Button className="flex items-center gap-2">
          <IcPlus className="w-4 h-4" />
          Create New Referral
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Incoming Referrals" 
          value={incomingCount} 
          icon={<IcArrowIncoming className="w-5 h-5 text-info-600" />}
          trend="+2"
          trendDirection="up"
        />
        <StatCard 
          title="Outgoing Referrals" 
          value={outgoingCount} 
          icon={<IcArrowOutgoing className="w-5 h-5 text-afya-600" />}
          trend="-1"
          trendDirection="down"
        />
        <StatCard 
          title="Pending Review" 
          value={pendingCount} 
          icon={<IcActivity className="w-5 h-5 text-warning-600" />}
        />
        <StatCard 
          title="Urgent Referrals" 
          value={urgentCount} 
          icon={<IcArrows className="w-5 h-5 text-danger-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Network Activity</CardTitle>
            <div className="flex gap-2">
              <Link href="/referrals/incoming">
                <Button variant="outline" size="sm">View Incoming</Button>
              </Link>
              <Link href="/referrals/outgoing">
                <Button variant="outline" size="sm">View Outgoing</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Pathway</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReferrals.slice(0, 5).map((referral) => {
                    const patient = mockPatients.find(p => p.id === referral.patientId);
                    const source = mockFacilities.find(f => f.id === referral.sourceFacilityId);
                    const target = mockFacilities.find(f => f.id === referral.targetFacilityId);
                    
                    return (
                      <TableRow key={referral.id}>
                        <TableCell>
                          <div className="font-medium">{patient?.givenName} {patient?.familyName}</div>
                          <div className="text-xs text-slate-500">{patient?.afyaPassId}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="truncate max-w-[120px]">{source?.name}</span>
                            <IcArrows className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <span className="truncate max-w-[120px] font-medium">{target?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={referral.urgency === 'Emergency' ? 'danger' : referral.urgency === 'Urgent' ? 'warning' : 'default'}
                          >
                            {referral.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={referral.status === 'Completed' ? 'success' : referral.status === 'Pending' ? 'warning' : 'default'}
                          >
                            {referral.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Network Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-info-100 text-info-600 rounded-full flex items-center justify-center">
                <IcActivity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Map view is loading</p>
                <p className="text-xs text-slate-500 mt-1">Integration with County GIS system pending.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
