'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { QrCardPreview } from '@/components/QrCardPreview';
import { IcShieldAlert, IcPrint, IcRefresh, IcXCircle, IcFilePlus } from '@/components/icons';
import { mockPatients } from '@/lib/mock-data';

// MOCK DATA — Replace with Supabase query when backend integration is implemented
const mockIssuedCards = [
  {
    id: 'CRD-982-124',
    patientName: mockPatients[0].givenName + ' ' + mockPatients[0].familyName,
    afyaPassId: mockPatients[0].afyaPassId,
    issueDate: '2026-08-15',
    facility: "Murang'a Level 5 Hospital",
    status: 'Active'
  },
  {
    id: 'CRD-451-992',
    patientName: mockPatients[1].givenName + ' ' + mockPatients[1].familyName,
    afyaPassId: mockPatients[1].afyaPassId,
    issueDate: '2026-08-02',
    facility: 'Kangema Sub-County Hospital',
    status: 'Active'
  },
  {
    id: 'CRD-112-774',
    patientName: 'John Doe',
    afyaPassId: 'AFY-KE-MUR-9901',
    issueDate: '2023-10-10',
    facility: 'Aga Khan Hospital',
    status: 'Revoked'
  }
];

export default function AfyaPassCardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">AfyaPass Card Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage physical and digital AfyaPass cards for patients</p>
        </div>
        <Button>
          <IcFilePlus className="w-4 h-4 mr-2" />
          Issue New Card
        </Button>
      </div>

      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 flex items-start gap-3">
        <IcShieldAlert className="w-5 h-5 text-warning-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-warning-800">CRITICAL SECURITY PROTOCOL</h3>
          <p className="text-sm text-warning-700 mt-1">
            QR codes contain ONLY an opaque cryptographic reference ID (AFY-KE-MUR-...). Zero medical history, diagnoses, or national IDs are stored in the QR payload.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-8 h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white border-border/60">
             <QrCardPreview 
                patientName="Jane Doe" 
                patientId="AFY-KE-MUR-8891" 
                facilityName="Nairobi Hospital"
                county="Murang'a County"
             />
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Card Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-500">AfyaPass ID</p>
                <p className="font-medium">AFY-KE-MUR-8891</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <Badge variant="success">Active</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500">Issue Date</p>
                <p className="font-medium">Nov 15, 2023</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Expiry Date</p>
                <p className="font-medium">Nov 15, 2028</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-500">Issuer Facility</p>
                <p className="font-medium">Nairobi Hospital</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <IcPrint className="w-4 h-4 mr-2" />
                Print Physical Card
              </Button>
              <Button variant="outline" className="justify-start">
                <IcRefresh className="w-4 h-4 mr-2" />
                Generate QR Token
              </Button>
              <Button variant="outline" className="justify-start text-warning-600 hover:text-warning-700 hover:bg-warning-50">
                <IcRefresh className="w-4 h-4 mr-2" />
                Replace Lost Card
              </Button>
              <Button variant="outline" className="justify-start text-danger-600 hover:text-danger-700 hover:bg-danger-50">
                <IcXCircle className="w-4 h-4 mr-2" />
                Revoke Card
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-medium text-slate-900">Issued Cards Audit</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Card ID</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Patient Name</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">AfyaPass ID</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Issue Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Facility</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Status</th>
                <th className="text-right py-3 px-4 font-medium text-sm text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockIssuedCards.map((card, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-mono">{card.id}</td>
                  <td className="py-3 px-4 text-sm font-medium">{card.patientName}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{card.afyaPassId}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{card.issueDate}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{card.facility}</td>
                  <td className="py-3 px-4 text-sm">
                    <Badge variant={card.status === 'Active' ? 'success' : 'destructive'}>
                      {card.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    <Button variant="ghost" size="sm">View</Button>
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
