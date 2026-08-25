-- Migration 016: Clinical Observations Domain (Vitals & Measurements)
CREATE TABLE observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    encounter_id UUID NOT NULL REFERENCES encounters(id) ON DELETE RESTRICT,
    observation_type VARCHAR(100) NOT NULL, -- e.g. TEMPERATURE, BLOOD_PRESSURE_SYSTOLIC, WEIGHT, PULSE
    value NUMERIC(10,2) NOT NULL,
    unit VARCHAR(30) NOT NULL, -- e.g. degC, mmHg, kg, bpm
    recorded_by UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
