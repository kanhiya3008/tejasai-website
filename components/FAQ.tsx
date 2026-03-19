'use client'
import { useState } from 'react'
import styles from './FAQ.module.css'

const FAQS = [
  {
    q: 'How is this different from free pub.dev security packages?',
    a: 'Free packages like flutter_jailbreak_detection or http_certificate_pinning each solve one problem and require separate integration. UltraSecureKit combines 25 security checks in one dependency — plus AI monitoring, RASP, and enterprise support that free packages never offer.',
  },
  {
    q: 'Do I need to write native Android or iOS code?',
    a: 'No. The plugin handles all platform-specific implementation internally. You write pure Dart — it works on Android, iOS, Web, macOS, Linux, and Windows automatically.',
  },
  {
    q: 'What happens after my 14-day trial ends?',
    a: 'Your account automatically drops to the Free tier — 9 basic features remain active. Nothing breaks, no data is lost. Upgrade anytime to restore all Pro features. No credit card is charged without your action.',
  },
  {
    q: 'What counts as one app license?',
    a: 'One app license covers one unique Flutter project — identified by bundle ID (e.g. com.company.app). It covers both Android and iOS releases of the same app. Free plan gives 1 license, Pro gives 3, Enterprise is unlimited.',
  },
  {
    q: 'What if my app has no internet connection?',
    a: 'The plugin caches your license validation locally. If your device has no internet, the last valid license is used for up to 3 days — your app continues to work normally offline.',
  },
  {
    q: 'Is this compatible with Flutter 3.27+?',
    a: 'Yes. UltraSecureKit v1.2.0 is tested and maintained on Flutter 3.27+ across all 6 supported platforms. We update with every major Flutter release.',
  },
  {
    q: 'Can agencies use this for client projects?',
    a: 'Yes — the Enterprise plan includes an agency reseller deal with revenue share. You can bundle the plugin into client projects at a markup. Contact Kanhiya to discuss white-label and reseller terms.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, cancel anytime from your dashboard. Pro access continues until the end of the billing period. Annual plans are non-refundable after 14 days but you keep access for the full year.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Common questions</p>
          <h2 className={styles.title}>
            Everything you <em>need to know</em>
          </h2>
        </div>

        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <div key={i} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className={`${styles.icon} ${open === i ? styles.iconOpen : ''}`}>
                  +
                </span>
              </button>
              <div className={`${styles.answer} ${open === i ? styles.answerOpen : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
