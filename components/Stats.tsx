import styles from './Stats.module.css'

const STATS = [
  { num: '25+', label: 'Security modules' },
  { num: '6',   label: 'Platforms' },
  { num: 'OWASP', label: 'Top 10 covered' },
  { num: '3 min', label: 'Integration time' },
  { num: '0', label: 'Native code needed' },
]

export default function Stats() {
  return (
    <div className={styles.stats}>
      {STATS.map((s, i) => (
        <div key={i} className={styles.stat}>
          <div className={styles.num}>{s.num}</div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
