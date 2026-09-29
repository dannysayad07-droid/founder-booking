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

  useEffect(() => {
    if (!payment || paymentState !== 'submitted') return;
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
          email,
        }),
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

  async function confirmPaymentSubmitted() {
    if (!payment) return;
    setSubmitting(true);
    try {
      const r = await fetch('/api/upi/paid', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ bookingId: payment.bookingId }),
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
        year: 'numeric',
      })
    : '';

  return (
    <main className="bookingPage">
      <header className="bookingNav">
        <div className="navInner">
          <a href="/india" className="brand">Raise<span>Your</span>Voicee</a>
          <a href="/india" className="backLink">← Back to website</a>
        </div>
      </header>

      <section className="bookingHero">
        <div className="heroGlow" />
        <div className="heroInner">
          <div>
            <p className="eyebrow">BOOK YOUR SESSION · INDIA</p>
            <h1>Make space for your <em>voice.</em></h1>
            <p className="heroText">
              Choose a time that works for you and take the first step towards clearer,
              more confident communication.
            </p>
          </div>
          <div className="coachCard">
            <div className="portrait"><span>M</span></div>
            <div>
              <small>PUBLIC SPEAKING COACH</small>
              <strong>Mariam</strong>
              <span>RaiseYourVoicee</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bookingSection">
        <div className="bookingLayout">
          <div className="bookingMain">
            <div className="sectionLabel">01 — CHOOSE A DATE</div>
            <h2>Find a time that feels right.</h2>
            <p className="muted">Available sessions are shown below in India Standard Time.</p>

            <div className="dateWrap">
              <label htmlFor="date">Your preferred date</label>
              <input
                id="date"
                type="date"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="sectionLabel slotsLabel">02 — CHOOSE A TIME</div>
            <div className="slots">
              {loading ? (
                <p className="muted">Finding available times…</p>
              ) : slots.length === 0 ? (
                <p className="muted empty">No sessions are available on this date. Please choose another day.</p>
              ) : (
                slots.map((s) => (
                  <button
                    key={s.start}
                    onClick={() => {
                      setSelected(s);
                      setPayment(null);
                      setPaymentState('idle');
                    }}
                    className={selected?.start === s.start ? 'slot selected' : 'slot'}
                  >
                    <span>
                      {new Date(s.start).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <small>Available</small>
                  </button>
                ))
              )}
            </div>

            {selected && !payment && (
              <section className="card formCard">
                <div className="sectionLabel">03 — YOUR DETAILS</div>
                <h2>Let’s get you booked.</h2>
                <p className="muted">{formattedDate} · {new Date(selected.start).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                <input className="field" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="field" placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="primary" onClick={startBooking} disabled={!name || !email || submitting}>
                  {submitting ? 'Preparing…' : 'Continue to payment'} <span>↗</span>
                </button>
              </section>
            )}

            {payment && paymentState !== 'confirmed' && (
              <section className="card paymentCard">
                <div className="sectionLabel">04 — PAYMENT</div>
                <h2>Complete your booking.</h2>
                <p className="muted">Scan the QR code with PhonePe, Paytm, Google Pay, or another UPI app.</p>
                <div className="amount">{payment.currency} {payment.amount.toLocaleString('en-IN')}</div>
                <div className="qrFrame">
                  <img src={payment.qrUrl} alt="UPI payment QR code" width={280} height={280} />
                </div>
                <p className="upi"><strong>UPI ID</strong> {payment.upiId}</p>
                <a href={payment.upiUri} className="upiButton">Open UPI app</a>
                <button className="primary full" onClick={confirmPaymentSubmitted} disabled={submitting}>
                  {submitting ? 'Submitting…' : "I've Paid"} <span>↗</span>
                </button>
                {paymentState === 'submitted' && (
                  <div className="pending">
                    <strong>Payment submitted</strong>
                    <p>We’re verifying your payment. Keep this page open — your booking will update automatically.</p>
                  </div>
                )}
              </section>
            )}

            {paymentState === 'confirmed' && selected && (
              <section className="card confirmed">
                <div className="check">✓</div>
                <div className="sectionLabel">BOOKING CONFIRMED</div>
                <h2>You’re all set.</h2>
                <p className="muted">Your payment has been verified and your appointment is confirmed.</p>
                <div className="confirmationDate">
                  <strong>{formattedDate}</strong>
                  <span>{new Date(selected.start).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} — {new Date(selected.end).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="muted">We’ll use <strong>{email}</strong> for your booking details.</p>
              </section>
            )}
          </div>

          <aside className="side">
            <div className="sideCard">
              <div className="miniPortrait">M</div>
              <p className="quote">“Your voice is already there. Let’s make it heard.”</p>
              <div className="sideLine" />
              <small>WHAT TO EXPECT</small>
              <ul>
                <li>A focused conversation about your goals</li>
                <li>A supportive, practical approach</li>
                <li>A clear next step for your journey</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <footer className="footer">
        <div>
          <a href="/india" className="brand">Raise<span>Your</span>Voicee</a>
          <p>Public speaking, communication, confidence, and coaching — with an India-focused customer journey.</p>
        </div>
        <a href="/india">Return to website ↗</a>
      </footer>

      <style jsx>{`
        :global(*){box-sizing:border-box}:global(html){scroll-behavior:smooth}:global(body){margin:0;background:#f7f3ed;color:#20201e;font-family:Arial,Helvetica,sans-serif}:global(a){color:inherit;text-decoration:none}
        .bookingPage{min-height:100vh;overflow:hidden}.bookingNav{position:sticky;top:0;z-index:20;background:rgba(247,243,237,.9);backdrop-filter:blur(18px);border-bottom:1px solid #ddd3c8}.navInner{max-width:1240px;margin:auto;padding:18px 32px;display:flex;align-items:center;justify-content:space-between}.brand{font:700 23px Georgia,serif;letter-spacing:-.05em}.brand span{font-style:italic;font-weight:400}.backLink{font-size:12px;color:#716d66}
        .bookingHero{position:relative;border-bottom:1px solid #d7d0c8;overflow:hidden}.heroGlow{position:absolute;width:520px;height:520px;border-radius:50%;background:#e8d7cc;opacity:.55;filter:blur(4px);right:-110px;top:-250px}.heroInner{max-width:1240px;margin:auto;padding:78px 32px 82px;display:grid;grid-template-columns:1fr 360px;gap:80px;align-items:center;position:relative}.eyebrow,.sectionLabel{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#8a8277}.bookingHero h1{font:500 clamp(48px,7vw,82px)/.98 Georgia,serif;letter-spacing:-.055em;margin:20px 0 26px;max-width:720px}.bookingHero h1 em{color:#9c7772;font-style:italic}.heroText{max-width:560px;color:#5d5a54;font-size:17px;line-height:1.75}.coachCard{background:#eee6dc;border:1px solid #dfd4c9;border-radius:150px 150px 22px 22px;padding:24px 24px 26px;text-align:center;box-shadow:0 25px 60px rgba(49,40,35,.09)}.portrait{height:310px;border-radius:140px 140px 18px 18px;background:linear-gradient(145deg,#d8bfae,#b98e84);display:flex;align-items:center;justify-content:center;overflow:hidden}.portrait span{font:150px Georgia,serif;color:rgba(32,32,30,.68)}.coachCard small,.coachCard strong,.coachCard>div:last-child>span{display:block}.coachCard small{font-size:9px;letter-spacing:.14em;color:#80766c;margin-top:20px}.coachCard strong{font:28px Georgia,serif;margin-top:6px}.coachCard>div:last-child>span{font-size:11px;color:#80766c;margin-top:3px}
        .bookingSection{max-width:1240px;margin:auto;padding:95px 32px}.bookingLayout{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:90px}.bookingMain{max-width:760px}.bookingMain h2{font:500 42px/1.08 Georgia,serif;letter-spacing:-.045em;margin:16px 0 10px}.muted{color:#716d66;line-height:1.7;font-size:14px}.dateWrap{margin-top:36px;padding:22px 0;border-top:1px solid #d7d0c8;border-bottom:1px solid #d7d0c8;display:flex;align-items:center;justify-content:space-between;gap:20px}.dateWrap label{font:500 17px Georgia,serif}.dateWrap input{font:13px Arial,sans-serif;border:1px solid #cfc5ba;border-radius:5px;background:#fffaf5;padding:12px 14px;color:#20201e}.slotsLabel{margin-top:45px}.slots{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px}.slot{appearance:none;border:1px solid #d6cdc3;background:rgba(255,255,255,.42);border-radius:4px;padding:18px 14px;text-align:left;cursor:pointer;color:#20201e;transition:.18s}.slot:hover{border-color:#9c7772;transform:translateY(-1px)}.slot.selected{background:#20201e;color:#fff;border-color:#20201e}.slot span{display:block;font:20px Georgia,serif}.slot small{display:block;margin-top:6px;font-size:9px;text-transform:uppercase;letter-spacing:.12em;opacity:.65}
        .card{margin-top:42px;background:rgba(255,255,255,.52);border:1px solid #d7d0c8;border-radius:20px;padding:34px}.formCard h2,.paymentCard h2,.confirmed h2{margin-top:12px}.field{display:block;width:100%;margin-top:12px;padding:15px 14px;border:1px solid #d1c8be;border-radius:4px;background:#fffaf5;font:14px Arial,sans-serif;color:#20201e;outline:none}.field:focus{border-color:#9c7772}.primary{margin-top:18px;border:0;border-radius:999px;background:#20201e;color:#fff;padding:14px 22px;font-size:12px;font-weight:800;letter-spacing:.02em;cursor:pointer}.primary span{margin-left:7px}.primary:disabled{opacity:.5;cursor:not-allowed}.full{width:100%}.paymentCard{text-align:center}.paymentCard .sectionLabel,.paymentCard h2,.paymentCard>.muted{max-width:520px;margin-left:auto;margin-right:auto}.amount{font:34px Georgia,serif;margin:24px 0}.qrFrame{display:inline-flex;padding:12px;background:#fff;border:1px solid #ddd3c8}.qrFrame img{display:block}.upi{font-size:13px;color:#716d66}.upi strong{color:#20201e;margin-right:6px}.upiButton{display:inline-block;background:#20201e;color:#fff;border-radius:999px;padding:12px 20px;font-size:12px;font-weight:800;margin:8px 0 2px}.pending{margin-top:22px;padding:18px;border-top:1px solid #d7d0c8;text-align:left}.pending strong{font:20px Georgia,serif}.pending p{font-size:13px;color:#716d66;line-height:1.6}.confirmed{text-align:center}.check{width:54px;height:54px;border-radius:50%;background:#e1d1c9;display:grid;place-items:center;margin:0 auto 22px;font-size:24px}.confirmationDate{margin:24px auto;padding:20px;border-top:1px solid #d7d0c8;border-bottom:1px solid #d7d0c8}.confirmationDate strong,.confirmationDate span{display:block}.confirmationDate strong{font:21px Georgia,serif}.confirmationDate span{font-size:13px;color:#716d66;margin-top:6px}
        .side{padding-top:70px}.sideCard{position:sticky;top:105px;background:#e8ddd5;border-radius:22px;padding:28px}.miniPortrait{height:190px;border-radius:110px 110px 16px 16px;background:#d0aaa0;display:grid;place-items:center;font:100px Georgia,serif;color:rgba(32,32,30,.62)}.quote{font:20px/1.45 Georgia,serif;margin:24px 0;color:#3d3935}.sideLine{height:1px;background:#c8b9ad;margin:22px 0}.sideCard small{font-size:9px;font-weight:800;letter-spacing:.15em;color:#81766d}.sideCard ul{padding:0;margin:15px 0 0;list-style:none}.sideCard li{font-size:12px;line-height:1.6;color:#615b55;padding:9px 0;border-bottom:1px solid #d2c4ba}.sideCard li:last-child{border-bottom:0}
        .footer{background:#20201e;color:#fff;padding:48px 32px;display:flex;justify-content:space-between;gap:40px}.footer>div{max-width:470px}.footer .brand{color:#fff}.footer p{color:#aaa59d;font-size:12px;line-height:1.7}.footer>a{align-self:flex-end;font-size:12px;color:#d8ccc2}
        @media(max-width:850px){.navInner{padding:15px 20px}.heroInner{grid-template-columns:1fr;padding:58px 20px 65px;gap:48px}.bookingHero h1{font-size:clamp(48px,15vw,72px)}.bookingSection{padding:70px 20px}.bookingLayout{grid-template-columns:1fr;gap:40px}.side{padding-top:0}.sideCard{position:static}.slots{grid-template-columns:repeat(2,1fr)}.dateWrap{align-items:flex-start;flex-direction:column}.footer{padding:40px 20px;flex-direction:column}.footer>a{align-self:flex-start}}
        @media(max-width:480px){.brand{font-size:20px}.backLink{font-size:11px}.heroInner{padding-top:48px}.coachCard{border-radius:110px 110px 20px 20px}.portrait{height:270px}.slots{grid-template-columns:1fr 1fr}.card{padding:25px 18px}.qrFrame img{width:240px;height:240px}}
      `}</style>
    </main>
  );
}
