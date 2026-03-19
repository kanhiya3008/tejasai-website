import styles from './Features.module.css'

const FEATURES = [
  {
    icon: '🛡️',
    iconBg: 'rgba(34,197,94,.1)',
    name: 'Root & jailbreak detection',
    desc: 'Detects rooted Android (Magisk, KingRoot, SuperSU) and jailbroken iOS (Cydia, Sileo). Configurable — block or just log.',
    tag: 'Free tier',
    tagClass: 'free',
  },
  {
    icon: '🔬',
    iconBg: 'rgba(56,189,248,.1)',
    name: 'Frida & Xposed detection',
    desc: 'Detects dynamic instrumentation tools attackers use to hook into your app at runtime and extract your business logic.',
    tag: 'Pro only',
    tagClass: 'pro',
  },
  {
    icon: '🤖',
    iconBg: 'rgba(245,158,11,.1)',
    name: 'AI behavior monitoring',
    desc: 'Machine learning detects abnormal usage — bot traffic, credential stuffing, and automated attacks in real time.',
    tag: 'Pro · New',
    tagClass: 'new',
  },
  {
    icon: '🔒',
    iconBg: 'rgba(56,189,248,.1)',
    name: 'SSL certificate pinning',
    desc: 'Pin your server certificates inside the app. Prevents MITM attacks even on compromised networks. Multi-cert support.',
    tag: '1 cert free · Unlimited Pro',
    tagClass: 'mixed',
  },
  {
    icon: '⚡',
    iconBg: 'rgba(192,132,252,.1)',
    name: 'RASP — Runtime protection',
    desc: 'Runtime Application Self-Protection. Your app detects and responds to attacks while running — no server needed.',
    tag: 'Pro only',
    tagClass: 'pro',
  },
  {
    icon: '🗄️',
    iconBg: 'rgba(34,197,94,.1)',
    name: 'AES-256 secure storage',
    desc: 'Encrypted key-value storage with optional biometric protection, TTL expiry, and auto-cleanup of sensitive data.',
    tag: 'Free tier',
    tagClass: 'free',
  },
  {
    icon: '🌐',
    iconBg: 'rgba(248,113,113,.1)',
    name: 'Network threat detection',
    desc: 'Real-time detection of VPN, proxy, and MITM attacks. Continuous network security monitoring with threat streaming.',
    tag: 'Pro only',
    tagClass: 'pro',
  },
  {
    icon: '🧬',
    iconBg: 'rgba(56,189,248,.1)',
    name: 'Anti-reverse engineering',
    desc: 'App signature verification, install source check, integrity validation. Detect tampered or repackaged APKs at runtime.',
    tag: 'Basic free · Full Pro',
    tagClass: 'mixed',
  },
  {
    icon: '📊',
    iconBg: 'rgba(245,158,11,.1)',
    name: 'Device risk scoring',
    desc: 'Comprehensive 0–100 risk score per device. Use it to require step-up authentication or block high-risk sessions.',
    tag: 'Pro only',
    tagClass: 'pro',
  },
]

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What you get</p>
        <h2 className={styles.title}>
          Everything your app needs<br />
          to stay <em>unbreakable</em>
        </h2>
        <p className={styles.sub}>
          9 security modules covering every attack vector — from device-level
          threats to network interception to runtime manipulation.
        </p>

        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.cell}>
              <div className={styles.icon} style={{ background: f.iconBg }}>
                {f.icon}
              </div>
              <p className={styles.name}>{f.name}</p>
              <p className={styles.desc}>{f.desc}</p>
              <span className={`${styles.tag} ${styles[f.tagClass]}`}>{f.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
