'use client';

import Link from 'next/link';

const programs = [
  {
    number: '01',
    name: 'ALTER EGO',
    meta: '8-week · 1:1 coaching for adults',
    text: 'Build confidence, strengthen communication, and express yourself with clarity and impact.',
  },
  {
    number: '02',
    name: 'UNMUTE',
    meta: '6-week · teens & young adults',
    text: 'A supportive programme for becoming a more confident, capable communicator.',
  },
  {
    number: '03',
    name: 'HER VOICE',
    meta: '6-week · confidence & boundaries',
    text: 'Develop a stronger voice, clearer boundaries, and the confidence to take up space.',
  },
  {
    number: '04',
    name: 'LOUDER INSIDE',
    meta: 'Play-based · children',
    text: 'A playful approach that helps children communicate, participate, and grow in confidence.',
  },
];

const steps = [
  ['01', 'Initial assessment', 'Understand your goals, challenges, and what you want to change.'],
  ['02', 'Choose your format', 'Find the programme or coaching format that fits your needs.'],
  ['03', 'Begin your journey', 'Start building clearer communication and stronger confidence.'],
];

export default function IndiaPreview() {
  return (
    <>
      <main className="site">
        <header className="nav">
          <div className="navInner">
            <a href="#top" className="brand">Raise<span>Your</span>Voicee</a>

            <nav className="desktopNav" aria-label="Main navigation">
              <a href="#about">About</a>
              <a href="#programmes">Programmes</a>
              <a href="#how">How it works</a>
            </nav>

            <Link href="/" className="navCta">Book a session <span>↗</span></Link>
          </div>
        </header>

        <section id="top" className="hero">
          <div className="heroGlow glowOne" />
          <div className="heroGlow glowTwo" />

          <div className="heroInner">
            <div className="heroCopy">
              <p className="eyebrow"><span /> India · Confidence · Communication</p>
              <h1>Find your voice.<br /><em>Use it with confidence.</em></h1>
              <p className="heroText">
                Speak confidently, communicate clearly, and present with impact —
                at work, on stage, and in everyday life.
              </p>

              <div className="heroActions">
                <Link href="/" className="primaryBtn">Book an assessment <span>↗</span></Link>
                <a href="#programmes" className="textBtn">Explore programmes <span>↓</span></a>
              </div>

              <div className="heroNote">
                <div className="avatars"><span>M</span><span>+</span></div>
                <div><strong>Trusted by 3000+ people</strong><small>for confidence & communication</small></div>
              </div>
            </div>

            <div className="heroVisual" aria-label="Founder coaching visual">
              <div className="visualFrame">
                <div className="portraitPlaceholder">
                  <div className="portraitHalo" />
                  <div className="portraitInitial">M</div>
                  <div className="portraitCaption">Mariam<br /><span>Public Speaking Coach</span></div>
                </div>
                <div className="floatingCard rating"><strong>4.9</strong><span>★</span><small>client experience</small></div>
                <div className="floatingCard quote">“Your voice is already there.<br /><b>Let’s make it heard.</b>”</div>
              </div>
            </div>
          </div>

          <div className="scrollHint"><span /> Scroll to explore</div>
        </section>

        <section id="about" className="about section">
          <div className="sectionLabel">01 — About RaiseYourVoicee</div>
          <div className="aboutGrid">
            <h2>Confidence is a skill —<br /><em>and it can be developed.</em></h2>
            <div>
              <p className="lead">RaiseYourVoicee helps people communicate with confidence, find clarity in their message, and show up with greater impact.</p>
              <p>Through practical coaching and supportive programmes, Mariam works with adults, young people, women, and children to help them express themselves more confidently — whether that means speaking on stage, at work, or simply being heard.</p>
              <a href="#how" className="underLink">Discover the approach <span>↗</span></a>
            </div>
          </div>

          <div className="stats">
            <div><strong>4.9</strong><span>Client experience</span></div>
            <div><strong>3000<span>+</span></strong><span>People reached</span></div>
            <div><strong>1:1 +</strong><span>Group formats</span></div>
          </div>
        </section>

        <section id="programmes" className="programmes section">
          <div className="programmesTop">
            <div>
              <div className="sectionLabel light">02 — Programmes</div>
              <h2>Support designed around<br /><em>the person, not a formula.</em></h2>
            </div>
            <p>Different goals need different kinds of support. Explore the programmes and find the right starting point for you.</p>
          </div>

          <div className="programGrid">
            {programs.map(([number, name, meta, text]) => (
              <article className="programCard" key={name}>
                <div className="programNumber">{number}</div>
                <div>
                  <p className="programMeta">{meta}</p>
                  <h3>{name}</h3>
                  <p className="programText">{text}</p>
                  <Link href="/" className="cardLink">Book an assessment <span>↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="how section">
          <div className="sectionLabel">03 — How it works</div>
          <div className="howHeader">
            <h2>Simple from the first<br /><em>conversation.</em></h2>
            <p>No complicated process. Start with a conversation, understand what you need, and choose the path that feels right.</p>
          </div>

          <div className="steps">
            {steps.map(([number, title, text]) => (
              <div className="step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="finalCta">
          <div className="ctaOrb" />
          <div className="sectionLabel light">Ready when you are</div>
          <h2>Your next conversation could<br /><em>change how you show up.</em></h2>
          <p>Take the first step towards communicating with more confidence and clarity.</p>
          <Link href="/" className="primaryBtn lightBtn">Book a session <span>↗</span></Link>
        </section>

        <footer>
          <div className="footerTop">
            <div>
              <a href="#top" className="brand footerBrand">Raise<span>Your</span>Voicee</a>
              <p>Public speaking, communication, confidence, and coaching — now with an India-focused customer journey.</p>
            </div>
            <div className="footerContact">
              <a href="mailto:communications@raiseyourvoicee.com">communications@raiseyourvoicee.com</a>
              <a href="tel:004407869758473">0044 07869758473</a>
            </div>
          </div>
          <div className="footerBottom">
            <span>India website preview · Subject to client approval</span>
            <span>© RaiseYourVoicee</span>
          </div>
        </footer>
      </main>

      <style jsx>{`
        :global(*) { box-sizing: border-box; }
        :global(html) { scroll-behavior: smooth; }
        :global(body) { margin: 0; background: #f7f3ed; color: #20201e; font-family: Arial, Helvetica, sans-serif; }
        :global(a) { color: inherit; text-decoration: none; }

        .site { overflow: hidden; background: #f7f3ed; }
        .nav { position: sticky; top: 0; z-index: 20; background: rgba(247,243,237,.88); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(32,32,30,.08); }
        .navInner { max-width: 1240px; margin: auto; padding: 18px 32px; display: flex; align-items: center; justify-content: space-between; gap: 28px; }
        .brand { font-family: Georgia, serif; font-size: 23px; font-weight: 700; letter-spacing: -.05em; }
        .brand span { font-style: italic; font-weight: 400; }
        .desktopNav { display: flex; gap: 32px; margin-left: auto; margin-right: 12px; }
        .desktopNav a { font-size: 13px; color: #66625b; transition: color .2s; }
        .desktopNav a:hover { color: #20201e; }
        .navCta { background: #20201e; color: white; border-radius: 999px; padding: 12px 18px; font-size: 13px; font-weight: 700; }
        .navCta span, .primaryBtn span, .textBtn span, .cardLink span { margin-left: 7px; }

        .hero { position: relative; min-height: 760px; display: flex; align-items: center; border-bottom: 1px solid rgba(32,32,30,.08); }
        .heroInner { width: min(1240px, 100%); margin: auto; padding: 90px 32px 110px; display: grid; grid-template-columns: 1.02fr .98fr; gap: 55px; align-items: center; position: relative; z-index: 2; }
        .heroGlow { position: absolute; border-radius: 50%; filter: blur(3px); opacity: .7; }
        .glowOne { width: 430px; height: 430px; background: #ead9cf; right: 9%; top: 8%; }
        .glowTwo { width: 240px; height: 240px; background: #dce1d5; left: -90px; bottom: -70px; }
        .eyebrow, .sectionLabel { text-transform: uppercase; letter-spacing: .16em; font-size: 11px; font-weight: 800; color: #8a8277; }
        .eyebrow { display: flex; align-items: center; gap: 10px; }
        .eyebrow span { width: 26px; height: 1px; background: #9c7767; }
        h1, h2, h3, p { margin-top: 0; }
        h1, h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: 500; letter-spacing: -.045em; }
        h1 { font-size: clamp(54px, 7vw, 88px); line-height: .95; margin: 22px 0 28px; }
        h1 em, h2 em { color: #9c7767; font-style: italic; }
        .heroText { max-width: 560px; color: #5d5a54; font-size: 18px; line-height: 1.7; }
        .heroActions { display: flex; align-items: center; gap: 25px; margin-top: 34px; }
        .primaryBtn { display: inline-block; background: #20201e; color: #fff; border-radius: 999px; padding: 16px 23px; font-size: 13px; font-weight: 700; }
        .textBtn { font-size: 13px; font-weight: 700; border-bottom: 1px solid #aaa198; padding-bottom: 4px; }
        .heroNote { display: flex; align-items: center; gap: 12px; margin-top: 52px; }
        .avatars { display: flex; }
        .avatars span { width: 31px; height: 31px; border-radius: 50%; background: #d7c0b5; display: grid; place-items: center; font-size: 11px; font-weight: 800; border: 2px solid #f7f3ed; }
        .avatars span + span { margin-left: -7px; background: #20201e; color: white; }
        .heroNote strong, .heroNote small { display: block; }
        .heroNote strong { font-size: 12px; }
        .heroNote small { margin-top: 3px; color: #858078; font-size: 11px; }

        .heroVisual { display: flex; justify-content: center; }
        .visualFrame { width: min(490px, 100%); height: 550px; position: relative; }
        .portraitPlaceholder { height: 100%; border-radius: 240px 240px 24px 24px; background: linear-gradient(150deg, #d9c6bc, #b8a79c); position: relative; overflow: hidden; box-shadow: 0 35px 80px rgba(49,40,35,.16); }
        .portraitPlaceholder:after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent 35%, rgba(255,255,255,.24)); }
        .portraitHalo { position: absolute; width: 310px; height: 310px; border-radius: 50%; background: #e9ddd5; top: 70px; left: 50%; transform: translateX(-50%); }
        .portraitInitial { position: absolute; z-index: 1; left: 50%; top: 135px; transform: translateX(-50%); font: 170px/1 Georgia, serif; color: rgba(32,32,30,.78); }
        .portraitCaption { position: absolute; z-index: 2; bottom: 30px; left: 30px; color: #fff; font: 26px/1.05 Georgia, serif; }
        .portraitCaption span { font: 11px Arial, sans-serif; opacity: .8; }
        .floatingCard { position: absolute; background: rgba(255,255,255,.92); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,.8); box-shadow: 0 18px 45px rgba(49,40,35,.14); border-radius: 17px; z-index: 4; }
        .rating { right: -20px; top: 90px; padding: 15px 18px; min-width: 125px; }
        .rating strong { font: 31px Georgia, serif; }
        .rating span { color: #9c7767; margin-left: 5px; }
        .rating small { display: block; color: #777169; font-size: 10px; margin-top: 4px; }
        .quote { left: -28px; bottom: 50px; padding: 17px 20px; color: #5e5952; font: 14px/1.5 Georgia, serif; }

        .section { width: min(1240px, 100%); margin: auto; padding: 115px 32px; }
        .aboutGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 35px; }
        h2 { font-size: clamp(40px, 5vw, 65px); line-height: 1.02; margin-bottom: 0; }
        .lead { font: 22px/1.5 Georgia, serif; color: #383631; }
        .aboutGrid p:not(.lead) { color: #716d66; line-height: 1.8; font-size: 15px; }
        .underLink { display: inline-block; margin-top: 18px; padding-bottom: 5px; border-bottom: 1px solid #20201e; font-size: 13px; font-weight: 700; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 80px; border-top: 1px solid #d7d0c8; border-bottom: 1px solid #d7d0c8; }
        .stats div { padding: 27px 15px; }
        .stats div + div { border-left: 1px solid #d7d0c8; }
        .stats strong { display: block; font: 42px Georgia, serif; }
        .stats strong span { color: #9c7767; }
        .stats span { color: #858078; font-size: 11px; text-transform: uppercase; letter-spacing: .12em; }

        .programmes { width: 100%; max-width: none; background: #20201e; color: white; padding-left: max(32px, calc((100% - 1176px)/2)); padding-right: max(32px, calc((100% - 1176px)/2)); }
        .light { color: #b8aaa0; }
        .programmesTop { display: grid; grid-template-columns: 1.25fr .75fr; gap: 80px; align-items: end; }
        .programmes h2 { margin-top: 28px; }
        .programmesTop > p { color: #aaa59e; line-height: 1.75; max-width: 390px; margin: 0 0 4px auto; }
        .programGrid { display: grid; grid-template-columns: repeat(2, 1fr); margin-top: 65px; border-top: 1px solid #41413d; }
        .programCard { display: grid; grid-template-columns: 48px 1fr; gap: 20px; padding: 38px 28px 38px 0; border-bottom: 1px solid #41413d; }
        .programCard:nth-child(even) { padding-left: 35px; border-left: 1px solid #41413d; }
        .programNumber { color: #9f9890; font-size: 11px; letter-spacing: .1em; }
        .programMeta { color: #aaa59e; text-transform: uppercase; letter-spacing: .1em; font-size: 10px; margin-bottom: 10px; }
        .programCard h3 { font: 31px Georgia, serif; margin-bottom: 13px; }
        .programText { color: #aaa59e; line-height: 1.65; font-size: 14px; max-width: 470px; }
        .cardLink { display: inline-block; margin-top: 10px; font-size: 12px; font-weight: 700; border-bottom: 1px solid #625f59; padding-bottom: 4px; }

        .howHeader { display: grid; grid-template-columns: 1fr .7fr; gap: 90px; margin-top: 35px; align-items: end; }
        .howHeader p { color: #716d66; line-height: 1.75; margin: 0; }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-top: 70px; }
        .step { padding-top: 24px; border-top: 1px solid #cfc7bf; }
        .step > span { font-size: 11px; color: #9c7767; font-weight: 800; letter-spacing: .1em; }
        .step h3 { font: 25px Georgia, serif; margin: 28px 0 12px; }
        .step p { color: #777169; font-size: 14px; line-height: 1.7; max-width: 300px; }

        .finalCta { position: relative; overflow: hidden; background: #e8ddd5; text-align: center; padding: 120px 24px; }
        .ctaOrb { position: absolute; width: 400px; height: 400px; border-radius: 50%; background: #d7c0b5; left: 50%; top: 50%; transform: translate(-50%,-50%); opacity: .5; }
        .finalCta > *:not(.ctaOrb) { position: relative; z-index: 1; }
        .finalCta h2 { margin: 25px 0 20px; }
        .finalCta p { color: #6e675f; line-height: 1.7; }
        .lightBtn { margin-top: 12px; }

        footer { background: #20201e; color: white; padding: 55px 32px 25px; }
        .footerTop, .footerBottom { width: min(1180px, 100%); margin: auto; }
        .footerTop { display: flex; justify-content: space-between; gap: 50px; padding-bottom: 55px; }
        .footerBrand { display: inline-block; }
        .footerTop p { max-width: 420px; color: #99958e; line-height: 1.7; font-size: 13px; margin: 15px 0 0; }
        .footerContact { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; font-size: 13px; color: #d2cec8; }
        .footerBottom { border-top: 1px solid #3d3d39; padding-top: 18px; display: flex; justify-content: space-between; color: #77736d; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; }

        @media (max-width: 800px) {
          .navInner { padding: 15px 18px; }
          .desktopNav { display: none; }
          .navCta { padding: 11px 14px; font-size: 12px; }
          .hero { min-height: auto; }
          .heroInner { grid-template-columns: 1fr; padding: 70px 20px 85px; gap: 50px; }
          h1 { font-size: clamp(50px, 15vw, 72px); }
          .heroText { font-size: 16px; }
          .heroActions { flex-wrap: wrap; }
          .visualFrame { height: 430px; max-width: 370px; }
          .portraitInitial { font-size: 130px; top: 115px; }
          .portraitHalo { width: 240px; height: 240px; }
          .rating { right: -5px; top: 50px; }
          .quote { left: -5px; bottom: 25px; }
          .section { padding: 80px 20px; }
          .aboutGrid, .programmesTop, .howHeader { grid-template-columns: 1fr; gap: 35px; }
          .stats { margin-top: 55px; }
          .stats strong { font-size: 32px; }
          .programmes { padding-left: 20px; padding-right: 20px; }
          .programGrid { grid-template-columns: 1fr; }
          .programCard:nth-child(even) { padding-left: 0; border-left: 0; }
          .programmesTop > p { margin: 0; }
          .steps { grid-template-columns: 1fr; gap: 38px; }
          .step { padding-top: 20px; }
          .footerTop { flex-direction: column; }
          .footerContact { align-items: flex-start; }
          .footerBottom { flex-direction: column; gap: 10px; }
        }

        @media (max-width: 480px) {
          .brand { font-size: 20px; }
          .heroActions { align-items: flex-start; flex-direction: column; gap: 18px; }
          .primaryBtn { padding: 14px 19px; }
          .heroNote { margin-top: 38px; }
          .visualFrame { height: 390px; }
          .portraitCaption { left: 22px; bottom: 22px; }
          .stats { grid-template-columns: 1fr; }
          .stats div + div { border-left: 0; border-top: 1px solid #d7d0c8; }
          .programCard { grid-template-columns: 35px 1fr; gap: 12px; }
          .programCard h3 { font-size: 27px; }
          .finalCta { padding: 90px 20px; }
        }
      `}</style>
    </>
  );
}
