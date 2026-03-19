import styles from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.dots} />
      <div className={styles.glow} />

      <div className={styles.badge}>
        <div className={styles.badgeDot}>✦</div>
        Building AI-powered products from India
      </div>

      <p className={styles.eyebrow}>Tejas AI · Est. 2024 · Gurgaon, India</p>

      <h1 className={styles.h1}>
        Products built<br />
        with <span className={styles.gold}>intelligence.</span><br />
        <em className={styles.dim}>Shipped with purpose.</em>
      </h1>

      <p className={styles.sub}>
        We build AI-powered SaaS products that solve real problems —
        from securing Flutter apps to simplifying insurance, parking, and deliveries.
      </p>

      <div className={styles.actions}>
        <a href="#products" className={styles.btnGold}>Explore products</a>
        <a href="#contact" className={styles.btnOutline}>Contact us →</a>
      </div>

      <div className={styles.stats}>
        {[
          { n: '4',    l: 'Products' },
          { n: '6',    l: 'Platforms' },
          { n: '25+',  l: 'AI features' },
          { n: '100%', l: 'Made in India' },
        ].map(s => (
          <div key={s.l} className={styles.stat}>
            <div className={styles.statN}>{s.n}</div>
            <div className={styles.statL}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
