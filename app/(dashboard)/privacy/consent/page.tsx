'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { mockPatients, mockFacilities } from '@/lib/mock-data';
import { Shield, ShieldAlert, History, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function ConsentManagementPage() {
  const [patients, setPatients] = useState(mockPatients);

  const toggleConsent = (patientId: string) => {
    setPatients(patients.map(p => 
      p.id === patientId ? { ...p, consentGranted: !p.consentGranted } : p
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Patient Data Consent Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage global read access and patient consent preferences</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-4 items-start">
        <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-900">Security Architecture Notice</h3>
          <p className="text-sm text-blue-800 mt-1">
            AfyaPass utilizes a patient-controlled consent framework. For the Murang'a County pilot, consent is <strong>opt-in by default</strong> for all registered facilities. Patients can revoke global read access at any time, restricting their records to their primary facility only. Emergency overrides are logged and audited.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Consent Registry</CardTitle>
              <CardDescription>View and manage patient data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Details</TableHead>
                      <TableHead>Primary Facility</TableHead>
                      <TableHead>Global Read Access</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Overrides</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => {
                      const facility = mockFacilities.find(f => f.id === patient.primaryFacilityId);
                      return (
                        <TableRow key={patient.id}>
                          <TableCell>
                            <div className="font-medium">{patient.givenName} {patient.familyName}</div>
                            <div className="text-xs text-gray-500">{patient.afyaPassId}</div>
                          </TableCell>
                          <TableCell className="text-sm">{facility?.name}</TableCell>
                          <TableCell>
                            <button 
                              onClick={() => toggleConsent(patient.id)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                patient.consentGranted ? 'bg-green-500' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  patient.consentGranted ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                            <span className="ml-2 text-sm text-slate-600">
                              {patient.consentGranted ? 'Enabled' : 'Disabled'}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-slate-500">
                            {new Date(patient.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="bg-slate-50 text-slate-600">
                              <History className="w-3 h-3 mr-1" /> 0
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
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Consent Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Emergency Override</div>
                  <div className="text-xs text-slate-500">Allow break-glass in ER</div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Cross-County Sharing</div>
                  <div className="text-xs text-slate-500">Share outside Murang'a</div>
                </div>
                <Badge variant="default" className="bg-slate-200 text-slate-700">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Research & Analytics</div>
                  <div className="text-xs text-slate-500">Anonymized data usage</div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <strong>Important:</strong> Changes to consent policies take effect immediately across all connected KHIE nodes. Ensure patient understands implications before toggling access.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
