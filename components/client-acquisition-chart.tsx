"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "01 Jan 2023", cost: 1500 },
  { month: "01 Feb 2023", cost: 1800 },
  { month: "01 Mar 2023", cost: 2000 },
  { month: "01 Apr 2023", cost: 2200 },
  { month: "01 May 2023", cost: 2400 },
  { month: "01 Jun 2023", cost: 2300 },
  { month: "01 Jul 2023", cost: 2100 },
  { month: "01 Aug 2023", cost: 1900 },
  { month: "01 Sep 2023", cost: 2000 },
]

export function ClientAcquisitionChart() {
  return (
    <Card className="bg-[#0f1f3a] border-[#1a2f4a]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">1 Jan 2023 - 1 Sep 2023</p>
            <CardTitle className="text-white mt-1">Average Client Acquisition Cost</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            cost: {
              label: "Average Client Acquisition cost",
              color: "#06b6d4",
            },
          }}
          className="h-[200px]"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2f4a" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              domain={[0, 3000]}
              ticks={[0, 1000, 2000, 3000]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="cost" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4", r: 4 }} />
          </LineChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
            <span className="text-gray-400">Average Client Acquisition cost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
