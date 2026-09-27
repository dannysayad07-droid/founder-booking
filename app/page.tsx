'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

type Slot = { start: string; end: string };

export default function Home() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

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

  useEffect(() => { load(); }, [date]);

  async function book() {
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

    if (!window.Razorpay) {
      alert('Payment checkout is still loading. Please try again.');
      return;
    }

    const razorpay = new window.Razorpay({
      key: j.keyId,
      amount: j.amount,
      currency: j.currency,
      name: 'Founder Booking',
      description: 'Founder consultation',
      order_id: j.orderId,
      prefill: { name, email },
      handler: async () => {
        alert('Payment received. Your booking is being confirmed.');
        setSelected(null);
        await load();
      },
      modal: {
        ondismiss: async () => {
          await load();
        }
      },
      theme: { color: '#111111' }
    });

    razorpay.open();
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
        {loading ? <p>Loading...</p> : slots.length === 0 ? <p>No slots available.</p> :
          slots.map(s => (
            <button
              key={s.start}
              onClick={() => setSelected(s)}
              style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12, background: selected?.start === s.start ? '#222' : '#fff', color: selected?.start === s.start ? '#fff' : '#222' }}
            >
              {new Date(s.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </button>
          ))}
      </div>

      {selected && (
        <section style={{ marginTop: 32, padding: 24, border: '1px solid #ddd', borderRadius: 16 }}>
          <h2>Confirm booking</h2>
          <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ display: 'block', width: '100%', padding: 12, marginBottom: 12, boxSizing: 'border-box' }} />
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '100%', padding: 12, marginBottom: 12, boxSizing: 'border-box' }} />
          <button onClick={book} style={{ padding: '12px 20px' }}>Pay & book</button>
        </section>
      )}
    </main>
  );
}
