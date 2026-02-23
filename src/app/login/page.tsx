'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      console.error('Login error:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-coral mb-4">
            <span className="text-white text-2xl font-bold">E</span>
          </div>
          <h1 className="text-3xl font-bold text-deep-brown mb-2">Enact AI</h1>
          <p className="text-warm-gray text-sm">Stop reading. Start doing.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-soft-sand shadow-sm p-8">
          <h2 className="text-xl font-semibold text-deep-brown mb-1 text-center">
            Welcome back
          </h2>
          <p className="text-warm-gray text-sm text-center mb-8">
            Sign in to track your daily actions
          </p>

          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 bg-coral hover:bg-coral/90 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-3 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#ffffff"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#ffffff"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#ffffff"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#ffffff"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          <p className="text-xs text-warm-gray text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-warm-gray mt-6">
          New here? Your account is created automatically on first sign in.
        </p>
      </div>
    </div>
  )
}
