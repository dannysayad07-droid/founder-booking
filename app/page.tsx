'use client';
import {useEffect,useState} from 'react';
type Slot={start:string,end:string};
export default function Home(){
 const [date,setDate]=useState(new Date().toISOString().slice(0,10));
 const [slots,setSlots]=useState<Slot[]>([]); const [loading,setLoading]=useState(false); const [selected,setSelected]=useState<Slot|null>(null); const [name,setName]=useState(''); const [email,setEmail]=useState('');
 async function load(){setLoading(true);const r=await fetch('/api/availability?date='+date);const j=await r.json();setSlots(j.slots||[]);setLoading(false)}
 useEffect(()=>{load()},[date]);
 async function book(){if(!selected)return;const r=await fetch('/api/razorpay/order',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({start:selected.start,end:selected.end,name,email})});const j=await r.json(); if(!r.ok){alert(j.error||'Could not start payment');return} alert('Order created: '+j.orderId+'. Next step is opening Razorpay Checkout.')}
 return <main style={{maxWidth:760,margin:'0 auto',padding:'60px 24px'}}><h1>Book time with the Founder</h1><p>Choose a date and an available slot.</p><input type="date" value={date} onChange={e=>setDate(e.target.value)} />
 <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:24}}>{loading?<p>Loading…</p>:slots.map(s=><button key={s.start} onClick={()=>setSelected(s)} style={{padding:16,border:'1px solid #ddd',borderRadius:12,background:selected?.start===s.start?'#222':'white',color:selected?.start===s.start?'white':'#222'}}>{new Date(s.start).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</button>)}</div>
 {selected&&<section style={{marginTop:32,padding:24,background:'white',borderRadius:16}}><h2>Confirm booking</h2><input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} style={{display:'block',width:'100%',padding:12,marginBottom:12,boxSizing:'border-box'}}/><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block',width:'100%',padding:12,marginBottom:12,boxSizing:'border-box'}}/><button onClick={book} style={{padding:'12px 20px'}}>Pay & book</button></section>}
 </main>
}