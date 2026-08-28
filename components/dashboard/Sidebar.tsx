'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  IcDashboard, IcActivity, IcBell,
  IcUsers, IcUserPlus,
  IcStethoscope, IcFileText, IcPill, IcHeartPulse,
  IcFlask, IcClipboard,
  IcArrowIncoming, IcArrowOutgoing,
  IcHospital,
  IcCard,
  IcShield, IcScrollText,
  IcSettings, IcUserCog, IcLock,
  IcChevronLeft, IcChevronUp, IcCheck
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { Role } from '@/types';
import { checkAccess, AccessRule } from '@/lib/rbac';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  requiredPermission?: keyof Omit<AccessRule, 'role'>;
  allowedRoles?: Role[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: IcDashboard },
      { label: 'Activity', href: '/dashboard', icon: IcActivity },
      { label: 'Notifications', href: '/dashboard', icon: IcBell },
    ]
  },
  {
    title: 'PATIENTS',
    items: [
      { label: 'All Patients', href: '/patients', icon: IcUsers, requiredPermission: 'canViewRecord' },
      { label: 'Register Patient', href: '/patients/register', icon: IcUserPlus, requiredPermission: 'canCreateEncounter' },
    ]
  },
  {
    title: 'CLINICAL',
    items: [
      { label: 'Encounters', href: '/clinical/encounters', icon: IcStethoscope, requiredPermission: 'canCreateEncounter' },
      { label: 'Diagnoses', href: '/clinical/diagnoses', icon: IcFileText, requiredPermission: 'canCreateEncounter' },
      { label: 'Medications', href: '/clinical/medications', icon: IcPill, requiredPermission: 'canCreateEncounter' },
      { label: 'Vital Signs', href: '/clinical/vital-signs', icon: IcHeartPulse, requiredPermission: 'canCreateEncounter' },
    ]
  },
  {
    title: 'LABORATORY',
    items: [
      { label: 'Lab Orders', href: '/laboratory', icon: IcFlask, requiredPermission: 'canCreateEncounter' },
      { label: 'Results', href: '/laboratory/results', icon: IcClipboard, requiredPermission: 'canViewRecord' },
    ]
  },
  {
    title: 'REFERRALS',
    items: [
      { label: 'Incoming', href: '/referrals/incoming', icon: IcArrowIncoming, requiredPermission: 'canCreateEncounter' },
      { label: 'Outgoing', href: '/referrals/outgoing', icon: IcArrowOutgoing, requiredPermission: 'canCreateEncounter' },
    ]
  },
  {
    title: 'FACILITIES',
    items: [
      { label: 'All Facilities', href: '/facilities', icon: IcHospital, requiredPermission: 'canViewAnalytics' },
    ]
  },
  {
    title: 'AFYAPASS CARD',
    items: [
      { label: 'Card Management', href: '/card', icon: IcCard },
    ]
  },
  {
    title: 'PRIVACY & SECURITY',
    items: [
      { label: 'Consent', href: '/privacy/consent', icon: IcShield },
      { label: 'Audit Logs', href: '/privacy/audit-logs', icon: IcScrollText, allowedRoles: ['system_auditor', 'county_admin'] },
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { label: 'Users', href: '/administration/users', icon: IcUserCog, requiredPermission: 'canManageFacilities' },
      { label: 'Roles', href: '/administration/roles', icon: IcLock },
      { label: 'Settings', href: '/administration/settings', icon: IcSettings, requiredPermission: 'canManageFacilities' },
    ]
  }
];

const demoProfiles: Record<Role, { name: string; title: string; facility: string; initials: string }> = {
  healthcare_worker: { name: 'Dr. James Kamau', title: 'Healthcare Worker', facility: "Murang'a Level 5 Hospital", initials: 'JK' },
  facility_admin: { name: 'Grace Wambui', title: 'Facility Admin', facility: 'Kangema Sub-County Hospital', initials: 'GW' },
  county_admin: { name: 'Dr. Peter Maina', title: 'County Admin', facility: "Murang'a Health Directorate", initials: 'PM' },
  system_auditor: { name: 'John Ndung\'u', title: 'System Auditor', facility: 'KHIE Security Operations', initials: 'JN' },
  patient: { name: 'Wanjiku Njuguna', title: 'Patient / Cardholder', facility: 'Kiharu Sub-County', initials: 'WN' },
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<Role>('healthcare_worker');
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const activeProfile = demoProfiles[currentRole];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 overflow-y-auto sidebar-scroll",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0 sticky top-0 bg-slate-900 z-10 justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-white">
          <IcActivity className="h-6 w-6 text-teal-500" />
          <span className="font-bold text-lg">AfyaPass</span>
        </Link>
        <button className="lg:hidden text-slate-400 hover:text-white" onClick={onClose}>
          <IcChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        {navGroups.map((group, i) => {
          // Filter items based on current role permissions
          const visibleItems = group.items.filter(item => {
            if (item.allowedRoles && !item.allowedRoles.includes(currentRole)) {
              return false;
            }
            if (item.requiredPermission) {
              return checkAccess(currentRole, item.requiredPermission);
            }
            return true;
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={i}>
              <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <div className="space-y-1">
                {visibleItems.map((item, j) => {
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
          );
        })}
      </nav>

      {/* Bottom Profile & Role Switcher */}
      <div className="p-4 border-t border-slate-800 shrink-0 sticky bottom-0 bg-slate-900">
        {showRoleSelector && (
          <div className="mb-3 bg-slate-800 rounded-lg p-2 border border-slate-700 space-y-1 shadow-lg animate-fade-in">
            <p className="text-[10px] font-semibold uppercase text-slate-400 px-2 py-1">Switch Active RBAC Role</p>
            {(Object.keys(demoProfiles) as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setCurrentRole(r);
                  setShowRoleSelector(false);
                }}
                className={cn(
                  "w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between transition-colors",
                  currentRole === r ? "bg-teal-600 text-white font-medium" : "text-slate-300 hover:bg-slate-700"
                )}
              >
                <span>{demoProfiles[r].title}</span>
                {currentRole === r && <IcCheck className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        )}

        <button 
          onClick={() => setShowRoleSelector(!showRoleSelector)}
          className="w-full flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left group focus:outline-none"
        >
          <div className="h-10 w-10 rounded-full bg-teal-700 text-teal-100 flex items-center justify-center font-bold shrink-0 shadow-inner">
            {activeProfile.initials}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate group-hover:text-teal-400 transition-colors">{activeProfile.name}</p>
            <p className="text-xs text-slate-400 truncate">{activeProfile.title}</p>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">{activeProfile.facility}</p>
          </div>
          <IcChevronUp className={cn("w-4 h-4 text-slate-400 transition-transform shrink-0", showRoleSelector && "rotate-180")} />
        </button>
      </div>
    </aside>
  );
}
