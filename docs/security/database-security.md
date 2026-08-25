# AfyaPass Database Security Guidelines

## 1. Data Encryption & Storage Security

### Encryption at Rest & In Transit
- Database connections must use TLS (TLS 1.3 preferred) for all client-to-database transport.
- Disk encryption (AES-256) is mandatory at the managed database storage volume level.

### Column-Level Encryption for Identifiers
- Sensitive patient identity numbers (e.g. National ID, Birth Certificate numbers) and phone numbers are encrypted at the column level (`identifier_value_encrypted`, `phone_encrypted`).
- One-way cryptographic HMAC hashes (`identifier_hash`) are generated using a server-side pepper key (`SECURITY_ENCRYPTION_SECRET`) to enable fast exact-match index searches without storing plaintext numbers.

```text
Plaintext National ID: 12345678
      ↓ (HMAC-SHA256 with Server Pepper)
Index Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
      ↓ (AES-GCM Encryption with Encryption Key)
Encrypted Field: enc:v1:8f9a2b...
```

---

## 2. QR Code Security & Token Revocation

- Physical AfyaPass cards encode a **random, opaque token string** (e.g. `QRT-98f4a1c02e8d47b`).
- The database stores only the SHA-256 hash of the QR token in `qr_tokens.token_hash`.
- Possession of a physical card or QR code scan does **NOT** grant data access automatically.
- QR tokens can be instantly revoked by the patient or facility administrator (`status = 'REVOKED'`).

---

## 3. Secret Management & Repository Cleanliness

- Database connection strings, service role keys, and encryption secrets must **NEVER** be committed to version control.
- Environment variables (`.env.local`) are excluded by `.gitignore`.
- `.env.example` provides structured non-sensitive placeholders.

---

## 4. Immutable Audit & Security Events

- All sensitive patient record reads, encounter creations, prescription dispensings, and emergency access overrides produce immutable records in `audit_events`.
- SQL `UPDATE` and `DELETE` privileges on `audit_events` and `security_events` are revoked for all standard user roles.
- Suspicious activity (e.g. repeated failed authentication, token scan brute-forcing, rate limit violations) triggers an entry in `security_events`.

---

## 5. Regulatory Alignment (Kenya Data Protection Act 2019)

AfyaPass database architecture aligns with key principles of the Kenya Data Protection Act 2019:
- **Data Minimization**: Clinical interfaces fetch only required fields.
- **Purpose Limitation**: Access requests enforce explicit clinical purpose tags (`purpose`).
- **Transparency**: Patients inspect full access audit logs detailing who viewed their health records.
- **Security Safeguards**: Encryption, RLS policies, append-only audit trail.

> [!CAUTION]
> **Legal Compliance Disclaimer**
> This specification is an engineering blueprint. Formal legal review, privacy impact assessments, and Data Protection Officer (DPO) registration are required prior to processing live patient data in Kenya.
