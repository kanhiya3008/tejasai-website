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

  // ✅ Load Firebase ONLY on client (safe for Vercel)
  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    async function initFirebase() {
      try {
        const firebase = await import('@/lib/firebase')

        // ✅ If Firebase not ready, stop safely
        if (!firebase.auth) {
          setLoading(false)
          return
        }

        setAuth(firebase.auth)
        setGoogleProvider(firebase.googleProvider)

        unsubscribe = onAuthStateChanged(firebase.auth, (u) => {
          setUser(u)
          setLoading(false)
        })
      } catch (error) {
        console.error('Firebase init error:', error)
        setLoading(false)
      }
    }

    initFirebase()

    return () => {
      if (unsubscribe) unsubscribe()
    }
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