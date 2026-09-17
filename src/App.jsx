import { useEffect, useRef, useState } from 'react'
import hero1 from './assets/hero-1.png'
import hero3 from './assets/hero-3.png'
import hero6 from './assets/hero-6.png'
import './App.css'

function Icon({ name, size = 22 }) {
  const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  const paths = {
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M8 2v4M16 2v4M3 9h18" />
      </>
    ),
    chat: (
      <>
        <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12z" />
        <path d="M8.5 10.5h7M8.5 13.5h4" />
      </>
    ),
    pulse: <path d="M3 12h4l2-6 4 12 2-6h6" />,
    spark: (
      <>
        <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z" />
        <path d="M18.5 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" />
      </>
    ),
    zap: <path d="M13 2 3 14h7l-1 8 11-13h-7l1-7z" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.6 2.6 3.9 5.7 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.7-3.9-9s1.3-6.4 3.9-9z" />
      </>
    ),
    check: <path d="M4 12.5 9.5 18 20 6.5" />,
    play: <path d="M5 3.2 17.5 12 5 20.8V3.2z" fill="currentColor" stroke="none" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...strokeProps}>
      {paths[name]}
    </svg>
  )
}

function Reveal({ children, delay = 0, className = '', from = 'up' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -48px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal reveal-${from} ${shown ? 'isVis' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function useCountUp(target) {
  const elRef = useRef(null)
  const [value, setValue] = useState(0)
  const fired = useRef(false)
  useEffect(() => {
    const el = elRef.current
    let raf = 0
    if (!el || fired.current) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        fired.current = true
        const start = performance.now()
        const duration = 1500
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(target * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        io.disconnect()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])
  return { elRef, value }
}

function StatItem({ stat }) {
  const { elRef, value } = useCountUp(stat.value)
  return (
    <div className="stat" ref={elRef}>
      <span className="statValue">
        {value}
        <span className="statSuffix">{stat.suffix}</span>
      </span>
      <span className="statLabel">{stat.label}</span>
    </div>
  )
}

const STATS = [
  { value: 3, suffix: '', label: 'Live products' },
  { value: 24, suffix: '/7', label: 'On-call support' },
  { value: 100, suffix: '%', label: 'US-based team' },
]

const MARQUEE = [
  'Healthcare workflows',
  'AI-assisted scheduling',
  'On-call coverage',
  'Real-time waiting times',
  'Patient experience',
  'Fast product launches',
]

const products = [
  {
    name: 'Doctor Schedule Manager',
    tagline: 'AI-powered medical staff scheduling',
    desc: 'Plan and assign shifts with AI assistance, availability insights, and coverage you can trust.',
    href: 'https://schedulemygroup.com/#settings',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.doctorschedule.app',
    icon: 'calendar',
    features: ['AI-assisted shift scheduling', 'Staff availability views', 'Settings-driven workflow'],
  },
  {
    name: 'Doctor On Call',
    tagline: 'On-call coverage and workflow',
    desc: 'Keep call rotations moving with structured coverage, clear handoffs, and minimal friction.',
    href: 'https://docsoncalls.com/',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.doctoroncall.emr',
    icon: 'chat',
    features: ['Structured call rotations', 'Coverage handoff flows', 'Team-wide visibility'],
  },
  {
    name: 'ER Wait Time',
    tagline: 'Real-time patient experience, AI chat',
    desc: 'Give patients live wait-time clarity plus an AI chat that answers questions instantly.',
    href: 'https://mywaitime.com/#chat',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.easytechnologiez.ERTime',
    icon: 'pulse',
    features: ['Live wait-time estimates', 'AI chat for common questions', 'Patient-first design'],
  },
]

const values = [
  {
    icon: 'pulse',
    title: 'Healthcare-focused',
    text: 'Specialized modules for scheduling, on-call coverage, and patient experience.',
  },
  {
    icon: 'spark',
    title: 'AI built in',
    text: 'AI-assisted scheduling and conversational help woven into every workflow.',
  },
  {
    icon: 'zap',
    title: 'Fast to launch',
    text: 'Modular frontends that ship quickly and plug into existing operations.',
  },
  {
    icon: 'globe',
    title: 'US-based support',
    text: 'Direct email support from our US-based team with a personal touch.',
  },
]

const process = [
  { step: '01', title: 'Discover', text: 'We map your workflow and pinpoint the friction.' },
  { step: '02', title: 'Design', text: 'We shape an interface that users actually want.' },
  { step: '03', title: 'Deploy', text: 'We ship fast and refine with real usage.' },
]

function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="wrap headerInner">
          <a className="brand" href="/" aria-label="Innovators Generation home">
            <span className="brandMark" aria-hidden="true" />
            Innovators Generation
          </a>
          <nav className="nav" aria-label="Primary">
            <a className="navLink" href="#products">
              Products
            </a>
            <a className="navLink" href="#why">
              Why us
            </a>
            <a className="navLink" href="#process">
              Process
            </a>
            <a className="navLink" href="#contact">
              Contact
            </a>
          </nav>
          <a className="navCta" href="#contact">
            Get in touch
          </a>
        </div>
      </header>

      <main className="main">
        <section className="hero" id="home">
          <div className="heroBg" aria-hidden="true">
            <span className="blob blobA" />
            <span className="blob blobB" />
            <span className="blob blobC" />
            <span className="heroGrid" />
          </div>
          <div className="wrap heroInner">
            <div className="heroCopy">
              <Reveal>
                <span className="kicker">
                  <span className="kickerDot" />
                  Empowering Future Innovators
                </span>
              </Reveal>
              <Reveal delay={90}>
                <h1 className="headline">
                  Built products.
                  <br />
                  <span className="headlineGrad">Real impact.</span>
                </h1>
              </Reveal>
              <Reveal delay={180}>
                <p className="subhead">
                  We build focused web apps for healthcare workflows — scheduling, on-call coverage,
                  and real-time patient experience.
                </p>
              </Reveal>
              <Reveal delay={270}>
                <div className="heroCtas">
                  <a className="btn btnPrimary" href="#products">
                    View products
                    <Icon name="zap" size={15} />
                  </a>
                  <a
                    className="btn btnGhost"
                    href="https://mywaitime.com/#chat"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open ER Wait Time
                  </a>
                </div>
              </Reveal>
              <Reveal delay={360}>
                <div className="heroStats">
                  {STATS.map((stat) => (
                    <StatItem key={stat.label} stat={stat} />
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="heroStage" aria-hidden="true">
              <span className="stageGlow" />
              <figure className="floatCard floatCardMain">
                <img src={hero1} alt="" />
                <figcaption className="chipLabel">
                  Doctor Schedule Manager
                  <span className="chipPulse" />
                </figcaption>
              </figure>
              <figure className="floatCard floatCardOne">
                <img src={hero6} alt="" />
                <figcaption className="chipLabel">ER Wait Time</figcaption>
              </figure>
              <figure className="floatCard floatCardTwo">
                <img src={hero3} alt="" />
                <figcaption className="chipLabel">Doctor On Call</figcaption>
              </figure>
            </div>
          </div>

          <a className="scrollCue" href="#products" aria-label="Scroll to products">
            <span className="scrollCueMouse" />
          </a>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marqueeTrack">
            {Array.from({ length: 2 }).map((_, r) => (
              <div className="marqueeGroup" key={r}>
                {MARQUEE.map((item) => (
                  <span key={item}>
                    {item}
                    <i className="marqueeDot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="section" id="products">
          <div className="wrap">
            <Reveal className="sectionHead">
              <span className="eyebrow">Products</span>
              <h2 className="sectionTitle">Live, in production.</h2>
              <p className="sectionDesc">
                Three focused web apps used by healthcare teams today.
              </p>
            </Reveal>
            <div className="productGrid">
              {products.map((product, index) => (
                <Reveal key={product.name} delay={index * 120} className="cardSlot">
                  <article className={`cardWrap c${index + 1}`}>
                    <div className="cardInner">
                      <div className="cardTop">
                        <span className="cardIcon">
                          <Icon name={product.icon} />
                        </span>
                        <span className="cardBadge">Web app</span>
                      </div>
                      <h3 className="cardTitle">{product.name}</h3>
                      <p className="cardTagline">{product.tagline}</p>
                      <p className="cardDesc">{product.desc}</p>
                      <ul className="cardFeatures">
                        {product.features.map((feature) => (
                          <li key={feature}>
                            <span className="check">
                              <Icon name="check" size={12} />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="cardActions">
                        <a
                          className="cardLink"
                          href={product.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`Open ${product.name} web app`}
                        >
                          Open web app
                          <span className="arrow">→</span>
                        </a>
                        <a
                          className="cardLink cardLinkStore"
                          href={product.storeUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${product.name} on Google Play`}
                        >
                          <Icon name="play" size={15} />
                          Google Play
                          <span className="arrow">→</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section sectionTint" id="why">
          <div className="wrap">
            <Reveal className="sectionHead">
              <span className="eyebrow">Why Innovators Generation</span>
              <h2 className="sectionTitle">Built for real workflows.</h2>
              <p className="sectionDesc">
                Everything we ship pulls its weight in day-to-day operations.
              </p>
            </Reveal>
            <div className="valueGrid">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={index * 100} className="valueSlot">
                  <article className={`valueCard v${index + 1}`}>
                    <span className="valueIcon">
                      <Icon name={value.icon} />
                    </span>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="wrap">
            <Reveal className="sectionHead">
              <span className="eyebrow">Process</span>
              <h2 className="sectionTitle">From idea to launch.</h2>
              <p className="sectionDesc">A simple path we follow with every product.</p>
            </Reveal>
            <div className="processGrid">
              {process.map((item, index) => (
                <Reveal key={item.step} delay={index * 110} className="processSlot">
                  <article className="processCard">
                    <span className="processNum">{item.step}</span>
                    <h3 className="processTitle">{item.title}</h3>
                    <p className="processText">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section sectionTint" id="contact">
          <div className="wrap">
            <Reveal className="contactPanel">
              <span className="panelGlow" />
              <div className="contactCopy">
                <span className="eyebrow">Contact</span>
                <h2 className="contactTitle">Drop us a line.</h2>
                <p className="contactText">
                  Share what you need and we&apos;ll respond with the fastest path to launch.
                </p>
                <div className="contactActions">
                  <a className="btn btnPrimary" href="mailto:admin@innovatorsgeneration.com">
                    Email us
                    <Icon name="chat" size={15} />
                  </a>
                  <a className="btn btnGhost" href="#products">
                    See products
                  </a>
                </div>
                <div className="contactMails">
                  <a href="mailto:admin@innovatorsgeneration.com">admin@innovatorsgeneration.com</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footerInner">
          <nav className="footerLegal" aria-label="Legal">
            <a href="/privacy.html">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="/support.html">Support</a>
            <span aria-hidden="true">·</span>
            <a href="/delete.html">Delete Account</a>
          </nav>
          <p className="footerText">© {new Date().getFullYear()} Innovators Generation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App