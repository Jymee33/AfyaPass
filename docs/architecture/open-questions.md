# AfyaPass Architecture - Open Questions & Decision Tracking

This document tracks architectural considerations, clinical edge cases, and legal compliance items requiring stakeholder or legal/privacy review before live clinical deployment in Murang'a County.

---

## 1. Clinical Data Retention & Record Amendment
- **Ambiguity**: How should historical clinical records be amended when a clinician corrects a mistyped diagnosis or dosage?
- **Current Architecture Rule**: `diagnoses` and `clinical_notes` table records are immutable. Corrections must be handled via amended correction events (`provenance` and new encounter records) rather than `UPDATE diagnosis SET description = ...`.
- **Status**: Documented & enforced via database immutability rules.

---

## 2. Unaccompanied Minors & Guardian Consent
- **Ambiguity**: What is the default consent workflow when a minor (under 18) presents at a clinic without a registered guardian?
- **Current Architecture Rule**: Minor identity records link to parents/guardians in `patient_relationships`. Emergency clinical encounters can proceed under `EMERGENCY_ACCESS_USED` audit override protocols.
- **Status**: Pending formal Ministry of Health / County Health legal policy confirmation.

---

## 3. Offline Facility Synchronization Protocol
- **Ambiguity**: How will remote Level 1 & 2 dispensaries without continuous internet connectivity sync encounters?
- **Current Architecture Rule**: Core database enforces standard PostgreSQL transactions. Client applications maintain an encrypted local queue that syncs to Supabase when connectivity returns.
- **Status**: Client queue architecture planned; backend schema includes immutable `provenance.recorded_at` vs `created_at` timestamps.

---

## 4. National ID / Huduma Namba Interoperability
- **Ambiguity**: Will the Kenyan National Digital Identity system provide direct API verification hooks for patient registration?
- **Current Architecture Rule**: `patient_identifiers` table stores encrypted identifier values and HMAC hashes (`identifier_hash`) for non-plaintext lookup. External system references are stored in `external_identifiers`.
- **Status**: Generic integration schema implemented; awaiting national API endpoint specifications.
