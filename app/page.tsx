"use client"

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
import { BarChart3, DollarSign, Users, TrendingUp, Star, Percent, UserCheck, Clock, Briefcase, UserCog, LogOut } from "lucide-react"

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

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <DataProvider>
      <div className="min-h-screen bg-[#0a1628] flex">
        {/* Navigation Panel */}
        <nav className="w-64 bg-[#0d1b2a] border-r border-gray-800 p-6 sticky top-0 h-screen overflow-y-auto flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400 text-sm">Quick Navigation</p>
          </div>

          <ul className="space-y-2 flex-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-[#1a2332] hover:text-white transition-colors text-left group"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* User Section */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="mb-3 px-3">
              <p className="text-xs text-gray-500 mb-1">Signed in as</p>
              <p className="text-sm text-gray-300 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left group"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">Law Firm Dashboard</h1>
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
        </div>
      </div>
    </DataProvider>
  )
}
