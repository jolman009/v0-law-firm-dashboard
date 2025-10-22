"use client"

import { useState } from 'react'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'
import { Briefcase } from 'lucide-react'

export function AuthPage() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Briefcase className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Law Firm Dashboard</h1>
          </div>
          <p className="text-gray-400">Professional analytics and management</p>
        </div>

        {/* Auth Forms */}
        {showLogin ? (
          <LoginForm onSwitchToSignup={() => setShowLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  )
}
