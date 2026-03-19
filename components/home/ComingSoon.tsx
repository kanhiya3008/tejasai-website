import styles from './ComingSoon.module.css'

const UPCOMING = [
  {
    icon: '🏥',
    name: 'HealthAI Scanner',
    desc: 'AI-powered medical report analysis. Upload your reports and get plain-language explanations instantly.',
    tag: 'Q2 2025',
    color: '#38bdf8',
  },
  {
    icon: '📊',
    name: 'FinTrack India',
    desc: 'Personal finance tracker for Indians. GST-aware expense categorisation with AI insights and tax estimates.',
    tag: 'Q3 2025',
    color: '#22c55e',
  },
  {
    icon: '🏫',
    name: 'Society Manager',
    desc: 'Residential society management — guards, residents, admin — with digital visitor logs and maintenance tracking.',
    tag: 'Q3 2025',
    color: '#ffb800',
  },
]

export default function ComingSoon() {
  return (
    <section id="coming-soon" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What&apos;s coming</p>
        <h2 className={styles.title}>More products<br /><em>in the pipeline</em></h2>

        <div className={styles.grid}>
          {UPCOMING.map(u => (
            <div key={u.name} className={styles.card}>
              <div className={styles.corner} style={{ background: u.color }} />
              <div className={styles.icon}>{u.icon}</div>
              <h3 className={styles.name}>{u.name}</h3>
              <p className={styles.desc}>{u.desc}</p>
              <span
                className={styles.tag}
                style={{ color: u.color, borderColor: u.color + '40', background: u.color + '10' }}
              >
                {u.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
