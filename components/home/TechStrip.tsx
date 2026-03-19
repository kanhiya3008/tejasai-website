import styles from './TechStrip.module.css'

const ITEMS = [
  { icon: '⚡', label: 'Flutter' },
  { icon: '🤖', label: 'FastAPI' },
  { icon: '🧠', label: 'LLaMA 3' },
  { icon: '🗄️', label: 'Supabase' },
  { icon: '🔗', label: 'ChromaDB' },
  { icon: '🛡️', label: 'RASP' },
  { icon: '📡', label: 'RAG Pipeline' },
  { icon: '🌐', label: 'Next.js' },
  { icon: '🚀', label: 'Railway' },
  { icon: '💳', label: 'Razorpay' },
  { icon: '🔐', label: 'AES-256' },
  { icon: '📱', label: 'Android & iOS' },
]

export default function TechStrip() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className={styles.strip}>
      <div className={styles.scroll}>
        {doubled.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
