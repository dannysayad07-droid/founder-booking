import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { bookingId } = await req.json();

  if (!bookingId) {
    return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
  }

  const { data: booking, error: readError } = await db
    .from('bookings')
    .select('id, status, payment_status')
    .eq('id', bookingId)
    .single();

  if (readError || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  if (booking.status !== 'pending') {
    return NextResponse.json({ error: 'This booking is no longer pending.' }, { status: 409 });
  }

  const { error } = await db
    .from('bookings')
    .update({ payment_status: 'submitted' })
    .eq('id', bookingId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
