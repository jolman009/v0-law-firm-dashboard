"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan 2023", revenue: 18000 },
  { month: "Feb 2023", revenue: 22000 },
  { month: "Mar 2023", revenue: 21000 },
  { month: "Apr 2023", revenue: 19000 },
  { month: "May 2023", revenue: 17000 },
  { month: "Jun 2023", revenue: 20000 },
  { month: "Jul 2023", revenue: 18500 },
  { month: "Aug 2023", revenue: 23000 },
  { month: "Sep 2023", revenue: 21500 },
]

export function RevenuePerLawyerChart() {
  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">1 Jan 2023 - 1 Sep 2023</p>
            <CardTitle className="text-white mt-1">Average Revenue Per Lawyer</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue Per Lawyer",
              color: "#06b6d4",
            },
          }}
          className="h-[200px]"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
            <span className="text-gray-400">Revenue Per Lawyer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-gray-400">Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="text-gray-400">Average</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
