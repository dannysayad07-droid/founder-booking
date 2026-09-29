'use client';

import Link from 'next/link';

const programs = [
  { number: '01', name: 'ALTER EGO', meta: '8-week · 1:1 coaching for adults', text: 'Build confidence, strengthen communication, and express yourself with clarity and impact.' },
  { number: '02', name: 'UNMUTE', meta: '6-week · teens & young adults', text: 'A supportive programme for becoming a more confident, capable communicator.' },
  { number: '03', name: 'HER VOICE', meta: '6-week · confidence & boundaries', text: 'Develop a stronger voice, clearer boundaries, and the confidence to take up space.' },
  { number: '04', name: 'LOUDER INSIDE', meta: 'Play-based · children', text: 'A playful approach that helps children communicate, participate, and grow in confidence.' },
];

const steps = [
  { number: '01', title: 'Initial assessment', text: 'Understand your goals, challenges, and what you want to change.' },
  { number: '02', title: 'Choose your format', text: 'Find the programme or coaching format that fits your needs.' },
  { number: '03', title: 'Begin your journey', text: 'Start building clearer communication and stronger confidence.' },
];

export default function IndiaPreview() {
  return (
    <main className="site">
      <header className="nav">
        <div className="navInner">
          <a href="#top" className="brand">Raise<span>Your</span>Voicee</a>
          <nav className="desktopNav">
            <a href="#about">About</a><a href="#programmes">Programmes</a><a href="#how">How it works</a>
          </nav>
          <Link href="/" className="navCta">Book a session <span>↗</span></Link>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="orb orbA" /><div className="orb orbB" />
        <div className="heroInner">
          <div className="heroCopy">
            <p className="eyebrow"><i /> India · Confidence · Communication</p>
            <h1>Find your voice.<br /><em>Use it with confidence.</em></h1>
            <p className="heroText">Speak confidently, communicate clearly, and present with impact — at work, on stage, and in everyday life.</p>
            <div className="actions">
              <Link href="/" className="primary">Book an assessment <span>↗</span></Link>
              <a href="#programmes" className="secondary">Explore programmes ↓</a>
            </div>
            <div className="trust"><b>4.9</b><div><strong>Trusted by 3000+ people</strong><small>for confidence & communication</small></div></div>
          </div>
          <div className="heroVisual">
            <div className="portrait">
              <div className="halo" /><div className="initial">M</div>
              <div className="caption">Mariam<small>Public Speaking Coach</small></div>
            </div>
            <div className="badge rating"><b>4.9</b><span>★</span><small>client experience</small></div>
            <div className="badge quote">“Your voice is already there.<br /><b>Let’s make it heard.</b>”</div>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <p className="label">01 — About RaiseYourVoicee</p>
        <div className="twoCol">
          <h2>Confidence is a skill —<br /><em>and it can be developed.</em></h2>
          <div><p className="lead">RaiseYourVoicee helps people communicate with confidence, find clarity in their message, and show up with greater impact.</p><p>Through practical coaching and supportive programmes, Mariam works with adults, young people, women, and children to help them express themselves more confidently.</p><a className="under" href="#how">Discover the approach ↗</a></div>
        </div>
        <div className="stats"><div><b>4.9</b><small>Client experience</small></div><div><b>3000+</b><small>People reached</small></div><div><b>1:1 +</b><small>Group formats</small></div></div>
      </section>

      <section id="programmes" className="programmes">
        <div className="programTop">
          <div><p className="label light">02 — Programmes</p><h2>Support designed around<br /><em>the person, not a formula.</em></h2></div>
          <p>Different goals need different kinds of support. Explore the programmes and find the right starting point for you.</p>
        </div>
        <div className="programGrid">
          {programs.map((program) => (
            <article className="programCard" key={program.name}>
              <span className="num">{program.number}</span>
              <div><small>{program.meta}</small><h3>{program.name}</h3><p>{program.text}</p><Link href="/" className="cardLink">Book an assessment ↗</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="section how">
        <p className="label">03 — How it works</p>
        <div className="twoCol"><h2>Simple from the first<br /><em>conversation.</em></h2><p>No complicated process. Start with a conversation, understand what you need, and choose the path that feels right.</p></div>
        <div className="steps">{steps.map((step) => <article className="step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="cta"><div className="ctaGlow" /><p className="label light">Ready when you are</p><h2>Your next conversation could<br /><em>change how you show up.</em></h2><p>Take the first step towards communicating with more confidence and clarity.</p><Link href="/" className="primary">Book a session <span>↗</span></Link></section>

      <footer>
        <div className="footerTop"><div><a href="#top" className="brand">Raise<span>Your</span>Voicee</a><p>Public speaking, communication, confidence, and coaching — now with an India-focused customer journey.</p></div><div className="contact"><a href="mailto:communications@raiseyourvoicee.com">communications@raiseyourvoicee.com</a><a href="tel:004407869758473">0044 07869758473</a></div></div>
        <div className="footerBottom"><span>India website preview · Subject to client approval</span><span>© RaiseYourVoicee</span></div>
      </footer>

      <style jsx>{`
        :global(*){box-sizing:border-box}:global(html){scroll-behavior:smooth}:global(body){margin:0;background:#f7f3ed;color:#20201e;font-family:Arial,Helvetica,sans-serif}:global(a){color:inherit;text-decoration:none}
        .site{overflow:hidden}.nav{position:sticky;top:0;z-index:20;background:rgba(247,243,237,.9);backdrop-filter:blur(18px);border-bottom:1px solid #e5dfd7}.navInner{max-width:1240px;margin:auto;padding:18px 32px;display:flex;align-items:center;gap:30px}.brand{font:700 23px Georgia,serif;letter-spacing:-.05em}.brand span{font-style:italic;font-weight:400}.desktopNav{display:flex;gap:30px;margin-left:auto}.desktopNav a{font-size:13px;color:#68635c}.navCta,.primary{background:#20201e;color:#fff;border-radius:999px;padding:13px 19px;font-size:13px;font-weight:700}.navCta span,.primary span{margin-left:7px}
        .hero{position:relative;min-height:730px;border-bottom:1px solid #e5dfd7;display:flex;align-items:center}.heroInner{max-width:1240px;width:100%;margin:auto;padding:80px 32px 95px;display:grid;grid-template-columns:1fr .9fr;gap:70px;align-items:center;position:relative;z-index:2}.orb{position:absolute;border-radius:50%;filter:blur(3px)}.orbA{width:430px;height:430px;right:7%;top:5%;background:#ead9cf}.orbB{width:230px;height:230px;left:-80px;bottom:-60px;background:#dce1d5}.eyebrow,.label{text-transform:uppercase;letter-spacing:.16em;font-size:11px;font-weight:800;color:#8a8277}.eyebrow{display:flex;gap:10px;align-items:center}.eyebrow i{width:27px;height:1px;background:#9c7767}.hero h1,h2{font:500 clamp(42px,6vw,78px)/.98 Georgia,serif;letter-spacing:-.05em}.hero h1{margin:23px 0 28px}.hero h1 em,h2 em{color:#9c7767;font-style:italic}.heroText{max-width:560px;color:#5d5a54;font-size:18px;line-height:1.7}.actions{display:flex;gap:25px;align-items:center;margin-top:34px}.secondary{font-size:13px;font-weight:700;border-bottom:1px solid #aaa198;padding-bottom:4px}.trust{display:flex;align-items:center;gap:13px;margin-top:50px}.trust>b{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#20201e;color:#fff;font:18px Georgia,serif}.trust strong,.trust small{display:block}.trust strong{font-size:12px}.trust small{font-size:11px;color:#858078;margin-top:3px}
        .heroVisual{height:530px;position:relative;max-width:470px;width:100%;margin:auto}.portrait{height:100%;border-radius:240px 240px 24px 24px;background:linear-gradient(145deg,#d9c6bc,#b8a79c);position:relative;overflow:hidden;box-shadow:0 35px 80px rgba(49,40,35,.16)}.halo{position:absolute;width:310px;height:310px;border-radius:50%;background:#e9ddd5;top:65px;left:50%;transform:translateX(-50%)}.initial{position:absolute;z-index:1;left:50%;top:125px;transform:translateX(-50%);font:170px Georgia,serif;color:rgba(32,32,30,.78)}.caption{position:absolute;z-index:2;left:30px;bottom:28px;color:#fff;font:26px Georgia,serif}.caption small{display:block;font:11px Arial,sans-serif;opacity:.8;margin-top:5px}.badge{position:absolute;z-index:4;background:rgba(255,255,255,.93);backdrop-filter:blur(14px);box-shadow:0 18px 45px rgba(49,40,35,.14);border-radius:17px;border:1px solid #fff}.rating{right:-20px;top:85px;padding:15px 18px;min-width:120px}.rating b{font:31px Georgia,serif}.rating span{color:#9c7767;margin-left:5px}.badge small{display:block;color:#777169;font-size:10px;margin-top:4px}.quote{left:-25px;bottom:45px;padding:17px 20px;color:#5e5952;font:14px/1.5 Georgia,serif}
        .section{max-width:1240px;margin:auto;padding:110px 32px}.twoCol{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:35px;align-items:start}.section h2{margin:0}.twoCol p{color:#716d66;line-height:1.8;font-size:15px}.twoCol .lead{font:22px/1.5 Georgia,serif;color:#383631}.under{display:inline-block;margin-top:14px;border-bottom:1px solid #20201e;padding-bottom:5px;font-size:13px;font-weight:700}.stats{display:grid;grid-template-columns:repeat(3,1fr);margin-top:75px;border-top:1px solid #d7d0c8;border-bottom:1px solid #d7d0c8}.stats div{padding:25px 15px}.stats div+div{border-left:1px solid #d7d0c8}.stats b{display:block;font:42px Georgia,serif}.stats small{font-size:11px;color:#858078;text-transform:uppercase;letter-spacing:.12em}
        .programmes{background:#20201e;color:#fff;padding:110px max(32px,calc((100% - 1176px)/2))}.programTop{display:grid;grid-template-columns:1.2fr .8fr;gap:70px;align-items:end}.light{color:#b8aaa0}.programTop h2{margin:28px 0 0}.programTop>p{color:#aaa59e;line-height:1.75;max-width:390px;margin:0 0 4px auto}.programGrid{display:grid;grid-template-columns:repeat(2,1fr);margin-top:60px;border-top:1px solid #41413d}.programCard{display:grid;grid-template-columns:45px 1fr;gap:20px;padding:36px 25px 36px 0;border-bottom:1px solid #41413d}.programCard:nth-child(even){padding-left:35px;border-left:1px solid #41413d}.num{color:#9f9890;font-size:11px;letter-spacing:.1em}.programCard small{color:#aaa59e;text-transform:uppercase;letter-spacing:.1em;font-size:10px}.programCard h3{font:31px Georgia,serif;margin:11px 0}.programCard p{color:#aaa59e;line-height:1.65;font-size:14px;max-width:470px}.cardLink{display:inline-block;margin-top:7px;border-bottom:1px solid #625f59;padding-bottom:4px;font-size:12px;font-weight:700}
        .how .twoCol p{margin:0}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;margin-top:65px}.step{border-top:1px solid #cfc7bf;padding-top:22px}.step>span{color:#9c7767;font-size:11px;font-weight:800}.step h3{font:25px Georgia,serif;margin:25px 0 10px}.step p{max-width:300px;color:#777169;font-size:14px;line-height:1.7}
        .cta{position:relative;overflow:hidden;text-align:center;background:#e8ddd5;padding:115px 20px}.ctaGlow{position:absolute;width:380px;height:380px;border-radius:50%;background:#d7c0b5;opacity:.5;left:50%;top:50%;transform:translate(-50%,-50%)}.cta>*:not(.ctaGlow){position:relative;z-index:1}.cta h2{margin:25px 0 18px}.cta>p:not(.label){color:#6e675f;line-height:1.7}.cta .primary{display:inline-block;margin-top:12px}
        footer{background:#20201e;color:#fff;padding:55px 32px 25px}.footerTop,.footerBottom{max-width:1180px;margin:auto}.footerTop{display:flex;justify-content:space-between;gap:50px;padding-bottom:50px}.footerTop p{max-width:420px;color:#99958e;line-height:1.7;font-size:13px;margin:15px 0 0}.contact{display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-size:13px;color:#d2cec8}.footerBottom{border-top:1px solid #3d3d39;padding-top:18px;display:flex;justify-content:space-between;color:#77736d;font-size:10px;text-transform:uppercase;letter-spacing:.08em}
        @media(max-width:800px){.navInner{padding:15px 18px}.desktopNav{display:none}.navCta{margin-left:auto;padding:11px 14px;font-size:12px}.heroInner{grid-template-columns:1fr;padding:65px 20px 80px;gap:50px}.hero h1{font-size:clamp(50px,15vw,72px)}.heroText{font-size:16px}.actions{flex-wrap:wrap}.heroVisual{height:430px;max-width:370px}.initial{font-size:130px;top:105px}.halo{width:240px;height:240px}.rating{right:-5px;top:45px}.quote{left:-5px;bottom:25px}.section{padding:80px 20px}.twoCol,.programTop{grid-template-columns:1fr;gap:35px}.stats{margin-top:55px}.programmes{padding:80px 20px}.programGrid{grid-template-columns:1fr}.programCard:nth-child(even){padding-left:0;border-left:0}.programTop>p{margin:0}.steps{grid-template-columns:1fr;gap:38px}.footerTop{flex-direction:column}.contact{align-items:flex-start}.footerBottom{flex-direction:column;gap:10px}}
        @media(max-width:480px){.brand{font-size:20px}.actions{flex-direction:column;align-items:flex-start;gap:18px}.heroVisual{height:390px}.caption{left:22px;bottom:22px}.stats{grid-template-columns:1fr}.stats div+div{border-left:0;border-top:1px solid #d7d0c8}.programCard{grid-template-columns:34px 1fr;gap:12px}.programCard h3{font-size:27px}.cta{padding:90px 20px}}
      `}</style>
    </main>
  );
}
