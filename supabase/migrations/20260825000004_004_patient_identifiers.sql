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
