'use client';

import { useEffect, useState } from 'react';

type Slot = { start: string; end: string };

type Payment = {
  bookingId: string;
  amount: number;
  currency: string;
  upiId: string;
  qrUrl: string;
  upiUri: string;
};

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState<Payment | null>(null);
  const [paymentState, setPaymentState] = useState<'idle' | 'submitted' | 'confirmed'>('idle');
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`/api/availability?date=${date}`);
      const j = await r.json();
      setSlots(j.slots || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    setSelected(null);
    setPayment(null);
    setPaymentState('idle');
  }, [date]);

  async function startBooking() {
    if (!selected || !name || !email) return;
    setSubmitting(true);
    try {
      const r = await fetch('/api/upi/order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          start: selected.start,
          end: selected.end,
          name,
          email
        })
      });
      const j = await r.json();
      if (!r.ok) {
        alert(j.error || 'Could not start booking');
        return;
      }
      setPayment(j);
      setPaymentState('idle');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!payment || paymentState === 'confirmed') return;

    const timer = window.setInterval(async () => {
      const r = await fetch(
        `/api/booking/status?bookingId=${encodeURIComponent(payment.bookingId)}&email=${encodeURIComponent(email)}`,
        { cache: 'no-store' }
      );
      if (!r.ok) return;
      const j = await r.json();
      if (j.status === 'paid') {
        setPaymentState('confirmed');
        window.clearInterval(timer);
      }
    }, 5000);

    return () => window.clearInterval(timer);
  }, [payment, paymentState, email]);

  async function confirmPaymentSubmitted() {
    if (!payment) return;
    setSubmitting(true);
    try {
      const r = await fetch('/api/upi/paid', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ bookingId: payment.bookingId })
      });
      const j = await r.json();
      if (!r.ok) {
        alert(j.error || 'Could not submit payment');
        return;
      }
      setPaymentState('submitted');
    } finally {
      setSubmitting(false);
    }
  }

  const formattedDate = selected
    ? new Date(selected.start).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '';

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
      <h1>Book time with the Founder</h1>
      <p>Choose a date and an available slot.</p>

      <input
        type="date"
        value={date}
        min={new Date().toISOString().slice(0, 10)}
        onChange={e => setDate(e.target.value)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
        {loading ? <p>Loading...</p> : slots.length === 0 ? <p>No slots available.</p> : slots.map(s => (
          <button
            key={s.start}
            onClick={() => {
              setSelected(s);
              setPayment(null);
              setPaymentState('idle');
            }}
            style={{
              padding: 16,
              border: '1px solid #ddd',
              borderRadius: 12,
              background: selected?.start === s.start ? '#222' : '#fff',
              color: selected?.start === s.start ? '#fff' : '#222'
            }}
          >
            {new Date(s.start).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </button>
        ))}
      </div>

      {selected && !payment && (
        <section style={{ marginTop: 32, padding: 24, border: '1px solid #ddd', borderRadius: 16 }}>
          <h2>Confirm booking</h2>
          <p>{formattedDate} — {new Date(selected.start).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 12, marginBottom: 12, boxSizing: 'border-box' }}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 12, marginBottom: 12, boxSizing: 'border-box' }}
          />
          <button
            onClick={startBooking}
            disabled={!name || !email || submitting}
            style={{ padding: '12px 20px' }}
          >
            {submitting ? 'Starting...' : 'Continue to payment'}
          </button>
        </section>
      )}

      {payment && paymentState !== 'confirmed' && (
        <section style={{ marginTop: 32, padding: 24, border: '1px solid #ddd', borderRadius: 16, textAlign: 'center' }}>
          <h2>Pay by UPI</h2>
          <p>Scan the QR code with PhonePe, Paytm, Google Pay, or another UPI app.</p>
          <h3>{payment.currency} {payment.amount.toLocaleString('en-IN')}</h3>
          <img
            src={payment.qrUrl}
            alt="UPI payment QR code"
            width={280}
            height={280}
            style={{ display: 'block', margin: '20px auto', border: '1px solid #eee', padding: 8 }}
          />
          <p><strong>UPI ID:</strong> {payment.upiId}</p>
          <a
            href={payment.upiUri}
            style={{ display: 'inline-block', padding: '12px 20px', borderRadius: 8, background: '#222', color: '#fff', textDecoration: 'none', marginBottom: 12 }}
          >
            Open UPI app
          </a>
          <br />
          <button
            onClick={confirmPaymentSubmitted}
            disabled={submitting}
            style={{ padding: '12px 20px' }}
          >
            {submitting ? 'Submitting...' : "I've Paid"}
          </button>

          {paymentState === 'submitted' && (
            <div style={{ marginTop: 20 }}>
              <h3>⏳ Payment submitted</h3>
              <p>We are verifying your payment. This page will update automatically when your booking is confirmed.</p>
              <p style={{ fontSize: 13, color: '#666' }}>Please keep this page open.</p>
            </div>
          )}
        </section>
      )}

      {paymentState === 'confirmed' && selected && (
        <section style={{ marginTop: 32, padding: 28, border: '1px solid #ddd', borderRadius: 16 }}>
          <h2>✅ Booking confirmed</h2>
          <p>Your payment has been verified and your appointment is confirmed.</p>
          <p><strong>{formattedDate}</strong></p>
          <p>{new Date(selected.start).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} — {new Date(selected.end).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
          <p>We&apos;ll use <strong>{email}</strong> for your booking details.</p>
        </section>
      )}
    </main>
  );
}
