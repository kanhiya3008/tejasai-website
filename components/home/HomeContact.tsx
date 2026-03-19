'use client'
import { useState } from 'react'
import { startTrial } from '@/lib/api'
import styles from './HomeContact.module.css'

export default function HomeContact() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [err, setErr]         = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!email.includes('@')) { setErr('Valid email required'); return }
    setErr('')
    setLoading(true)

    const { data, error: apiError } = await startTrial(email)
    setLoading(false)

    if (apiError) {
      if (apiError.includes('already exists')) {
        setSent(true)
      } else {
        setErr(apiError)
      }
      return
    }

    if (data?.success) {
      setSent(true)
      setEmail('')
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.banner}>
          <p className={styles.eyebrow}>Work with us</p>
          <h2 className={styles.title}>
            Interested in<br />
            <span className={styles.gold}>any product?</span>
          </h2>
          <p className={styles.sub}>
            Get a free trial, request a demo, or become a partner.<br />
            We respond within 24 hours.
          </p>

          {sent ? (
            <div className={styles.success}>✓ Got it! We&apos;ll reach out within 24 hours.</div>
          ) : (
            <div className={styles.form}>
              <input
                type="email"
                className={`${styles.input} ${err ? styles.inputErr : ''}`}
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErr('') }}
                onKeyDown={e => e.key === 'Enter' && submit()}
              />
              <button className={styles.btn} onClick={submit} disabled={loading}>
                {loading ? 'SENDING...' : 'GET IN TOUCH →'}
              </button>
            </div>
          )}

          {err && <p style={{ fontSize: '12px', color: '#f87171', marginBottom: '8px' }}>{err}</p>}

          <p className={styles.note}>
            Or email directly:{' '}
            <a href="mailto:knhparmar@gmail.com" className={styles.link}>
              knhparmar@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
