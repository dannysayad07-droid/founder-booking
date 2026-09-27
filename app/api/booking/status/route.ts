import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const bookingId = req.nextUrl.searchParams.get('bookingId');
  const email = req.nextUrl.searchParams.get('email');

  if (!bookingId || !email) {
    return NextResponse.json({ error: 'Missing booking details' }, { status: 400 });
  }

  const { data: booking, error } = await db
    .from('bookings')
    .select('id, status, payment_status, start_time, end_time, customer_name')
    .eq('id', bookingId)
    .eq('customer_email', email)
    .maybeSingle();

  if (error || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json({
    status: booking.status,
    paymentStatus: booking.payment_status,
    start: booking.start_time,
    end: booking.end_time,
    name: booking.customer_name
  });
}
