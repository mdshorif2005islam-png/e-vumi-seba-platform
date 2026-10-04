# E-Vumi Seba — Next.js + Supabase Platform

This project converts the uploaded single-file E-Vumi Seba frontend into a real application foundation using Next.js App Router + Supabase Auth/Postgres/Storage.

## Included
- Bangla-first homepage based on the supplied `main file.html` design
- Email/password login and registration
- Role-based profiles: owner, staff, agent, customer
- Service catalog with official fee, other cost, service fee and agent commission
- Application creation and tracking
- Application status history / audit trail
- Private document metadata and Supabase Storage bucket policies
- Agent/customer dashboards
- Public application tracking using Application ID + registered mobile
- Support-ticket table foundation
- Payment and commission ledger foundation
- SQL migration + seed data

## Setup
1. Install Node.js 20+.
2. Create a Supabase project.
3. Open Supabase SQL Editor and run `supabase/schema.sql`.
4. Copy `.env.example` to `.env.local` and add the project URL + publishable key.
5. Run:
   ```bash
   npm install
   npm run dev
   ```
6. Open `http://localhost:3000`.

## Supabase Auth
Enable Email/Password in Authentication > Providers. For local development you can disable email confirmation if you want immediate login; for production, keep email verification enabled.

## First owner account
Register normally, then run this SQL once in Supabase SQL Editor, replacing the email:
```sql
update public.profiles
set role = 'owner'
where email = 'YOUR_OWNER_EMAIL';
```

## Storage
The SQL creates a private `application-documents` bucket and policies. Documents are intentionally not public. Keep the publishable key in the browser; never put a Supabase service-role key in `.env.local` for client-side use.

## Important
This is a functional platform starter/MVP, not a claim that government land records are directly connected. E-Vumi Seba remains a private land-service assistance/document-processing platform. Government fees and E-Vumi service charges are separated in the database.
