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
