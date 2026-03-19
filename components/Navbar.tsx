'use client'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <div className={styles.shield}>🔐</div>
        UltraSecure<span className={styles.accent}>Kit</span>
      </Link>

      <div className={styles.links}>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#compare">Compare</a>
        <a href="#faq">FAQ</a>
        <a href="https://pub.dev/packages/ultra_secure_flutter_kit" target="_blank" rel="noreferrer">
          Docs
        </a>
      </div>

      <a href="#trial" className={styles.cta}>Start free trial</a>
    </nav>
  )
}
