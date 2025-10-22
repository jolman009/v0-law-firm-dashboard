"use client"

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password, {
      full_name: fullName,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Auto-switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin()
      }, 2000)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-[#1a1a1a] rounded-lg border-2 border-[#D4AF37]/30 shadow-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#D4AF37] mb-2">Create Account</h1>
        <p className="text-gray-400 text-sm">Sign up for your dashboard</p>
      </div>

      {success ? (
        <div className="p-4 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30">
          <p className="text-sm text-[#D4AF37] text-center">
            Account created successfully! Please check your email to verify your account.
            Redirecting to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[#D4AF37]">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-black border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#D4AF37]">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-black border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold transition-colors"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
