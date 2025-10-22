"use client"

import { useState } from "react"
import Image from "next/image"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DataProvider } from "@/lib/data-context"
import { RealizationRateChart } from "@/components/realization-rate-chart"
import { RevenuePerLawyerChart } from "@/components/revenue-per-lawyer-chart"
import { BillableHoursTable } from "@/components/billable-hours-table"
import { AverageMatterValue } from "@/components/average-matter-value"
import { ClientAcquisitionChart } from "@/components/client-acquisition-chart"
import { ProfitMarginCard } from "@/components/profit-margin-card"
import { ClientSatisfactionRate } from "@/components/client-satisfaction-rate"
import { CollectionRate } from "@/components/collection-rate"
import { ClientRetentionRate } from "@/components/client-retention-rate"
import { TimekeeperUtilization } from "@/components/timekeeper-utilization"
import { DataEntryModal } from "@/components/data-entry-modal"
import { ClientList } from "@/components/client-list"
import { MatterList } from "@/components/matter-list"
import { LawyerList } from "@/components/lawyer-list"
import { BarChart3, DollarSign, Users, TrendingUp, Star, Percent, UserCheck, Clock, Briefcase, UserCog, LogOut, Menu, X } from "lucide-react"

const navigationItems = [
  { id: "lawyers", label: "Lawyers & Partners", icon: UserCog },
  { id: "clients", label: "Clients", icon: Users },
  { id: "matters", label: "Matters", icon: Briefcase },
  { id: "billable-hours", label: "Billable Hours", icon: Clock },
  { id: "realization-rate", label: "Realization Rate", icon: BarChart3 },
  { id: "revenue-per-lawyer", label: "Revenue Per Lawyer", icon: DollarSign },
  { id: "average-matter-value", label: "Average Matter Value", icon: TrendingUp },
  { id: "client-acquisition", label: "Client Acquisition", icon: Users },
  { id: "profit-margin", label: "Profit Margin", icon: Percent },
  { id: "client-satisfaction", label: "Client Satisfaction", icon: Star },
  { id: "collection-rate", label: "Collection Rate", icon: DollarSign },
  { id: "client-retention", label: "Client Retention", icon: UserCheck },
  { id: "timekeeper-utilization", label: "Timekeeper Utilization", icon: Clock },
]

export default function DashboardPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardContent scrollToSection={scrollToSection} />
      </ProtectedRoute>
    </AuthProvider>
  )
}

function DashboardContent({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
  }

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <DataProvider>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#D4AF37] focus:text-black focus:rounded focus:font-semibold"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-black flex relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Navigation Panel */}
        <nav
          id="mobile-nav"
          className={`
            fixed lg:sticky lg:translate-x-0 transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            top-0 left-0 z-40 w-64 bg-[#1a1a1a] border-r border-[#D4AF37]/30 p-6 h-screen overflow-y-auto flex flex-col
          `}
          aria-label="Main navigation"
        >
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo-letters.png"
                alt="Cornejo Law"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-[#D4AF37] mb-1">Dashboard</h2>
            <p className="text-gray-500 text-xs">Quick Navigation</p>
          </div>

          <ul className="space-y-2 flex-1" role="list">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg text-gray-400 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors text-left group focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 group-hover:text-[#D4AF37] transition-colors" aria-hidden="true" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* User Section */}
          <div className="mt-6 pt-6 border-t border-[#D4AF37]/30">
            <div className="mb-3 px-3">
              <p className="text-xs text-gray-600 mb-1">Signed in as</p>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left group"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-6 overflow-y-auto bg-[#0a0a0a] lg:pl-6 pl-6 pt-20 lg:pt-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#D4AF37]">Law Firm Dashboard</h1>
            <DataEntryModal />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Management Section */}
            <div id="lawyers" className="lg:col-span-3 scroll-mt-6">
              <LawyerList />
            </div>
            <div id="clients" className="lg:col-span-2 scroll-mt-6">
              <ClientList />
            </div>
            <div id="matters" className="lg:col-span-1 scroll-mt-6">
              <MatterList />
            </div>

            {/* Row 1 */}
            <div id="billable-hours" className="lg:col-span-1 scroll-mt-6">
              <BillableHoursTable />
            </div>
            <div id="realization-rate" className="lg:col-span-1 scroll-mt-6">
              <RealizationRateChart />
            </div>
            <div id="revenue-per-lawyer" className="lg:col-span-1 scroll-mt-6">
              <RevenuePerLawyerChart />
            </div>

            {/* Row 2 */}
            <div id="average-matter-value" className="lg:col-span-1 scroll-mt-6">
              <AverageMatterValue />
            </div>
            <div id="client-acquisition" className="lg:col-span-1 scroll-mt-6">
              <ClientAcquisitionChart />
            </div>
            <div id="profit-margin" className="lg:col-span-1 scroll-mt-6">
              <ProfitMarginCard />
            </div>

            {/* Row 3 */}
            <div id="client-satisfaction" className="lg:col-span-1 scroll-mt-6">
              <ClientSatisfactionRate />
            </div>
            <div id="collection-rate" className="lg:col-span-1 scroll-mt-6">
              <CollectionRate />
            </div>
            <div id="client-retention" className="lg:col-span-1 scroll-mt-6">
              <ClientRetentionRate />
            </div>

            {/* Row 4 */}
            <div id="timekeeper-utilization" className="lg:col-span-1 scroll-mt-6">
              <TimekeeperUtilization />
            </div>
          </div>
        </main>
      </div>
    </DataProvider>
  )
}
