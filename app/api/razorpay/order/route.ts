import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { db } from '@/lib/supabase';

const rz = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(req: NextRequest) {
  const { start, end, name, email } = await req.json();

  if (!start || !end || !name || !email) {
    return NextResponse.json({ error: 'Missing booking details' }, { status: 400 });
  }

  const { data: settings, error: settingsError } = await db
    .from('founder_settings')
    .select('price, currency, duration_minutes, active')
    .eq('id', 1)
    .single();

  // Keep payments usable before the optional founder settings row is configured.
  const effectiveSettings = settings ?? {
    price: 1000,
    currency: 'INR',
    duration_minutes: 30,
    active: true,
  };

  if (settingsError && !settings) {
    // A missing settings row is handled by the defaults above. Other database
    // errors should still stop checkout rather than silently charging a wrong price.
    const message = String(settingsError.message || '').toLowerCase();
    if (!message.includes('no rows') && !message.includes('0 rows')) {
      return NextResponse.json({ error: 'Unable to read founder booking settings.' }, { status: 503 });
    }
  }

  if (!effectiveSettings.active) {
    return NextResponse.json({ error: 'Founder booking is currently unavailable.' }, { status: 503 });
  }

  const { data: conflict } = await db
    .from('bookings')
    .select('id, status, created_at')
    .lt('start_time', end)
    .gt('end_time', start)
    .in('status', ['pending', 'paid']);

  const activeConflict = (conflict || []).find((b: any) =>
    b.status === 'paid' || Date.now() - new Date(b.created_at).getTime() < 15 * 60 * 1000
  );

  if (activeConflict) {
    return NextResponse.json({ error: 'That slot was just taken. Please choose another slot.' }, { status: 409 });
  }

  const amount = Math.round(Number(effectiveSettings.price) * 100);
  const currency = effectiveSettings.currency || 'INR';

  if (!amount || amount < 100) {
    return NextResponse.json({ error: 'Invalid booking price in founder settings.' }, { status: 500 });
  }

  const { data: booking, error } = await db
    .from('bookings')
    .insert({
      start_time: start,
      end_time: end,
      customer_name: name,
      customer_email: email,
      price: Number(effectiveSettings.price),
      currency,
      status: 'pending',
      payment_status: 'pending'
    })
    .select()
    .single();

  if (error || !booking) {
    return NextResponse.json({ error: error?.message || 'Could not create booking' }, { status: 500 });
  }

  try {
    const order = await rz().orders.create({
      amount,
      currency,
      receipt: `booking_${booking.id}`,
      notes: { booking_id: String(booking.id) }
    });

    await db.from('bookings')
      .update({ razorpay_order_id: order.id })
      .eq('id', booking.id);

    return NextResponse.json({
      orderId: order.id,
      bookingId: booking.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount,
      currency
    });
  } catch (error: any) {
    await db.from('bookings').update({ status: 'cancelled' }).eq('id', booking.id);
    return NextResponse.json({ error: error?.message || 'Could not create payment order' }, { status: 500 });
  }
}
