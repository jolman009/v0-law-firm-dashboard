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
    <div className="w-full max-w-md p-8 bg-[#0d1b2a] rounded-lg border border-gray-800">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm">Sign in to your law firm dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@lawfirm.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#0a1628] border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#0a1628] border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
