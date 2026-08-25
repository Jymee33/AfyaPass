-- Migration 023: Prescriptions Domain
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    prescriber_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    medication_id UUID NOT NULL REFERENCES medications(id) ON DELETE RESTRICT,
    dose VARCHAR(100) NOT NULL, -- e.g. 2 tablets
    route VARCHAR(50) NOT NULL DEFAULT 'ORAL', -- e.g. ORAL, IV, IM, TOPICAL
    frequency VARCHAR(50) NOT NULL, -- e.g. TWICE_DAILY, ONCE_DAILY
    duration VARCHAR(50) NOT NULL, -- e.g. 3 days, 7 days
    quantity INT NOT NULL,
    instructions TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PRESCRIBED' CHECK (status IN ('PRESCRIBED', 'PARTIALLY_DISPENSED', 'DISPENSED', 'CANCELLED')),
    prescribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
