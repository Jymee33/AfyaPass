# AfyaPass QR Code Format Specification

## Principles
1. **Opaque Reference**: The QR code strictly encodes an opaque identifier string pointing to the patient's AfyaPass record.
2. **Zero Sensitive Data**: No medical charts, names, or national ID details are embedded inside the QR image.
3. **Cryptographic Validation**: Includes a signature parameter (`sig`) signed by the AfyaPass authority to prevent QR spoofing.

## Standard Formats

### Format A: Deep-Link URL (Recommended for Scanners)
```text
https://afyapass.health/scan?id=AFY-KE-MUR-2026-98421&v=1&sig=a8f7c9e102b
```

### Format B: Compact JSON Payload
```json
{
  "v": 1,
  "id": "AFY-KE-MUR-2026-98421",
  "sig": "a8f7c9e102b",
  "exp": 1787654400
}
```

## Scan & Access Workflow
1. Clinician scans QR code via the AfyaPass Facility Web App.
2. Application extracts the `id` (`AFY-KE-MUR-2026-98421`).
3. Application verifies clinician session & active MFL facility authentication.
4. Database checks patient consent status and returns clinical record subject to RLS policy.
5. Action is recorded in `audit_logs`.
