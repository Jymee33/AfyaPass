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
