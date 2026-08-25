import React, { use } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockFacilities, mockHealthcareWorkers, mockEncounters, mockReferrals } from '@/lib/mock-data';
import { Building2, Users, Activity, UserPlus, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function FacilityProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const facilityId = resolvedParams.id;
  
  const facility = mockFacilities.find(f => f.id === facilityId);
  
  if (!facility) {
    notFound();
  }

  const staff = mockHealthcareWorkers.filter(w => w.facilityId === facilityId);
  const encounters = mockEncounters.filter(e => e.facilityId === facilityId);
  const referralsPending = mockReferrals.filter(r => r.targetFacilityId === facilityId && r.status === 'Pending');

  // Mock KPIs
  const todayPatients = 142; // MOCK DATA
  const activeEncounters = 89; // MOCK DATA
  const onDutyStaff = 48; // MOCK DATA

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">{facility.name}</h1>
              <Badge variant="outline" className="bg-slate-50">Level {facility.level}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">{facility.facilityCode}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {facility.subCounty}, {facility.county}</span>
              <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {facility.facilityType}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/facilities">
            <Button variant="outline">Back to Directory</Button>
          </Link>
          <Button>Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Today's Patients" 
          value={todayPatients} 
          icon={<Users className="w-5 h-5 text-blue-600" />}
          trend="+12%"
          trendDirection="up"
        />
        <StatCard 
          title="Active Encounters" 
          value={activeEncounters} 
          icon={<Activity className="w-5 h-5 text-indigo-600" />}
        />
        <StatCard 
          title="Pending Referrals" 
          value={referralsPending.length} 
          icon={<UserPlus className="w-5 h-5 text-amber-600" />}
        />
        <StatCard 
          title="On-Duty Staff" 
          value={onDutyStaff} 
          icon={<Users className="w-5 h-5 text-teal-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Healthcare Workers Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Name</TableHead>
                      <TableHead>Role Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>License Number</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell className="font-medium">{worker.fullName}</TableCell>
                        <TableCell>{worker.roleTitle}</TableCell>
                        <TableCell>{worker.department}</TableCell>
                        <TableCell className="font-mono text-xs">{worker.licenseNumber}</TableCell>
                        <TableCell>
                          <Badge variant={worker.isVerified ? 'success' : 'default'} className="rounded-full">
                            {worker.isVerified ? 'Verified' : 'Pending'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {staff.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          No staff members assigned to this facility.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Outpatient', 'Emergency', 'Pediatrics', 'Maternity', 'Lab', 'Pharmacy'].map((dept) => (
                  <div key={dept} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-700 font-medium">{dept}</span>
                    <Badge variant="outline">{Math.floor(Math.random() * 30) + 5} staff</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">+254 700 000 000</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">admin@{facility.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.go.ke</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
