'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Check, X, Shield, Users, Building, Activity, FileKey } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function RolesPermissionsPage() {
  const roles = [
    { id: 'patient', name: 'Patient', icon: <Users className="w-4 h-4 text-slate-500" /> },
    { id: 'healthcare_worker', name: 'Healthcare Worker', icon: <Activity className="w-4 h-4 text-blue-500" /> },
    { id: 'facility_admin', name: 'Facility Admin', icon: <Building className="w-4 h-4 text-indigo-500" /> },
    { id: 'county_admin', name: 'County Admin', icon: <Shield className="w-4 h-4 text-purple-500" /> },
    { id: 'system_auditor', name: 'System Auditor', icon: <FileKey className="w-4 h-4 text-red-500" /> },
  ];

  const permissions = [
    { key: 'canViewRecord', label: 'View Patient Records' },
    { key: 'canCreateEncounter', label: 'Create Clinical Encounters' },
    { key: 'canOverrideEmergency', label: 'Emergency Access Override' },
    { key: 'canViewAnalytics', label: 'View Facility/County Analytics' },
    { key: 'canManageFacilities', label: 'Manage Facilities & Staff' },
  ];

  // RBAC matrix mapping
  const matrix: Record<string, Record<string, boolean>> = {
    patient: {
      canViewRecord: true,
      canCreateEncounter: false,
      canOverrideEmergency: false,
      canViewAnalytics: false,
      canManageFacilities: false,
    },
    healthcare_worker: {
      canViewRecord: true,
      canCreateEncounter: true,
      canOverrideEmergency: true,
      canViewAnalytics: false,
      canManageFacilities: false,
    },
    facility_admin: {
      canViewRecord: false,
      canCreateEncounter: false,
      canOverrideEmergency: false,
      canViewAnalytics: true,
      canManageFacilities: true, // Facility level only
    },
    county_admin: {
      canViewRecord: false, // Unless also an HCW
      canCreateEncounter: false,
      canOverrideEmergency: false,
      canViewAnalytics: true,
      canManageFacilities: true, // County level
    },
    system_auditor: {
      canViewRecord: true, // Read-only for audit
      canCreateEncounter: false,
      canOverrideEmergency: false,
      canViewAnalytics: true,
      canManageFacilities: false,
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Role-Based Access Control (RBAC)</h1>
        <p className="text-sm text-gray-500 mt-1">Review system permissions and access boundaries across different user roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permissions Matrix</CardTitle>
          <CardDescription>Global overview of access rights mapped to system roles</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Permission / Resource</TableHead>
                {roles.map(role => (
                  <TableHead key={role.id} className="text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 bg-slate-50 rounded-full border border-slate-100">
                        {role.icon}
                      </div>
                      <span className="text-xs font-medium whitespace-nowrap">{role.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map(perm => (
                <TableRow key={perm.key}>
                  <TableCell className="font-medium text-sm text-slate-700">
                    {perm.label}
                    <div className="text-xs text-slate-400 font-mono mt-1">{perm.key}</div>
                  </TableCell>
                  {roles.map(role => (
                    <TableCell key={`${role.id}-${perm.key}`} className="text-center align-middle">
                      {matrix[role.id][perm.key] ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map(role => (
          <Card key={role.id} className="border-t-4" style={{
            borderTopColor: 
              role.id === 'patient' ? '#64748b' : 
              role.id === 'healthcare_worker' ? '#3b82f6' : 
              role.id === 'facility_admin' ? '#6366f1' : 
              role.id === 'county_admin' ? '#a855f7' : '#ef4444'
          }}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                {role.icon}
                <CardTitle className="text-base">{role.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {role.id === 'patient' && "End-users who access their own digital health wallet, view clinical history, and manage consent settings."}
                {role.id === 'healthcare_worker' && "Clinical staff operating in facilities. Authorized to view patient charts and record clinical encounters."}
                {role.id === 'facility_admin' && "Administrators managing staff rosters, reviewing facility-level KPIs, and onboarding local users."}
                {role.id === 'county_admin' && "High-level administrators overseeing the county pilot, cross-facility performance, and global settings."}
                {role.id === 'system_auditor' && "Security personnel tasked with reviewing access logs, emergency overrides, and compliance."}
              </p>
              <Badge variant="neutral" className="bg-slate-50">Role ID: {role.id}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
