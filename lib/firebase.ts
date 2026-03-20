'use client'
import type { Auth, GoogleAuthProvider } from 'firebase/auth'

type FirebaseClient = {
  auth: Auth
  googleProvider: GoogleAuthProvider
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let firebaseClient: FirebaseClient | null = null

function hasValidFirebaseEnv() {
  return Object.values(firebaseConfig).every((value) => typeof value === 'string' && value.trim().length > 0)
}

export function getFirebaseClient(): FirebaseClient | null {
  // Never initialize during build/prerender execution.
  const nextPhase = process.env.NEXT_PHASE
  if (typeof nextPhase === 'string' && nextPhase.toLowerCase().includes('build')) return null

  const isBrowser =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement === 'function'

  if (!isBrowser) return null
  if (firebaseClient) return firebaseClient
  if (!hasValidFirebaseEnv()) return null

  try {
    // Keep firebase SDK loading fully runtime/client-side to avoid
    // accidental server-side initialization during prerender.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getApp, getApps, initializeApp } = require('firebase/app')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAuth, GoogleAuthProvider } = require('firebase/auth')

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
    firebaseClient = {
      auth: getAuth(app),
      googleProvider: new GoogleAuthProvider(),
    }
    return firebaseClient
  } catch (error) {
    console.error('Failed to initialize Firebase client:', error)
    return null
  }
}