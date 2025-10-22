"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LoginFormProps {
  onSwitchToSignup: () => void
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-[#1a1a1a] rounded-lg border-2 border-[#D4AF37]/30 shadow-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#D4AF37] mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm">Sign in to your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#D4AF37]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@lawfirm.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "login-error" : undefined}
            disabled={loading}
            className="bg-black border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#D4AF37]">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "login-error" : undefined}
            disabled={loading}
            className="bg-black border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
          />
        </div>

        {error && (
          <div id="login-error" role="alert" className="p-3 rounded-md bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-colors"
          aria-busy={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Screen reader loading announcement */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {loading && 'Signing in, please wait...'}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
