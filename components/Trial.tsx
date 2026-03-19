'use client'
import { useState } from 'react'
import { startTrial } from '@/lib/api'
import styles from './Trial.module.css'

export default function Trial() {
  const [email, setEmail]   = useState('')
  const [name, setName]     = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    setStatus('loading')

    const { data, error: apiError } = await startTrial(email, name)

    if (apiError) {
      if (apiError.includes('already exists')) {
        setError('This email already has a trial. Check your inbox for the license key.')
      } else {
        setError(apiError)
      }
      setStatus('error')
      return
    }

    if (data?.success) {
      setStatus('success')
      setEmail('')
      setName('')
    }
  }

  return (
    <section id="trial" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>14-day free trial</p>
        <h2 className={styles.title}>
          Try every Pro feature<br />
          <em>free for 14 days</em>
        </h2>
        <p className={styles.sub}>
          No credit card. No commitment. All 25 security modules unlocked instantly.
          Downgrade to Free automatically after 14 days — or upgrade to keep Pro.
        </p>

        {status === 'success' ? (
          <div className={styles.success}>
            ✓ Check your inbox — your license key is on its way!
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
            />
            <button
              type="submit"
              className={styles.submit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Get trial key →'}
            </button>
          </form>
        )}

        {error && <p className={styles.errorMsg}>{error}</p>}
        <p className={styles.note}>We&apos;ll email your license key instantly. No spam, ever.</p>

        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔐</span>
            <span>No credit card</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>⚡</span>
            <span>Instant activation</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔄</span>
            <span>Cancel anytime</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>📱</span>
            <span>All 6 platforms</span>
          </div>
        </div>
      </div>
    </section>
  )
}
