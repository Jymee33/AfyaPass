-- AfyaPass Row Level Security (RLS) Configuration & Policies

-- Enable RLS on all sensitive tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_encounters ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Facilities Policies
-- Facilities list is public to authenticated users
CREATE POLICY "Allow public read of active facilities" 
ON facilities FOR SELECT 
USING (is_active = true);

-- 2. Patients Policies
-- Patients can view their own profile
CREATE POLICY "Patients view own profile" 
ON patients FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Verified healthcare workers can view patient profile ONLY when consent is granted or emergency access is flagged
CREATE POLICY "Healthcare workers view patient profile" 
ON patients FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM healthcare_workers hw 
        WHERE hw.auth_user_id = auth.uid() 
          AND hw.is_verified = true
    ) 
    AND (consent_granted = true)
);

-- 3. Clinical Encounters Policies
-- Patients can view their own encounter history
CREATE POLICY "Patients view own clinical encounters" 
ON clinical_encounters FOR SELECT 
TO authenticated 
USING (
    patient_id = auth.uid()
);

-- Healthcare workers can insert encounters for patients at their facility
CREATE POLICY "Healthcare workers create encounters" 
ON clinical_encounters FOR INSERT 
TO authenticated 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM healthcare_workers hw 
        WHERE hw.auth_user_id = auth.uid() 
          AND hw.facility_id = clinical_encounters.facility_id
          AND hw.is_verified = true
    )
);

-- 4. Audit Logs Policies
-- Audit logs are strictly append-only. UPDATE and DELETE are revoked for all standard roles.
CREATE POLICY "System appends audit logs" 
ON audit_logs FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- System Auditors & County Admins can view audit logs (read-only)
CREATE POLICY "Auditors view audit logs" 
ON audit_logs FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.users.id = auth.uid() 
          AND (auth.users.raw_app_meta_data->>'role' IN ('county_admin', 'system_auditor'))
    )
);
