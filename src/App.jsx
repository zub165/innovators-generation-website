import { useEffect, useMemo, useState } from 'react'
import hero1 from './assets/hero-1.png'
import hero2 from './assets/hero-2.png'
import hero3 from './assets/hero-3.png'
import hero4 from './assets/hero-4.png'
import hero5 from './assets/hero-5.png'
import hero6 from './assets/hero-6.png'
import './App.css'

function App() {
  const heroImages = useMemo(
    () => [hero1, hero2, hero3, hero4, hero5, hero6],
    [],
  )
  const [heroIdx, setHeroIdx] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIdx((i) => (i + 1) % heroImages.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [heroImages.length])

  const products = [
    {
      name: 'Doctor Schedule Manager',
      tagline: 'AI-powered medical staff scheduling',
      href: 'https://schedulemygroup.com/#settings',
    },
    {
      name: 'Doctor On Call',
      tagline: 'On-call coverage and workflow',
      href: 'https://docsoncalls.com/',
    },
    {
      name: 'ER Wait Time',
      tagline: 'Modular frontend with AI chat',
      href: 'https://mywaitime.com/#chat',
    },
  ]

  return (
    <div className="page">
      <header className="header">
        <div className="headerInner">
          <a className="brand" href="/" aria-label="Innovators Generation home">
            Innovators Generation
          </a>
          <nav className="nav">
            <a className="navLink" href="#products">
              Products
            </a>
            <a className="navLink" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="hero" aria-label="Hero">
          <div className="heroMedia" aria-hidden="true">
            {heroImages.map((src, idx) => (
              <div
                key={src}
                className={`heroSlide ${idx === heroIdx ? 'isActive' : ''}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
            <div className="heroOverlay" />
          </div>
          <div className="heroInner">
            <p className="kicker">Empowering Future Innovators</p>
            <h1 className="headline">Built products. Real impact.</h1>
            <p className="subhead">
              We build focused web apps for healthcare workflows—scheduling,
              on-call coverage, and real-time patient experience.
            </p>
            <div className="heroCtas">
              <a className="btn btnPrimary" href="#products">
                View products
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

            <div className="heroDots" role="tablist" aria-label="Hero images">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`heroDot ${idx === heroIdx ? 'isActive' : ''}`}
                  aria-label={`Show hero image ${idx + 1}`}
                  aria-pressed={idx === heroIdx}
                  onClick={() => setHeroIdx(idx)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Products</h2>
            <p className="sectionDesc">
              Quick access to our live applications.
            </p>
          </div>

          <div className="grid" role="list">
            {products.map((p) => (
              <article key={p.href} className="card" role="listitem">
                <div className="cardTop">
                  <h3 className="cardTitle">{p.name}</h3>
                  <p className="cardTagline">{p.tagline}</p>
                </div>
                <div className="cardBottom">
                  <a
                    className="cardLink"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open ${p.name}`}
                  >
                    Open product
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Contact</h2>
            <p className="sectionDesc">
              Want a demo, customization, or a new product build?
            </p>
          </div>

          <div className="contactBox">
            <div className="contactText">
              <p className="contactLead">Drop us a line.</p>
              <p className="contactHint">
                Share what you need and we’ll respond with the fastest path to
                launch.
              </p>
            </div>
            <div className="contactActions">
              <a className="btn btnPrimary" href="#products">
                See products
              </a>
              <a className="btn btnGhost" href="mailto:hello@innovatorsgeneration.com">
                Email us
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footerText">
          © {new Date().getFullYear()} Innovators Generation. All rights
          reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
