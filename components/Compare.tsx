import styles from './Compare.module.css'

const ROWS = [
  { group: 'Device & environment security' },
  { feat: 'Root / jailbreak detection', free: 'basic', pro: true, ent: true },
  { feat: 'Emulator detection',          free: true,    pro: true, ent: true },
  { feat: 'Debugger detection',          free: true,    pro: true, ent: true },
  { feat: 'Developer mode detection',    free: true,    pro: true, ent: true },
  { feat: 'Screenshot protection',       free: true,    pro: true, ent: true },
  { feat: 'USB cable detection',         free: false,   pro: true, ent: true },
  { group: 'Network protection' },
  { feat: 'SSL / certificate pinning',   free: '1 cert', pro: true, ent: true },
  { feat: 'MITM attack detection',       free: false,    pro: true, ent: true },
  { feat: 'Proxy + VPN detection',       free: false,    pro: true, ent: true },
  { feat: 'Real-time network monitoring',free: false,    pro: true, ent: true },
  { group: 'Anti-reverse engineering' },
  { feat: 'App signature verification',  free: true,  pro: true, ent: true },
  { feat: 'Frida detection',             free: false, pro: true, ent: true },
  { feat: 'Xposed / LSposed detection',  free: false, pro: true, ent: true },
  { feat: 'RASP — anti-tampering',       free: false, pro: true, ent: true },
  { feat: 'App integrity checks',        free: false, pro: true, ent: true },
  { group: 'AI & monitoring' },
  { feat: 'AI behavior monitoring',      free: false, pro: true, ent: true },
  { feat: 'Device risk scoring (0–100)', free: false, pro: true, ent: true },
  { feat: 'Real-time threat stream',     free: false, pro: true, ent: true },
  { feat: 'Security metrics dashboard',  free: false, pro: true, ent: true },
  { group: 'Enterprise' },
  { feat: 'Custom security rules',       free: false, pro: false, ent: true },
  { feat: 'White-label',                 free: false, pro: false, ent: true },
  { feat: 'OWASP compliance report',     free: false, pro: false, ent: true },
  { feat: 'SLA documentation',           free: false, pro: false, ent: true },
  { group: 'Support & limits' },
  { feat: 'App licenses', free: '1 app', pro: '3 apps', ent: 'Unlimited' },
  { feat: 'Support',      free: 'Community', pro: 'Email 48h', ent: 'Slack direct' },
  { feat: 'Security mode', free: 'Monitor', pro: 'Strict', ent: 'Full control' },
]

function Cell({ val }: { val: boolean | string }) {
  if (val === true)  return <span className={styles.yes}>✓</span>
  if (val === false) return <span className={styles.no}>—</span>
  if (val === 'basic') return <span className={styles.partial}>Basic</span>
  if (val === '1 cert') return <span className={styles.partial}>1 cert</span>
  return <span className={styles.text}>{val}</span>
}

export default function Compare() {
  return (
    <section id="compare" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Feature comparison</p>
        <h2 className={styles.title}>See exactly <em>what you get</em></h2>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thFeat}>Feature</th>
                <th>Free</th>
                <th className={styles.thPro}>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                if ('group' in row) {
                  return (
                    <tr key={i} className={styles.groupRow}>
                      <td colSpan={4}>{row.group}</td>
                    </tr>
                  )
                }
                return (
                  <tr key={i} className={styles.dataRow}>
                    <td className={styles.featName}>{row.feat}</td>
                    <td><Cell val={row.free!} /></td>
                    <td><Cell val={row.pro!} /></td>
                    <td><Cell val={row.ent!} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
