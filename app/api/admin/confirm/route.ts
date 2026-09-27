import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';
import { calendarClient } from '@/lib/google';
import { decrypt } from '@/lib/crypto';

function authorized(req: NextRequest) {
  const key = process.env.ADMIN_KEY;
  const supplied = req.headers.get('x-admin-key');
  return Boolean(key && supplied && supplied === key);
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bookingId } = await req.json();
  if (!bookingId) {
    return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
  }

  const { data: booking, error: bookingError } = await db
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .maybeSingle();

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  if (booking.status === 'paid') {
    return NextResponse.json({ ok: true, status: 'paid', calendarSynced: Boolean(booking.google_calendar_event_id) });
  }

  if (!['pending', 'submitted'].includes(booking.status) && booking.payment_status !== 'submitted') {
    return NextResponse.json({ error: 'Booking is not awaiting payment verification.' }, { status: 409 });
  }

  let calendarSynced = false;
  let calendarError = '';

  const { data: conn } = await db
    .from('calendar_connections')
    .select('calendar_id, refresh_token, active')
    .eq('id', 1)
    .eq('active', true)
    .maybeSingle();

  if (conn?.refresh_token) {
    try {
      const cal = calendarClient(decrypt(conn.refresh_token));
      const event = await cal.events.insert({
        calendarId: conn.calendar_id || 'primary',
        requestBody: {
          summary: `Founder Call — ${booking.customer_name}`,
          description: `Booking for ${booking.customer_email}`,
          start: { dateTime: booking.start_time },
          end: { dateTime: booking.end_time },
          attendees: [{ email: booking.customer_email }],
        },
        sendUpdates: 'all',
      });

      if (event.data.id) {
        await db.from('bookings').update({ google_calendar_event_id: event.data.id }).eq('id', booking.id);
        calendarSynced = true;
      }
    } catch (err: any) {
      calendarError = err?.message || 'Calendar sync failed';
    }
  }

  const { error: updateError } = await db
    .from('bookings')
    .update({ status: 'paid', payment_status: 'paid' })
    .eq('id', booking.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    status: 'paid',
    calendarSynced,
    calendarError: calendarError || undefined
  });
}
