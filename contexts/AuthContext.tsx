'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut, User, Auth, GoogleAuthProvider } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  getToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => { },
  logout: async () => { },
  getToken: async () => null,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [auth, setAuth] = useState<Auth | null>(null)
  const [googleProvider, setGoogleProvider] = useState<GoogleAuthProvider | null>(null)

  // ✅ Load Firebase ONLY on client
  useEffect(() => {
    async function initFirebase() {
      const { auth, googleProvider } = await import('@/lib/firebase')
      setAuth(auth)
      setGoogleProvider(googleProvider)

      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u)
        setLoading(false)
      })

      return () => unsub()
    }

    initFirebase()
  }, [])

  async function signInWithGoogle() {
    if (!auth || !googleProvider) return
    await signInWithPopup(auth, googleProvider)
  }

  async function logout() {
    if (!auth) return
    await signOut(auth)
  }

  async function getToken(): Promise<string | null> {
    if (!user) return null
    return user.getIdToken()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)