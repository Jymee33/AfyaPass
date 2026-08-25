-- Migration 009: Organization Domain (Facilities & Departments)
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_code VARCHAR(50) UNIQUE NOT NULL, -- Master Facility List (MFL) Code
    name VARCHAR(255) NOT NULL,
    facility_type VARCHAR(50) NOT NULL DEFAULT 'PUBLIC' CHECK (facility_type IN ('PUBLIC', 'PRIVATE', 'FAITH_BASED', 'COMMUNITY')),
    county_id UUID NOT NULL REFERENCES counties(id),
    sub_county_id UUID NOT NULL REFERENCES sub_counties(id),
    facility_level INT CHECK (facility_level BETWEEN 1 AND 6),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_facility_department UNIQUE (facility_id, name)
);
