import { useEffect, useMemo, useState } from 'react'
import { getSession, signIn as signInWithSupabase, signOut as signOutFromSupabase } from '../lib/supabase'
import AuthContext from './AuthContext'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [configurationError, setConfigurationError] = useState('')

  useEffect(() => {
    getSession()
      .then(setSession)
      .catch((error) => setConfigurationError(error.message))
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(() => ({
    session,
    loading,
    configurationError,
    async signIn(email, password, remember) {
      const nextSession = await signInWithSupabase(email, password, remember)
      setSession(nextSession)
      return nextSession
    },
    async signOut() {
      try { await signOutFromSupabase() } finally { setSession(null) }
    },
  }), [session, loading, configurationError])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
