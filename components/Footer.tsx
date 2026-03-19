import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        🔐 Ultra<span className={styles.accent}>Secure</span>FlutterKit
      </div>
      <div className={styles.links}>
        <a href="https://pub.dev/packages/ultra_secure_flutter_kit" target="_blank" rel="noreferrer">pub.dev</a>
        <a href="https://github.com/kanhiya3008/ultra_secure_flutter_kit" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:knhparmar@gmail.com">Contact</a>
        <a href="mailto:knhparmar@gmail.com?subject=Enterprise Enquiry">Enterprise</a>
      </div>
      <p className={styles.copy}>Built by Kanhiya Parmar · Gurgaon, India</p>
    </footer>
  )
}
