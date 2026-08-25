'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChevronRight, Shield, QrCode } from 'lucide-react';

export default function RegisterPatientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    nationalId: '',
    subCounty: '',
    facility: '',
    bloodGroup: '',
    emergencyContact: '',
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK DATA — Replace with Supabase query when backend integration is implemented
    alert('Mock Registration Successful! Navigating back to directory...');
    router.push('/patients');
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-slate-500 gap-2">
        <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/patients" className="hover:text-slate-900">Patients</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Register New Patient</span>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Register New Patient</h1>
        <p className="text-slate-500 mt-1">Enroll a patient into the AfyaPass platform and generate their unified medical ID.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic demographic details of the patient.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Given Name</label>
              <Input required placeholder="e.g. John" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Family Name</label>
              <Input required placeholder="e.g. Doe" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Date of Birth</label>
              <Input required type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Gender</label>
              <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950" required value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">National ID / Birth Cert Ref (Optional)</label>
              <Input placeholder="Enter identification number" value={formData.nationalId} onChange={(e) => setFormData({...formData, nationalId: e.target.value})} />
              <p className="text-xs text-slate-500">This value is hashed and never stored in plain text.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Location & Medical Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">County</label>
              <Input disabled value="Murang'a County" className="bg-slate-50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Sub-County</label>
              <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950" value={formData.subCounty} onChange={(e) => setFormData({...formData, subCounty: e.target.value})}>
                <option value="" disabled>Select Sub-County</option>
                <option value="Kiharu">Kiharu</option>
                <option value="Kangema">Kangema</option>
                <option value="Maragua">Maragua</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Primary Healthcare Facility</label>
              <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950" value={formData.facility} onChange={(e) => setFormData({...formData, facility: e.target.value})}>
                <option value="" disabled>Select Facility</option>
                <option value="Murang'a Level 5">Murang'a Level 5 Hospital</option>
                <option value="Maragua Level 4">Maragua Level 4 Hospital</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Blood Group</label>
              <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950" value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}>
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Emergency Contact</label>
              <Input type="tel" placeholder="+254 XXX XXX XXX" value={formData.emergencyContact} onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-afya-teal/20 bg-afya-teal/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-afya-teal/10 p-3 rounded-full text-afya-teal">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Consent & Privacy</h3>
                <p className="text-sm text-slate-600 mb-4">
                  By checking this box, you confirm that the patient has given explicit consent for their medical records to be shared securely across authorized AfyaPass facilities within the county network.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" required className="rounded border-slate-300 text-afya-teal focus:ring-afya-teal" checked={formData.consent} onChange={(e) => setFormData({...formData, consent: e.target.checked})} />
                  <span className="text-sm font-medium text-slate-700">Patient grants cross-facility data sharing consent</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <QrCode className="w-8 h-8 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 font-medium">Generated AfyaPass ID</div>
              <div className="font-mono font-medium text-slate-900 tracking-wider">AFY-KE-MUR-2026-XXXXX</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/patients">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-afya-teal hover:bg-afya-teal-dark text-white">
              Register & Issue ID
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
