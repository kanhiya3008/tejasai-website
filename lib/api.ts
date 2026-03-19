// lib/api.ts
// Central API client — all backend calls go through here

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// ── Types ──────────────────────────────────────────────────

export type Plan = 'free' | 'trial' | 'pro' | 'enterprise'

export interface TrialResponse {
  success: boolean
  message: string
  plan: Plan
  expires_in_days: number
}

export interface ValidateResponse {
  valid: boolean
  plan: Plan
  features: Record<string, boolean | string>
  expires_at: string | null
  app_limit: number
  registered_apps: number
}

export interface LicenseStatusResponse {
  plan: Plan
  status: string
  billing: string
  email: string
  bundle_ids: string[]
  app_limit: number
  expires_at: string | null
  trial: boolean
  features: Record<string, boolean | string>
}

export interface ApiError {
  detail: string
}

// ── Helper ─────────────────────────────────────────────────

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    const json = await res.json()

    if (!res.ok) {
      return { data: null, error: (json as ApiError).detail || 'Something went wrong' }
    }

    return { data: json as T, error: null }
  } catch {
    return { data: null, error: 'Cannot connect to server. Please try again.' }
  }
}

// ── 1. Start Free Trial ────────────────────────────────────
// Called from: Landing page trial form + HomeContact form

export async function startTrial(
  email: string,
  name: string = ''
): Promise<{ data: TrialResponse | null; error: string | null }> {
  return request<TrialResponse>('/trial', {
    method: 'POST',
    body: JSON.stringify({ email, name }),
  })
}

// ── 2. Validate License ────────────────────────────────────
// Called from: Flutter plugin (via HTTP)
// Also useful for a "check my license" page

export async function validateLicense(
  licenseKey: string,
  bundleId: string = 'web.tejasai.dashboard',
  platform: string = 'web'
): Promise<{ data: ValidateResponse | null; error: string | null }> {
  return request<ValidateResponse>('/validate-license', {
    method: 'POST',
    body: JSON.stringify({
      license_key: licenseKey,
      bundle_id: bundleId,
      platform,
      plugin_version: '1.2.0',
    }),
  })
}

// ── 3. Check License Status ────────────────────────────────
// Called from: User dashboard / pricing page

export async function getLicenseStatus(
  licenseKey: string
): Promise<{ data: LicenseStatusResponse | null; error: string | null }> {
  return request<LicenseStatusResponse>('/license-status', {
    method: 'POST',
    body: JSON.stringify({ license_key: licenseKey }),
  })
}

// ── 4. Get User Dashboard ──────────────────────────────────
// Called from: /dashboard page (requires Firebase auth token)

export interface DashboardData {
  user: { email: string; name: string; uid: string }
  licenses: {
    id: string
    key_prefix: string
    plan: string
    billing: string
    status: string
    bundle_ids: string[]
    app_limit: number
    features: Record<string, boolean | string>
    created_at: string | null
    expires_at: string | null
    trial: boolean
  }[]
  payments: {
    payment_id: string
    amount: number
    currency: string
    plan: string
    billing: string
    timestamp: string | null
  }[]
  total_licenses: number
  active_licenses: number
}

export async function getDashboard(
  token: string
): Promise<{ data: DashboardData | null; error: string | null }> {
  return request<DashboardData>('/dashboard/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

export async function linkLicense(
  licenseKey: string,
  token: string
): Promise<{ data: { success: boolean; plan: string } | null; error: string | null }> {
  return request('/dashboard/link-license', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ license_key: licenseKey }),
  })
}

export async function removeApp(
  licenseId: string,
  bundleId: string,
  token: string
): Promise<{ data: { success: boolean } | null; error: string | null }> {
  return request('/dashboard/remove-app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ license_id: licenseId, bundle_id: bundleId }),
  })
}

// ── 5. Health Check ────────────────────────────────────────

export async function healthCheck(): Promise<boolean> {
  const { data } = await request<{ status: string }>('/health')
  return data?.status === 'ok'
}
