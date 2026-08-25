# AfyaPass Data Dictionary

This data dictionary documents every table, column, data type, integrity constraint, and sensitivity classification within the AfyaPass database schema.

## Sensitivity Classifications
- **`PUBLIC`**: Reference data (Counties, Sub-counties, Facility Types, ICD-11 codes).
- **`INTERNAL`**: Operational metadata (Facility codes, Department names, Roles, Permissions).
- **`SENSITIVE`**: User identifiers, Staff profiles, Audit logs, Facility role assignments.
- **`HIGHLY_SENSITIVE`**: Patient demographics, Encounters, Diagnoses, Notes, Prescriptions, Lab Results, Allergies, QR tokens, Encrypted IDs.

---

## 1. IDENTITY DOMAIN

### Table: `patients`
Canonical patient identity table. `id` (UUID) is the sole system primary key. `patient_number` (e.g. `AFP-4827-19`) is the unique human-readable AfyaPass ID.

| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `HIGHLY_SENSITIVE` | Canonical patient internal UUID |
| `patient_number` | `VARCHAR(30)` | No | None | UNQ | `HIGHLY_SENSITIVE` | Human-readable ID (e.g. `AFP-4827-19`) |
| `first_name` | `VARCHAR(100)` | No | None | None | `HIGHLY_SENSITIVE` | Patient given name |
| `middle_name` | `VARCHAR(100)` | Yes | None | None | `HIGHLY_SENSITIVE` | Patient middle name |
| `last_name` | `VARCHAR(100)` | No | None | None | `HIGHLY_SENSITIVE` | Patient family/surname |
| `date_of_birth` | `DATE` | No | None | None | `HIGHLY_SENSITIVE` | Date of birth |
| `sex` | `VARCHAR(10)` | No | None | None | `HIGHLY_SENSITIVE` | Administrative sex (`M`, `F`, `Other`) |
| `status` | `VARCHAR(20)` | No | `'active'` | None | `HIGHLY_SENSITIVE` | Lifecycle state (`active`, `merged`, `inactive`) |
| `created_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `INTERNAL` | Timestamp created |
| `updated_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `INTERNAL` | Timestamp updated |

### Table: `patient_identifiers`
Stores sensitive identity documents (e.g. National ID, Birth Certificate) separated from the core patient record.

| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `HIGHLY_SENSITIVE` | Identifier record UUID |
| `patient_id` | `UUID` | No | None | FK -> `patients.id` | `HIGHLY_SENSITIVE` | Associated patient ID |
| `identifier_type` | `VARCHAR(50)` | No | None | None | `HIGHLY_SENSITIVE` | Type (`NATIONAL_ID`, `BIRTH_CERT`, `HUDUMA`) |
| `identifier_value_encrypted` | `TEXT` | No | None | None | `HIGHLY_SENSITIVE` | Encrypted value |
| `identifier_hash` | `VARCHAR(255)` | No | None | UNQ | `HIGHLY_SENSITIVE` | One-way HMAC hash for search lookup |
| `verification_status` | `VARCHAR(20)` | No | `'UNVERIFIED'` | None | `HIGHLY_SENSITIVE` | Status (`VERIFIED`, `UNVERIFIED`) |
| `verified_at` | `TIMESTAMPTZ` | Yes | None | None | `HIGHLY_SENSITIVE` | Verification timestamp |
| `created_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `INTERNAL` | Timestamp created |
| `updated_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `INTERNAL` | Timestamp updated |

### Table: `patient_contacts`
| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `HIGHLY_SENSITIVE` | Contact UUID |
| `patient_id` | `UUID` | No | None | FK -> `patients.id` | `HIGHLY_SENSITIVE` | Associated patient ID |
| `contact_type` | `VARCHAR(20)` | No | `'PHONE'` | None | `HIGHLY_SENSITIVE` | Type (`PHONE`, `EMAIL`) |
| `phone_encrypted` | `TEXT` | Yes | None | None | `HIGHLY_SENSITIVE` | Encrypted phone number |
| `email_encrypted` | `TEXT` | Yes | None | None | `HIGHLY_SENSITIVE` | Encrypted email address |
| `is_primary` | `BOOLEAN` | No | `false` | None | `HIGHLY_SENSITIVE` | Primary contact flag |
| `created_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `INTERNAL` | Timestamp created |

---

## 2. ORGANIZATION DOMAIN

### Table: `counties`
| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `PUBLIC` | County UUID |
| `code` | `VARCHAR(10)` | No | None | UNQ | `PUBLIC` | County code (e.g. `21` for Murang'a) |
| `name` | `VARCHAR(100)` | No | None | UNQ | `PUBLIC` | County name |

### Table: `sub_counties`
| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `PUBLIC` | Sub-county UUID |
| `county_id` | `UUID` | No | None | FK -> `counties.id` | `PUBLIC` | Associated county ID |
| `name` | `VARCHAR(100)` | No | None | None | `PUBLIC` | Sub-county name (e.g. Kiharu, Kandara) |

### Table: `facilities`
| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `INTERNAL` | Facility UUID |
| `facility_code` | `VARCHAR(50)` | No | None | UNQ | `INTERNAL` | Master Facility List (MFL) code |
| `name` | `VARCHAR(255)` | No | None | None | `INTERNAL` | Facility name |
| `facility_type` | `VARCHAR(50)` | No | `'PUBLIC'` | None | `INTERNAL` | Type (`PUBLIC`, `PRIVATE`, `FAITH_BASED`) |
| `county_id` | `UUID` | No | None | FK -> `counties.id` | `INTERNAL` | County FK |
| `sub_county_id` | `UUID` | No | None | FK -> `sub_counties.id` | `INTERNAL` | Sub-county FK |
| `facility_level` | `INT` | No | `4` | None | `INTERNAL` | Level (1 to 6) |
| `is_active` | `BOOLEAN` | No | `true` | None | `INTERNAL` | Facility status |

---

## 3. CLINICAL DOMAIN

### Table: `encounters`
Central clinical event record.

| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `HIGHLY_SENSITIVE` | Encounter UUID |
| `patient_id` | `UUID` | No | None | FK -> `patients.id` | `HIGHLY_SENSITIVE` | Patient FK |
| `facility_id` | `UUID` | No | None | FK -> `facilities.id` | `HIGHLY_SENSITIVE` | Facility FK |
| `provider_user_id` | `UUID` | No | None | FK -> `user_profiles.id` | `HIGHLY_SENSITIVE` | Attending clinician FK |
| `encounter_type` | `VARCHAR(50)` | No | None | None | `HIGHLY_SENSITIVE` | Type (`OUTPATIENT`, `INPATIENT`, `EMERGENCY`) |
| `status` | `VARCHAR(20)` | No | `'COMPLETED'` | None | `HIGHLY_SENSITIVE` | Encounter status |
| `started_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `HIGHLY_SENSITIVE` | Encounter start timestamp |
| `ended_at` | `TIMESTAMPTZ` | Yes | None | None | `HIGHLY_SENSITIVE` | Encounter end timestamp |

### Table: `diagnoses`
| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `HIGHLY_SENSITIVE` | Diagnosis UUID |
| `patient_id` | `UUID` | No | None | FK -> `patients.id` | `HIGHLY_SENSITIVE` | Patient FK |
| `encounter_id` | `UUID` | No | None | FK -> `encounters.id` | `HIGHLY_SENSITIVE` | Encounter FK |
| `code` | `VARCHAR(50)` | No | None | None | `HIGHLY_SENSITIVE` | Condition code (e.g. `1C40.0`) |
| `code_system` | `VARCHAR(50)` | No | `'ICD-11'` | None | `HIGHLY_SENSITIVE` | Coding system (`ICD-11`, `ICD-10`) |
| `description` | `TEXT` | No | None | None | `HIGHLY_SENSITIVE` | Diagnosis description text |
| `diagnosis_type` | `VARCHAR(20)` | No | `'PRIMARY'` | None | `HIGHLY_SENSITIVE` | Type (`PRIMARY`, `SECONDARY`, `DIFFERENTIAL`) |
| `recorded_by` | `UUID` | No | None | FK -> `user_profiles.id` | `HIGHLY_SENSITIVE` | Clinician recorder FK |
| `recorded_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `HIGHLY_SENSITIVE` | Recording timestamp |

---

## 4. CREDENTIALS & ACCESS CONTROL DOMAIN

### Table: `patient_cards`
| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `SENSITIVE` | Physical card record UUID |
| `patient_id` | `UUID` | No | None | FK -> `patients.id` | `SENSITIVE` | Patient FK |
| `card_number` | `VARCHAR(50)` | No | None | UNQ | `SENSITIVE` | Card serial number |
| `status` | `VARCHAR(20)` | No | `'ACTIVE'` | None | `SENSITIVE` | Card status (`ACTIVE`, `REVOKED`, `EXPIRED`) |
| `issued_at` | `TIMESTAMPTZ` | No | `NOW()` | None | `SENSITIVE` | Issuance timestamp |
| `revoked_at` | `TIMESTAMPTZ` | Yes | None | None | `SENSITIVE` | Revocation timestamp |

### Table: `qr_tokens`
| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `HIGHLY_SENSITIVE` | Token UUID |
| `card_id` | `UUID` | No | None | FK -> `patient_cards.id` | `HIGHLY_SENSITIVE` | Associated card FK |
| `token_hash` | `VARCHAR(255)` | No | None | UNQ | `HIGHLY_SENSITIVE` | One-way SHA-256 hash of random QR token |
| `status` | `VARCHAR(20)` | No | `'ACTIVE'` | None | `HIGHLY_SENSITIVE` | Status (`ACTIVE`, `REVOKED`, `EXPIRED`) |
| `expires_at` | `TIMESTAMPTZ` | Yes | None | None | `HIGHLY_SENSITIVE` | Token expiration timestamp |
| `last_used_at` | `TIMESTAMPTZ` | Yes | None | None | `HIGHLY_SENSITIVE` | Last scan timestamp |

### Table: `audit_events`
Immutable append-only audit trail.

| Column | Data Type | Nullable | Default | PK/FK/UNQ | Sensitivity | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | `gen_random_uuid()` | PK | `HIGHLY_SENSITIVE` | Audit record UUID |
| `actor_user_id` | `UUID` | No | None | FK -> `user_profiles.id` | `HIGHLY_SENSITIVE` | User actor FK |
| `actor_type` | `VARCHAR(50)` | No | None | None | `HIGHLY_SENSITIVE` | Actor role at event time |
| `patient_id` | `UUID` | Yes | None | FK -> `patients.id` | `HIGHLY_SENSITIVE` | Target patient FK |
| `facility_id` | `UUID` | Yes | None | FK -> `facilities.id` | `HIGHLY_SENSITIVE` | Associated facility FK |
| `action` | `VARCHAR(50)` | No | None | None | `HIGHLY_SENSITIVE` | Action (`PATIENT_VIEWED`, `ENCOUNTER_CREATED`, `EMERGENCY_ACCESS_USED`) |
| `resource_type` | `VARCHAR(50)` | No | None | None | `HIGHLY_SENSITIVE` | Target resource (`encounters`, `diagnoses`, `patients`) |
| `resource_id` | `UUID` | Yes | None | None | `HIGHLY_SENSITIVE` | Target resource UUID |
| `purpose` | `TEXT` | Yes | None | None | `HIGHLY_SENSITIVE` | Clinical justification / emergency reason |
| `timestamp` | `TIMESTAMPTZ` | No | `NOW()` | None | `HIGHLY_SENSITIVE` | Immutable event timestamp |
| `ip_address` | `INET` | Yes | None | None | `HIGHLY_SENSITIVE` | Client IP address |
| `user_agent` | `TEXT` | Yes | None | None | `HIGHLY_SENSITIVE` | Client user agent |
