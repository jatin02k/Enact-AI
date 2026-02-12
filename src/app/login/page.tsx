'use client'

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-warm-cream px-4">
      {/* Background Gradient - matching landing page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sunrise to-transparent opacity-50" />
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <Badge variant="gold" className="px-4 py-1.5 text-sm font-medium">
            Launching March 2026
          </Badge>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border-2 border-deep-brown bg-white/80 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-espresso sm:text-5xl">
              Welcome Back
            </h1>
            <p className="mt-3 text-lg text-deep-brown/80">
              Sign in to continue your journey
            </p>
          </div>

          {/* Google Sign In Button */}
          <GoogleSignInButton />

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warm-gray/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-warm-gray">
                Secure authentication with Google
              </span>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-warm-gray">
            By signing in, you agree to turn your self-help books into{" "}
            <span className="font-semibold text-coral">real action</span>.
          </p>
        </div>

        {/* Bottom Link */}
        <p className="mt-6 text-center text-sm text-deep-brown/70">
          Don&apos;t have an account?{" "}
          <a href="/" className="font-semibold text-coral hover:text-coral/80 transition-colors">
            Join the waitlist
          </a>
        </p>
      </div>
    </div>
  )
}