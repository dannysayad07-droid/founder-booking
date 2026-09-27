create extension if not exists pgcrypto;
create table if not exists calendar_connections(id bigint primary key, provider text not null, calendar_id text not null, refresh_token text not null, updated_at timestamptz default now());
create table if not exists bookings(id uuid primary key default gen_random_uuid(), start_time timestamptz not null, end_time timestamptz not null, customer_name text not null, customer_email text not null, status text not null default 'pending', razorpay_order_id text unique, razorpay_payment_id text, google_event_id text, created_at timestamptz default now());
create index if not exists bookings_time_idx on bookings(start_time,end_time);
