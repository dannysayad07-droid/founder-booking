import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';
import { calendarClient } from '@/lib/google';
import { decrypt } from '@/lib/crypto';

function makeSlots(date: string, startTime: string, endTime: string, duration: number) {
  const out: { start: string; end: string }[] = [];
  const start = new Date(`${date}T${startTime}+05:30`);
  const end = new Date(`${date}T${endTime}+05:30`);

  for (let cursor = new Date(start); cursor.getTime() + duration * 60000 <= end.getTime(); cursor = new Date(cursor.getTime() + duration * 60000)) {
    const slotEnd = new Date(cursor.getTime() + duration * 60000);
    out.push({ start: cursor.toISOString(), end: slotEnd.toISOString() });
  }
  return out;
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');
  if (!date) return NextResponse.json({ error: 'date required' }, { status: 400 });

  const { data: settings, error: settingsError } = await db
    .from('founder_settings')
    .select('working_start, working_end, duration_minutes, timezone, active')
    .eq('id', 1)
    .single();

  if (settingsError || !settings?.active) {
    return NextResponse.json({ slots: [], error: 'Founder availability is not configured yet.' });
  }

  const { data: override } = await db
    .from('availability_overrides')
    .select('available, start_time, end_time')
    .eq('date', date)
    .maybeSingle();

  if (override && override.available === false) {
    return NextResponse.json({ slots: [], calendarConnected: false });
  }

  const startTime = override?.start_time || settings.working_start;
  const endTime = override?.end_time || settings.working_end;
  const duration = settings.duration_minutes || 30;
  let slots = makeSlots(date, startTime, endTime, duration);

  const windowStart = new Date().toISOString();
  const { data: bookings } = await db
    .from('bookings')
    .select('start_time, end_time, status, created_at')
    .in('status', ['pending', 'paid'])
    .gte('start_time', windowStart);

  const now = Date.now();
  const busyBookings = (bookings || []).filter((b) =>
    b.status === 'paid' ||
    now - new Date(b.created_at).getTime() < 15 * 60 * 1000
  );

  slots = slots.filter((slot) => !busyBookings.some((b) =>
    new Date(slot.start) < new Date(b.end_time) &&
    new Date(slot.end) > new Date(b.start_time)
  ));

  const { data: conn } = await db
    .from('calendar_connections')
    .select('*')
    .eq('id', 1)
    .eq('active', true)
    .maybeSingle();

  if (!conn) return NextResponse.json({ slots, calendarConnected: false });

  try {
    const cal = calendarClient(decrypt(conn.refresh_token));
    const timeMin = new Date(`${date}T00:00:00+05:30`);
    const timeMax = new Date(`${date}T23:59:59+05:30`);
    const fb = await cal.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: conn.calendar_id || 'primary' }]
      }
    });

    const busy = fb.data.calendars?.[conn.calendar_id || 'primary']?.busy || [];
    slots = slots.filter((slot) => !busy.some((b) =>
      b.start && b.end &&
      new Date(slot.start) < new Date(b.end) &&
      new Date(slot.end) > new Date(b.start)
    ));

    return NextResponse.json({ slots, calendarConnected: true });
  } catch {
    return NextResponse.json({ slots, calendarConnected: false });
  }
}
