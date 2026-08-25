# AfyaPass Authorization Model & Role-Based Access Control (RBAC)

## 1. Principles & Separation of Concerns

AfyaPass strictly separates four distinct security concepts:

```text
AUTHENTICATION          AUTHORIZATION          PATIENT CONSENT          AUDIT TRAIL
"Who are you?"          "What role/perms       "What access has the     "What sensitive action
(Supabase Auth)         do you have?"          patient authorized?"     did you perform?"
```

- **Authentication**: Managed via Supabase Auth (`auth.users`) or external IDP.
- **Authorization**: Enforced via `roles`, `permissions`, `facility_user_roles`, and PostgreSQL Row Level Security (RLS) policies.
- **Patient Consent**: Configured via `consents` and `access_requests` tables.
- **Audit Trail**: Recorded immutably in `audit_events` and `security_events`.

---

## 2. Core System Roles (9 Roles)

1. **`PATIENT`**: End-user patient. Can view only their own medical charts, active consents, card status, and access log history.
2. **`RECEPTIONIST`**: Facility front-desk staff. Can register new patients, verify patient identity, update contact details, and check-in patients for encounters. Cannot read or write clinical notes, diagnoses, or prescriptions.
3. **`NURSE`**: Clinical nurse. Can view patient medical history, record vitals/observations, document nursing notes, and review allergies.
4. **`CLINICIAN`**: Physician or Medical Officer. Full clinical authorization to record encounters, diagnoses, clinical notes, procedures, care plans, prescriptions, and lab orders.
5. **`PHARMACIST`**: Pharmacy staff. Can view active prescriptions, verify medication dosages, and record dispensing events. Cannot alter clinical notes or diagnoses.
6. **`LAB_USER`**: Laboratory technician. Can view assigned lab orders, record lab results, and upload diagnostic attachments. Cannot access unrelated clinical notes or prescriptions.
7. **`FACILITY_ADMIN`**: Operational facility manager. Manages facility staff assignments (`facility_user_roles`) and operational metrics. Does **NOT** receive automatic default access to patient clinical charts.
8. **`COUNTY_ADMIN`**: Murang'a County Health Leadership. Views de-identified epidemiological statistics, disease incidence, and sub-county facility volume. Does **NOT** have unrestricted access to individual patient charts.
9. **`SYSTEM_ADMIN`**: Database/Infrastructure administrator. Infrastructure maintenance privileges do **NOT** grant default access to un-audited clinical medical records.

---

## 3. Granular Permissions

Permissions are granted to roles via the `role_permissions` join table:

- `patient.read.basic`
- `patient.read.clinical`
- `patient.update.demographics`
- `encounter.create`
- `encounter.read`
- `encounter.update`
- `observation.create`
- `observation.read`
- `diagnosis.create`
- `diagnosis.read`
- `clinical_note.create`
- `clinical_note.read`
- `prescription.create`
- `prescription.read`
- `prescription.dispense`
- `lab.order.create`
- `lab.result.create`
- `lab.result.read`
- `referral.create`
- `referral.read`
- `facility.manage`
- `users.manage`
- `audit.read`
- `reports.read`

---

## 4. Multi-Facility Assignment Model (`facility_user_roles`)

A clinician or nurse may work at multiple facilities simultaneously (e.g. Doctor at Murang'a Level 5 Hospital and Medical Consultant at Maragua Level 4 Hospital).

```sql
TABLE facility_user_roles (
    id UUID PRIMARY KEY,
    user_profile_id UUID REFERENCES user_profiles(id),
    facility_id UUID REFERENCES facilities(id),
    role_id UUID REFERENCES roles(id),
    department_id UUID REFERENCES departments(id),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_to TIMESTAMPTZ
);
```

Access policies evaluate the user's **active facility relationship** at the time of the request. A clinician attached to Facility A cannot access Facility B records unless an explicit referral or emergency override protocol is active.

---

## 5. Emergency Access Override Protocol

In life-threatening emergency situations where a patient is incapacitated:

1. A verified clinician triggers an **Emergency Access Override**.
2. RLS policy permits temporary read access to vital allergy alerts and past emergency summaries.
3. The database trigger immediately writes a high-priority entry to `audit_events` with `action = 'EMERGENCY_ACCESS_USED'` and mandatory clinical justification text (`purpose`).
4. Facility Admin and System Auditor receive automated alerts for post-event audit review.
