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
