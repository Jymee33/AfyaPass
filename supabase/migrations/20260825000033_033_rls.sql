-- Migration 033: Row Level Security (RLS) Configuration & Policies

-- Enable RLS across all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_identifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_identifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE facility_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE encounters ENABLE ROW LEVEL SECURITY;
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispensing ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE provenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- 1. Facilities Policies (Public read for active facilities)
CREATE POLICY "facilities_select_active" ON facilities FOR SELECT USING (is_active = true);

-- 2. Audit Events Policies (Append-only for all, SELECT for Auditors)
CREATE POLICY "audit_events_insert_all" ON audit_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "audit_events_select_auditor" ON audit_events FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        JOIN roles r ON r.id = fur.role_id
        WHERE up.auth_user_id = auth.uid()
          AND r.code IN ('SYSTEM_ADMIN', 'FACILITY_ADMIN', 'SYSTEM_AUDITOR')
          AND fur.status = 'ACTIVE'
    )
);

-- 3. Patient Self View Policy
CREATE POLICY "patients_select_own" ON patients FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_profiles up
        WHERE up.auth_user_id = auth.uid()
          AND up.id = patients.id
    )
);

-- 4. Clinician View Patient Policy (Requires Active Facility Assignment & Consent or Active Access Request)
CREATE POLICY "patients_select_clinician" ON patients FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        JOIN role_permissions rp ON rp.role_id = fur.role_id
        JOIN permissions p ON p.id = rp.permission_id
        WHERE up.auth_user_id = auth.uid()
          AND fur.status = 'ACTIVE'
          AND p.code IN ('patient.read.basic', 'patient.read.clinical')
    )
    AND (
        patients.consent_granted = true
        OR EXISTS (
            SELECT 1 FROM access_requests ar
            WHERE ar.patient_id = patients.id
              AND ar.status = 'APPROVED'
              AND ar.expires_at > NOW()
        )
    )
);

-- 5. Encounters Policy (Attending Provider or Patient)
CREATE POLICY "encounters_select_authorized" ON encounters FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.id = encounters.patient_id
    )
    OR EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        WHERE up.auth_user_id = auth.uid()
          AND fur.facility_id = encounters.facility_id
          AND fur.status = 'ACTIVE'
    )
);

CREATE POLICY "encounters_insert_clinician" ON encounters FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        WHERE up.auth_user_id = auth.uid()
          AND fur.facility_id = encounters.facility_id
          AND fur.status = 'ACTIVE'
    )
);
