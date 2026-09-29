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
    const r = await fetch('/api/admin/bookings', { headers: { 'x-admin-key': savedKey }, cache: 'no-store' });
    const j = await r.json();
    if (!r.ok) { setMessage(j.error || 'Could not load bookings'); return; }
    sessionStorage.setItem('founder-admin-key', savedKey);
    setBookings(j.bookings || []);
    setLoaded(true);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('founder-admin-key');
    if (saved) { setKey(saved); load(saved); }
  }, []);

  async function confirm(id: number) {
    const r = await fetch('/api/admin/confirm', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-key': key }, body: JSON.stringify({ bookingId: id }) });
    const j = await r.json();
    if (!r.ok) { setMessage(j.error || 'Could not confirm booking'); return; }
    setMessage(j.calendarSynced ? 'Booking confirmed and Google Calendar synced.' : 'Booking confirmed. Google Calendar is not connected yet.');
    await load();
  }

  if (!loaded) return (
    <main style={{ minHeight:'100vh', background:'#f4eee7', color:'#262321', fontFamily:'Arial, sans-serif', padding:'28px 20px' }}>
      <div style={{ maxWidth:520, margin:'0 auto' }}>
        <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:60 }}>
          <div><div style={{ fontFamily:'Georgia, serif', fontSize:24, fontWeight:700 }}>Raise Your Voicee</div><div style={{ fontSize:11, letterSpacing:2, textTransform:'uppercase', marginTop:5, color:'#8f5d5b' }}>India · Admin</div></div>
          <div style={{ width:42, height:42, borderRadius:'50%', background:'#9d6864', color:'#fff', display:'grid', placeItems:'center', fontFamily:'Georgia, serif', fontWeight:700 }}>RYV</div>
        </header>
        <section style={{ background:'#fffaf5', border:'1px solid #dfd2c8', borderRadius:28, padding:'44px 34px', boxShadow:'0 20px 60px rgba(72,52,44,.08)' }}>
          <div style={{ color:'#9d6864', fontSize:12, letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>Private dashboard</div>
          <h1 style={{ fontFamily:'Georgia, serif', fontSize:42, lineHeight:1.05, fontWeight:500, margin:'0 0 16px' }}>Welcome back.</h1>
          <p style={{ color:'#665d58', lineHeight:1.7, margin:'0 0 28px' }}>Review payment submissions and confirm customer bookings from one simple place.</p>
          <input type="password" value={key} onChange={e=>setKey(e.target.value)} placeholder="Admin key" style={{ width:'100%', padding:'15px 16px', border:'1px solid #d8cbc1', borderRadius:14, boxSizing:'border-box', background:'#fff', fontSize:15, outline:'none' }} />
          <button onClick={()=>load()} disabled={!key} style={{ width:'100%', marginTop:12, padding:'15px 18px', border:0, borderRadius:14, background:'#292523', color:'#fff', fontSize:14, fontWeight:700, cursor:key?'pointer':'not-allowed' }}>Open dashboard</button>
          {message && <p style={{ color:'#9d4f4b', marginTop:16, fontSize:14 }}>{message}</p>}
        </section>
        <p style={{ textAlign:'center', color:'#887d76', fontSize:12, marginTop:22 }}>Raise Your Voicee · Make space for your voice.</p>
      </div>
    </main>
  );

  return (
    <main style={{ minHeight:'100vh', background:'#f4eee7', color:'#262321', fontFamily:'Arial, sans-serif', padding:'28px 20px 60px' }}>
      <div style={{ maxWidth:980, margin:'0 auto' }}>
        <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:20, marginBottom:46, flexWrap:'wrap' }}>
          <div><div style={{ fontFamily:'Georgia, serif', fontSize:28, fontWeight:700 }}>Raise Your Voicee</div><div style={{ fontSize:11, letterSpacing:2, textTransform:'uppercase', marginTop:6, color:'#8f5d5b' }}>India · Booking dashboard</div></div>
          <button onClick={()=>{sessionStorage.removeItem('founder-admin-key');setLoaded(false);setBookings([]);setKey('')}} style={{ border:'1px solid #d2c4ba', background:'transparent', borderRadius:999, padding:'10px 16px', color:'#514943', cursor:'pointer' }}>Sign out</button>
        </header>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:22, alignItems:'start' }}>
          <section>
            <div style={{ color:'#9d6864', fontSize:12, letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>01 — Payments</div>
            <h1 style={{ fontFamily:'Georgia, serif', fontSize:46, lineHeight:1.05, fontWeight:500, margin:'0 0 10px' }}>Booking approvals</h1>
            <p style={{ color:'#6c625d', margin:'0 0 26px' }}>{bookings.length} pending booking{bookings.length === 1 ? '' : 's'}</p>
            {message && <div style={{ background:'#ead9d3', border:'1px solid #d7bbb3', borderRadius:14, padding:'13px 15px', marginBottom:16, fontSize:14 }}>{message}</div>}
            {bookings.length===0 ? <div style={{ background:'#fffaf5', border:'1px solid #dfd2c8', borderRadius:22, padding:28, color:'#716760' }}>No pending payment submissions.</div> : bookings.map(b=>(
              <article key={b.id} style={{ background:'#fffaf5', border:'1px solid #dfd2c8', borderRadius:22, padding:24, marginBottom:14, boxShadow:'0 12px 35px rgba(72,52,44,.05)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', gap:18, alignItems:'flex-start', flexWrap:'wrap' }}>
                  <div><div style={{ fontFamily:'Georgia, serif', fontSize:24, fontWeight:600 }}>{b.customer_name}</div><div style={{ color:'#6c625d', marginTop:5 }}>{b.customer_email}</div></div>
                  <div style={{ textAlign:'right' }}><div style={{ fontWeight:700 }}>{b.currency} {Number(b.price).toLocaleString('en-IN')}</div><div style={{ fontSize:12, color:'#8b7e76', marginTop:4 }}>Payment: {b.payment_status}</div></div>
                </div>
                <div style={{ marginTop:18, paddingTop:16, borderTop:'1px solid #e7dcd4', color:'#514943', lineHeight:1.7 }}>
                  {new Date(b.start_time).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' })} — {new Date(b.end_time).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}
                </div>
                <button onClick={()=>confirm(b.id)} style={{ marginTop:18, padding:'12px 20px', border:0, borderRadius:999, background:'#9d6864', color:'#fff', fontWeight:700, cursor:'pointer' }}>Confirm payment</button>
              </article>
            ))}
          </section>
          <aside style={{ background:'#292523', color:'#fffaf5', borderRadius:26, padding:28, position:'sticky', top:20 }}>
            <div style={{ color:'#d9a9a2', fontSize:11, letterSpacing:2, textTransform:'uppercase', marginBottom:24 }}>Raise Your Voicee</div>
            <div style={{ fontFamily:'Georgia, serif', fontSize:30, lineHeight:1.15 }}>Make space for your voice.</div>
            <p style={{ color:'#d7ccc5', lineHeight:1.7, fontSize:14, marginTop:18 }}>Confirm a payment here and the booking flow will continue with the configured calendar sync.</p>
            <div style={{ borderTop:'1px solid #554d49', marginTop:28, paddingTop:18, fontSize:12, color:'#bfb4ae' }}>Private admin area · India</div>
          </aside>
        </div>
      </div>
    </main>
  );
}
