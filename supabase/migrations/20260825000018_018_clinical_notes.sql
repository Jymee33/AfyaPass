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
