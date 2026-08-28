import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { ChevronLeft, QrCode, Plus, ArrowLeftRight, Clock, MapPin, Activity, Stethoscope, AlertTriangle, ShieldCheck } from 'lucide-react';
import { mockPatients, mockEncounters } from '@/lib/mock-data';
import { PatientProfile, ClinicalEncounter } from '@/types';
import { getInitials, formatDate } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export default async function PatientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // MOCK DATA — Replace with Supabase query when backend integration is implemented
  const patient = mockPatients.find((p: PatientProfile) => p.id === resolvedParams.id) || mockPatients[0];
  const patientEncounters = mockEncounters.filter((e: ClinicalEncounter) => e.patientId === patient.id) || mockEncounters;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-start mb-4">
          <Link href="/patients" className="flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Directory
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex items-start gap-5">
            <Avatar className="w-20 h-20 text-xl bg-slate-100 text-slate-600 rounded-full border-2 border-white shadow-sm">
              {getInitials(patient.givenName + ' ' + patient.familyName)}
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-slate-900">{patient.givenName} {patient.familyName}</h1>
                <Badge variant="outline" className="font-mono text-xs bg-slate-50 font-medium tracking-wider">
                  {patient.afyaPassId}
                </Badge>
                {patient.consentGranted && (
                  <Badge variant="success" className="bg-success-100 text-success-800 hover:bg-success-100 flex gap-1 items-center">
                    <ShieldCheck className="w-3 h-3" /> Consent Granted
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 mt-2">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {patient.dateOfBirth}</span>
                <span className="flex items-center gap-1.5 text-slate-400">•</span>
                <span>{patient.gender}</span>
                <span className="flex items-center gap-1.5 text-slate-400">•</span>
                <Badge variant="outline" className="text-xs text-danger-600 border-danger-200 bg-danger-50">Blood: O+</Badge>
                <span className="flex items-center gap-1.5 text-slate-400">•</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {patient.subCounty}, {patient.county}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="bg-slate-50">
              <QrCode className="w-4 h-4 mr-2" />
              View QR Card
            </Button>
            <Button variant="outline">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Create Referral
            </Button>
            <Button className="bg-afya-600 hover:bg-afya-700 text-white shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Encounter
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto border-b border-slate-200 rounded-none bg-transparent h-auto p-0 gap-6">
          {['Overview', 'Encounters', 'Diagnoses', 'Medications', 'Allergies', 'Laboratory', 'Referrals', 'Access History'].map(tab => (
            <TabsTrigger 
              key={tab} 
              value={tab.toLowerCase()}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-afya-600 rounded-none px-1 py-3 text-sm font-medium text-slate-500 data-[state=active]:text-slate-900"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Timeline & Encounters */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <Card>
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-afya-600" />
                      Cross-Facility Journey
                    </CardTitle>
                    <Badge variant="outline" className="text-xs bg-slate-50">Data Continuity Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
                    {patientEncounters.slice(0, 3).map((enc: ClinicalEncounter, idx: number) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[33px] p-1 bg-white border-2 border-afya-600 rounded-full">
                          <Stethoscope className="w-3 h-3 text-afya-600" />
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-slate-900 text-sm">{enc.encounterType || 'Outpatient Visit'}</h4>
                              <p className="text-xs text-slate-500 mt-1">Facility: {enc.facilityId}</p>
                            </div>
                            <span className="text-xs text-slate-500">{formatDate(enc.encounterDate)}</span>
                          </div>
                          <p className="text-sm text-slate-700 mt-2">{enc.summaryNote || 'Routine checkup completed.'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Vitals & Summary */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card>
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-500" />
                    Latest Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Blood Pressure</div>
                    <div className="font-semibold text-slate-900">120/80 <span className="text-xs font-normal text-slate-500">mmHg</span></div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Heart Rate</div>
                    <div className="font-semibold text-slate-900">72 <span className="text-xs font-normal text-slate-500">bpm</span></div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Temperature</div>
                    <div className="font-semibold text-slate-900">36.8 <span className="text-xs font-normal text-slate-500">°C</span></div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 mb-1">Weight</div>
                    <div className="font-semibold text-slate-900">75 <span className="text-xs font-normal text-slate-500">kg</span></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning-500" />
                    Active Allergies
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-900">Penicillin</span>
                      <Badge variant="outline" className="text-xs text-danger-600 bg-danger-50 border-danger-200">Severe</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-900">Peanuts</span>
                      <Badge variant="outline" className="text-xs text-warning-600 bg-warning-50 border-warning-200">Moderate</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other tabs as placeholders */}
        {['encounters', 'diagnoses', 'medications', 'allergies', 'laboratory', 'referrals', 'access history'].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <Card className="p-12 text-center text-slate-500 border-dashed">
              <p className="mb-2">Detailed {tab} records go here.</p>
              <p className="text-xs text-slate-400">Content pending integration with regional AfyaPass databases.</p>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
