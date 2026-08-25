import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { Users, Stethoscope, ArrowLeftRight, FlaskConical, Plus, QrCode, AlertTriangle } from 'lucide-react';
import { dashboardStats, mockActivityEvents } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Welcome back, Dr. James Kamau</h1>
          <p className="text-slate-500">Murang'a Level 5 Hospital — Clinical Desk</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/patients/register">
            <Button className="bg-afya-teal hover:bg-afya-teal-dark text-white shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              Register Patient
            </Button>
          </Link>
          <Button variant="outline" className="shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Encounter
          </Button>
          <Button variant="outline" className="shadow-sm">
            <QrCode className="w-4 h-4 mr-2" />
            Scan QR Card
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Patients" 
          value="28,450" 
          trend="+12.4% vs last week" 
          trendUp={true} 
          icon={<Users className="w-5 h-5 text-afya-blue" />} 
        />
        <StatCard 
          title="Today's Encounters" 
          value="89" 
          trend="+8 today" 
          trendUp={true} 
          icon={<Stethoscope className="w-5 h-5 text-afya-teal" />} 
        />
        <StatCard 
          title="Active Referrals" 
          value="23" 
          trend="4 urgent" 
          trendUp={false} 
          icon={<ArrowLeftRight className="w-5 h-5 text-orange-500" />} 
        />
        <StatCard 
          title="Pending Lab Orders" 
          value="34" 
          trend="12 awaiting review" 
          trendUp={false} 
          icon={<FlaskConical className="w-5 h-5 text-purple-500" />} 
        />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Encounter Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full flex items-end gap-2 text-xs text-slate-500 justify-between">
                <svg viewBox="0 0 500 150" className="w-full h-full preserve-3d">
                  <path d="M0,150 L0,100 Q50,120 100,80 T200,60 T300,90 T400,40 T500,20 L500,150 Z" fill="rgba(13, 148, 136, 0.1)" />
                  <path d="M0,100 Q50,120 100,80 T200,60 T300,90 T400,40 T500,20" fill="none" stroke="#0d9488" strokeWidth="3" />
                  <g fill="#0d9488">
                    <circle cx="0" cy="100" r="4" />
                    <circle cx="100" cy="80" r="4" />
                    <circle cx="200" cy="60" r="4" />
                    <circle cx="300" cy="90" r="4" />
                    <circle cx="400" cy="40" r="4" />
                    <circle cx="500" cy="20" r="4" />
                  </g>
                </svg>
              </div>
              <div className="flex justify-between mt-2 text-sm text-slate-500 px-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                      <th className="px-4 py-3 font-medium">Patient</th>
                      <th className="px-4 py-3 font-medium">Facility</th>
                      <th className="px-4 py-3 font-medium">Actor</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockActivityEvents.slice(0, 5).map((event: any) => (
                      <tr key={event.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(event.timestamp)}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs font-normal">
                            {event.action}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900">{event.patientName}</td>
                        <td className="px-4 py-3 text-slate-500">{event.facilityName || event.facility}</td>
                        <td className="px-4 py-3 text-slate-500">{event.actorName || event.actor}</td>
                        <td className="px-4 py-3">
                          <Badge variant={event.status === 'success' ? 'success' : 'default'} className="text-[10px] uppercase">
                            {event.status || 'Success'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-4 flex gap-4 items-start">
              <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-orange-900 text-sm">Emergency Override</h3>
                <p className="text-xs text-orange-700 mt-1 mb-3">
                  Access patient records without consent in life-threatening situations. This action is heavily audited.
                </p>
                <Button size="sm" variant="destructive" className="w-full bg-orange-600 hover:bg-orange-700">
                  Trigger Emergency Override
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
                <Plus className="w-5 h-5 text-afya-teal" />
                <span className="text-xs">Register Patient</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
                <Stethoscope className="w-5 h-5 text-afya-blue" />
                <span className="text-xs">File Encounter</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
                <QrCode className="w-5 h-5 text-slate-600" />
                <span className="text-xs">Scan QR</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-purple-600" />
                <span className="text-xs">Create Referral</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sub-County Sync Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">Kiharu</span>
                  <span className="text-slate-500 text-xs">Synced 2m ago</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-afya-teal h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">Kangema</span>
                  <span className="text-slate-500 text-xs">Synced 5m ago</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-afya-teal h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">Maragua</span>
                  <span className="text-amber-600 text-xs">Syncing...</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
