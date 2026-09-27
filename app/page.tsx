'use client';

import { useEffect, useState } from 'react';

type Slot = { start: string; end: string };

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState<{
    bookingId: string;
    amount: number;
    currency: string;
    upiId: string;
    qrUrl: string;
    upiUri: string;
  } | null>(null);
  const [submittingPayment, setSubmittingPayment] = useState(false);

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
  }, [date]);

  async function startBooking() {
    if (!selected || !name || !email) return;

    const r = await fetch('/api/razorpay/order', {
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
      await load();
      return;
    }

    setPayment({
      bookingId: j.bookingId,
      amount: j.amount,
      currency: j.currency,
      upiId: j.upiId,
      qrUrl: j.qrUrl,
      upiUri: j.upiUri
    });
  }

  async function confirmPaymentSubmitted() {
    if (!payment) return;

    setSubmittingPayment(true);
    try {
      const r = await fetch('/api/upi/paid', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ bookingId: payment.bookingId })
      });
      const j = await r.json();

      if (!r.ok) {
        alert(j.error || 'Could not submit payment status');
        return;
      }

      alert('Payment marked as submitted. Your booking will be confirmed after payment is verified.');
      setPayment(null);
      setSelected(null);
      await load();
    } finally {
      setSubmittingPayment(false);
    }
  }

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
        {loading ? (
          <p>Loading...</p>
        ) : slots.length === 0 ? (
          <p>No slots available.</p>
        ) : (
          slots.map(s => (
            <button
              key={s.start}
              onClick={() => setSelected(s)}
              style={{
                padding: 16,
                border: '1px solid #ddd',
                borderRadius: 12,
                background: selected?.start === s.start ? '#222' : '#fff',
                color: selected?.start === s.start ? '#fff' : '#222'
              }}
            >
              {new Date(s.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </button>
          ))
        )}
      </div>

      {selected && !payment && (
        <section style={{ marginTop: 32, padding: 24, border: '1px solid #ddd', borderRadius: 16 }}>
          <h2>Confirm booking</h2>
          <p>
            {new Date(selected.start).toLocaleString()} – {new Date(selected.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
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
            disabled={!name || !email}
            style={{ padding: '12px 20px' }}
          >
            Continue to payment
          </button>
        </section>
      )}

      {payment && (
        <section style={{ marginTop: 32, padding: 24, border: '1px solid #ddd', borderRadius: 16, textAlign: 'center' }}>
          <h2>Pay by UPI</h2>
          <p>Scan this QR code with PhonePe, Paytm, Google Pay, or another UPI app.</p>
          <h3>{payment.currency} {payment.amount.toLocaleString('en-IN')}</h3>

          <img
            src={payment.qrUrl}
            alt="UPI payment QR code"
            width={280}
            height={280}
            style={{ display: 'block', margin: '20px auto', border: '1px solid #eee', padding: 8 }}
          />

          <p><strong>UPI ID:</strong> {payment.upiId}</p>
          <p style={{ fontSize: 13, color: '#666' }}>
            On a phone, you can also tap the button below to open a UPI app.
          </p>

          <a
            href={payment.upiUri}
            style={{
              display: 'inline-block',
              padding: '12px 20px',
              borderRadius: 8,
              background: '#222',
              color: '#fff',
              textDecoration: 'none',
              marginBottom: 12
            }}
          >
            Open UPI app
          </a>

          <br />

          <button
            onClick={confirmPaymentSubmitted}
            disabled={submittingPayment}
            style={{ padding: '12px 20px' }}
          >
            {submittingPayment ? 'Submitting...' : "I've Paid"}
          </button>

          <p style={{ fontSize: 13, color: '#666', marginTop: 16 }}>
            Your appointment is not confirmed until the payment is manually verified.
          </p>
        </section>
      )}
    </main>
  );
}
