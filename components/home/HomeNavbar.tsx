'use client'
import Link from 'next/link'
import styles from './HomeNavbar.module.css'

export default function HomeNavbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <div className={styles.mark}>T</div>
        <span className={styles.text}>Tejas<span className={styles.gold}>AI</span></span>
      </Link>

      <div className={styles.links}>
        <a href="#products">Products</a>
        <a href="#coming-soon">Coming soon</a>
        <a href="#contact">Contact</a>
      </div>

      <a href="#contact" className={styles.cta}>GET IN TOUCH</a>
    </nav>
  )
}
