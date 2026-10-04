# What was converted from the supplied HTML

The supplied `main file.html` was used as the UI/reference baseline. The main visual language remains: teal brand, Bangla-first typography, service cards, workflow, tracking, and dashboard concepts.

## Frontend -> platform mapping
- Static navigation -> Next.js App Router pages
- Static Login/Register buttons -> Supabase Auth
- Static service cards -> `services` table
- Demo tracking box -> `track_application()` RPC with Application ID + phone match
- Demo Agent Dashboard numbers -> live Supabase queries
- Demo application rows -> `applications` table
- Application status -> enum + `application_status_history` audit trigger
- Document area -> Supabase Storage private bucket + RLS
- Customer/Agent/Staff/Owner roles -> `profiles.role` + RLS
- Commission display -> `commission_ledger` foundation
- Payments -> `payments` foundation
- Support -> `support_tickets`

## Production hardening still recommended
Before taking real customer documents/payments, add:
- email verification and password reset UI
- stronger staff/owner management UI
- service CRUD UI and pricing approval workflow
- signed-download route with additional authorization checks
- document size/count/type validation on both client and server
- rate limiting / CAPTCHA for public tracking
- payment gateway integration and webhook verification
- SMS/WhatsApp notifications
- formal audit log for finance and profile changes
- backups, monitoring and error tracking
- legal/privacy/retention policy for NID and land documents
