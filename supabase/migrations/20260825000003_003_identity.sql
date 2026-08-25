-- Migration 003: Patient Identity Master Domain
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. AFP-4827-19
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    sex VARCHAR(10) NOT NULL CHECK (sex IN ('M', 'F', 'Other')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'merged', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
