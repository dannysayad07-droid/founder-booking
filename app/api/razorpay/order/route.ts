import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

const UPI_ID = 'test@hdfcbank';

export async function POST(req: NextRequest) {
  const { start, end, name, email } = await req.json();

  if (!start || !end || !name || !email) {
    return NextResponse.json({ error: 'Missing booking details' }, { status: 400 });
  }

  const { data: settings, error: settingsError } = await db
    .from('founder_settings')
    .select('price, currency, duration_minutes, active')
    .eq('id', 1)
    .maybeSingle();

  if (settingsError) {
    return NextResponse.json(
      { error: `Unable to read founder booking settings: ${settingsError.message}` },
      { status: 503 }
    );
  }

  const effectiveSettings = settings ?? {
    price: 1000,
    currency: 'INR',
    duration_minutes: 30,
    active: true,
  };

  if (!effectiveSettings.active) {
    return NextResponse.json(
      { error: 'Founder booking is currently unavailable.' },
      { status: 503 }
    );
  }

  const { data: conflict } = await db
    .from('bookings')
    .select('id, status, created_at')
    .lt('start_time', end)
    .gt('end_time', start)
    .in('status', ['pending', 'paid']);

  const activeConflict = (conflict || []).find((b: any) =>
    b.status === 'paid' ||
    Date.now() - new Date(b.created_at).getTime() < 15 * 60 * 1000
  );

  if (activeConflict) {
    return NextResponse.json(
      { error: 'That slot was just taken. Please choose another slot.' },
      { status: 409 }
    );
  }

  const amount = Math.round(Number(effectiveSettings.price));
  const currency = effectiveSettings.currency || 'INR';

  if (!amount || amount < 1) {
    return NextResponse.json(
      { error: 'Invalid booking price in founder settings.' },
      { status: 500 }
    );
  }

  const { data: booking, error } = await db
    .from('bookings')
    .insert({
      start_time: start,
      end_time: end,
      customer_name: name,
      customer_email: email,
      price: amount,
      currency,
      status: 'pending',
      payment_status: 'pending'
    })
    .select()
    .single();

  if (error || !booking) {
    return NextResponse.json(
      { error: error?.message || 'Could not create booking' },
      { status: 500 }
    );
  }

  const upiUri =
    `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent('Founder Booking')}&am=${encodeURIComponent(amount.toFixed(2))}&cu=${encodeURIComponent(currency)}&tn=${encodeURIComponent(`Founder booking ${booking.id}`)}`;

  const qrUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiUri)}`;

  return NextResponse.json({
    bookingId: booking.id,
    amount,
    currency,
    upiId: UPI_ID,
    upiUri,
    qrUrl
  });
}
