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
