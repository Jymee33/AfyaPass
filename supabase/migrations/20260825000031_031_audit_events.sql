-- Migration 031: Immutable Audit Events Domain
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
    actor_type VARCHAR(50) NOT NULL, -- Role code at time of action
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    facility_id UUID REFERENCES facilities(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, -- e.g. PATIENT_VIEWED, ENCOUNTER_CREATED, EMERGENCY_ACCESS_USED
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    purpose TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    metadata JSONB
);
