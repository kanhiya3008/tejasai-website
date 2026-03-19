'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './Products.module.css'

/* ── Visual panels for each product ── */
function SecurityVisual() {
  return (
    <div className={`${styles.visual} ${styles.vSecurity}`}>
      <div className={`${styles.vGlow}`} style={{ background: '#38bdf8' }} />
      <p className={styles.vTitle}>LIVE THREAT DASHBOARD</p>
      <div className={styles.metrics}>
        {[
          { label: 'Root detection',  pct: 92, color: '#38bdf8', val: 'Active' },
          { label: 'Frida detection', pct: 87, color: '#a78bfa', val: 'Scanning' },
          { label: 'Risk score',      pct: 12, color: '#22c55e', val: 'Low — 12/100' },
        ].map(m => (
          <div key={m.label} className={styles.metric}>
            <div className={styles.metricLabel}>{m.label}</div>
            <div className={styles.bar}><div className={styles.fill} style={{ width: `${m.pct}%`, background: m.color }} /></div>
            <div className={styles.metricVal} style={{ color: m.color }}>{m.val}</div>
          </div>
        ))}
      </div>
      <div className={styles.pills}>
        {[
          { color: '#22c55e', label: 'SSL pinned' },
          { color: '#38bdf8', label: 'RASP active' },
          { color: '#a78bfa', label: 'AI monitoring' },
        ].map(p => (
          <div key={p.label} className={styles.pill} style={{ background: p.color + '18', color: p.color }}>
            <span className={styles.pillDot} style={{ background: p.color }} />
            {p.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function AdvisorVisual() {
  return (
    <div className={`${styles.visual} ${styles.vAdvisor}`}>
      <div className={styles.vGlow} style={{ background: '#22c55e' }} />
      <p className={styles.vTitle}>AI INSURANCE ADVISOR</p>
      <div className={styles.chatBubble} style={{ borderColor: 'rgba(34,197,94,.15)' }}>
        <p className={styles.chatRole} style={{ color: 'var(--t-text3)' }}>USER QUERY</p>
        <p className={styles.chatText}>&ldquo;What plan covers my parents above 60 with pre-existing conditions?&rdquo;</p>
      </div>
      <div className={styles.chatBubble} style={{ background: 'rgba(34,197,94,.05)', borderColor: 'rgba(34,197,94,.2)' }}>
        <p className={styles.chatRole} style={{ color: '#22c55e' }}>AI ADVISOR</p>
        <p className={styles.chatText}>Based on your query, Care Shield Plus covers pre-existing conditions after 2 years with no age limit...</p>
      </div>
      <div className={styles.pills} style={{ marginTop: '10px' }}>
        <div className={styles.pill} style={{ background: 'rgba(34,197,94,.1)', color: '#22c55e' }}><span className={styles.pillDot} style={{ background: '#22c55e' }} />RAG pipeline</div>
        <div className={styles.pill} style={{ background: 'rgba(255,184,0,.1)', color: 'var(--t-gold)' }}><span className={styles.pillDot} style={{ background: 'var(--t-gold)' }} />LLaMA 3</div>
      </div>
    </div>
  )
}

function ParkingVisual() {
  const slots = [true, true, false, true, false, false, true, true, null, true]
  return (
    <div className={`${styles.visual} ${styles.vParking}`}>
      <div className={styles.vGlow} style={{ background: '#fb923c' }} />
      <p className={styles.vTitle}>PARKING AVAILABILITY</p>
      <div className={styles.parkGrid}>
        {slots.map((s, i) => (
          <div key={i} className={styles.slot} style={{
            background: s === null ? 'rgba(255,184,0,.15)' : s ? 'rgba(34,197,94,.15)' : 'rgba(248,113,113,.15)',
            borderColor: s === null ? 'rgba(255,184,0,.3)' : s ? 'rgba(34,197,94,.3)' : 'rgba(248,113,113,.3)',
          }} />
        ))}
      </div>
      <div className={styles.metric}>
        <div className={styles.metricLabel}>Slots available</div>
        <div className={styles.bar}><div className={styles.fill} style={{ width: '60%', background: '#22c55e' }} /></div>
        <div className={styles.metricVal} style={{ color: '#22c55e' }}>6 / 10 free</div>
      </div>
      <div className={styles.pills}>
        <div className={styles.pill} style={{ background: 'rgba(34,197,94,.1)', color: '#22c55e' }}><span className={styles.pillDot} style={{ background: '#22c55e' }} />Available</div>
        <div className={styles.pill} style={{ background: 'rgba(248,113,113,.1)', color: '#f87171' }}><span className={styles.pillDot} style={{ background: '#f87171' }} />Occupied</div>
        <div className={styles.pill} style={{ background: 'rgba(255,184,0,.1)', color: 'var(--t-gold)' }}><span className={styles.pillDot} style={{ background: 'var(--t-gold)' }} />Reserved</div>
      </div>
    </div>
  )
}

function PartyVisual() {
  return (
    <div className={`${styles.visual} ${styles.vParty}`}>
      <div className={styles.vGlow} style={{ background: '#a78bfa' }} />
      <p className={styles.vTitle}>PARTY ORDER TRACKER</p>
      {[
        { icon: '🎂', label: 'Customised cake',   pct: 85,  color: '#a78bfa', val: '85%' },
        { icon: '🎈', label: 'Balloon decoration', pct: 100, color: 'var(--t-gold)', val: 'Done' },
        { icon: '🍕', label: 'Food catering',      pct: 40,  color: '#fb923c', val: 'On way' },
      ].map(item => (
        <div key={item.label} className={styles.orderRow}>
          <div className={styles.orderIcon}>{item.icon}</div>
          <div className={styles.orderInfo}>
            <div className={styles.metricLabel}>{item.label}</div>
            <div className={styles.bar} style={{ marginTop: '4px' }}><div className={styles.fill} style={{ width: `${item.pct}%`, background: item.color }} /></div>
          </div>
          <div className={styles.metricVal} style={{ color: item.color, minWidth: '48px', textAlign: 'right' }}>{item.val}</div>
        </div>
      ))}
      <div className={styles.pills} style={{ marginTop: '10px' }}>
        <div className={styles.pill} style={{ background: 'rgba(167,139,250,.1)', color: '#a78bfa' }}><span className={styles.pillDot} style={{ background: '#a78bfa' }} />3 vendors</div>
        <div className={styles.pill} style={{ background: 'rgba(34,197,94,.1)', color: '#22c55e' }}><span className={styles.pillDot} style={{ background: '#22c55e' }} />On track</div>
      </div>
    </div>
  )
}

/* ── Product data ── */
const PRODUCTS = [
  {
    num: '01 / 04',
    badge: '🛡️ Security SaaS · Live',
    badgeColor: '#38bdf8',
    name: 'Ultra Secure\nFlutter Kit',
    desc: 'Enterprise-grade Flutter security plugin. RASP, Frida detection, AI-powered threat monitoring, SSL pinning — all in one pub.dev import.',
    features: [
      'Root & jailbreak detection (Android + iOS)',
      'Frida, Xposed & reverse engineering protection',
      'AI-powered behavior monitoring & risk scoring',
      'MITM, VPN & proxy detection',
    ],
    accent: '#38bdf8',
    actions: [
      { label: 'View on pub.dev', href: 'https://pub.dev/packages/ultra_secure_flutter_kit', primary: true, external: true },
      { label: 'Get Pro license →', href: '/security', primary: false, external: false },
    ],
    Visual: SecurityVisual,
    reverse: false,
  },
  {
    num: '02 / 04',
    badge: '🏥 InsurTech AI · Beta',
    badgeColor: '#22c55e',
    name: 'Care AI\nAdvisor',
    desc: 'AI-powered insurance advisory platform for B2B. RAG-based chatbot answers complex insurance queries using your policy documents instantly.',
    features: [
      'RAG pipeline with ChromaDB + LLaMA 3',
      'PDF policy document ingestion & search',
      'Lead capture CRM dashboard',
      'KYC document upload + verification',
    ],
    accent: '#22c55e',
    actions: [
      { label: 'Request demo', href: '#contact', primary: true, external: false },
      { label: 'Learn more →', href: '#contact', primary: false, external: false },
    ],
    Visual: AdvisorVisual,
    reverse: true,
  },
  {
    num: '03 / 04',
    badge: '🅿️ Smart Parking · Coming Soon',
    badgeColor: '#fb923c',
    name: 'ParkSmart\nAI',
    desc: 'AI-powered smart parking platform. Find, book, and pay for parking spots in real time. Works for malls, offices, residential societies.',
    features: [
      'Real-time slot availability detection',
      'AI demand forecasting & dynamic pricing',
      'Flutter app — user + operator + admin',
      'Razorpay payments + QR access gates',
    ],
    accent: '#fb923c',
    actions: [
      { label: 'Join waitlist', href: '#contact', primary: true, external: false },
      { label: 'Partner with us →', href: '#contact', primary: false, external: false },
    ],
    Visual: ParkingVisual,
    reverse: false,
  },
  {
    num: '04 / 04',
    badge: '🎉 Party Platform · Coming Soon',
    badgeColor: '#a78bfa',
    name: 'PartyCombo\nDelivery',
    desc: 'One-stop party planning and delivery platform. Curated combos of cake, balloons, decorations, and food — delivered to your door.',
    features: [
      'User + vendor + super admin Flutter apps',
      'Curated party bundle marketplace',
      'AI-powered combo recommendations',
      'Real-time order tracking & vendor payout',
    ],
    accent: '#a78bfa',
    actions: [
      { label: 'Join waitlist', href: '#contact', primary: true, external: false },
      { label: 'Become a vendor →', href: '#contact', primary: false, external: false },
    ],
    Visual: PartyVisual,
    reverse: true,
  },
]

export default function Products() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)'
        }
      }),
      { threshold: 0.08 }
    )
    cardRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Our products</p>
        <h2 className={styles.title}>Four products.<br /><em>One mission.</em></h2>
        <p className={styles.sub}>Each product solves a specific real-world problem using AI, Flutter, and modern cloud infrastructure.</p>

        <div className={styles.grid}>
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              className={`${styles.card} ${p.reverse ? styles.reverse : ''}`}
              style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity .6s ease, transform .6s ease', ['--accent' as string]: p.accent }}
            >
              {/* Left / content side */}
              <div className={styles.content}>
                <p className={styles.num}>{p.num}</p>
                <div className={styles.badge} style={{ background: p.accent + '18', color: p.accent, borderColor: p.accent + '30' }}>
                  {p.badge}
                </div>
                <h3 className={styles.name} style={{ ['--accent' as string]: p.accent }}>
                  {p.name.split('\n').map((line, j) => <span key={j}>{line}{j === 0 && <br />}</span>)}
                </h3>
                <p className={styles.desc}>{p.desc}</p>
                <ul className={styles.features}>
                  {p.features.map(f => (
                    <li key={f} className={styles.feat}>
                      <span className={styles.dot} style={{ background: p.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={styles.actions}>
                  {p.actions.map(a =>
                    a.external ? (
                      <a key={a.label} href={a.href} target="_blank" rel="noreferrer"
                        className={`${styles.btn} ${a.primary ? styles.btnPrimary : styles.btnSecondary}`}
                        style={a.primary ? { background: p.accent, borderColor: p.accent } : { color: p.accent, borderColor: p.accent + '50' }}>
                        {a.label}
                      </a>
                    ) : (
                      <Link key={a.label} href={a.href}
                        className={`${styles.btn} ${a.primary ? styles.btnPrimary : styles.btnSecondary}`}
                        style={a.primary ? { background: p.accent, borderColor: p.accent } : { color: p.accent, borderColor: p.accent + '50' }}>
                        {a.label}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Right / visual side */}
              <p.Visual />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
