# AfyaPass

> **Your Health. Wherever You Go.**

AfyaPass is a digital, portable patient health-record platform designed to connect healthcare facilities and follow patients wherever they seek care.

---

## Vision

In many healthcare systems, patient medical histories remain fragmented across individual clinic filing cabinets or isolated facility databases. When a patient visits a new clinic, referral facility, or emergency room, clinicians often lack critical context such as past diagnoses, drug allergies, immunizations, or previous treatment plans.

**AfyaPass** solves this by establishing a portable digital record. A patient's health record securely follows the patient across participating public, private, and faith-based healthcare facilities.

---

## Initial Target

The initial implementation target and pilot deployment is **Murang'a County, Kenya**.

The pilot connects Level 1 through Level 5 healthcare facilities across Murang'a County sub-counties (such as Kiharu, Kandara, Maragua, and Gatanga) to validate cross-facility data continuity, clinical workflow integration, and patient consent models in primary healthcare settings.

---

## Core Concept

```text
Patient
   ↓
AfyaPass Patient ID
   ↓
QR Card
   ↓
Authorized Facility
   ↓
Portable Health Record
```

1. **Patient Registration**: The patient is assigned a unique, internal **AfyaPass Patient ID** (e.g. `AFY-KE-MUR-2026-98421`).
2. **Physical AfyaPass Card**: The patient receives a laminated physical card featuring their AfyaPass ID and an opaque QR code reference.
3. **Facility Interaction**: Upon presenting the card at an authorized healthcare facility, a verified clinician scans the QR code or looks up the AfyaPass ID.
4. **Consent & Verification**: The system verifies clinician credentials and patient consent status before displaying clinical history.
5. **Continuous Record Update**: Encounters, vital signs, diagnoses (ICD-11), prescriptions, and lab referrals are recorded to follow the patient to their next visit.

---

## Planned Modules

- [x] **Scaffolding & Architecture Shell**: Initial application foundation, UI layout, database schema templates.
- [ ] **Patient Registration & Identity Management**: Issuance and hash-verification of internal AfyaPass IDs.
- [ ] **QR Code Verification & Scanning**: Mobile/web camera scanner for instant facility lookup.
- [ ] **Patient Portal**: Patient self-service view for tracking visit history and managing data access consent.
- [ ] **Healthcare Worker Portal**: Clinical desk interface for recording encounters, vital signs, and prescriptions.
- [ ] **Facility Administration**: Management of MFL (Master Facility List) registered sites and staff roles.
- [ ] **County Health Analytics**: De-identified epidemiological metrics and facility workload reporting for Murang'a County.
- [ ] **Consent & Authorization Engine**: Patient-driven data sharing and emergency override controls.
- [ ] **Immutable Audit Trail**: Log of all record views, QR scans, and emergency overrides.
- [ ] **Interoperability API**: Integration hooks for HL7 FHIR and Kenya Health Information Exchange (KHIE) standards.

---

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security + Auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Quality**: ESLint + Prettier

---

## Development Setup

### Prerequisites

- **Node.js**: v18.17+ or v20+ / v22+
- **npm**: v9+ or v10+

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jymee33/AfyaPass.git
   cd AfyaPass
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase project credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Linting and Type Checks**:
   ```bash
   npm run lint
   npm run build
   ```

---

## Environment Variables

The project uses `.env.example` as a template for local development configuration:

| Variable | Description | Exposure |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | Public (Client + Server) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Client Key | Public (Client + Server) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Administrative Key | **SERVER ONLY** (Never expose to client) |
| `SECURITY_ENCRYPTION_SECRET` | Encryption key for signed payloads | **SERVER ONLY** |

---

## Project Structure

```text
AfyaPass/
├── app/
│   ├── layout.tsx                 # Root App Router layout with header & footer
│   ├── page.tsx                   # Main landing page & vision overview
│   ├── globals.css                # Tailwind directives & global utility classes
│   ├── patient/
│   │   └── page.tsx               # Patient Portal concept shell
│   ├── facility/
│   │   └── page.tsx               # Healthcare Facility Portal concept shell
│   └── county/
│       └── page.tsx               # County Analytics & Admin dashboard shell
├── components/
│   ├── Navbar.tsx                 # Navigation bar with portal switcher
│   ├── Hero.tsx                   # Main branding banner with AfyaPass tagline
│   ├── FeatureGrid.tsx            # Architecture & feature overview cards
│   ├── PortalSelector.tsx         # Interactive view switcher (Patient / Facility / County)
│   ├── QrCardPreview.tsx          # Mock physical AfyaPass QR Card component
│   ├── SecurityNotice.tsx         # Security architecture & privacy disclosures
│   └── Footer.tsx                 # Footer with pilot disclosures & copyright
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser Supabase client builder
│   │   └── server.ts              # Server Supabase client builder (with protection)
│   ├── qr.ts                      # Secure non-identifying QR payload parser
│   └── rbac.ts                    # Role-Based Access Control logic
├── types/
│   └── index.ts                   # TypeScript interfaces for Patients, Facilities, Encounters
├── supabase/
│   ├── migrations/
│   │   └── 20260825000000_init_afyapass.sql # Database schema (PostgreSQL + RLS)
│   └── rls_policies.sql           # Row Level Security policies script
├── docs/
│   ├── ARCHITECTURE.md            # System architecture & data flow
│   ├── SECURITY.md                # Detailed security principles & privacy guidelines
│   └── QR_SPECIFICATION.md        # QR payload reference specification
├── .env.example                   # Environment variable template
├── .gitignore                     # Git ignore rules for secrets and build artifacts
├── README.md                      # Primary project documentation
├── package.json                   # Project dependencies and npm scripts
└── tsconfig.json                  # Strict TypeScript configuration
```

---

## Security Principles

Because AfyaPass will eventually handle sensitive personal health information, strict security principles are built into the architecture from day one:

1. **No Medical Information in QR Codes**: QR codes contain **ONLY** an opaque reference ID (`AFY-KE-MUR-...`) and an issuer signature. Medical data is never encoded inside QR images.
2. **Zero Hardcoded Secrets**: Secrets and service keys are managed exclusively via environment variables and never committed to Git.
3. **No Direct ID Access**: Knowing a patient's national ID, phone number, or name does **NOT** grant access to medical records.
4. **Internal AfyaPass Patient ID**: The internal AfyaPass Patient ID serves as the application's sole record identifier.
5. **Row Level Security (RLS)**: Access controls are enforced at the PostgreSQL database level.
6. **Role-Based Access Control (RBAC)**: Five strict roles (Patient, Healthcare Worker, Facility Admin, County Admin, System Auditor).
7. **Immutable Audit Trail**: Every lookup, QR scan, and clinical encounter generates an unalterable log entry.

---

## Development Status

> [!CAUTION]
> **Prototype Status Notice**
> This repository represents the initial foundation and engineering prototype for the **AfyaPass** platform. It is **NOT** currently approved, certified, or intended for handling real patient data in production clinical settings. Independent legal, privacy, security, and data protection reviews (under the Kenya Data Protection Act 2019) are required prior to live pilot deployment.
