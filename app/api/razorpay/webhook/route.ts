import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/supabase';
import { calendarClient } from '@/lib/google';
import { decrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get('x-razorpay-signature') || '';
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';

  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');

  if (!sig || sig.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return NextResponse.json({ error: 'bad signature' }, { status: 400 });
  }

  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  if (body.event !== 'payment.captured') {
    return NextResponse.json({ ok: true });
  }

  const payment = body.payload?.payment?.entity;
  const orderId = payment?.order_id;
  const paymentId = payment?.id;

  if (!orderId || !paymentId) {
    return NextResponse.json({ error: 'missing payment details' }, { status: 400 });
  }

  const { data: booking } = await db
    .from('bookings')
    .select('*')
    .eq('razorpay_order_id', orderId)
    .single();

  if (!booking) return NextResponse.json({ error: 'booking not found' }, { status: 404 });

  await db.from('bookings').update({
    status: 'paid',
    payment_status: 'paid',
    razorpay_payment_id: paymentId
  }).eq('id', booking.id);

  await db.from('payments').upsert({
    booking_id: booking.id,
    order_id: orderId,
    payment_id: paymentId,
    amount: Number(payment.amount || 0) / 100,
    currency: payment.currency || booking.currency || 'INR',
    status: 'paid'
  }, { onConflict: 'payment_id' });

  const { data: conn } = await db
    .from('calendar_connections')
    .select('*')
    .eq('id', 1)
    .eq('active', true)
    .maybeSingle();

  if (conn && !booking.google_calendar_event_id) {
    try {
      const cal = calendarClient(decrypt(conn.refresh_token));
      const event = await cal.events.insert({
        calendarId: conn.calendar_id || 'primary',
        requestBody: {
          summary: `Founder Call - ${booking.customer_name}`,
          description: `Booking for ${booking.customer_email}`,
          start: { dateTime: booking.start_time },
          end: { dateTime: booking.end_time },
          attendees: [{ email: booking.customer_email }]
        },
        sendUpdates: 'all'
      });

      if (event.data.id) {
        await db.from('bookings')
          .update({ google_calendar_event_id: event.data.id })
          .eq('id', booking.id);
      }
    } catch {
      // Payment remains successful even if calendar sync needs a later retry.
    }
  }

  return NextResponse.json({ ok: true });
}
