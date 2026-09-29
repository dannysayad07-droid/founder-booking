'use client';

import Link from 'next/link';

const programs = [
  ['ALTER EGO','8-week 1:1 Coaching for Adults','Build confidence, strengthen communication, and express yourself with clarity and impact.'],
  ['UNMUTE','6-week Communication Program','A supportive programme for teens and young adults to become more confident communicators.'],
  ['HER VOICE','6-week Confidence & Boundaries Coaching','Develop a stronger voice, clearer boundaries, and the confidence to take up space.'],
  ['LOUDER INSIDE','Confidence Coaching for Children','Play-based coaching designed to help children communicate, participate, and grow in confidence.'],
];

export default function IndiaPreview() {
  return <main>
    <header style={{position:'sticky',top:0,zIndex:10,background:'rgba(250,248,243,.95)',borderBottom:'1px solid #e8e1d7'}}>
      <div style={{maxWidth:1180,margin:'auto',padding:'18px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:20}}>
        <a href="#top" style={{fontWeight:800,fontSize:22}}>RaiseYourVoicee</a>
        <nav style={{display:'flex',gap:20,alignItems:'center',fontSize:14,fontWeight:600}}>
          <a href="#about">About</a><a href="#programmes">Programmes</a><a href="#how">How it works</a>
          <Link href="/" style={{padding:'11px 18px',borderRadius:999,background:'#24211f',color:'#fff'}}>Book a Session</Link>
        </nav>
      </div>
    </header>

    <section id="top" style={{background:'linear-gradient(135deg,#f3eadf,#faf8f3 55%,#eee5da)'}}>
      <div style={{maxWidth:1180,margin:'auto',padding:'90px 24px',display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:55,alignItems:'center'}}>
        <div>
          <p style={{textTransform:'uppercase',letterSpacing:'.15em',fontSize:12,fontWeight:800}}>India • Confidence • Communication • Public Speaking</p>
          <h1 style={{fontSize:'clamp(46px,7vw,78px)',lineHeight:.98,letterSpacing:'-.055em',margin:'20px 0'}}>Find your voice.<br/>Use it with confidence.</h1>
          <p style={{fontSize:20,lineHeight:1.65,maxWidth:650,color:'#5c5651'}}>Speak confidently, communicate clearly, and present with impact — at work, on stage, and in everyday life.</p>
          <div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:30}}>
            <Link href="/" style={{padding:'15px 24px',borderRadius:999,background:'#24211f',color:'#fff',fontWeight:700}}>Book an Assessment</Link>
            <a href="#programmes" style={{padding:'15px 24px',borderRadius:999,border:'1px solid #bdb3a8',fontWeight:700}}>Explore Programmes</a>
          </div>
        </div>
        <div style={{minHeight:400,borderRadius:28,background:'#ded2c5',display:'flex',alignItems:'flex-end',padding:28}}>
          <div style={{background:'rgba(255,255,255,.92)',borderRadius:20,padding:24}}>
            <div style={{fontSize:12,textTransform:'uppercase',letterSpacing:'.12em',fontWeight:800}}>Raise Your Voicee India</div>
            <h2 style={{fontSize:28,lineHeight:1.1,margin:'10px 0'}}>Your voice is already there. Let’s make it heard.</h2>
            <p style={{margin:0,color:'#625b55',lineHeight:1.5}}>Private website preview — ready to be refined with Mariam’s exact preferences.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="about" style={{maxWidth:1180,margin:'auto',padding:'90px 24px'}}>
      <p style={{textTransform:'uppercase',letterSpacing:'.14em',fontSize:12,fontWeight:800}}>About RaiseYourVoicee</p>
      <h2 style={{fontSize:'clamp(36px,5vw,58px)',lineHeight:1.05,letterSpacing:'-.04em',maxWidth:760}}>Confidence is a skill — and it can be developed.</h2>
      <p style={{fontSize:18,lineHeight:1.8,color:'#625b55',maxWidth:780}}>RaiseYourVoicee helps people communicate with confidence, find clarity in their message, and show up with greater impact. Through coaching and practical support, Mariam works with adults, young people, women, and children to help them express themselves more confidently.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:45}}>
        {['4.9 Client experience','3000+ People reached','1:1 + Group Flexible formats'].map(x=><div key={x} style={{padding:26,borderRadius:20,background:'#f3eee8',fontWeight:700}}>{x}</div>)}
      </div>
    </section>

    <section id="programmes" style={{background:'#24211f',color:'#fff'}}>
      <div style={{maxWidth:1180,margin:'auto',padding:'90px 24px'}}>
        <p style={{textTransform:'uppercase',letterSpacing:'.14em',fontSize:12,fontWeight:800,color:'#d9cabb'}}>Programmes</p>
        <h2 style={{fontSize:'clamp(36px,5vw,58px)',lineHeight:1.05,maxWidth:760}}>Support designed around the person, not a one-size-fits-all formula.</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18,marginTop:45}}>
          {programs.map(([name,title,text])=><article key={name} style={{border:'1px solid #514a45',borderRadius:22,padding:28}}>
            <div style={{fontSize:13,letterSpacing:'.14em',fontWeight:800,color:'#d9cabb'}}>{name}</div>
            <h3 style={{fontSize:25,margin:'14px 0 10px'}}>{title}</h3>
            <p style={{color:'#c9c0b9',lineHeight:1.7}}>{text}</p>
            <Link href="/" style={{color:'#fff',fontWeight:700}}>Book an assessment →</Link>
          </article>)}
        </div>
      </div>
    </section>

    <section id="how" style={{maxWidth:1180,margin:'auto',padding:'90px 24px'}}>
      <p style={{textTransform:'uppercase',letterSpacing:'.14em',fontSize:12,fontWeight:800}}>How the onboarding works</p>
      <h2 style={{fontSize:'clamp(36px,5vw,58px)',lineHeight:1.05}}>Simple from the first conversation.</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginTop:45}}>
        {[['01','Initial Assessment','Understand your goals, challenges, and what you want to change.'],['02','Choose Your Format','Find the programme or coaching format that fits your needs.'],['03','Begin Your Journey','Start working towards clearer communication and stronger confidence.']].map(([n,t,d])=><div key={n} style={{padding:28,borderTop:'2px solid #24211f'}}><b>{n}</b><h3>{t}</h3><p style={{lineHeight:1.7,color:'#665f59'}}>{d}</p></div>)}
      </div>
    </section>

    <section style={{background:'#eee5da',textAlign:'center'}}>
      <div style={{maxWidth:800,margin:'auto',padding:'85px 24px'}}>
        <p style={{textTransform:'uppercase',letterSpacing:'.14em',fontSize:12,fontWeight:800}}>Ready when you are</p>
        <h2 style={{fontSize:'clamp(38px,6vw,64px)',lineHeight:1}}>Your next conversation could change how you show up.</h2>
        <p style={{fontSize:18,lineHeight:1.7,color:'#625b55'}}>Book an assessment and take the first step towards communicating with more confidence and clarity.</p>
        <Link href="/" style={{display:'inline-block',marginTop:22,padding:'15px 25px',borderRadius:999,background:'#24211f',color:'#fff',fontWeight:700}}>Book a Session</Link>
      </div>
    </section>

    <footer style={{background:'#24211f',color:'#fff'}}>
      <div style={{maxWidth:1180,margin:'auto',padding:'55px 24px 30px'}}>
        <div style={{fontSize:24,fontWeight:800}}>RaiseYourVoicee</div>
        <p style={{color:'#c9c0b9'}}>Public speaking, communication, confidence, and coaching — now with an India-focused customer journey.</p>
        <p style={{color:'#c9c0b9'}}>communications@raiseyourvoicee.com • 0044 07869758473</p>
        <div style={{borderTop:'1px solid #514a45',paddingTop:18,color:'#9e958e',fontSize:13}}>Private India website preview • Subject to client approval</div>
      </div>
    </footer>
  </main>;
}