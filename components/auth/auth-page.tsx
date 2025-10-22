"use client"

import { useState } from 'react'
import Image from 'next/image'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

export function AuthPage() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo-full.png"
              alt="Anthony Cornejo - The Law Shark"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-[#D4AF37] mb-2">Dashboard Portal</h1>
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
