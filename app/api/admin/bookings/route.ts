import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

function authorized(req: NextRequest) {
  const key = process.env.ADMIN_KEY;
  const supplied = req.headers.get('x-admin-key');
  return Boolean(key && supplied && supplied === key);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await db
    .from('bookings')
    .select('id, customer_name, customer_email, start_time, end_time, price, currency, status, payment_status, created_at')
    .in('status', ['pending'])
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data || [] });
}
