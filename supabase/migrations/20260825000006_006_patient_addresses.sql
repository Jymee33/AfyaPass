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
