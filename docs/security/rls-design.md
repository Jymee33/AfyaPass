# AfyaPass Row Level Security (RLS) Design Specification

## Overview
Row Level Security (RLS) is the primary database defense mechanism protecting sensitive health records in AfyaPass. Database rules ensure that knowing a patient's UUID, national ID, phone number, or QR token does **NOT** grant data access without authenticated credentials, active facility membership, and patient consent.

> [!IMPORTANT]
> **Zero Unrestricted Policies**
> Broad `USING (true)` or `WITH CHECK (true)` policies are strictly prohibited on patient clinical tables (`patients`, `encounters`, `diagnoses`, `clinical_notes`, `prescriptions`, `lab_results`, `allergies`).

---

## RLS Rules Matrix

### 1. `patients` Table RLS Policies

```sql
-- Enable RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Policy 1: Patients can view only their own record
CREATE POLICY "patient_read_own_record"
ON patients FOR SELECT
TO authenticated
USING (
    auth.uid() IN (
        SELECT auth_user_id FROM user_profiles WHERE id = patients.id
    )
);

-- Policy 2: Authorized clinicians/nurses view patient profiles with active facility assignment & consent
CREATE POLICY "clinician_read_patient_record"
ON patients FOR SELECT
TO authenticated
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
```

### 2. `encounters` Table RLS Policies

```sql
ALTER TABLE encounters ENABLE ROW LEVEL SECURITY;

-- Policy: Clinicians create encounters at their active facility
CREATE POLICY "clinician_create_encounter"
ON encounters FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM facility_user_roles fur
        JOIN user_profiles up ON up.id = fur.user_profile_id
        WHERE up.auth_user_id = auth.uid()
          AND fur.facility_id = encounters.facility_id
          AND fur.status = 'ACTIVE'
    )
);
```

### 3. `audit_events` Table RLS Policies (Immutable Append-Only)

```sql
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- Policy 1: Authenticated users append audit logs (No UPDATE or DELETE allowed)
CREATE POLICY "system_append_audit_events"
ON audit_events FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 2: System Auditors & Facility Admins view facility audit logs
CREATE POLICY "auditor_read_audit_events"
ON audit_events FOR SELECT
TO authenticated
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
```

---

## Policy Evaluation Checklist

| Table | SELECT | INSERT | UPDATE | DELETE |
| :--- | :--- | :--- | :--- | :--- |
| `patients` | Own or Authorized Clinician | Reception / System | Admin / Self | Disabled (Soft Deletion) |
| `encounters` | Patient or Attending Provider | Active Facility Provider | Attending Provider | Disabled |
| `diagnoses` | Patient or Attending Provider | Attending Clinician | Disabled (Amended Record Only) | Disabled |
| `prescriptions` | Patient, Clinician, Pharmacist | Attending Clinician | Pharmacist (Dispense Status) | Disabled |
| `lab_results` | Patient, Clinician, Lab Tech | Lab Tech | Verified Lab Tech | Disabled |
| `audit_events` | Auditor / Admin Only | Append-Only (All Users) | **FORBIDDEN** | **FORBIDDEN** |
