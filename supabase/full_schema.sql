-- Migration 001: Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- Migration 002: Geography Domain (Counties & Sub-Counties)
CREATE TABLE counties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sub_counties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    county_id UUID NOT NULL REFERENCES counties(id) ON DELETE RESTRICT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_county_sub_county UNIQUE (county_id, name)
);
-- Migration 003: Patient Identity Master Domain
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. AFP-4827-19
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    sex VARCHAR(10) NOT NULL CHECK (sex IN ('M', 'F', 'Other')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'merged', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 004: Patient Identifiers Domain
CREATE TABLE patient_identifiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    identifier_type VARCHAR(50) NOT NULL, -- e.g. NATIONAL_ID, BIRTH_CERT, HUDUMA
    identifier_value_encrypted TEXT NOT NULL,
    identifier_hash VARCHAR(255) UNIQUE NOT NULL, -- HMAC-SHA256 for exact match search
    verification_status VARCHAR(20) NOT NULL DEFAULT 'UNVERIFIED' CHECK (verification_status IN ('VERIFIED', 'UNVERIFIED')),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 005: Patient Contacts Domain
CREATE TABLE patient_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    contact_type VARCHAR(20) NOT NULL CHECK (contact_type IN ('PHONE', 'EMAIL')),
    phone_encrypted TEXT,
    email_encrypted TEXT,
    verification_status VARCHAR(20) NOT NULL DEFAULT 'UNVERIFIED',
    verified_at TIMESTAMPTZ,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 006: Patient Addresses Domain
CREATE TABLE patient_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    address_type VARCHAR(20) NOT NULL DEFAULT 'RESIDENTIAL' CHECK (address_type IN ('RESIDENTIAL', 'POSTAL', 'TEMPORARY')),
    county_id UUID REFERENCES counties(id),
    sub_county_id UUID REFERENCES sub_counties(id),
    ward_location TEXT,
    address_text TEXT,
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_to DATE,
    is_current BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 007: Patient Relationships Domain (Family/Guardians)
CREATE TABLE patient_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    related_patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    relationship_type VARCHAR(50) NOT NULL, -- e.g. MOTHER, FATHER, GUARDIAN, SPOUSE, CHILD
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_to DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_no_self_relationship CHECK (patient_id <> related_patient_id)
);
-- Migration 008: External Identifiers Domain (Interoperability Integration)
CREATE TABLE external_identifiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    system VARCHAR(100) NOT NULL, -- e.g. KHIE, COUNTY_EHR, LAB_SYS
    identifier VARCHAR(255) NOT NULL,
    identifier_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    period_start DATE,
    period_end DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_patient_system_id UNIQUE (patient_id, system, identifier)
);
-- Migration 009: Organization Domain (Facilities & Departments)
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_code VARCHAR(50) UNIQUE NOT NULL, -- Master Facility List (MFL) Code
    name VARCHAR(255) NOT NULL,
    facility_type VARCHAR(50) NOT NULL DEFAULT 'PUBLIC' CHECK (facility_type IN ('PUBLIC', 'PRIVATE', 'FAITH_BASED', 'COMMUNITY')),
    county_id UUID NOT NULL REFERENCES counties(id),
    sub_county_id UUID NOT NULL REFERENCES sub_counties(id),
    facility_level INT CHECK (facility_level BETWEEN 1 AND 6),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_facility_department UNIQUE (facility_id, name)
);
-- Migration 010: User Identity & Healthcare Worker Domain
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'DEACTIVATED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE healthcare_workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    professional_identifier VARCHAR(100), -- License / Board Number (e.g. KMPDC, NCK)
    professional_type VARCHAR(50) NOT NULL, -- e.g. MEDICAL_OFFICER, CLINICAL_OFFICER, NURSE, PHARMACIST
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 011: Roles & Permissions Domain
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL, -- e.g. CLINICIAN, NURSE, PHARMACIST, PATIENT
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) UNIQUE NOT NULL, -- e.g. patient.read.clinical, encounter.create
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (role_id, permission_id)
);
-- Migration 012: Facility User Roles Assignment Domain
CREATE TABLE facility_user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'EXPIRED')),
    valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_to TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_facility_role UNIQUE (user_profile_id, facility_id, role_id)
);
-- Migration 013: Patient Physical Cards Domain
CREATE TABLE patient_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    card_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED', 'REPLACED')),
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 014: QR Tokens Domain
CREATE TABLE qr_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID NOT NULL REFERENCES patient_cards(id) ON DELETE RESTRICT,
    token_hash VARCHAR(255) UNIQUE NOT NULL, -- SHA-256 hash of random token
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED')),
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 015: Clinical Encounters Domain
CREATE TABLE encounters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    provider_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    encounter_type VARCHAR(50) NOT NULL, -- e.g. OUTPATIENT, INPATIENT, EMERGENCY, IMMUNIZATION
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 016: Clinical Observations Domain (Vitals & Measurements)
CREATE TABLE observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    observation_type VARCHAR(100) NOT NULL, -- e.g. TEMPERATURE, BLOOD_PRESSURE_SYSTOLIC, WEIGHT, PULSE
    value NUMERIC(10,2) NOT NULL,
    unit VARCHAR(30) NOT NULL, -- e.g. degC, mmHg, kg, bpm
    recorded_by UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 017: Diagnoses Domain (Coded Conditions)
CREATE TABLE diagnoses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    code VARCHAR(50) NOT NULL, -- e.g. 1C40.0, CA40.0
    code_system VARCHAR(50) NOT NULL DEFAULT 'ICD-11',
    description TEXT NOT NULL,
    diagnosis_type VARCHAR(20) NOT NULL DEFAULT 'PRIMARY' CHECK (diagnosis_type IN ('PRIMARY', 'SECONDARY', 'DIFFERENTIAL')),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'RESOLVED', 'AMENDED')),
    recorded_by UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 018: Clinical Notes Domain
CREATE TABLE clinical_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    author_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    note_type VARCHAR(50) NOT NULL DEFAULT 'SOAP_NOTE', -- e.g. SOAP_NOTE, DISCHARGE_SUMMARY, NURSING_NOTE
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 019: Allergies & Intolerances Domain
CREATE TABLE allergies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    substance VARCHAR(255) NOT NULL, -- e.g. Penicillin, Sulfa, Peanuts
    reaction TEXT, -- e.g. Anaphylaxis, Rash
    severity VARCHAR(20) NOT NULL DEFAULT 'MODERATE' CHECK (severity IN ('MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING')),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'MUTED')),
    recorded_by UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 020: Clinical Procedures Domain
CREATE TABLE procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    code VARCHAR(50),
    code_system VARCHAR(50) DEFAULT 'CPT',
    description TEXT NOT NULL,
    performed_by UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('COMPLETED', 'IN_PROGRESS', 'ABORTED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 021: Care Plans Domain
CREATE TABLE care_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID REFERENCES encounters(id) ON DELETE RESTRICT,
    author_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'CANCELLED')),
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 022: Controlled Medication Reference Domain
CREATE TABLE medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE,
    code_system VARCHAR(50) DEFAULT 'EML', -- Essential Medicines List
    name VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255) NOT NULL,
    strength VARCHAR(100), -- e.g. 20mg/120mg, 500mg
    dosage_form VARCHAR(100), -- e.g. Tablet, Syrup, Injection
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 023: Prescriptions Domain
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    prescriber_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    medication_id UUID NOT NULL REFERENCES medications(id) ON DELETE RESTRICT,
    dose VARCHAR(100) NOT NULL, -- e.g. 2 tablets
    route VARCHAR(50) NOT NULL DEFAULT 'ORAL', -- e.g. ORAL, IV, IM, TOPICAL
    frequency VARCHAR(50) NOT NULL, -- e.g. TWICE_DAILY, ONCE_DAILY
    duration VARCHAR(50) NOT NULL, -- e.g. 3 days, 7 days
    quantity INT NOT NULL,
    instructions TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PRESCRIBED' CHECK (status IN ('PRESCRIBED', 'PARTIALLY_DISPENSED', 'DISPENSED', 'CANCELLED')),
    prescribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 024: Pharmacy Dispensing Domain
CREATE TABLE dispensing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE RESTRICT,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    pharmacist_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    quantity_dispensed INT NOT NULL,
    dispensed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('COMPLETED', 'PARTIAL', 'REVERSED')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 025: Laboratory Domain
CREATE TABLE lab_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    ordering_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    clinical_history TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED', 'SPECIMEN_COLLECTED', 'IN_ANALYSIS', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lab_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_order_id UUID NOT NULL REFERENCES lab_orders(id) ON DELETE CASCADE,
    test_code VARCHAR(50) NOT NULL, -- e.g. LOINC / Local Test Code
    test_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lab_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_order_item_id UUID NOT NULL REFERENCES lab_order_items(id) ON DELETE RESTRICT,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    result_value TEXT NOT NULL,
    numeric_value NUMERIC(12,4),
    unit VARCHAR(50),
    reference_range VARCHAR(100),
    is_abnormal BOOLEAN NOT NULL DEFAULT false,
    performing_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    verifying_user_id UUID REFERENCES user_profiles(id) ON DELETE RESTRICT,
    result_status VARCHAR(20) NOT NULL DEFAULT 'PRELIMINARY' CHECK (result_status IN ('PRELIMINARY', 'VERIFIED', 'CORRECTED')),
    performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 026: Referrals Domain
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    originating_facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    destination_facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    referring_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    reason TEXT NOT NULL,
    urgency VARCHAR(20) NOT NULL DEFAULT 'ROUTINE' CHECK (urgency IN ('ROUTINE', 'URGENT', 'EMERGENCY')),
    status VARCHAR(20) NOT NULL DEFAULT 'INITIATED' CHECK (status IN ('INITIATED', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE referral_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- e.g. CREATED, ACCEPTED, REJECTED, COMPLETED
    actor_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 027: Patient Consents Domain
CREATE TABLE consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    consent_type VARCHAR(50) NOT NULL DEFAULT 'GENERAL_FACILITY_ACCESS',
    status VARCHAR(20) NOT NULL DEFAULT 'GRANTED' CHECK (status IN ('GRANTED', 'WITHDRAWN', 'EXPIRED')),
    version VARCHAR(20) NOT NULL DEFAULT '1.0',
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    withdrawn_at TIMESTAMPTZ,
    captured_by UUID REFERENCES user_profiles(id) ON DELETE RESTRICT,
    evidence_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 028: Access Requests Domain
CREATE TABLE access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    requester_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    purpose TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'DENIED', 'EXPIRED', 'CANCELLED')),
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    denied_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 029: Documents Metadata Domain
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID REFERENCES encounters(id) ON DELETE RESTRICT,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    document_type VARCHAR(50) NOT NULL, -- e.g. LAB_REPORT, XRAY_SCAN, DISCHARGE_SUMMARY
    storage_key VARCHAR(255) NOT NULL, -- Secure S3/Supabase Storage bucket path
    filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size_bytes BIGINT NOT NULL,
    uploaded_by UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 030: Clinical Data Provenance Domain
CREATE TABLE provenance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    resource_type VARCHAR(50) NOT NULL, -- e.g. diagnoses, encounters, lab_results
    resource_id UUID NOT NULL,
    actor_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    source_system VARCHAR(100) NOT NULL DEFAULT 'AfyaPass',
    action VARCHAR(50) NOT NULL, -- e.g. CREATE, AMEND, IMPORT
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB
);
-- Migration 031: Immutable Audit Events Domain
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    actor_type VARCHAR(50) NOT NULL, -- Role code at time of action
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    facility_id UUID REFERENCES facilities(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, -- e.g. PATIENT_VIEWED, ENCOUNTER_CREATED, EMERGENCY_ACCESS_USED
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    purpose TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    metadata JSONB
);
-- Migration 032: Security Events Domain
CREATE TABLE security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL, -- e.g. ACCESS_DENIED, SUSPICIOUS_QR_SCAN, RATE_LIMIT_EXCEEDED
    severity VARCHAR(20) NOT NULL DEFAULT 'WARNING' CHECK (severity IN ('INFO', 'WARNING', 'CRITICAL')),
    ip_address INET,
    details TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Migration 033: Row Level Security (RLS) Configuration & Policies

-- Enable RLS across all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_identifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_identifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE facility_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE encounters ENABLE ROW LEVEL SECURITY;
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispensing ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE provenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- 1. Facilities Policies (Public read for active facilities)
CREATE POLICY "facilities_select_active" ON facilities FOR SELECT USING (is_active = true);

-- 2. Audit Events Policies (Append-only for all, SELECT for Auditors)
CREATE POLICY "audit_events_insert_all" ON audit_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "audit_events_select_auditor" ON audit_events FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        JOIN roles r ON r.id = fur.role_id
        WHERE up.auth_user_id = auth.uid()
          AND r.code IN ('SYSTEM_ADMIN', 'FACILITY_ADMIN', 'SYSTEM_AUDITOR')
          AND fur.status = 'ACTIVE'
    )
);

-- 3. Patient Self View Policy
CREATE POLICY "patients_select_own" ON patients FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_profiles up
        WHERE up.auth_user_id = auth.uid()
          AND up.id = patients.id
    )
);

-- 4. Clinician View Patient Policy (Requires Active Facility Assignment & Consent or Active Access Request)
CREATE POLICY "patients_select_clinician" ON patients FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        JOIN role_permissions rp ON rp.role_id = fur.role_id
        JOIN permissions p ON p.id = rp.permission_id
        WHERE up.auth_user_id = auth.uid()
          AND fur.status = 'ACTIVE'
          AND p.code IN ('patient.read.basic', 'patient.read.clinical')
    )
    AND (
        patients.consent_granted = true
        OR EXISTS (
            SELECT 1 FROM access_requests ar
            WHERE ar.patient_id = patients.id
              AND ar.status = 'APPROVED'
              AND ar.expires_at > NOW()
        )
    )
);

-- 5. Encounters Policy (Attending Provider or Patient)
CREATE POLICY "encounters_select_authorized" ON encounters FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.id = encounters.patient_id
    )
    OR EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        WHERE up.auth_user_id = auth.uid()
          AND fur.facility_id = encounters.facility_id
          AND fur.status = 'ACTIVE'
    )
);

CREATE POLICY "encounters_insert_clinician" ON encounters FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        WHERE up.auth_user_id = auth.uid()
          AND fur.facility_id = encounters.facility_id
          AND fur.status = 'ACTIVE'
    )
);
-- Migration 034: Intentional Database Indexes

-- Identity Indexes
CREATE INDEX idx_patients_patient_number ON patients(patient_number);
CREATE INDEX idx_patient_identifiers_patient_id ON patient_identifiers(patient_id);
CREATE INDEX idx_patient_identifiers_hash ON patient_identifiers(identifier_hash);
CREATE INDEX idx_patient_contacts_patient_id ON patient_contacts(patient_id);

-- Organization Indexes
CREATE INDEX idx_sub_counties_county_id ON sub_counties(county_id);
CREATE INDEX idx_facilities_county_id ON facilities(county_id);
CREATE INDEX idx_facilities_sub_county_id ON facilities(sub_county_id);
CREATE INDEX idx_facilities_mfl_code ON facilities(facility_code);

-- User & Staff Indexes
CREATE INDEX idx_user_profiles_auth_user_id ON user_profiles(auth_user_id);
CREATE INDEX idx_facility_user_roles_user_profile ON facility_user_roles(user_profile_id);
CREATE INDEX idx_facility_user_roles_facility ON facility_user_roles(facility_id);

-- Credentials & Token Indexes
CREATE INDEX idx_patient_cards_patient_id ON patient_cards(patient_id);
CREATE INDEX idx_qr_tokens_card_id ON qr_tokens(card_id);
CREATE INDEX idx_qr_tokens_hash ON qr_tokens(token_hash);

-- Clinical Indexes
CREATE INDEX idx_encounters_patient_id ON encounters(patient_id);
CREATE INDEX idx_encounters_facility_id ON encounters(facility_id);
CREATE INDEX idx_encounters_provider ON encounters(provider_user_id);
CREATE INDEX idx_encounters_started_at ON encounters(started_at DESC);

CREATE INDEX idx_observations_encounter ON observations(encounter_id);
CREATE INDEX idx_diagnoses_patient ON diagnoses(patient_id);
CREATE INDEX idx_diagnoses_encounter ON diagnoses(encounter_id);
CREATE INDEX idx_clinical_notes_encounter ON clinical_notes(encounter_id);
CREATE INDEX idx_allergies_patient ON allergies(patient_id);

CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX idx_prescriptions_encounter ON prescriptions(encounter_id);
CREATE INDEX idx_dispensing_prescription ON dispensing(prescription_id);

CREATE INDEX idx_lab_orders_patient ON lab_orders(patient_id);
CREATE INDEX idx_lab_orders_encounter ON lab_orders(encounter_id);
CREATE INDEX idx_lab_results_item ON lab_results(lab_order_item_id);

CREATE INDEX idx_referrals_patient ON referrals(patient_id);
CREATE INDEX idx_referrals_dest_facility ON referrals(destination_facility_id);

-- Audit Indexes
CREATE INDEX idx_audit_events_patient ON audit_events(patient_id);
CREATE INDEX idx_audit_events_actor ON audit_events(actor_user_id);
CREATE INDEX idx_audit_events_timestamp ON audit_events(timestamp DESC);
-- Migration 035: Safe Reference Seed Data (Murang'a County Pilot)

-- 1. Roles
INSERT INTO roles (id, code, name, description) VALUES
('r0000000-0000-0000-0000-000000000001', 'PATIENT', 'Patient', 'Patient self-service portal access'),
('r0000000-0000-0000-0000-000000000002', 'RECEPTIONIST', 'Receptionist', 'Patient registration and check-in'),
('r0000000-0000-0000-0000-000000000003', 'NURSE', 'Nurse', 'Nursing triage, vitals, and allergy documentation'),
('r0000000-0000-0000-0000-000000000004', 'CLINICIAN', 'Clinician', 'Physician/Medical Officer full clinical recording'),
('r0000000-0000-0000-0000-000000000005', 'PHARMACIST', 'Pharmacist', 'Prescription review and dispensing'),
('r0000000-0000-0000-0000-000000000006', 'LAB_USER', 'Laboratory Technician', 'Lab order processing and result verification'),
('r0000000-0000-0000-0000-000000000007', 'FACILITY_ADMIN', 'Facility Administrator', 'Facility staff management and operational stats'),
('r0000000-0000-0000-0000-000000000008', 'COUNTY_ADMIN', 'County Administrator', 'De-identified epidemiological analytics'),
('r0000000-0000-0000-0000-000000000009', 'SYSTEM_AUDITOR', 'System Auditor', 'Security and access audit review')
ON CONFLICT (code) DO NOTHING;

-- 2. Permissions
INSERT INTO permissions (id, code, name, description) VALUES
('p0000000-0000-0000-0000-000000000001', 'patient.read.basic', 'Read Basic Patient Info', 'Access demographics and patient numbers'),
('p0000000-0000-0000-0000-000000000002', 'patient.read.clinical', 'Read Clinical Charts', 'Access full longitudinal clinical record'),
('p0000000-0000-0000-0000-000000000003', 'encounter.create', 'Create Encounter', 'Open and record new clinical encounters'),
('p0000000-0000-0000-0000-000000000004', 'diagnosis.create', 'Record Diagnosis', 'Add ICD-11 coded diagnosis conditions'),
('p0000000-0000-0000-0000-000000000005', 'prescription.create', 'Create Prescription', 'Write medication prescriptions'),
('p0000000-0000-0000-0000-000000000006', 'prescription.dispense', 'Dispense Medication', 'Record pharmacy dispensing events'),
('p0000000-0000-0000-0000-000000000007', 'lab.result.create', 'Record Lab Result', 'Enter and verify lab test results'),
('p0000000-0000-0000-0000-000000000008', 'audit.read', 'Read Audit Logs', 'Inspect system audit trails')
ON CONFLICT (code) DO NOTHING;

-- 3. Role Permission Mapping (Clinician Role Example)
INSERT INTO role_permissions (role_id, permission_id) VALUES
('r0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000001'),
('r0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000002'),
('r0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000003'),
('r0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004'),
('r0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000005')
ON CONFLICT DO NOTHING;

-- 4. Murang'a County Geographic Reference Data
INSERT INTO counties (id, code, name) VALUES
('c0000000-0000-0000-0000-000000000021', '21', 'Murang''a')
ON CONFLICT (code) DO NOTHING;

INSERT INTO sub_counties (id, county_id, name) VALUES
('sc000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000021', 'Kiharu'),
('sc000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000021', 'Kandara'),
('sc000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000021', 'Maragua'),
('sc000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000021', 'Kangema'),
('sc000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000021', 'Gatanga')
ON CONFLICT DO NOTHING;

-- 5. Murang'a Pilot MFL Facilities
INSERT INTO facilities (id, facility_code, name, facility_type, county_id, sub_county_id, facility_level) VALUES
('f0000000-0000-0000-0000-000000000001', 'MFL-13782', 'Murang''a Level 5 Hospital', 'PUBLIC', 'c0000000-0000-0000-0000-000000000021', 'sc000000-0000-0000-0000-000000000001', 5),
('f0000000-0000-0000-0000-000000000002', 'MFL-13801', 'Kenol Sub-County Hospital', 'PUBLIC', 'c0000000-0000-0000-0000-000000000021', 'sc000000-0000-0000-0000-000000000002', 4),
('f0000000-0000-0000-0000-000000000003', 'MFL-13815', 'Maragua Level 4 Hospital', 'PUBLIC', 'c0000000-0000-0000-0000-000000000021', 'sc000000-0000-0000-0000-000000000003', 4),
('f0000000-0000-0000-0000-000000000004', 'MFL-13822', 'Kangema Sub-County Hospital', 'PUBLIC', 'c0000000-0000-0000-0000-000000000021', 'sc000000-0000-0000-0000-000000000004', 4),
('f0000000-0000-0000-0000-000000000005', 'MFL-18204', 'Murang''a Catholic Mission Hospital', 'FAITH_BASED', 'c0000000-0000-0000-0000-000000000021', 'sc000000-0000-0000-0000-000000000001', 4)
ON CONFLICT (facility_code) DO NOTHING;

-- 6. Essential Medicines Reference Seed
INSERT INTO medications (id, code, name, generic_name, strength, dosage_form) VALUES
('m0000000-0000-0000-0000-000000000001', 'EML-MAL-001', 'Coartem 20/120', 'Artemether/Lumefantrine', '20mg/120mg', 'Tablet'),
('m0000000-0000-0000-0000-000000000002', 'EML-ABX-001', 'Amoxil 500mg', 'Amoxicillin', '500mg', 'Capsule'),
('m0000000-0000-0000-0000-000000000003', 'EML-HTN-001', 'Amlodipine 5mg', 'Amlodipine', '5mg', 'Tablet'),
('m0000000-0000-0000-0000-000000000004', 'EML-DIA-001', 'Metformin 500mg', 'Metformin Hydrochloride', '500mg', 'Tablet'),
('m0000000-0000-0000-0000-000000000005', 'EML-ANP-001', 'Panadol 500mg', 'Paracetamol', '500mg', 'Tablet')
ON CONFLICT (code) DO NOTHING;
