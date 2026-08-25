import { Role } from '@/types';

export interface AccessRule {
  role: Role;
  canViewRecord: boolean;
  canCreateEncounter: boolean;
  canOverrideEmergency: boolean;
  canViewAnalytics: boolean;
  canManageFacilities: boolean;
}

export const RBAC_PERMISSIONS: Record<Role, AccessRule> = {
  patient: {
    role: 'patient',
    canViewRecord: true,         // Only their own record via authenticated portal & consent
    canCreateEncounter: false,
    canOverrideEmergency: false,
    canViewAnalytics: false,
    canManageFacilities: false,
  },
  healthcare_worker: {
    role: 'healthcare_worker',
    canViewRecord: true,         // Requires verified facility credentials + QR scan/consent
    canCreateEncounter: true,
    canOverrideEmergency: true,  // Must trigger mandatory emergency audit log entry
    canViewAnalytics: false,
    canManageFacilities: false,
  },
  facility_admin: {
    role: 'facility_admin',
    canViewRecord: false,        // Admin sees aggregate metrics, not personal medical charts
    canCreateEncounter: false,
    canOverrideEmergency: false,
    canViewAnalytics: true,
    canManageFacilities: true,
  },
  county_admin: {
    role: 'county_admin',
    canViewRecord: false,        // County view receives de-identified epidemiological statistics
    canCreateEncounter: false,
    canOverrideEmergency: false,
    canViewAnalytics: true,
    canManageFacilities: true,
  },
  system_auditor: {
    role: 'system_auditor',
    canViewRecord: false,
    canCreateEncounter: false,
    canOverrideEmergency: false,
    canViewAnalytics: true,
    canManageFacilities: false,
  },
};

export function checkAccess(role: Role, action: keyof Omit<AccessRule, 'role'>): boolean {
  const permissions = RBAC_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions[action] ?? false;
}
