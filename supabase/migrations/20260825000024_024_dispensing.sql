-- Migration 024: Pharmacy Dispensing Domain
CREATE TABLE dispensing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE RESTRICT,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    pharmacist_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    quantity_dispensed INT NOT NULL,
    dispensed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('COMPLETED', 'PARTIAL', 'REVERSED')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
