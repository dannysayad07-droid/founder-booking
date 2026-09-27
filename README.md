# Founder Booking MVP

A starting point for a paid founder-booking website with Google Calendar availability, Supabase/Postgres, and Razorpay orders/webhooks.

## Stack
- Next.js + React
- Supabase Postgres
- Google Calendar API
- Razorpay

Supabase provides Postgres/Auth/RLS; Google Calendar exposes FreeBusy; Razorpay provides Orders + webhooks.

## Setup
1. Create a Supabase project and run `schema.sql` in SQL Editor.
2. Create Google OAuth credentials and set the redirect URI to `http://localhost:3000/api/google/callback`.
3. Generate a 32-byte hex key for `GOOGLE_ENCRYPTION_KEY`.
4. Create Razorpay test-mode API keys and webhook secret.
5. Copy `.env.example` to `.env.local` and fill values.
6. `npm install && npm run dev`.
7. Open `/api/google/connect` once to connect the founder's calendar.

## Important production work still needed
- Supabase Auth + admin dashboard/RLS.
- Razorpay Checkout on the client and signature verification for checkout responses.
- Create the Google Calendar event after payment is captured.
- Expire abandoned pending bookings so they do not block slots forever.
- Use a DB transaction/locking strategy or exclusion constraint to make double-booking prevention race-safe.
- Email/WhatsApp confirmations and reminders.
- Time-zone settings instead of hard-coding Asia/Kolkata.
- Cancellation/refund policy and webhook handling.
- Rate limiting, input validation, audit logging, privacy policy, and deployment.
