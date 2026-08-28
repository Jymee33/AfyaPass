'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockHealthcareWorkers, mockFacilities } from '@/lib/mock-data';
import { IcPlus, IcSearch, IcFilter, IcMore, IcUserCheck, IcUserX } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function UsersManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredUsers = mockHealthcareWorkers.filter(w => {
    const searchMatch = w.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        w.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = roleFilter === 'All' || w.roleTitle === roleFilter;
    return searchMatch && roleMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">User Accounts & Identity Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage system access, roles, and credentials for healthcare workers</p>
        </div>
        <Button className="flex items-center gap-2">
          <IcPlus className="w-4 h-4" />
          Invite User
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <IcSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by name or license number..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Roles' },
                  { value: 'Doctor', label: 'Doctor' },
                  { value: 'Nurse', label: 'Nurse' },
                  { value: 'Lab Technician', label: 'Lab Technician' },
                  { value: 'Pharmacist', label: 'Pharmacist' }
                ]}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <IcFilter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Assigned Facility</TableHead>
                <TableHead>License No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const facility = mockFacilities.find(f => f.id === user.facilityId);
                
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.fullName}</div>
                      <div className="text-xs text-slate-500">user_{user.id.split('-')[1]}@afyapass.go.ke</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50">{user.roleTitle}</Badge>
                      <div className="text-xs text-slate-500 mt-1">{user.department}</div>
                    </TableCell>
                    <TableCell className="text-sm">{facility?.name}</TableCell>
                    <TableCell className="font-mono text-xs">{user.licenseNumber}</TableCell>
                    <TableCell>
                      <Badge variant={user.isVerified ? 'success' : 'warning'} className="rounded-full flex items-center gap-1 w-max">
                        {user.isVerified ? <IcUserCheck className="h-4 w-4" /> : <IcUserX className="h-4 w-4" />}
                        {user.isVerified ? 'Active' : 'Pending Verification'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="More actions">
                        <IcMore className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No users found matching your criteria.
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
