'use client'

import { AuthProvider } from '@/contexts/AuthContext'

export default function AuthMount({ children }: { children: React.ReactNode }) {
  // During Next.js prerender/build, this component can be rendered on the server.
  // Avoid mounting AuthProvider (and thus Firebase initialization) until we're in a real browser.
  if (typeof window === 'undefined') return <>{children}</>

  return <AuthProvider>{children}</AuthProvider>
}

