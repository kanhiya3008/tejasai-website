import type { Metadata } from 'next'
import './globals.css'
import AuthMount from './AuthMount'

export const metadata: Metadata = {
  title: 'TejasAI — AI-Powered Products Built in India',
  description:
    'TejasAI builds AI-powered SaaS products — Flutter security, insurance AI advisor, smart parking, and party delivery platform. Built in Gurgaon, India.',
  keywords: 'flutter security, AI SaaS India, insurance AI, parking app, party delivery, ultra secure flutter kit',
  openGraph: {
    title: 'TejasAI — AI-Powered Products Built in India',
    description: 'Flutter security, insurance AI, smart parking, party delivery — four products, one mission.',
    url: 'https://tejasai.io',
    siteName: 'TejasAI',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthMount>{children}</AuthMount>
      </body>
    </html>
  )
}
