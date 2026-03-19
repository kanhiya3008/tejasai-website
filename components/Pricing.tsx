'use client'
import { useState } from 'react'
import styles from './Pricing.module.css'

const FREE_FEATURES = [
  { text: 'Emulator & debugger detection', included: true },
  { text: 'Developer mode detection', included: true },
  { text: 'Screenshot protection', included: true },
  { text: 'App signature verification', included: true },
  { text: 'Install source check', included: true },
  { text: 'AES-256 secure storage', included: true },
  { text: 'Basic root detection', included: true },
  { text: '1 SSL certificate pin', included: true },
  { text: 'Monitor mode only (no blocking)', included: false },
  { text: 'No AI monitoring', included: false },
  { text: 'No Frida / RASP', included: false },
]

const PRO_FEATURES = [
  { text: 'Full root + jailbreak detection', included: true, bold: true },
  { text: 'Frida + Xposed detection', included: true },
  { text: 'MITM + proxy + VPN detection', included: true },
  { text: 'RASP — runtime self-protection', included: true },
  { text: 'App integrity checks', included: true },
  { text: 'Unlimited SSL certificates', included: true },
  { text: 'Biometric-protected vault', included: true },
  { text: 'Data TTL expiration', included: true },
  { text: 'AI behavior monitoring', included: true, bold: true },
  { text: 'Device risk scoring (0–100)', included: true },
  { text: 'Real-time threat stream', included: true },
  { text: 'Security metrics dashboard', included: true },
  { text: 'Strict mode — auto-block', included: true },
  { text: 'USB cable detection', included: true },
  { text: 'Email support — 48h response', included: true },
  { text: '3 app licenses', included: true },
]

const ENT_FEATURES = [
  { text: 'Unlimited app licenses', included: true, bold: true },
  { text: 'Custom security rules & policies', included: true },
  { text: 'White-label — remove branding', included: true },
  { text: 'OWASP compliance PDF report', included: true },
  { text: 'SLA documentation (fintech/BFSI)', included: true },
  { text: 'Agency reseller + revenue share', included: true },
  { text: 'Integration engineering support', included: true },
  { text: 'Dedicated Slack channel', included: true },
  { text: '4-hour response SLA', included: true },
  { text: 'Priority bug fixes', included: true },
]

type Feature = { text: string; included: boolean; bold?: boolean }

function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className={styles.featureList}>
      {features.map((f, i) => (
        <li key={i} className={styles.featItem}>
          <span className={f.included ? styles.checkYes : styles.checkNo}>
            {f.included ? '✓' : '—'}
          </span>
          <span className={f.bold ? styles.featBold : styles.featText}>{f.text}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const isAnnual = billing === 'annual'

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Pricing</p>
          <h2 className={styles.title}>
            Simple, transparent<br />
            <em>subscription pricing</em>
          </h2>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${!isAnnual ? styles.active : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`${styles.toggleBtn} ${isAnnual ? styles.active : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual
              {isAnnual && <span className={styles.saveBadge}>Save 25%</span>}
            </button>
          </div>
        </div>

        <div className={styles.grid}>

          {/* FREE */}
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <p className={styles.tierFree}>Free</p>
              <div className={styles.price}>
                <sup className={styles.curr}>₹</sup>
                <span className={styles.priceNum}>0</span>
              </div>
              <p className={styles.period}>forever · 1 app</p>
              <p className={styles.annualNote}>&nbsp;</p>
              <a href="#trial" className={`${styles.cta} ${styles.ctaFree}`}>
                Get started free
              </a>
            </div>
            <div className={styles.divider} />
            <div className={styles.cardBody}>
              <p className={styles.groupLabel}>Basic protection</p>
              <FeatureList features={FREE_FEATURES} />
            </div>
          </div>

          {/* PRO */}
          <div className={`${styles.card} ${styles.featured}`}>
            <div className={styles.featuredLabel}>MOST POPULAR</div>
            <div className={styles.cardTop}>
              <p className={styles.tierPro}>Pro</p>
              <div className={styles.price}>
                <sup className={`${styles.curr} ${styles.currPro}`}>₹</sup>
                <span className={`${styles.priceNum} ${styles.priceNumPro}`}>
                  {isAnnual ? '2,999' : '3,999'}
                </span>
              </div>
              <p className={styles.period}>
                {isAnnual ? 'per month · billed ₹35,988/year · 3 apps' : 'per month · 3 apps'}
              </p>
              <p className={styles.annualNote}>
                {isAnnual ? 'Save ₹11,988 vs monthly' : ' '}
              </p>
              <a href="#trial" className={`${styles.cta} ${styles.ctaPro}`}>
                Start 14-day free trial
              </a>
            </div>
            <div className={styles.divider} />
            <div className={styles.cardBody}>
              <p className={styles.groupLabel}>Everything in Free, plus</p>
              <FeatureList features={PRO_FEATURES} />
            </div>
          </div>

          {/* ENTERPRISE */}
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <p className={styles.tierEnt}>Enterprise</p>
              <div className={styles.price}>
                <span className={`${styles.priceNum} ${styles.priceNumEnt}`} style={{ fontSize: '28px' }}>
                  Custom
                </span>
              </div>
              <p className={styles.period}>unlimited apps · annual</p>
              <p className={styles.annualNote}>contact for pricing</p>
              <a
                href="mailto:knhparmar@gmail.com?subject=Enterprise Enquiry"
                className={`${styles.cta} ${styles.ctaEnt}`}
              >
                Talk to Kanhiya
              </a>
            </div>
            <div className={styles.divider} />
            <div className={styles.cardBody}>
              <p className={styles.groupLabel}>Everything in Pro, plus</p>
              <FeatureList features={ENT_FEATURES} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
