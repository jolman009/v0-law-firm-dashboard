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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Law Firm</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <div className="lg:col-span-1">
          <RealizationRateChart />
        </div>
        <div className="lg:col-span-1">
          <RevenuePerLawyerChart />
        </div>
        <div className="lg:col-span-1">
          <BillableHoursTable />
        </div>

        {/* Row 2 */}
        <div className="lg:col-span-1">
          <AverageMatterValue />
        </div>
        <div className="lg:col-span-1">
          <ClientAcquisitionChart />
        </div>
        <div className="lg:col-span-1">
          <ProfitMarginCard />
        </div>

        {/* Row 3 */}
        <div className="lg:col-span-1">
          <ClientSatisfactionRate />
        </div>
        <div className="lg:col-span-1">
          <CollectionRate />
        </div>
        <div className="lg:col-span-1">
          <ClientRetentionRate />
        </div>

        {/* Row 4 */}
        <div className="lg:col-span-1">
          <TimekeeperUtilization />
        </div>
      </div>
    </div>
  )
}
