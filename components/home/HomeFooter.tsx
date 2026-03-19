import Link from 'next/link'
import styles from './HomeFooter.module.css'

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        ⚡ Tejas<span className={styles.gold}>AI</span> · Gurgaon, India
      </div>
      <div className={styles.links}>
        <a href="#products">Products</a>
        <Link href="/security">Ultra Secure Kit</Link>
        <a href="https://pub.dev/packages/ultra_secure_flutter_kit" target="_blank" rel="noreferrer">pub.dev</a>
        <a href="https://github.com/kanhiya3008/ultra_secure_flutter_kit" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:knhparmar@gmail.com">Contact</a>
      </div>
      <p className={styles.copy}>© 2025 TejasAI · Built with ❤️ in India</p>
    </footer>
  )
}
