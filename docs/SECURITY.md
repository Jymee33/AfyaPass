# AfyaPass Security & Privacy Architecture

## Overview
AfyaPass handles sensitive digital health record access across participating healthcare facilities in Murang'a County, Kenya. Security and patient privacy are fundamental engineering constraints enforced from day one.

## Core Security Principles

### 1. No Medical Data in QR Payloads
* The physical AfyaPass QR card contains **ONLY** an opaque string reference (the AfyaPass Patient ID, e.g., `AFY-KE-MUR-2026-98421`) and a cryptographic issuer signature.
* QR codes **NEVER** contain medical history, diagnosis notes, lab results, national ID numbers, or phone numbers.
* Scanning a QR code yields a pointer to the backend; it does **NOT** grant data access without authenticated credentials and authorization verification.

### 2. Strict Credential & Secret Hygiene
* Application secrets, service keys, and private keys must **NEVER** be committed to version control.
* `.env.example` provides structured environment variable placeholders.
* Production deployments must utilize environment variable injection (e.g. Vercel / Supabase Vault).

### 3. Patient Record Identifier Scaffolding
* The internal `AfyaPass Patient ID` serves as the sole primary record lookup key.
* Knowing a patient's national ID, full name, or phone number **DOES NOT** grant medical record access in any client app or API endpoint.

### 4. Separation of Authentication & Authorization
* Authentication verifies identity (e.g., via Supabase Auth / OTP / WebAuthn).
* Authorization is handled strictly at the database layer using PostgreSQL Row Level Security (RLS) policies and Role-Based Access Control (RBAC).

### 5. Role-Based Access Control (RBAC)
AfyaPass enforces 5 distinct roles:
1. **Patient**: Accesses only their own health portal, consent options, and access logs.
2. **Healthcare Worker**: Verified clinician attached to a registered MFL facility. Accesses clinical charts upon valid patient QR reference scan and active consent.
3. **Facility Admin**: Manages facility staff and operational metrics; cannot view patient clinical charts.
4. **County Admin**: Views de-identified epidemiological statistics and facility coverage analytics; cannot access individual clinical records.
5. **System Auditor**: Inspects immutable audit logs to detect unauthorized access patterns or security anomalies.

### 6. Comprehensive Immutable Audit Logging
Every sensitive action triggers an immutable log entry in the `audit_logs` table:
* `QR_SCAN`
* `RECORD_VIEW`
* `ENCOUNTER_CREATE`
* `CONSENT_UPDATE`
* `EMERGENCY_OVERRIDE`

Audit records track timestamp, actor ID, role, target patient ID, facility ID, action type, and status (`SUCCESS` / `DENIED`).

### 7. Emergency Access & Override Protocol
In critical care situations where a patient is incapacitated:
* Clinicians can execute an **Emergency Access Override**.
* This action immediately triggers a high-priority alert to the System Audit log.
* Mandatory post-event audit reviews ensure accountability.

---

> [!CAUTION]
> **Development Status Notice**
> This repository represents an initial engineering prototype and application shell for the Murang'a County pilot. It is **NOT** yet approved or certified for handling live, real-world patient data. Comprehensive privacy impact assessments, independent penetration testing, and regulatory alignment (e.g. Kenya Data Protection Act 2019) are required prior to production rollout.
