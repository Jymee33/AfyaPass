-- AfyaPass Database Migration Script
-- Scaffolding schema for Murang'a County Digital Health Pilot
-- Includes Row Level Security (RLS) policies and Audit Logging

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Enumerations
CREATE TYPE user_role AS ENUM ('patient', 'healthcare_worker', 'facility_admin', 'county_admin', 'system_auditor');
CREATE TYPE facility_type AS ENUM ('Public', 'Private', 'Faith-Based', 'Community');
CREATE TYPE encounter_type AS ENUM ('Outpatient', 'Inpatient', 'Emergency', 'Immunization', 'Lab Check');
CREATE TYPE audit_action AS ENUM ('QR_SCAN', 'RECORD_VIEW', 'ENCOUNTER_CREATE', 'CONSENT_UPDATE', 'EMERGENCY_OVERRIDE');

-- 3. Healthcare Facilities Table
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_code VARCHAR(50) UNIQUE NOT NULL, -- Master Facility List (MFL) Code
    name VARCHAR(255) NOT NULL,
    facility_type facility_type NOT NULL DEFAULT 'Public',
    county VARCHAR(100) NOT NULL DEFAULT 'Murang''a',
    sub_county VARCHAR(100) NOT NULL,
    facility_level INT CHECK (facility_level BETWEEN 1 AND 6),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Patients Master Table
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    afyapass_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., AFY-KE-MUR-2026-98421
    national_id_hash VARCHAR(255), -- One-way hash for duplicate check, NOT raw ID
    given_name VARCHAR(100) NOT NULL,
    family_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    county VARCHAR(100) NOT NULL DEFAULT 'Murang''a',
    sub_county VARCHAR(100) NOT NULL,
    primary_facility_id UUID REFERENCES facilities(id),
    blood_group VARCHAR(5),
    emergency_contact_phone VARCHAR(20),
    consent_granted BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Healthcare Workers Table
CREATE TABLE healthcare_workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id),
    facility_id UUID REFERENCES facilities(id) NOT NULL,
    license_number VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role_title VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Clinical Encounters Table
CREATE TABLE clinical_encounters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) NOT NULL,
    facility_id UUID REFERENCES facilities(id) NOT NULL,
    worker_id UUID REFERENCES healthcare_workers(id) NOT NULL,
    encounter_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    encounter_type encounter_type NOT NULL,
    summary_note TEXT,
    diagnosis_codes TEXT[], -- ICD-11 codes array
    allergies_noted TEXT[],
    is_emergency_access BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Audit Logs Table (Immutable Append-Only Audit Trail)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actor_id UUID NOT NULL,
    actor_role user_role NOT NULL,
    facility_id UUID REFERENCES facilities(id),
    patient_id UUID REFERENCES patients(id),
    action audit_action NOT NULL,
    resource_path VARCHAR(255) NOT NULL,
    ip_address_hash VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
    denial_reason TEXT
);

-- Indexes for efficient querying
CREATE INDEX idx_patients_afyapass_id ON patients(afyapass_id);
CREATE INDEX idx_encounters_patient_id ON clinical_encounters(patient_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_patient_id ON audit_logs(patient_id);
