# AfyaPass

> **Your Health. Wherever You Go.**

AfyaPass is a portable digital health-record platform. A patient's record is meant to follow them across participating facilities, instead of sitting in a single clinic's filing cabinet or isolated database.

The first implementation target and pilot is **Murang'a County, Kenya**. That geography is the initial deployment, not an architectural limit. The same model is intended to work across public, private, and faith-based facilities elsewhere.

This repository is an engineering prototype. Dashboard screens are mock UI backed by local sample data. They are not a production EHR and must not be used with real patient information.

---

## Core workflow

```text
Patient
   |
AfyaPass Patient ID
   |
QR Card
   |
Authorized Facility
   |
Consent / Authorization
   |
Portable Health Record
```

1. **Patient registration.** The patient is assigned an internal AfyaPass Patient ID.
2. **Physical card.** The patient receives a card with that ID and an opaque QR reference.
3. **Facility visit.** An authorized clinician scans the QR code or looks up the AfyaPass ID.
4. **Consent.** Credentials and patient consent are checked before clinical history is shown.
5. **Continuity.** Encounters, vitals, diagnoses, medications, and lab results are recorded so the next facility has context.

QR codes carry an opaque identifier only. They do not encode diagnoses, medications, lab results, or other medical data.

---

## Current application areas

Two surfaces exist today.

### Public marketing (`app/(public)`)

| Route | Purpose |
| --- | --- |
| `/` | Landing page and product overview |
| `/patient` | Patient-facing concept page |
| `/facility` | Facility-facing concept page |
| `/county` | County analytics concept page |

These pages explain the product. They are not authenticated portals.

### Dashboard EHR mock (`app/(dashboard)`)

These screens demonstrate clinical and admin workflows. They use mock data (`lib/mock-data.ts`). They are **not** wired to Supabase. Writes are largely inert. There is no login screen or session gate.

| Area | Routes |
| --- | --- |
| Dashboard | `/dashboard` |
| Patient registry | `/patients`, `/patients/register`, `/patients/[id]` |
| Encounters | `/clinical/encounters` |
| Diagnoses | `/clinical/diagnoses` |
| Vital signs | `/clinical/vital-signs` |
| Medications | `/clinical/medications` |
| Laboratory | `/laboratory`, `/laboratory/results` |
| Referrals | `/referrals`, `/referrals/incoming`, `/referrals/outgoing` |
| Facilities | `/facilities`, `/facilities/[id]` |
| Card / QR | `/card` |
| Privacy / consent | `/privacy/consent` |
| Audit logs | `/privacy/audit-logs` |
| Administration | `/administration/users`, `/administration/roles`, `/administration/settings` |

---

## Planned modules

Status reflects what is actually in this repository, not the intended product.

| Module | Status |
| --- | --- |
| Application scaffolding and UI shells | Present (marketing pages + dashboard mock) |
| Database schema, migrations, and RLS policy files | Present under `supabase/` |
| Client and server Supabase helpers | Present under `lib/supabase/` |
| RBAC permission map | Present in `lib/rbac.ts` (five roles; not enforced by auth) |
| Patient identity and AfyaPass ID issuance | Planned (registration UI is mock) |
| QR payload helper | Present in `lib/qr.ts`; live scan/verify is not implemented |
| Consent and authorization engine | Planned (consent screen is mock) |
| Immutable audit trail | Planned (audit-log screen is mock) |
| Authenticated sessions | Planned (no login or middleware gate) |
| Live clinical writes to Postgres | Planned (pages use mock data) |
| County health analytics | Planned (`/county` is a concept page) |
| FHIR / interchange | Planned |

RBAC roles defined in code: `patient`, `healthcare_worker`, `facility_admin`, `county_admin`, `system_auditor`.

---

## Technology stack

Verified from `package.json`:

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4, with `clsx` and `tailwind-merge`
- **Backend target:** Supabase (PostgreSQL, Row Level Security, Auth architecture)
- **Icons:** UXWing, as filled inline SVGs in `components/icons` (the product icon system)
- **Lint:** ESLint (`eslint-config-next`)

Scripts: `dev`, `build`, `start`, `lint`. There is no separate typecheck or Prettier script.

---

## Design system

AfyaPass uses a healthcare dashboard language of its own:

- Brand teal (`#0d9488`) on a 4px spacing grid
- Slate neutrals, white cards, dark sidebar (260px) and white header (64px) in the dashboard shell
- Inter as the UI typeface
- UXWing filled icons at 16 / 20 / 24 (`h-4` / `h-5` / `h-6`)
- Semantic status colors (success, warning, danger, info)
- Responsive layouts for clinic desks and smaller screens

Visual direction is informed by modern healthcare dashboards. That is inspiration only, not an affiliation or a copy.

Design work is phased:

1. **Tokens and type** - implemented on an open PR, not yet on `main`
2. **UXWing icon unification** - in progress; do not treat as complete
3. **Shared shells** (`PageHeader`, `FilterBar`, `DataTable`, `StatusBadge`, `Alert`) - not started
4. **Chrome polish** - not started
5. **Screen-by-screen** - not started

---

## Project structure

```text
AfyaPass/
|-- app/
|   |-- (public)/              # /, /patient, /facility, /county
|   |-- (dashboard)/           # EHR mock routes
|   |-- globals.css
|   `-- layout.tsx
|-- components/
|   |-- ui/                    # Shared primitives
|   |-- dashboard/             # Sidebar, Header, and related chrome
|   |-- icons/                 # UXWing icon catalog
|   `-- ...                    # Marketing components (Hero, Navbar, Footer, ...)
|-- lib/
|   |-- supabase/              # Browser and server clients
|   |-- mock-data.ts
|   |-- qr.ts
|   |-- rbac.ts
|   `-- utils.ts
|-- types/
|-- supabase/
|   |-- migrations/
|   |-- full_schema.sql
|   `-- rls_policies.sql
|-- docs/
|   |-- ARCHITECTURE.md
|   |-- QR_SPECIFICATION.md
|   |-- SECURITY.md
|   |-- architecture/
|   |-- database/
|   `-- security/
|-- scripts/
|   `-- verify-database.ts
|-- .env.example
|-- LICENSE
|-- README.md
|-- package.json
|-- eslint.config.mjs
`-- tsconfig.json
```

Deeper notes live in `docs/ARCHITECTURE.md`, `docs/QR_SPECIFICATION.md`, and `docs/SECURITY.md`.

---

## Development setup

**Prerequisites:** Node.js 18 or later, and npm.

```bash
git clone https://github.com/Jymee33/AfyaPass.git
cd AfyaPass
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
```

The repo is private. Clone access requires permission from the authors.

---

## Environment variables

From `.env.example`. Never commit real secrets.

| Variable | Purpose | Exposure |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | App origin (default `http://localhost:3000`) | Public |
| `NEXT_PUBLIC_ENVIRONMENT` | Runtime label (default `development`) | Public |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role | Server only |
| `SECURITY_ENCRYPTION_SECRET` | Signing / encryption secret | Server only |

---

## Security principles

These are architectural rules for the product. They are not a claim that production controls are live.

1. **No medical data in QR codes.** The code holds an opaque reference, not clinical content.
2. **No secrets in git.** Credentials live in environment variables.
3. **Knowing a national ID, phone number, or name is not access.** The internal AfyaPass Patient ID is the record key.
4. **Row Level Security** is the intended database enforcement layer.
5. **Role-based access** is defined for five roles in `lib/rbac.ts`.
6. **Auditability** is intended for lookups, scans, and emergency overrides.

AfyaPass is designed with the Kenya Data Protection Act, 2019 in mind. That is not a legal certification, a DPIA, or approval to process real health data.

---

## Development status

> **Prototype.** This repository is not approved, certified, or intended for real patient data. Independent legal, privacy, security, and data-protection review is required before any live pilot.

| Work | Status |
| --- | --- |
| Marketing site and dashboard mock UI | On `main` |
| Database schema / RLS files | On `main` |
| Design tokens and type (Phase 1) | Implemented on an open PR; not merged to `main` |
| UXWing icon unification (Phase 2) | In progress; incomplete |
| Shared UI shells (Phase 3) | Not started |
| Auth, live Supabase wiring, QR scan, tests, pilot | Not started |

---

## Contributors

AfyaPass is currently developed by two developers:

- [Jymee33](https://github.com/Jymee33)
- [Ian Mwinga Nyambura](https://github.com/kingyepz-uopeople) (`kingyepz-uopeople`)

---

## License

Proprietary. All rights reserved. See [LICENSE](LICENSE).

Viewing this repository does not grant permission to copy, modify, distribute, or use the software commercially.
