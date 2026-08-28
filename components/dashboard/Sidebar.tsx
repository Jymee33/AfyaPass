'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AfyaPassLogo } from '@/components/AfyaPassBrand';
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
  IcChevronUp, IcCheck, IcX
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
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: IcDashboard },
      { label: 'Activity', href: '/dashboard', icon: IcActivity },
      { label: 'Notifications', href: '/dashboard', icon: IcBell },
    ]
  },
  {
    title: 'Patients',
    items: [
      { label: 'All Patients', href: '/patients', icon: IcUsers, requiredPermission: 'canViewRecord' },
      { label: 'Register Patient', href: '/patients/register', icon: IcUserPlus, requiredPermission: 'canCreateEncounter' },
    ]
  },
  {
    title: 'Clinical',
    items: [
      { label: 'Encounters', href: '/clinical/encounters', icon: IcStethoscope, requiredPermission: 'canCreateEncounter' },
      { label: 'Diagnoses', href: '/clinical/diagnoses', icon: IcFileText, requiredPermission: 'canCreateEncounter' },
      { label: 'Medications', href: '/clinical/medications', icon: IcPill, requiredPermission: 'canCreateEncounter' },
      { label: 'Vital Signs', href: '/clinical/vital-signs', icon: IcHeartPulse, requiredPermission: 'canCreateEncounter' },
    ]
  },
  {
    title: 'Laboratory',
    items: [
      { label: 'Lab Orders', href: '/laboratory', icon: IcFlask, requiredPermission: 'canCreateEncounter' },
      { label: 'Results', href: '/laboratory/results', icon: IcClipboard, requiredPermission: 'canViewRecord' },
    ]
  },
  {
    title: 'Referrals',
    items: [
      { label: 'Incoming', href: '/referrals/incoming', icon: IcArrowIncoming, requiredPermission: 'canCreateEncounter' },
      { label: 'Outgoing', href: '/referrals/outgoing', icon: IcArrowOutgoing, requiredPermission: 'canCreateEncounter' },
    ]
  },
  {
    title: 'Facilities',
    items: [
      { label: 'All Facilities', href: '/facilities', icon: IcHospital, requiredPermission: 'canViewAnalytics' },
    ]
  },
  {
    title: 'AfyaPass Card',
    items: [
      { label: 'Card Management', href: '/card', icon: IcCard },
    ]
  },
  {
    title: 'Privacy & Security',
    items: [
      { label: 'Consent', href: '/privacy/consent', icon: IcShield },
      { label: 'Audit Logs', href: '/privacy/audit-logs', icon: IcScrollText, allowedRoles: ['system_auditor', 'county_admin'] },
    ]
  },
  {
    title: 'Administration',
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
        "fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 overflow-y-auto sidebar-scroll shadow-sidebar",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="h-[72px] flex items-center px-5 border-b border-border/80 shrink-0 sticky top-0 bg-white z-10 justify-between">
        <Link href="/dashboard" className="flex items-center">
          <AfyaPassLogo variant="compact" markSize={32} />
        </Link>
        <button className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50" onClick={onClose} aria-label="Close menu">
          <IcX className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-6">
        {navGroups.map((group, i) => {
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
              <h3 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <div className="space-y-0.5">
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
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                        isActive ? "nav-item-active" : "nav-item-inactive"
                      )}
                    >
                      <span className={cn(
                        "flex items-center justify-center h-8 w-8 rounded-lg transition-colors",
                        isActive ? "bg-medic-100 text-medic-600" : "text-slate-400"
                      )}>
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-border/80 shrink-0 sticky bottom-0 bg-white">
        {showRoleSelector && (
          <div className="mb-3 bg-slate-50 rounded-xl p-2 border border-border space-y-0.5 shadow-soft animate-fade-in">
            <p className="text-[10px] font-semibold uppercase text-slate-400 px-2 py-1">Switch Active RBAC Role</p>
            {(Object.keys(demoProfiles) as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setCurrentRole(r);
                  setShowRoleSelector(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors",
                  currentRole === r ? "bg-medic-600 text-white font-medium" : "text-slate-600 hover:bg-white"
                )}
              >
                <span>{demoProfiles[r].title}</span>
                {currentRole === r && <IcCheck className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        )}

        <button 
          onClick={() => setShowRoleSelector(!showRoleSelector)}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-border transition-all text-left group focus:outline-none"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-medic-500 to-medic-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-icon">
            {activeProfile.initials}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{activeProfile.name}</p>
            <p className="text-xs text-slate-500 truncate">{activeProfile.title}</p>
          </div>
          <IcChevronUp className={cn("w-4 h-4 text-slate-400 transition-transform shrink-0", showRoleSelector && "rotate-180")} />
        </button>
      </div>
    </aside>
  );
}
