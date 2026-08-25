export type Role = 'patient' | 'healthcare_worker' | 'facility_admin' | 'county_admin' | 'system_auditor';

export interface AfyaPassID {
  fullId: string;        // e.g. "AFY-KE-MUR-2026-98421"
  countyCode: string;    // e.g. "MUR" for Murang'a County
  nationalIdHash?: string; // One-way hash for verification, NOT plain text
}

export interface PatientProfile {
  id: string;
  afyaPassId: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'Other';
  county: string;
  subCounty: string;
  primaryFacilityId?: string;
  bloodGroup?: string;
  emergencyContactPhone?: string;
  consentGranted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HealthcareFacility {
  id: string;
  facilityCode: string; // MFL Code (Master Facility List)
  name: string;
  facilityType: 'Public' | 'Private' | 'Faith-Based' | 'Community';
  county: string;
  subCounty: string;
  level: 1 | 2 | 3 | 4 | 5 | 6; // Kenya Healthcare Level hierarchy
  isActive: boolean;
}

export interface HealthcareWorker {
  id: string;
  facilityId: string;
  licenseNumber: string;
  fullName: string;
  roleTitle: string;
  department: string;
  isVerified: boolean;
}

export interface ClinicalEncounter {
  id: string;
  patientId: string;
  facilityId: string;
  workerId: string;
  encounterDate: string;
  encounterType: 'Outpatient' | 'Inpatient' | 'Emergency' | 'Immunization' | 'Lab Check';
  summaryNote?: string;
  diagnosisCodes?: string[]; // ICD-11 codes
  allergiesNoted?: string[];
  medicationsPrescribed?: Array<{
    drugName: string;
    dosage: string;
    frequency: string;
  }>;
  referralTargetFacilityId?: string;
  isEmergencyAccess: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorRole: Role;
  facilityId?: string;
  patientId?: string;
  action: 'QR_SCAN' | 'RECORD_VIEW' | 'ENCOUNTER_CREATE' | 'CONSENT_UPDATE' | 'EMERGENCY_OVERRIDE';
  resourcePath: string;
  ipAddressHash: string;
  status: 'SUCCESS' | 'DENIED';
  denialReason?: string;
}

export interface QrPayload {
  v: number;                // Schema version (e.g. 1)
  id: string;               // AfyaPass Patient ID (Reference ONLY)
  sig: string;              // HMAC signature validating issuer authenticity
  exp: number;              // Timestamp payload validity window
}

// --- Extended types for AfyaPass UI modules ---

export interface VitalSigns {
  id: string;
  encounterId: string;
  patientId: string;
  recordedAt: string;
  recordedBy: string;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  temperature?: number; // Celsius
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number; // kg
  height?: number; // cm
}

export interface Medication {
  id: string;
  patientId: string;
  encounterId: string;
  drugName: string;
  dosage: string;
  frequency: string;
  route: 'Oral' | 'IV' | 'IM' | 'Topical' | 'Inhaled' | 'Other';
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  facilityId: string;
  status: 'Active' | 'Completed' | 'Discontinued' | 'On Hold';
}

export interface Diagnosis {
  id: string;
  patientId: string;
  encounterId: string;
  icdCode: string; // ICD-11
  description: string;
  type: 'Primary' | 'Secondary' | 'Differential';
  status: 'Active' | 'Resolved' | 'Chronic';
  diagnosedAt: string;
  diagnosedBy: string;
  facilityId: string;
}

export interface LabOrder {
  id: string;
  patientId: string;
  encounterId?: string;
  testName: string;
  testCode: string;
  orderedBy: string;
  orderedAt: string;
  facilityId: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Routine' | 'Urgent' | 'STAT';
  results?: string;
  resultDate?: string;
  resultedBy?: string;
  notes?: string;
}

export interface Referral {
  id: string;
  patientId: string;
  sourceFacilityId: string;
  targetFacilityId: string;
  referredBy: string;
  referralDate: string;
  reason: string;
  urgency: 'Routine' | 'Urgent' | 'Emergency';
  status: 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Declined';
  clinicalNotes?: string;
  responseDate?: string;
  respondedBy?: string;
}

export interface Allergy {
  id: string;
  patientId: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  recordedAt: string;
  recordedBy: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  patientId?: string;
  patientName?: string;
  afyaPassId?: string;
  facilityName: string;
  actorName?: string;
  actorRole?: Role;
}

export type NavigationItem = {
  label: string;
  href: string;
  icon: string; // lucide icon name
  children?: NavigationItem[];
  requiredPermission?: keyof import('@/lib/rbac').AccessRule;
};
