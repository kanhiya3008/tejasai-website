'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const AuthMount = dynamic(() => import('./AuthMount'), { ssr: false })

export default function AuthMountWrapper({ children }: { children: ReactNode }) {
  return <AuthMount>{children}</AuthMount>
}

