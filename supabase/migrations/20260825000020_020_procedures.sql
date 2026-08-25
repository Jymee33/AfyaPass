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
