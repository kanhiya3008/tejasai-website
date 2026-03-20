'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { getDashboard, linkLicense, removeApp, type DashboardData } from '@/lib/api'
import styles from './dashboard.module.css'

const PLAN_COLOR: Record<string, string> = {
  free: '#888780',
  trial: '#f59e0b',
  pro: '#38bdf8',
  enterprise: '#a78bfa',
}

const PLAN_BG: Record<string, string> = {
  free: 'rgba(136,135,128,.1)',
  trial: 'rgba(245,158,11,.1)',
  pro: 'rgba(56,189,248,.1)',
  enterprise: 'rgba(167,139,250,.1)',
}

export default function DashboardPage() {
  const { user, loading, logout, getToken } = useAuth()
  const router = useRouter()

  const [data, setData] = useState<DashboardData | null>(null)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [linkKey, setLinkKey] = useState('')
  const [linkMsg, setLinkMsg] = useState('')
  const [linkErr, setLinkErr] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  // Fetch dashboard data
  useEffect(() => {
    if (user) fetchDashboard()
  }, [user])

  async function fetchDashboard() {
    setFetching(true)
    const token = await getToken()
    if (!token) return

    const { data: d, error: e } = await getDashboard(token)
    setFetching(false)
    if (e) { setError(e); return }
    if (d) setData(d)
  }

  async function handleLinkLicense() {
    if (!linkKey.trim()) return
    setLinkMsg(''); setLinkErr('')
    const token = await getToken()
    if (!token) return

    const { data: d, error: e } = await linkLicense(linkKey.trim(), token)
    if (e) { setLinkErr(e); return }
    if (d?.success) {
      setLinkMsg('License linked successfully!')
      setLinkKey('')
      fetchDashboard()
    }
  }

  async function handleRemoveApp(licenseId: string, bundleId: string) {
    const token = await getToken()
    if (!token) return
    await removeApp(licenseId, bundleId, token)
    fetchDashboard()
  }

  function copyKey(prefix: string) {
    navigator.clipboard.writeText(prefix)
    setCopied(prefix)
    setTimeout(() => setCopied(null), 2000)
  }

  function daysUntilExpiry(expiresAt: string | null): number | null {
    if (!expiresAt) return null
    const diff = new Date(expiresAt).getTime() - Date.now()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  if (loading || fetching) return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <p className={styles.loadingText}>Loading your dashboard...</p>
    </div>
  )

  if (error) return (
    <div className={styles.loading}>
      <p style={{ color: '#f87171', fontSize: '14px' }}>{error}</p>
      <button onClick={fetchDashboard} className={styles.retryBtn}>Retry</button>
    </div>
  )

  return (
    <div className={styles.page}>

      {/* Navbar */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <div className={styles.logoMark}>T</div>
          <span>Tejas<span className={styles.gold}>AI</span></span>
        </Link>
        <div className={styles.navRight}>
          <span className={styles.navEmail}>{user?.email}</span>
          <button className={styles.logoutBtn} onClick={async () => { await logout(); router.push('/') }}>
            Sign out
          </button>
        </div>
      </nav>

      <div className={styles.content}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatar}>
            {user?.photoURL
              ? <img src={user.photoURL} alt="avatar" className={styles.avatarImg} />
              : <span>{user?.email?.[0]?.toUpperCase()}</span>
            }
          </div>
          <div>
            <h1 className={styles.welcomeTitle}>
              Welcome back{data?.user.name ? `, ${data.user.name.split(' ')[0]}` : ''}
            </h1>
            <p className={styles.welcomeSub}>{user?.email}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {[
            { label: 'Total licenses', value: data?.total_licenses ?? 0 },
            { label: 'Active licenses', value: data?.active_licenses ?? 0 },
            { label: 'Total payments', value: data?.payments.length ?? 0 },
            { label: 'Registered apps', value: data?.licenses.reduce((a, l) => a + l.bundle_ids.length, 0) ?? 0 },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statVal}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.grid}>

          {/* LEFT — Licenses */}
          <div className={styles.col}>
            <h2 className={styles.sectionTitle}>Your licenses</h2>

            {data?.licenses.length === 0 ? (
              <div className={styles.emptyBox}>
                <p className={styles.emptyText}>No licenses linked yet.</p>
                <p className={styles.emptySub}>Start a free trial or enter your license key below.</p>
                <Link href="/security#trial" className={styles.trialBtn}>Start free trial →</Link>
              </div>
            ) : (
              data?.licenses.map(lic => {
                const days = daysUntilExpiry(lic.expires_at)
                const isExpiringSoon = days !== null && days <= 7 && days > 0
                const isExpired = days !== null && days <= 0

                return (
                  <div key={lic.id} className={styles.licCard}
                    style={{ borderColor: PLAN_COLOR[lic.plan] + '30' }}>

                    {/* Plan header */}
                    <div className={styles.licHeader}>
                      <div className={styles.licPlanBadge}
                        style={{ background: PLAN_BG[lic.plan], color: PLAN_COLOR[lic.plan] }}>
                        {lic.plan.toUpperCase()}
                        {lic.trial && <span className={styles.trialTag}>TRIAL</span>}
                      </div>
                      <div className={`${styles.statusBadge} ${lic.status === 'active' ? styles.statusActive : styles.statusExpired}`}>
                        {lic.status}
                      </div>
                    </div>

                    {/* Key prefix + copy */}
                    <div className={styles.keyRow}>
                      <span className={styles.keyText}>{lic.key_prefix}••••-••••-••••</span>
                      <button className={styles.copyBtn} onClick={() => copyKey(lic.key_prefix)}>
                        {copied === lic.key_prefix ? '✓ Copied' : 'Copy prefix'}
                      </button>
                    </div>

                    {/* Details */}
                    <div className={styles.licDetails}>
                      <div className={styles.licRow}>
                        <span className={styles.licLabel}>Billing</span>
                        <span className={styles.licVal}>{lic.billing}</span>
                      </div>
                      <div className={styles.licRow}>
                        <span className={styles.licLabel}>App limit</span>
                        <span className={styles.licVal}>
                          {lic.bundle_ids.length} / {lic.app_limit === 9999 ? '∞' : lic.app_limit} used
                        </span>
                      </div>
                      <div className={styles.licRow}>
                        <span className={styles.licLabel}>Expires</span>
                        <span className={styles.licVal} style={{
                          color: isExpired ? '#f87171' : isExpiringSoon ? '#f59e0b' : undefined
                        }}>
                          {lic.expires_at
                            ? `${new Date(lic.expires_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}${isExpiringSoon ? ` (${days}d left)` : ''}${isExpired ? ' (expired)' : ''}`
                            : 'Never'}
                        </span>
                      </div>
                    </div>

                    {/* Registered apps */}
                    {lic.bundle_ids.length > 0 && (
                      <div className={styles.appsSection}>
                        <p className={styles.appsLabel}>Registered apps</p>
                        {lic.bundle_ids.map(bid => (
                          <div key={bid} className={styles.appRow}>
                            <span className={styles.appId}>{bid}</span>
                            <button
                              className={styles.removeBtn}
                              onClick={() => handleRemoveApp(lic.id, bid)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Active features */}
                    <div className={styles.featuresSection}>
                      <p className={styles.appsLabel}>Active features</p>
                      <div className={styles.featuresPills}>
                        {Object.entries(lic.features)
                          .filter(([, v]) => v === true)
                          .slice(0, 6)
                          .map(([k]) => (
                            <span key={k} className={styles.featPill}>
                              {k.replace(/_/g, ' ')}
                            </span>
                          ))}
                        {Object.entries(lic.features).filter(([, v]) => v === true).length > 6 && (
                          <span className={styles.featPillMore}>
                            +{Object.entries(lic.features).filter(([, v]) => v === true).length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Upgrade button if trial or expired */}
                    {(lic.trial || isExpired || lic.plan === 'free') && (
                      <Link href="/security#pricing" className={styles.upgradeBtn}
                        style={{ background: PLAN_COLOR[lic.plan] + '20', color: PLAN_COLOR[lic.plan], borderColor: PLAN_COLOR[lic.plan] + '40' }}>
                        Upgrade to Pro →
                      </Link>
                    )}
                  </div>
                )
              })
            )}

            {/* Link license */}
            <div className={styles.linkBox}>
              <p className={styles.linkTitle}>Link a license key</p>
              <p className={styles.linkSub}>Have a license key? Link it to your account to see it here.</p>
              <div className={styles.linkRow}>
                <input
                  className={styles.linkInput}
                  placeholder="USK-XXXX-XXXX-XXXX"
                  value={linkKey}
                  onChange={e => { setLinkKey(e.target.value); setLinkErr(''); setLinkMsg('') }}
                />
                <button className={styles.linkBtn} onClick={handleLinkLicense}>Link</button>
              </div>
              {linkErr && <p className={styles.linkErr}>{linkErr}</p>}
              {linkMsg && <p className={styles.linkSuccess}>{linkMsg}</p>}
            </div>
          </div>

          {/* RIGHT — Payments */}
          <div className={styles.col}>
            <h2 className={styles.sectionTitle}>Payment history</h2>

            {data?.payments.length === 0 ? (
              <div className={styles.emptyBox}>
                <p className={styles.emptyText}>No payments yet.</p>
                <p className={styles.emptySub}>Your payment history will appear here after your first purchase.</p>
              </div>
            ) : (
              <div className={styles.paymentsCol}>
                {data?.payments.map((p, i) => (
                  <div key={i} className={styles.payCard}>
                    <div className={styles.payLeft}>
                      <div className={styles.payIcon}>₹</div>
                      <div>
                        <p className={styles.payPlan}>{p.plan?.toUpperCase()} — {p.billing}</p>
                        <p className={styles.payDate}>
                          {p.timestamp ? new Date(p.timestamp).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          }) : '—'}
                        </p>
                      </div>
                    </div>
                    <div className={styles.payRight}>
                      <p className={styles.payAmount}>₹{p.amount?.toLocaleString('en-IN')}</p>
                      <p className={styles.payId}>{p.payment_id?.slice(0, 12)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick links */}
            <div className={styles.quickLinks}>
              <p className={styles.linkTitle}>Quick links</p>
              <div className={styles.quickGrid}>
                <Link href="/security#pricing" className={styles.quickCard}>
                  <span className={styles.quickIcon}>⚡</span>
                  <span>Upgrade plan</span>
                </Link>
                <Link href="/security" className={styles.quickCard}>
                  <span className={styles.quickIcon}>📦</span>
                  <span>Plugin docs</span>
                </Link>
                <Link href="/license" className={styles.quickCard}>
                  <span className={styles.quickIcon}>🔑</span>
                  <span>Check license</span>
                </Link>
                <a href="mailto:support@tejasai.io" className={styles.quickCard}>
                  <span className={styles.quickIcon}>💬</span>
                  <span>Get support</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
