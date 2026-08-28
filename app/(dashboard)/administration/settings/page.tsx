'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Settings, Shield, Network, Database, Save, RotateCcw } from 'lucide-react';

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">System Configuration</h1>
          <p className="text-sm text-slate-500 mt-1">Manage global system settings for the AfyaPass pilot environment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pilot Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-info-600" />
                <CardTitle>Pilot Configuration</CardTitle>
              </div>
              <Badge variant="outline" className="bg-info-50 text-info-700">Active</Badge>
            </div>
            <CardDescription>Regional settings for the initial deployment phase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pilot County</label>
              <Input defaultValue="Murang'a" disabled />
              <p className="text-xs text-slate-500 mt-1">Hardcoded for initial rollout phase.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">MFL Registry Sync</label>
              <Select 
                options={[
                  { value: 'daily', label: 'Daily (00:00 EAT)' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'manual', label: 'Manual Only' }
                ]}
                value="daily"
                onChange={() => {}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Default Entry Level</label>
              <Select 
                options={[
                  { value: '2', label: 'Level 2 (Dispensary)' },
                  { value: '3', label: 'Level 3 (Health Centre)' }
                ]}
                value="2"
                onChange={() => {}}
              />
              <p className="text-xs text-slate-500 mt-1">Base level for new facility onboarding.</p>
            </div>
          </CardContent>
        </Card>

        {/* Security & Encryption */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-danger-600" />
                <CardTitle>Security & Encryption</CardTitle>
              </div>
            </div>
            <CardDescription>Cryptographic controls and token lifecycles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">QR Token Expiry (Seconds)</label>
              <Input type="number" defaultValue="300" />
              <p className="text-xs text-slate-500 mt-1">Time before dynamic QR code invalidates (Default: 300s/5m).</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">HMAC Secret Rotation</label>
              <div className="flex items-center gap-4">
                <div className="flex-1 font-mono text-sm bg-slate-100 p-2 rounded border border-slate-200">
                  sk_live_**********************
                </div>
                <Button variant="outline" size="sm">Rotate Now</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Session Timeout</label>
              <Select 
                options={[
                  { value: '15', label: '15 Minutes' },
                  { value: '30', label: '30 Minutes' },
                  { value: '60', label: '1 Hour' }
                ]}
                value="30"
                onChange={() => {}}
              />
            </div>
          </CardContent>
        </Card>

        {/* Interoperability */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-afya-600" />
                <CardTitle>Interoperability</CardTitle>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
            <CardDescription>Integration hooks with KHIE and national registries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">KHIE API Endpoint URL</label>
              <Input defaultValue="https://api.khie.go.ke/v2/interop" />
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
              <div>
                <div className="font-medium text-sm text-slate-900">National ID Registry (IPRS)</div>
                <div className="text-xs text-slate-500">Live identity verification</div>
              </div>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
              <div>
                <div className="font-medium text-sm text-slate-900">SHIF Verification API</div>
                <div className="text-xs text-slate-500">Insurance status checks</div>
              </div>
              <Badge variant="warning">Degraded</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <CardTitle>Audit & Retention</CardTitle>
            </div>
            <CardDescription>Data lifecycle management policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Audit Trail Retention</label>
              <Select 
                options={[
                  { value: '1', label: '1 Year' },
                  { value: '3', label: '3 Years' },
                  { value: '5', label: '5 Years' },
                  { value: 'indefinite', label: 'Indefinite' }
                ]}
                value="5"
                onChange={() => {}}
              />
              <p className="text-xs text-slate-500 mt-1">Legal requirement for security logs.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Archival Strategy</label>
              <Select 
                options={[
                  { value: 'cold', label: 'Cold Storage (S3 Glacier)' },
                  { value: 'warm', label: 'Warm Storage' }
                ]}
                value="cold"
                onChange={() => {}}
              />
            </div>
            <div className="pt-4 border-t border-slate-200">
              <Button variant="outline" className="w-full text-danger-600 border-danger-200 hover:bg-danger-50">
                Purge Orphaned Records
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
