"use client"

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
import { BarChart3, DollarSign, Users, TrendingUp, Star, Percent, UserCheck, Clock } from "lucide-react"

const navigationItems = [
  { id: "realization-rate", label: "Realization Rate", icon: BarChart3 },
  { id: "revenue-per-lawyer", label: "Revenue Per Lawyer", icon: DollarSign },
  { id: "billable-hours", label: "Billable Hours", icon: Clock },
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
    <div className="min-h-screen bg-[#0a1628] flex">
      {/* Navigation Panel */}
      <nav className="w-64 bg-[#0d1b2a] border-r border-gray-800 p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">Dashboard</h2>
          <p className="text-gray-400 text-sm">Quick Navigation</p>
        </div>
        
        <ul className="space-y-2">
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
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Law Firm</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          <div id="realization-rate" className="lg:col-span-1 scroll-mt-6">
            <RealizationRateChart />
          </div>
          <div id="revenue-per-lawyer" className="lg:col-span-1 scroll-mt-6">
            <RevenuePerLawyerChart />
          </div>
          <div id="billable-hours" className="lg:col-span-1 scroll-mt-6">
            <BillableHoursTable />
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
  )
}
