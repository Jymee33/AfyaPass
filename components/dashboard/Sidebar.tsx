'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Activity, Bell, 
  Users, UserPlus, 
  Stethoscope, FileText, Pill, HeartPulse, 
  FlaskConical, ClipboardCheck, 
  ArrowLeftRight, ArrowDownLeft, ArrowUpRight, 
  Building2, 
  CreditCard, QrCode, 
  Shield, ScrollText, 
  Settings, UserCog, Lock,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Activity', href: '/dashboard', icon: Activity },
      { label: 'Notifications', href: '/dashboard', icon: Bell },
    ]
  },
  {
    title: 'PATIENTS',
    items: [
      { label: 'All Patients', href: '/patients', icon: Users },
      { label: 'Register Patient', href: '/patients/register', icon: UserPlus },
    ]
  },
  {
    title: 'CLINICAL',
    items: [
      { label: 'Encounters', href: '/clinical/encounters', icon: Stethoscope },
      { label: 'Diagnoses', href: '/clinical/diagnoses', icon: FileText },
      { label: 'Medications', href: '/clinical/medications', icon: Pill },
      { label: 'Vital Signs', href: '/clinical/vital-signs', icon: HeartPulse },
    ]
  },
  {
    title: 'LABORATORY',
    items: [
      { label: 'Lab Orders', href: '/laboratory', icon: FlaskConical },
      { label: 'Results', href: '/laboratory/results', icon: ClipboardCheck },
    ]
  },
  {
    title: 'REFERRALS',
    items: [
      { label: 'Incoming', href: '/referrals/incoming', icon: ArrowDownLeft },
      { label: 'Outgoing', href: '/referrals/outgoing', icon: ArrowUpRight },
    ]
  },
  {
    title: 'FACILITIES',
    items: [
      { label: 'All Facilities', href: '/facilities', icon: Building2 },
    ]
  },
  {
    title: 'AFYAPASS CARD',
    items: [
      { label: 'Card Management', href: '/card', icon: CreditCard },
    ]
  },
  {
    title: 'PRIVACY & SECURITY',
    items: [
      { label: 'Consent', href: '/privacy/consent', icon: Shield },
      { label: 'Audit Logs', href: '/privacy/audit-logs', icon: ScrollText },
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { label: 'Users', href: '/administration/users', icon: UserCog },
      { label: 'Roles', href: '/administration/roles', icon: Lock },
      { label: 'Settings', href: '/administration/settings', icon: Settings },
    ]
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0 sticky top-0 bg-slate-900 z-10 justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-white">
          <Activity className="h-6 w-6 text-teal-500" />
          <span className="font-bold text-lg">AfyaPass</span>
        </Link>
        <button className="lg:hidden text-slate-400 hover:text-white" onClick={onClose}>
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        {navGroups.map((group, i) => (
          <div key={i}>
            <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = item.href === '/dashboard' 
                  ? pathname === item.href 
                  : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={j}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors relative",
                      isActive
                        ? "text-white bg-slate-800"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-500 rounded-r-full" />
                    )}
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Profile */}
      <div className="p-4 border-t border-slate-800 shrink-0 sticky bottom-0 bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold shrink-0">
            JK
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Dr. James Kamau</p>
            <p className="text-xs text-slate-400 truncate">Healthcare Worker</p>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">Murang'a Level 5 Hospital</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
