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
