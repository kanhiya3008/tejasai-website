import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.glow} />

      <div className={styles.badge}>
        <span className={styles.dollar}>$</span>
        flutter pub add ultra_secure_flutter_kit
        <span className={styles.cursor}>_</span>
      </div>

      <h1 className={styles.h1}>
        Ship Flutter apps that<br />
        <em>can&apos;t be hacked.</em><br />
        <span>Ship with confidence.</span>
      </h1>

      <p className={styles.sub}>
        The only Flutter security plugin with RASP, Frida detection,
        AI-powered threat monitoring, SSL pinning and anti-reverse
        engineering — in a single pub.dev import.
      </p>

      <div className={styles.actions}>
        <a href="#trial" className={styles.btnPrimary}>Start 14-day free trial</a>
        <a
          href="https://pub.dev/packages/ultra_secure_flutter_kit"
          target="_blank"
          rel="noreferrer"
          className={styles.btnGhost}
        >
          View on pub.dev →
        </a>
      </div>

      <div className={styles.codeBlock}>
        <div className={styles.codeBar}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
          <span className={styles.fileName}>main.dart</span>
        </div>
        <pre className={styles.code}>{`await UltraSecureFlutterKit().initializeSecureMonitor(
  SecurityConfig(
    mode: SecurityMode.strict,
    enableSSLPinning: true,
    enableBehaviorMonitoring: true,
  ),
  licenseKey: 'USK-XXXX-XXXX-XXXX',
);
// ✓ All 25 security modules active`}</pre>
      </div>
    </section>
  )
}
