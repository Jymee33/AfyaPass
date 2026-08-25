# AfyaPass Architecture & System Design

## Core Vision
AfyaPass enables portable, continuous digital health records for patients across public, private, and faith-based healthcare facilities, launching with a pilot in **Murang'a County, Kenya**.

```text
[ Patient ] ──► [ AfyaPass Patient ID ] ──► [ Physical QR Card ]
                                                    │
                                                    ▼
[ Authorized Facility ] ◄── [ Clinician Scan & Auth ]
         │
         ▼
[ Portable Health Record Follows Patient ]
```

## System Modules & Scaffolding

1. **Patient Portal Shell (`/patient`)**
   - View AfyaPass ID and QR card preview
   - Manage data access consent
   - View encounter history and facility visit logs

2. **Healthcare Facility Portal Shell (`/facility`)**
   - QR code scanner / Patient ID lookup tool
   - Patient record viewer (demographics, allergy alerts, past visits)
   - Clinical encounter entry form (Vitals, Diagnoses, Medications, Referrals)

3. **County Analytics & Administration (`/county`)**
   - Aggregate health metrics for Murang'a County
   - Sub-county facility coverage and encounter volumes
   - MFL Facility registry status

4. **Database & API Layer (`/supabase`)**
   - Supabase PostgreSQL database
   - Row Level Security (RLS) policies
   - Automated audit trail triggers

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Type Safety)
- **UI Library**: React 19 + Tailwind CSS + Lucide Icons
- **Backend & Auth**: Supabase
- **Code Quality**: ESLint + Prettier
