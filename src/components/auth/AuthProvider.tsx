'use client'

import { createContext, ReactNode, use } from 'react'

type AuthContextType = {
  email: string
  id: number
  expires: number
} | null

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  userPromise,
}: {
  children: ReactNode
  userPromise: Promise<{
    email: string
    id: number
    expires: number
  } | null>
}) {
  const user = use(userPromise)

  return <AuthContext value={user}>{children}</AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
