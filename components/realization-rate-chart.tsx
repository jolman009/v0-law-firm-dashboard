"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan 2023", realization: 95, target: 90, average: 88 },
  { month: "Feb 2023", realization: 98, target: 90, average: 88 },
  { month: "Mar 2023", realization: 96, target: 90, average: 88 },
  { month: "Apr 2023", realization: 75, target: 90, average: 88 },
  { month: "May 2023", realization: 92, target: 90, average: 88 },
  { month: "Jun 2023", realization: 94, target: 90, average: 88 },
  { month: "Jul 2023", realization: 97, target: 90, average: 88 },
]

export function RealizationRateChart() {
  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">1 Jan 2023 - 7 Sep 2023</p>
            <CardTitle className="text-white mt-1">Realization Rate</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            realization: {
              label: "Realization Rate",
              color: "#a855f7",
            },
            target: {
              label: "Target",
              color: "#06b6d4",
            },
            average: {
              label: "Average",
              color: "#10b981",
            },
          }}
          className="h-[200px]"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRealization" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="realization"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#colorRealization)"
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
            <span className="text-gray-400">Realization Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
            <span className="text-gray-400">Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-gray-400">Average</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
