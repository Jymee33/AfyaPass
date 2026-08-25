/**
 * MOCK DATA — AfyaPass Frontend Redesign
 * 
 * This file contains demo/placeholder data for UI development.
 * Replace with Supabase queries when backend integration is implemented.
 * 
 * NEVER insert this data into the production database.
 * NEVER use real patient information.
 */

import { 
  Role, AfyaPassID, PatientProfile, HealthcareFacility, HealthcareWorker, 
  ClinicalEncounter, AuditLogEntry, QrPayload, VitalSigns, Medication, 
  Diagnosis, LabOrder, Referral, Allergy, ActivityEvent, NavigationItem
} from '@/types';

// --- MOCK FACILITIES ---
export const mockFacilities: HealthcareFacility[] = [
  {
    id: 'fac-001',
    facilityCode: 'MFL-10001',
    name: 'Murang\'a Level 5 Hospital',
    facilityType: 'Public',
    county: 'Murang\'a',
    subCounty: 'Kiharu',
    level: 5,
    isActive: true
  },
  {
    id: 'fac-002',
    facilityCode: 'MFL-10002',
    name: 'Kangema Sub-County Hospital',
    facilityType: 'Public',
    county: 'Murang\'a',
    subCounty: 'Kangema',
    level: 4,
    isActive: true
  },
  {
    id: 'fac-003',
    facilityCode: 'MFL-10003',
    name: 'Kenol Sub-County Hospital',
    facilityType: 'Public',
    county: 'Murang\'a',
    subCounty: 'Maragua',
    level: 4,
    isActive: true
  },
  {
    id: 'fac-004',
    facilityCode: 'MFL-10004',
    name: 'Maragua Health Centre',
    facilityType: 'Public',
    county: 'Murang\'a',
    subCounty: 'Maragua',
    level: 3,
    isActive: true
  },
  {
    id: 'fac-005',
    facilityCode: 'MFL-10005',
    name: 'Kandara Health Centre',
    facilityType: 'Public',
    county: 'Murang\'a',
    subCounty: 'Kandara',
    level: 3,
    isActive: true
  },
  {
    id: 'fac-006',
    facilityCode: 'MFL-10006',
    name: 'Gatanga Health Centre',
    facilityType: 'Public',
    county: 'Murang\'a',
    subCounty: 'Gatanga',
    level: 3,
    isActive: true
  },
  {
    id: 'fac-007',
    facilityCode: 'MFL-10007',
    name: 'St. Mary\'s Mission Hospital',
    facilityType: 'Faith-Based',
    county: 'Murang\'a',
    subCounty: 'Kandara',
    level: 4,
    isActive: true
  },
  {
    id: 'fac-008',
    facilityCode: 'MFL-10008',
    name: 'Muriranjas Health Centre',
    facilityType: 'Community',
    county: 'Murang\'a',
    subCounty: 'Gatanga',
    level: 2,
    isActive: true
  }
];

// --- MOCK HEALTHCARE WORKERS ---
export const mockHealthcareWorkers: HealthcareWorker[] = [
  {
    id: 'hw-001',
    facilityId: 'fac-001',
    licenseNumber: 'MD-12345',
    fullName: 'Dr. James Kamau',
    roleTitle: 'Doctor',
    department: 'Medicine',
    isVerified: true
  },
  {
    id: 'hw-002',
    facilityId: 'fac-002',
    licenseNumber: 'MD-23456',
    fullName: 'Dr. Sarah Wanjiku',
    roleTitle: 'Doctor',
    department: 'Pediatrics',
    isVerified: true
  },
  {
    id: 'hw-003',
    facilityId: 'fac-003',
    licenseNumber: 'NR-34567',
    fullName: 'Nurse Grace Wambui',
    roleTitle: 'Nurse',
    department: 'General Ward',
    isVerified: true
  },
  {
    id: 'hw-004',
    facilityId: 'fac-004',
    licenseNumber: 'NR-45678',
    fullName: 'Nurse Peter Maina',
    roleTitle: 'Nurse',
    department: 'Outpatient',
    isVerified: true
  },
  {
    id: 'hw-005',
    facilityId: 'fac-001',
    licenseNumber: 'LT-56789',
    fullName: 'Lab Tech. John Ndung\'u',
    roleTitle: 'Lab Technician',
    department: 'Laboratory',
    isVerified: true
  },
  {
    id: 'hw-006',
    facilityId: 'fac-007',
    licenseNumber: 'MD-67890',
    fullName: 'Dr. Faith Nyambura',
    roleTitle: 'Doctor',
    department: 'Obstetrics',
    isVerified: true
  },
  {
    id: 'hw-007',
    facilityId: 'fac-001',
    licenseNumber: 'PH-78901',
    fullName: 'Pharmacist Ann Muthoni',
    roleTitle: 'Pharmacist',
    department: 'Pharmacy',
    isVerified: true
  },
  {
    id: 'hw-008',
    facilityId: 'fac-002',
    licenseNumber: 'NR-89012',
    fullName: 'Nurse Agnes Wangari',
    roleTitle: 'Nurse',
    department: 'Emergency',
    isVerified: true
  }
];

// --- MOCK PATIENTS ---
export const mockPatients: PatientProfile[] = [
  {
    id: 'pat-001',
    afyaPassId: 'AFY-KE-MUR-2026-98421',
    givenName: 'Wanjiku',
    familyName: 'Njuguna',
    dateOfBirth: '1992-03-15',
    gender: 'F',
    county: 'Murang\'a',
    subCounty: 'Kiharu',
    primaryFacilityId: 'fac-001',
    bloodGroup: 'O+',
    emergencyContactPhone: '+254700000001',
    consentGranted: true,
    createdAt: '2025-12-01T08:00:00Z',
    updatedAt: '2026-08-20T10:00:00Z'
  },
  {
    id: 'pat-002',
    afyaPassId: 'AFY-KE-MUR-2026-87234',
    givenName: 'James',
    familyName: 'Mwangi',
    dateOfBirth: '1985-07-22',
    gender: 'M',
    county: 'Murang\'a',
    subCounty: 'Maragua',
    primaryFacilityId: 'fac-003',
    bloodGroup: 'A-',
    emergencyContactPhone: '+254700000002',
    consentGranted: true,
    createdAt: '2026-01-15T09:30:00Z',
    updatedAt: '2026-08-15T14:20:00Z'
  },
  {
    id: 'pat-003',
    afyaPassId: 'AFY-KE-MUR-2026-76543',
    givenName: 'Grace',
    familyName: 'Wairimu',
    dateOfBirth: '1998-11-08',
    gender: 'F',
    county: 'Murang\'a',
    subCounty: 'Kangema',
    primaryFacilityId: 'fac-002',
    bloodGroup: 'B+',
    emergencyContactPhone: '+254700000003',
    consentGranted: true,
    createdAt: '2026-02-10T11:15:00Z',
    updatedAt: '2026-08-10T09:45:00Z'
  },
  {
    id: 'pat-004',
    afyaPassId: 'AFY-KE-MUR-2026-65432',
    givenName: 'Peter',
    familyName: 'Kimani',
    dateOfBirth: '1975-01-30',
    gender: 'M',
    county: 'Murang\'a',
    subCounty: 'Kandara',
    primaryFacilityId: 'fac-005',
    bloodGroup: 'O-',
    emergencyContactPhone: '+254700000004',
    consentGranted: true,
    createdAt: '2026-03-05T14:40:00Z',
    updatedAt: '2026-08-05T11:30:00Z'
  },
  {
    id: 'pat-005',
    afyaPassId: 'AFY-KE-MUR-2026-54321',
    givenName: 'Mary',
    familyName: 'Wambui',
    dateOfBirth: '2001-06-12',
    gender: 'F',
    county: 'Murang\'a',
    subCounty: 'Gatanga',
    primaryFacilityId: 'fac-006',
    bloodGroup: 'AB+',
    emergencyContactPhone: '+254700000005',
    consentGranted: true,
    createdAt: '2026-04-20T09:05:00Z',
    updatedAt: '2026-08-01T15:10:00Z'
  },
  {
    id: 'pat-006',
    afyaPassId: 'AFY-KE-MUR-2026-43210',
    givenName: 'John',
    familyName: 'Njoroge',
    dateOfBirth: '1968-09-25',
    gender: 'M',
    county: 'Murang\'a',
    subCounty: 'Kiharu',
    primaryFacilityId: 'fac-001',
    bloodGroup: 'A+',
    emergencyContactPhone: '+254700000006',
    consentGranted: true,
    createdAt: '2026-05-15T10:25:00Z',
    updatedAt: '2026-08-12T13:40:00Z'
  },
  {
    id: 'pat-007',
    afyaPassId: 'AFY-KE-MUR-2026-32109',
    givenName: 'Agnes',
    familyName: 'Muthoni',
    dateOfBirth: '1990-04-18',
    gender: 'F',
    county: 'Murang\'a',
    subCounty: 'Maragua',
    primaryFacilityId: 'fac-004',
    bloodGroup: 'O+',
    emergencyContactPhone: '+254700000007',
    consentGranted: true,
    createdAt: '2026-06-10T11:50:00Z',
    updatedAt: '2026-08-22T09:15:00Z'
  },
  {
    id: 'pat-008',
    afyaPassId: 'AFY-KE-MUR-2026-21098',
    givenName: 'David',
    familyName: 'Kariuki',
    dateOfBirth: '1982-12-05',
    gender: 'M',
    county: 'Murang\'a',
    subCounty: 'Kangema',
    primaryFacilityId: 'fac-002',
    bloodGroup: 'B-',
    emergencyContactPhone: '+254700000008',
    consentGranted: true,
    createdAt: '2026-07-05T13:10:00Z',
    updatedAt: '2026-08-18T16:25:00Z'
  }
];

// --- MOCK CLINICAL ENCOUNTERS ---
export const mockEncounters: ClinicalEncounter[] = [
  {
    id: 'enc-001',
    patientId: 'pat-001',
    facilityId: 'fac-001',
    workerId: 'hw-001',
    encounterDate: '2026-08-15T09:00:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Patient presented with headache and fever for 3 days.',
    diagnosisCodes: ['1C40.0'],
    isEmergencyAccess: false
  },
  {
    id: 'enc-002',
    patientId: 'pat-002',
    facilityId: 'fac-003',
    workerId: 'hw-003',
    encounterDate: '2026-07-20T10:30:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Routine checkup for hypertension management.',
    diagnosisCodes: ['CA40.0'],
    isEmergencyAccess: false
  },
  {
    id: 'enc-003',
    patientId: 'pat-003',
    facilityId: 'fac-002',
    workerId: 'hw-002',
    encounterDate: '2026-06-12T14:15:00Z',
    encounterType: 'Immunization',
    summaryNote: 'Vaccination completed.',
    isEmergencyAccess: false
  },
  {
    id: 'enc-004',
    patientId: 'pat-004',
    facilityId: 'fac-005',
    workerId: 'hw-004',
    encounterDate: '2026-08-10T11:45:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Patient complains of chest pain and shortness of breath.',
    diagnosisCodes: ['BA00'],
    referralTargetFacilityId: 'fac-001',
    isEmergencyAccess: true
  },
  {
    id: 'enc-005',
    patientId: 'pat-004',
    facilityId: 'fac-001',
    workerId: 'hw-001',
    encounterDate: '2026-08-10T13:30:00Z',
    encounterType: 'Emergency',
    summaryNote: 'Admitted from Kandara Health Centre with severe pneumonia.',
    diagnosisCodes: ['BA00'],
    isEmergencyAccess: true
  },
  {
    id: 'enc-006',
    patientId: 'pat-005',
    facilityId: 'fac-006',
    workerId: 'hw-004',
    encounterDate: '2026-05-25T09:20:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Follow-up on diabetes management.',
    diagnosisCodes: ['5A11'],
    isEmergencyAccess: false
  },
  {
    id: 'enc-007',
    patientId: 'pat-006',
    facilityId: 'fac-001',
    workerId: 'hw-001',
    encounterDate: '2026-04-18T10:10:00Z',
    encounterType: 'Inpatient',
    summaryNote: 'Patient admitted for fracture treatment.',
    diagnosisCodes: ['JA04.Z'],
    isEmergencyAccess: false
  },
  {
    id: 'enc-008',
    patientId: 'pat-007',
    facilityId: 'fac-004',
    workerId: 'hw-004',
    encounterDate: '2026-08-22T08:45:00Z',
    encounterType: 'Lab Check',
    summaryNote: 'Routine lab tests.',
    isEmergencyAccess: false
  },
  {
    id: 'enc-009',
    patientId: 'pat-008',
    facilityId: 'fac-002',
    workerId: 'hw-002',
    encounterDate: '2026-08-18T14:30:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Patient presents with fever and chills.',
    diagnosisCodes: ['1C40.0'],
    isEmergencyAccess: false
  },
  {
    id: 'enc-010',
    patientId: 'pat-001',
    facilityId: 'fac-001',
    workerId: 'hw-001',
    encounterDate: '2026-08-20T10:00:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Follow-up on malaria treatment. Patient feels better.',
    diagnosisCodes: ['1C40.0'],
    isEmergencyAccess: false
  },
  {
    id: 'enc-011',
    patientId: 'pat-002',
    facilityId: 'fac-001',
    workerId: 'hw-001',
    encounterDate: '2026-08-15T14:20:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Referred from Kenol Sub-County Hospital for specialized hypertension management.',
    diagnosisCodes: ['CA40.0'],
    isEmergencyAccess: false
  },
  {
    id: 'enc-012',
    patientId: 'pat-007',
    facilityId: 'fac-004',
    workerId: 'hw-004',
    encounterDate: '2026-07-10T11:50:00Z',
    encounterType: 'Outpatient',
    summaryNote: 'Initial visit for diabetes screening.',
    isEmergencyAccess: false
  }
];

// --- MOCK DIAGNOSES ---
export const mockDiagnoses: Diagnosis[] = [
  {
    id: 'diag-001',
    patientId: 'pat-001',
    encounterId: 'enc-001',
    icdCode: '1C40.0',
    description: 'Malaria (confirmed)',
    type: 'Primary',
    status: 'Resolved',
    diagnosedAt: '2026-08-15T09:15:00Z',
    diagnosedBy: 'hw-001',
    facilityId: 'fac-001'
  },
  {
    id: 'diag-002',
    patientId: 'pat-002',
    encounterId: 'enc-002',
    icdCode: 'CA40.0',
    description: 'Essential hypertension',
    type: 'Primary',
    status: 'Active',
    diagnosedAt: '2026-07-20T10:45:00Z',
    diagnosedBy: 'hw-003',
    facilityId: 'fac-003'
  },
  {
    id: 'diag-003',
    patientId: 'pat-004',
    encounterId: 'enc-005',
    icdCode: 'BA00',
    description: 'Pneumonia',
    type: 'Primary',
    status: 'Active',
    diagnosedAt: '2026-08-10T14:00:00Z',
    diagnosedBy: 'hw-001',
    facilityId: 'fac-001'
  },
  {
    id: 'diag-004',
    patientId: 'pat-005',
    encounterId: 'enc-006',
    icdCode: '5A11',
    description: 'Type 2 diabetes mellitus',
    type: 'Primary',
    status: 'Chronic',
    diagnosedAt: '2026-05-25T09:40:00Z',
    diagnosedBy: 'hw-004',
    facilityId: 'fac-006'
  },
  {
    id: 'diag-005',
    patientId: 'pat-006',
    encounterId: 'enc-007',
    icdCode: 'JA04.Z',
    description: 'Fracture, unspecified',
    type: 'Primary',
    status: 'Resolved',
    diagnosedAt: '2026-04-18T10:30:00Z',
    diagnosedBy: 'hw-001',
    facilityId: 'fac-001'
  },
  {
    id: 'diag-006',
    patientId: 'pat-008',
    encounterId: 'enc-009',
    icdCode: '1C40.0',
    description: 'Malaria (confirmed)',
    type: 'Primary',
    status: 'Active',
    diagnosedAt: '2026-08-18T14:45:00Z',
    diagnosedBy: 'hw-002',
    facilityId: 'fac-002'
  },
  {
    id: 'diag-007',
    patientId: 'pat-002',
    encounterId: 'enc-011',
    icdCode: 'CA40.0',
    description: 'Essential hypertension',
    type: 'Primary',
    status: 'Chronic',
    diagnosedAt: '2026-08-15T14:35:00Z',
    diagnosedBy: 'hw-001',
    facilityId: 'fac-001'
  },
  {
    id: 'diag-008',
    patientId: 'pat-007',
    encounterId: 'enc-008',
    icdCode: '5A11',
    description: 'Type 2 diabetes mellitus',
    type: 'Primary',
    status: 'Active',
    diagnosedAt: '2026-08-22T09:00:00Z',
    diagnosedBy: 'hw-004',
    facilityId: 'fac-004'
  }
];

// --- MOCK LAB ORDERS ---
export const mockLabOrders: LabOrder[] = [
  {
    id: 'lab-001',
    patientId: 'pat-001',
    encounterId: 'enc-001',
    testName: 'Malaria RDT',
    testCode: 'TEST-MAL-RDT',
    orderedBy: 'hw-001',
    orderedAt: '2026-08-15T09:05:00Z',
    facilityId: 'fac-001',
    status: 'Completed',
    priority: 'Urgent',
    results: 'Positive for Plasmodium falciparum',
    resultDate: '2026-08-15T09:30:00Z',
    resultedBy: 'hw-005',
    notes: 'Patient advised to start antimalarials.'
  },
  {
    id: 'lab-002',
    patientId: 'pat-002',
    encounterId: 'enc-002',
    testName: 'Renal Function Test',
    testCode: 'TEST-RFT',
    orderedBy: 'hw-003',
    orderedAt: '2026-07-20T10:35:00Z',
    facilityId: 'fac-003',
    status: 'Completed',
    priority: 'Routine',
    results: 'Creatinine: 1.2 mg/dL, Urea: 30 mg/dL (Normal)',
    resultDate: '2026-07-21T08:00:00Z',
    resultedBy: 'hw-005'
  },
  {
    id: 'lab-003',
    patientId: 'pat-004',
    encounterId: 'enc-005',
    testName: 'Complete Blood Count (CBC)',
    testCode: 'TEST-CBC',
    orderedBy: 'hw-001',
    orderedAt: '2026-08-10T13:45:00Z',
    facilityId: 'fac-001',
    status: 'Completed',
    priority: 'STAT',
    results: 'WBC: 15,000/uL (Elevated)',
    resultDate: '2026-08-10T14:15:00Z',
    resultedBy: 'hw-005',
    notes: 'Suggests infection.'
  },
  {
    id: 'lab-004',
    patientId: 'pat-005',
    encounterId: 'enc-006',
    testName: 'HbA1c',
    testCode: 'TEST-HBA1C',
    orderedBy: 'hw-004',
    orderedAt: '2026-05-25T09:25:00Z',
    facilityId: 'fac-006',
    status: 'Completed',
    priority: 'Routine',
    results: 'HbA1c: 7.2%',
    resultDate: '2026-05-26T08:30:00Z',
    resultedBy: 'hw-005'
  },
  {
    id: 'lab-005',
    patientId: 'pat-008',
    encounterId: 'enc-009',
    testName: 'Malaria RDT',
    testCode: 'TEST-MAL-RDT',
    orderedBy: 'hw-002',
    orderedAt: '2026-08-18T14:35:00Z',
    facilityId: 'fac-002',
    status: 'Completed',
    priority: 'Urgent',
    results: 'Positive',
    resultDate: '2026-08-18T15:00:00Z',
    resultedBy: 'hw-005'
  },
  {
    id: 'lab-006',
    patientId: 'pat-007',
    encounterId: 'enc-008',
    testName: 'Fasting Blood Glucose',
    testCode: 'TEST-FBG',
    orderedBy: 'hw-004',
    orderedAt: '2026-08-22T08:50:00Z',
    facilityId: 'fac-004',
    status: 'Pending',
    priority: 'Routine'
  },
  {
    id: 'lab-007',
    patientId: 'pat-007',
    encounterId: 'enc-008',
    testName: 'Urinalysis',
    testCode: 'TEST-UA',
    orderedBy: 'hw-004',
    orderedAt: '2026-08-22T08:55:00Z',
    facilityId: 'fac-004',
    status: 'In Progress',
    priority: 'Routine'
  },
  {
    id: 'lab-008',
    patientId: 'pat-006',
    encounterId: 'enc-007',
    testName: 'Liver Function Test',
    testCode: 'TEST-LFT',
    orderedBy: 'hw-001',
    orderedAt: '2026-04-18T10:15:00Z',
    facilityId: 'fac-001',
    status: 'Completed',
    priority: 'Routine',
    results: 'Normal',
    resultDate: '2026-04-19T09:00:00Z',
    resultedBy: 'hw-005'
  }
];

// --- MOCK REFERRALS ---
export const mockReferrals: Referral[] = [
  {
    id: 'ref-001',
    patientId: 'pat-004',
    sourceFacilityId: 'fac-005',
    targetFacilityId: 'fac-001',
    referredBy: 'hw-004',
    referralDate: '2026-08-10T11:55:00Z',
    reason: 'Severe pneumonia requiring inpatient care and oxygen therapy.',
    urgency: 'Emergency',
    status: 'Completed',
    clinicalNotes: 'Patient breathless, SPO2 85% on room air.',
    responseDate: '2026-08-10T13:30:00Z',
    respondedBy: 'hw-001'
  },
  {
    id: 'ref-002',
    patientId: 'pat-002',
    sourceFacilityId: 'fac-003',
    targetFacilityId: 'fac-001',
    referredBy: 'hw-003',
    referralDate: '2026-08-12T10:00:00Z',
    reason: 'Uncontrolled hypertension, needs specialist consultation.',
    urgency: 'Routine',
    status: 'Completed',
    clinicalNotes: 'BP consistently > 160/100 despite medication compliance.',
    responseDate: '2026-08-15T14:20:00Z',
    respondedBy: 'hw-001'
  },
  {
    id: 'ref-003',
    patientId: 'pat-007',
    sourceFacilityId: 'fac-004',
    targetFacilityId: 'fac-003',
    referredBy: 'hw-004',
    referralDate: '2026-08-20T09:30:00Z',
    reason: 'Suspicion of diabetes mellitus, refer for comprehensive screening.',
    urgency: 'Routine',
    status: 'Pending',
    clinicalNotes: 'Patient reports polyuria and polydipsia.'
  },
  {
    id: 'ref-004',
    patientId: 'pat-005',
    sourceFacilityId: 'fac-006',
    targetFacilityId: 'fac-001',
    referredBy: 'hw-004',
    referralDate: '2026-08-24T14:00:00Z',
    reason: 'Diabetes with complications (neuropathy).',
    urgency: 'Routine',
    status: 'Accepted',
    clinicalNotes: 'Patient complains of numbness in feet.',
    responseDate: '2026-08-24T16:00:00Z',
    respondedBy: 'hw-001'
  },
  {
    id: 'ref-005',
    patientId: 'pat-008',
    sourceFacilityId: 'fac-002',
    targetFacilityId: 'fac-001',
    referredBy: 'hw-002',
    referralDate: '2026-08-25T08:30:00Z',
    reason: 'Complicated malaria, non-responsive to oral therapy.',
    urgency: 'Urgent',
    status: 'Pending',
    clinicalNotes: 'Persistent fever and vomiting after 3 days of AL.'
  }
];

// --- MOCK MEDICATIONS ---
export const mockMedications: Medication[] = [
  {
    id: 'med-001',
    patientId: 'pat-001',
    encounterId: 'enc-001',
    drugName: 'Artemether/Lumefantrine (AL)',
    dosage: '80/480mg',
    frequency: 'BD for 3 days',
    route: 'Oral',
    startDate: '2026-08-15T10:00:00Z',
    endDate: '2026-08-18T10:00:00Z',
    prescribedBy: 'hw-001',
    facilityId: 'fac-001',
    status: 'Completed'
  },
  {
    id: 'med-002',
    patientId: 'pat-002',
    encounterId: 'enc-002',
    drugName: 'Amlodipine',
    dosage: '5mg',
    frequency: 'OD',
    route: 'Oral',
    startDate: '2026-07-20T11:00:00Z',
    prescribedBy: 'hw-003',
    facilityId: 'fac-003',
    status: 'Active'
  },
  {
    id: 'med-003',
    patientId: 'pat-004',
    encounterId: 'enc-005',
    drugName: 'Ceftriaxone',
    dosage: '1g',
    frequency: 'OD for 5 days',
    route: 'IV',
    startDate: '2026-08-10T14:30:00Z',
    endDate: '2026-08-15T14:30:00Z',
    prescribedBy: 'hw-001',
    facilityId: 'fac-001',
    status: 'Completed'
  },
  {
    id: 'med-004',
    patientId: 'pat-005',
    encounterId: 'enc-006',
    drugName: 'Metformin',
    dosage: '500mg',
    frequency: 'BD',
    route: 'Oral',
    startDate: '2026-05-25T10:00:00Z',
    prescribedBy: 'hw-004',
    facilityId: 'fac-006',
    status: 'Active'
  },
  {
    id: 'med-005',
    patientId: 'pat-008',
    encounterId: 'enc-009',
    drugName: 'Artemether/Lumefantrine (AL)',
    dosage: '80/480mg',
    frequency: 'BD for 3 days',
    route: 'Oral',
    startDate: '2026-08-18T15:30:00Z',
    endDate: '2026-08-21T15:30:00Z',
    prescribedBy: 'hw-002',
    facilityId: 'fac-002',
    status: 'Completed'
  },
  {
    id: 'med-006',
    patientId: 'pat-006',
    encounterId: 'enc-007',
    drugName: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'TDS PRN',
    route: 'Oral',
    startDate: '2026-04-18T11:00:00Z',
    endDate: '2026-04-25T11:00:00Z',
    prescribedBy: 'hw-001',
    facilityId: 'fac-001',
    status: 'Completed'
  },
  {
    id: 'med-007',
    patientId: 'pat-002',
    encounterId: 'enc-011',
    drugName: 'Losartan',
    dosage: '50mg',
    frequency: 'OD',
    route: 'Oral',
    startDate: '2026-08-15T15:00:00Z',
    prescribedBy: 'hw-001',
    facilityId: 'fac-001',
    status: 'Active'
  },
  {
    id: 'med-008',
    patientId: 'pat-004',
    encounterId: 'enc-005',
    drugName: 'Amoxicillin/Clavulanate',
    dosage: '625mg',
    frequency: 'TDS for 7 days',
    route: 'Oral',
    startDate: '2026-08-15T14:30:00Z',
    endDate: '2026-08-22T14:30:00Z',
    prescribedBy: 'hw-001',
    facilityId: 'fac-001',
    status: 'Completed'
  }
];

// --- MOCK ALLERGIES ---
export const mockAllergies: Allergy[] = [
  {
    id: 'alg-001',
    patientId: 'pat-001',
    allergen: 'Penicillin',
    reaction: 'Hives, Swelling',
    severity: 'Severe',
    recordedAt: '2025-12-01T08:15:00Z',
    recordedBy: 'hw-001'
  },
  {
    id: 'alg-002',
    patientId: 'pat-003',
    allergen: 'Peanuts',
    reaction: 'Anaphylaxis',
    severity: 'Severe',
    recordedAt: '2026-02-10T11:20:00Z',
    recordedBy: 'hw-002'
  },
  {
    id: 'alg-003',
    patientId: 'pat-005',
    allergen: 'Sulfa Drugs',
    reaction: 'Rash',
    severity: 'Moderate',
    recordedAt: '2026-04-20T09:10:00Z',
    recordedBy: 'hw-004'
  },
  {
    id: 'alg-004',
    patientId: 'pat-007',
    allergen: 'Latex',
    reaction: 'Skin irritation',
    severity: 'Mild',
    recordedAt: '2026-06-10T11:55:00Z',
    recordedBy: 'hw-004'
  },
  {
    id: 'alg-005',
    patientId: 'pat-008',
    allergen: 'Dust Mites',
    reaction: 'Sneezing, runny nose',
    severity: 'Mild',
    recordedAt: '2026-07-05T13:15:00Z',
    recordedBy: 'hw-002'
  }
];

// --- MOCK VITAL SIGNS ---
export const mockVitalSigns: VitalSigns[] = [
  {
    id: 'vs-001',
    encounterId: 'enc-001',
    patientId: 'pat-001',
    recordedAt: '2026-08-15T09:05:00Z',
    recordedBy: 'hw-003',
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    heartRate: 88,
    temperature: 38.5,
    respiratoryRate: 18,
    oxygenSaturation: 98,
    weight: 65,
    height: 165
  },
  {
    id: 'vs-002',
    encounterId: 'enc-002',
    patientId: 'pat-002',
    recordedAt: '2026-07-20T10:35:00Z',
    recordedBy: 'hw-004',
    bloodPressureSystolic: 165,
    bloodPressureDiastolic: 95,
    heartRate: 72,
    temperature: 36.8,
    respiratoryRate: 16,
    oxygenSaturation: 99,
    weight: 82,
    height: 175
  },
  {
    id: 'vs-003',
    encounterId: 'enc-004',
    patientId: 'pat-004',
    recordedAt: '2026-08-10T11:50:00Z',
    recordedBy: 'hw-004',
    bloodPressureSystolic: 110,
    bloodPressureDiastolic: 70,
    heartRate: 110,
    temperature: 39.0,
    respiratoryRate: 28,
    oxygenSaturation: 85,
    weight: 70,
    height: 170
  },
  {
    id: 'vs-004',
    encounterId: 'enc-005',
    patientId: 'pat-004',
    recordedAt: '2026-08-10T13:40:00Z',
    recordedBy: 'hw-003',
    bloodPressureSystolic: 115,
    bloodPressureDiastolic: 75,
    heartRate: 105,
    temperature: 38.8,
    respiratoryRate: 24,
    oxygenSaturation: 92,
    weight: 70,
    height: 170
  },
  {
    id: 'vs-005',
    encounterId: 'enc-006',
    patientId: 'pat-005',
    recordedAt: '2026-05-25T09:25:00Z',
    recordedBy: 'hw-004',
    bloodPressureSystolic: 130,
    bloodPressureDiastolic: 85,
    heartRate: 78,
    temperature: 36.5,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 90,
    height: 160
  },
  {
    id: 'vs-006',
    encounterId: 'enc-009',
    patientId: 'pat-008',
    recordedAt: '2026-08-18T14:35:00Z',
    recordedBy: 'hw-008',
    bloodPressureSystolic: 125,
    bloodPressureDiastolic: 82,
    heartRate: 95,
    temperature: 38.9,
    respiratoryRate: 20,
    oxygenSaturation: 97,
    weight: 75,
    height: 180
  },
  {
    id: 'vs-007',
    encounterId: 'enc-011',
    patientId: 'pat-002',
    recordedAt: '2026-08-15T14:25:00Z',
    recordedBy: 'hw-003',
    bloodPressureSystolic: 155,
    bloodPressureDiastolic: 90,
    heartRate: 75,
    temperature: 37.0,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 82,
    height: 175
  },
  {
    id: 'vs-008',
    encounterId: 'enc-012',
    patientId: 'pat-007',
    recordedAt: '2026-07-10T11:55:00Z',
    recordedBy: 'hw-004',
    bloodPressureSystolic: 135,
    bloodPressureDiastolic: 85,
    heartRate: 80,
    temperature: 36.9,
    respiratoryRate: 18,
    oxygenSaturation: 99,
    weight: 85,
    height: 168
  }
];

// --- MOCK ACTIVITY EVENTS ---
const today = new Date('2026-08-25T00:00:00Z');

export const mockActivityEvents: ActivityEvent[] = [
  {
    id: 'act-001',
    timestamp: new Date(today.getTime() + 9 * 60 * 60 * 1000 + 42 * 60 * 1000).toISOString(), // 09:42
    action: 'Patient Registered',
    description: 'New AfyaPass ID generated and profile created.',
    patientName: 'Jane Doe',
    afyaPassId: 'AFY-KE-MUR-2026-99999',
    facilityName: 'Murang\'a Level 5 Hospital',
    actorName: 'Dr. James Kamau',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-002',
    timestamp: new Date(today.getTime() + 9 * 60 * 60 * 1000 + 35 * 60 * 1000).toISOString(), // 09:35
    action: 'Referral Created',
    description: 'Patient referred to Murang\'a Level 5 for specialized care.',
    patientId: 'pat-008',
    patientName: 'David Kariuki',
    afyaPassId: 'AFY-KE-MUR-2026-21098',
    facilityName: 'Kangema Sub-County Hospital',
    actorName: 'Dr. Sarah Wanjiku',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-003',
    timestamp: new Date(today.getTime() + 9 * 60 * 60 * 1000 + 21 * 60 * 1000).toISOString(), // 09:21
    action: 'Lab Result Added',
    description: 'Fasting Blood Glucose results uploaded.',
    patientId: 'pat-007',
    patientName: 'Agnes Muthoni',
    afyaPassId: 'AFY-KE-MUR-2026-32109',
    facilityName: 'Maragua Health Centre',
    actorName: 'Nurse Peter Maina',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-004',
    timestamp: new Date(today.getTime() + 8 * 60 * 60 * 1000 + 55 * 60 * 1000).toISOString(), // 08:55
    action: 'Encounter Created',
    description: 'Outpatient visit recorded.',
    patientId: 'pat-007',
    patientName: 'Agnes Muthoni',
    afyaPassId: 'AFY-KE-MUR-2026-32109',
    facilityName: 'Maragua Health Centre',
    actorName: 'Nurse Peter Maina',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-005',
    timestamp: new Date(today.getTime() + 8 * 60 * 60 * 1000 + 40 * 60 * 1000).toISOString(), // 08:40
    action: 'QR Scan',
    description: 'Patient AfyaPass QR scanned successfully.',
    patientId: 'pat-007',
    patientName: 'Agnes Muthoni',
    afyaPassId: 'AFY-KE-MUR-2026-32109',
    facilityName: 'Maragua Health Centre',
    actorName: 'Nurse Peter Maina',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-006',
    timestamp: new Date(today.getTime() + 8 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(), // 08:15
    action: 'Medication Prescribed',
    description: 'Amoxicillin prescribed for 7 days.',
    patientId: 'pat-004',
    patientName: 'Peter Kimani',
    afyaPassId: 'AFY-KE-MUR-2026-65432',
    facilityName: 'Murang\'a Level 5 Hospital',
    actorName: 'Dr. James Kamau',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-007',
    timestamp: new Date(today.getTime() + 8 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(), // 08:10
    action: 'Record View',
    description: 'Patient health history accessed.',
    patientId: 'pat-004',
    patientName: 'Peter Kimani',
    afyaPassId: 'AFY-KE-MUR-2026-65432',
    facilityName: 'Murang\'a Level 5 Hospital',
    actorName: 'Dr. James Kamau',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-008',
    timestamp: new Date(today.getTime() + 7 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(), // 07:45
    action: 'Facility Offline Alert',
    description: 'Muriranjas Health Centre reported connection issues.',
    facilityName: 'Muriranjas Health Centre',
    actorRole: 'system_auditor'
  },
  {
    id: 'act-009',
    timestamp: new Date(today.getTime() + 7 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // 07:30
    action: 'Emergency Override',
    description: 'Emergency access to patient records granted.',
    patientId: 'pat-003',
    patientName: 'Grace Wairimu',
    afyaPassId: 'AFY-KE-MUR-2026-76543',
    facilityName: 'Kangema Sub-County Hospital',
    actorName: 'Dr. Sarah Wanjiku',
    actorRole: 'healthcare_worker'
  },
  {
    id: 'act-010',
    timestamp: new Date(today.getTime() + 7 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(), // 07:15
    action: 'System Login',
    description: 'County admin logged into the dashboard.',
    facilityName: 'County Headquarters',
    actorName: 'Admin User',
    actorRole: 'county_admin'
  }
];

// --- DASHBOARD STATS ---
export const dashboardStats = {
  totalPatients: 28450,
  newPatientsThisWeek: 142,
  todayEncounters: 89,
  yesterdayEncounters: 76,
  activeReferrals: 23,
  pendingLabOrders: 34,
  resultsAwaitingReview: 12,
  activeFacilities: 142,
  onlineFacilities: 128,
  healthcareWorkers: 1847,
};
