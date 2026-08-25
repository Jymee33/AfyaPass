-- Migration 035: Safe Reference Seed Data (Murang'a County Pilot)

-- 1. Roles
INSERT INTO roles (id, code, name, description) VALUES
('10000000-0000-0000-0000-000000000001', 'PATIENT', 'Patient', 'Patient self-service portal access'),
('10000000-0000-0000-0000-000000000002', 'RECEPTIONIST', 'Receptionist', 'Patient registration and check-in'),
('10000000-0000-0000-0000-000000000003', 'NURSE', 'Nurse', 'Nursing triage, vitals, and allergy documentation'),
('10000000-0000-0000-0000-000000000004', 'CLINICIAN', 'Clinician', 'Physician/Medical Officer full clinical recording'),
('10000000-0000-0000-0000-000000000005', 'PHARMACIST', 'Pharmacist', 'Prescription review and dispensing'),
('10000000-0000-0000-0000-000000000006', 'LAB_USER', 'Laboratory Technician', 'Lab order processing and result verification'),
('10000000-0000-0000-0000-000000000007', 'FACILITY_ADMIN', 'Facility Administrator', 'Facility staff management and operational stats'),
('10000000-0000-0000-0000-000000000008', 'COUNTY_ADMIN', 'County Administrator', 'De-identified epidemiological analytics'),
('10000000-0000-0000-0000-000000000009', 'SYSTEM_AUDITOR', 'System Auditor', 'Security and access audit review')
ON CONFLICT (code) DO NOTHING;

-- 2. Permissions
INSERT INTO permissions (id, code, name, description) VALUES
('20000000-0000-0000-0000-000000000001', 'patient.read.basic', 'Read Basic Patient Info', 'Access demographics and patient numbers'),
('20000000-0000-0000-0000-000000000002', 'patient.read.clinical', 'Read Clinical Charts', 'Access full longitudinal clinical record'),
('20000000-0000-0000-0000-000000000003', 'encounter.create', 'Create Encounter', 'Open and record new clinical encounters'),
('20000000-0000-0000-0000-000000000004', 'diagnosis.create', 'Record Diagnosis', 'Add ICD-11 coded diagnosis conditions'),
('20000000-0000-0000-0000-000000000005', 'prescription.create', 'Create Prescription', 'Write medication prescriptions'),
('20000000-0000-0000-0000-000000000006', 'prescription.dispense', 'Dispense Medication', 'Record pharmacy dispensing events'),
('20000000-0000-0000-0000-000000000007', 'lab.result.create', 'Record Lab Result', 'Enter and verify lab test results'),
('20000000-0000-0000-0000-000000000008', 'audit.read', 'Read Audit Logs', 'Inspect system audit trails')
ON CONFLICT (code) DO NOTHING;

-- 3. Role Permission Mapping (Clinician Role Example)
INSERT INTO role_permissions (role_id, permission_id) VALUES
('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001'),
('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000002'),
('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003'),
('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000004'),
('10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000005')
ON CONFLICT DO NOTHING;

-- 4. Murang'a County Geographic Reference Data
INSERT INTO counties (id, code, name) VALUES
('30000000-0000-0000-0000-000000000021', '21', 'Murang''a')
ON CONFLICT (code) DO NOTHING;

INSERT INTO sub_counties (id, county_id, name) VALUES
('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000021', 'Kiharu'),
('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000021', 'Kandara'),
('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000021', 'Maragua'),
('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000021', 'Kangema'),
('40000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000021', 'Gatanga')
ON CONFLICT DO NOTHING;

-- 5. Murang'a Pilot MFL Facilities
INSERT INTO facilities (id, facility_code, name, facility_type, county_id, sub_county_id, facility_level) VALUES
('50000000-0000-0000-0000-000000000001', 'MFL-13782', 'Murang''a Level 5 Hospital', 'PUBLIC', '30000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000001', 5),
('50000000-0000-0000-0000-000000000002', 'MFL-13801', 'Kenol Sub-County Hospital', 'PUBLIC', '30000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000002', 4),
('50000000-0000-0000-0000-000000000003', 'MFL-13815', 'Maragua Level 4 Hospital', 'PUBLIC', '30000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000003', 4),
('50000000-0000-0000-0000-000000000004', 'MFL-13822', 'Kangema Sub-County Hospital', 'PUBLIC', '30000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000004', 4),
('50000000-0000-0000-0000-000000000005', 'MFL-18204', 'Murang''a Catholic Mission Hospital', 'FAITH_BASED', '30000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000001', 4)
ON CONFLICT (facility_code) DO NOTHING;

-- 6. Essential Medicines Reference Seed
INSERT INTO medications (id, code, name, generic_name, strength, dosage_form) VALUES
('60000000-0000-0000-0000-000000000001', 'EML-MAL-001', 'Coartem 20/120', 'Artemether/Lumefantrine', '20mg/120mg', 'Tablet'),
('60000000-0000-0000-0000-000000000002', 'EML-ABX-001', 'Amoxil 500mg', 'Amoxicillin', '500mg', 'Capsule'),
('60000000-0000-0000-0000-000000000003', 'EML-HTN-001', 'Amlodipine 5mg', 'Amlodipine', '5mg', 'Tablet'),
('60000000-0000-0000-0000-000000000004', 'EML-DIA-001', 'Metformin 500mg', 'Metformin Hydrochloride', '500mg', 'Tablet'),
('60000000-0000-0000-0000-000000000005', 'EML-ANP-001', 'Panadol 500mg', 'Paracetamol', '500mg', 'Tablet')
ON CONFLICT (code) DO NOTHING;
