'use client'
import { useState } from 'react'
import { validateLicense, getLicenseStatus, type LicenseStatusResponse } from '@/lib/api'
import Link from 'next/link'

export default function LicensePage() {
  const [key, setKey]         = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState<LicenseStatusResponse | null>(null)
  const [error, setError]     = useState('')

  async function checkLicense() {
    if (!key.trim()) { setError('Enter your license key'); return }
    setError('')
    setLoading(true)
    setResult(null)

    const { data, error: apiError } = await getLicenseStatus(key.trim())
    setLoading(false)

    if (apiError) { setError(apiError); return }
    if (data) setResult(data)
  }

  const planColor: Record<string, string> = {
    free: '#888780',
    trial: '#f59e0b',
    pro: '#38bdf8',
    enterprise: '#a78bfa',
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#03060d',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px',
    }}>

      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: '#ffb800', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: '#04080f',
          }}>T</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: '#f0e6c8' }}>
            Tejas<span style={{ color: '#ffb800' }}>AI</span>
          </span>
        </div>
      </Link>

      {/* Card */}
      <div style={{
        background: '#070e1a', border: '1px solid rgba(56,189,248,.15)',
        borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '520px',
      }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: 800,
          color: '#e2f4ff', marginBottom: '8px', letterSpacing: '-.02em',
        }}>
          Check your license
        </h1>
        <p style={{ fontSize: '14px', color: '#7fb3cc', marginBottom: '28px' }}>
          Enter your license key to see plan details and active features.
        </p>

        {/* Input */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="USK-XXXX-XXXX-XXXX or TRL-XXXX-XXXX-XXXX"
            value={key}
            onChange={e => { setKey(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && checkLicense()}
            style={{
              flex: 1, background: '#0b1525', border: '1px solid rgba(56,189,248,.2)',
              borderRadius: '6px', padding: '11px 14px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '13px',
              color: '#e2f4ff', outline: 'none',
            }}
          />
          <button
            onClick={checkLicense}
            disabled={loading}
            style={{
              background: '#38bdf8', color: '#03060d', border: 'none',
              borderRadius: '6px', padding: '11px 18px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
              fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? .7 : 1, whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Checking...' : 'Check →'}
          </button>
        </div>

        {error && (
          <p style={{ fontSize: '12px', color: '#f87171', marginBottom: '16px' }}>{error}</p>
        )}

        {/* Result */}
        {result && (
          <div style={{
            marginTop: '24px', background: '#0b1525',
            border: `1px solid ${planColor[result.plan] || '#38bdf8'}30`,
            borderRadius: '10px', overflow: 'hidden',
          }}>
            {/* Plan header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(56,189,248,.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#3d6070', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '4px' }}>Plan</p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 800, color: planColor[result.plan] || '#38bdf8' }}>
                  {result.plan.toUpperCase()}
                </p>
              </div>
              <div style={{
                padding: '5px 14px', borderRadius: '20px', fontSize: '11px',
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                background: result.status === 'active' ? 'rgba(34,197,94,.1)' : 'rgba(248,113,113,.1)',
                color: result.status === 'active' ? '#22c55e' : '#f87171',
                border: `1px solid ${result.status === 'active' ? 'rgba(34,197,94,.2)' : 'rgba(248,113,113,.2)'}`,
              }}>
                {result.status.toUpperCase()}
              </div>
            </div>

            {/* Details */}
            {[
              { label: 'Email', value: result.email },
              { label: 'Billing', value: result.billing },
              { label: 'App licenses', value: `${result.bundle_ids.length} / ${result.app_limit === 9999 ? '∞' : result.app_limit} used` },
              { label: 'Expires', value: result.expires_at ? new Date(result.expires_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Never' },
              { label: 'Trial', value: result.trial ? 'Yes' : 'No' },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 20px', borderBottom: '1px solid rgba(56,189,248,.05)',
                fontSize: '13px',
              }}>
                <span style={{ color: '#3d6070' }}>{row.label}</span>
                <span style={{ color: '#e2f4ff', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>{row.value}</span>
              </div>
            ))}

            {/* Registered apps */}
            {result.bundle_ids.length > 0 && (
              <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(56,189,248,.05)' }}>
                <p style={{ fontSize: '11px', color: '#3d6070', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '.06em' }}>Registered apps</p>
                {result.bundle_ids.map(id => (
                  <p key={id} style={{ fontSize: '12px', color: '#38bdf8', fontFamily: "'JetBrains Mono', monospace", marginBottom: '3px' }}>
                    {id}
                  </p>
                ))}
              </div>
            )}

            {/* Features summary */}
            <div style={{ padding: '12px 20px' }}>
              <p style={{ fontSize: '11px', color: '#3d6070', marginBottom: '8px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '.06em' }}>Key features</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {Object.entries(result.features)
                  .filter(([, v]) => v === true)
                  .slice(0, 8)
                  .map(([k]) => (
                    <span key={k} style={{
                      fontSize: '10px', padding: '2px 8px', borderRadius: '20px',
                      background: 'rgba(34,197,94,.08)', color: '#22c55e',
                      border: '1px solid rgba(34,197,94,.15)',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {k.replace(/_/g, ' ')}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '24px' }}>
        <Link href="/" style={{ fontSize: '12px', color: '#3d6070', textDecoration: 'none' }}>← Home</Link>
        <Link href="/security" style={{ fontSize: '12px', color: '#3d6070', textDecoration: 'none' }}>Security plugin</Link>
        <Link href="/security#trial" style={{ fontSize: '12px', color: '#38bdf8', textDecoration: 'none' }}>Get trial key →</Link>
      </div>
    </div>
  )
}
