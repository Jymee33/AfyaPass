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
