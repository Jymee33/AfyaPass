'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { IcUsers, IcStethoscope, IcArrowLeftRight, IcFlask, IcPlus, IcQr, IcAlert, IcCalendar } from '@/components/icons';
import { mockActivityEvents } from '@/lib/mock-data';
import { ActivityEvent } from '@/types';
import { formatDate, cn } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-card-xl bg-gradient-to-r from-medic-600 via-medic-500 to-afya-500 p-6 lg:p-8 text-white shadow-soft">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/15 text-xs font-semibold mb-3 backdrop-blur-sm">
              <IcCalendar className="w-3.5 h-3.5" />
              Clinical Desk
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
              Welcome back, Dr. James Kamau
            </h1>
            <p className="text-medic-100 mt-1.5 text-sm lg:text-base">
              Murang&apos;a Level 5 Hospital — Here&apos;s your facility overview for today
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/patients/register">
              <Button className="bg-white text-medic-700 hover:bg-medic-50 shadow-none border-0">
                <IcPlus className="w-4 h-4 mr-2" />
                Register Patient
              </Button>
            </Link>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-white/10 backdrop-blur-sm">
              <IcQr className="w-4 h-4 mr-2" />
              Scan QR Card
            </Button>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard 
          title="Total Patients" 
          value="28,450" 
          trend="+12.4% vs last week" 
          trendUp={true}
          icon={IcUsers}
          iconBoxClass="icon-box-blue"
        />
        <StatCard 
          title="Today's Encounters" 
          value="89" 
          trend="+8 today" 
          trendUp={true}
          icon={IcStethoscope}
          iconBoxClass="icon-box-teal"
        />
        <StatCard 
          title="Active Referrals" 
          value="23" 
          trend="4 urgent" 
          trendUp={false}
          icon={IcArrowLeftRight}
          iconBoxClass="icon-box-orange"
        />
        <StatCard 
          title="Pending Lab Orders" 
          value="34" 
          trend="12 awaiting review" 
          trendUp={false}
          icon={IcFlask}
          iconBoxClass="icon-box-purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card hoverable>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Encounter Trends</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Weekly patient visit volume</p>
              </div>
              <Badge variant="info" size="sm">Last 7 days</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <svg viewBox="0 0 500 150" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,150 L0,100 Q50,120 100,80 T200,60 T300,90 T400,40 T500,20 L500,150 Z" fill="url(#chartGradient)" />
                  <path d="M0,100 Q50,120 100,80 T200,60 T300,90 T400,40 T500,20" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                  <g fill="#3B82F6">
                    <circle cx="0" cy="100" r="4" />
                    <circle cx="100" cy="80" r="4" />
                    <circle cx="200" cy="60" r="4" />
                    <circle cx="300" cy="90" r="4" />
                    <circle cx="400" cy="40" r="4" />
                    <circle cx="500" cy="20" r="4" />
                  </g>
                </svg>
              </div>
              <div className="flex justify-between mt-4 text-xs font-medium text-slate-400 px-1">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-medic-600">View all</Button>
            </CardHeader>
            <CardContent className="p-0 -mx-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-y border-border/80 bg-slate-50/80">
                      <th className="px-6 py-3.5 table-header">Time</th>
                      <th className="px-6 py-3.5 table-header">Action</th>
                      <th className="px-6 py-3.5 table-header">Patient</th>
                      <th className="px-6 py-3.5 table-header">Facility</th>
                      <th className="px-6 py-3.5 table-header">Actor</th>
                      <th className="px-6 py-3.5 table-header">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {mockActivityEvents.slice(0, 5).map((event: ActivityEvent) => (
                      <tr key={event.id} className="hover:bg-medic-50/30 transition-colors">
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs">{formatDate(event.timestamp)}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" size="sm" className="font-normal">
                            {event.action}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{event.patientName}</td>
                        <td className="px-6 py-4 text-slate-500">{event.facilityName}</td>
                        <td className="px-6 py-4 text-slate-500">{event.actorName}</td>
                        <td className="px-6 py-4">
                          <Badge variant={event.status === 'success' ? 'success' : 'default'} size="sm" dot>
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

        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border-orange-200/80 bg-gradient-to-br from-orange-50 to-amber-50/50">
            <CardContent className="p-5 flex gap-4 items-start">
              <div className="icon-box-orange h-11 w-11">
                <IcAlert className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-orange-900 text-sm">Emergency Override</h3>
                <p className="text-xs text-orange-700/80 mt-1.5 mb-4 leading-relaxed">
                  Access patient records without consent in life-threatening situations. Heavily audited.
                </p>
                <Button size="sm" variant="destructive" className="w-full bg-orange-600 hover:bg-orange-700 rounded-xl">
                  Trigger Override
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                { icon: IcPlus, label: 'Register Patient', color: 'icon-box-blue' },
                { icon: IcStethoscope, label: 'File Encounter', color: 'icon-box-teal' },
                { icon: IcQr, label: 'Scan QR', color: 'bg-slate-100 text-slate-600' },
                { icon: IcArrowLeftRight, label: 'Create Referral', color: 'icon-box-purple' },
              ].map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border/60 hover:border-medic-200 hover:bg-medic-50/30 transition-all group"
                >
                  <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center', color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-medic-700">{label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sub-County Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { name: 'Kiharu', status: 'Synced 2m ago', progress: 98, syncing: false },
                { name: 'Kangema', status: 'Synced 5m ago', progress: 95, syncing: false },
                { name: 'Maragua', status: 'Syncing...', progress: 65, syncing: true },
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">{item.name}</span>
                    <span className={cn('text-xs', item.syncing ? 'text-warning-600 font-medium' : 'text-slate-400')}>
                      {item.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={cn(
                        'h-2 rounded-full transition-all',
                        item.syncing ? 'bg-gradient-to-r from-amber-400 to-warning-500' : 'bg-gradient-to-r from-medic-500 to-afya-500'
                      )}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
