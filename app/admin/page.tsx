'use client';

import { useEffect, useState } from 'react';

type Booking = {
  id: number;
  customer_name: string;
  customer_email: string;
  start_time: string;
  end_time: string;
  price: number;
  currency: string;
  status: string;
  payment_status: string;
  created_at: string;
};

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);

  async function load(savedKey = key) {
    setMessage('');
    const r = await fetch('/api/admin/bookings', {
      headers: { 'x-admin-key': savedKey },
      cache: 'no-store'
    });
    const j = await r.json();
    if (!r.ok) {
      setMessage(j.error || 'Could not load bookings');
      return;
    }
    sessionStorage.setItem('founder-admin-key', savedKey);
    setBookings(j.bookings || []);
    setLoaded(true);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('founder-admin-key');
    if (saved) {
      setKey(saved);
      load(saved);
    }
  }, []);

  async function confirm(id: number) {
    const r = await fetch('/api/admin/confirm', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify({ bookingId: id })
    });
    const j = await r.json();
    if (!r.ok) {
      setMessage(j.error || 'Could not confirm booking');
      return;
    }
    setMessage(j.calendarSynced ? 'Booking confirmed and Google Calendar synced.' : 'Booking confirmed. Google Calendar is not connected yet.');
    await load();
  }

  if (!loaded) {
    return (
      <main style={{ maxWidth: 520, margin: '80px auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
        <h1>Founder Booking Admin</h1>
        <p>Enter your admin key to view payment submissions.</p>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="Admin key"
          style={{ width: '100%', padding: 12, boxSizing: 'border-box', marginBottom: 12 }}
        />
        <button onClick={() => load()} disabled={!key} style={{ padding: '12px 20px' }}>Open dashboard</button>
        {message && <p>{message}</p>}
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Payment verification</h1>
      <p>{bookings.length} pending booking{bookings.length === 1 ? '' : 's'}</p>
      {message && <p>{message}</p>}

      {bookings.length === 0 ? (
        <div style={{ padding: 24, border: '1px solid #ddd', borderRadius: 12 }}>
          No pending payment submissions.
        </div>
      ) : bookings.map(b => (
        <article key={b.id} style={{ padding: 20, border: '1px solid #ddd', borderRadius: 12, marginBottom: 12 }}>
          <h2 style={{ marginTop: 0 }}>{b.customer_name}</h2>
          <p>{b.customer_email}</p>
          <p>
            {new Date(b.start_time).toLocaleString('en-IN')} — {new Date(b.end_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p><strong>{b.currency} {Number(b.price).toLocaleString('en-IN')}</strong> · Payment: {b.payment_status}</p>
          <button onClick={() => confirm(b.id)} style={{ padding: '12px 20px' }}>
            Confirm payment
          </button>
        </article>
      ))}
    </main>
  );
}
