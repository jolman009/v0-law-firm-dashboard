"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const data = [
  { rank: 1, name: "Karl", actual: 210, target: 200, percentage: 5, trend: "up" },
  { rank: 2, name: "Jana", actual: 205, target: 200, percentage: 2.5, trend: "up" },
  { rank: 3, name: "Benjamin", actual: 200, target: 200, percentage: 0, trend: "neutral" },
]

export function BillableHoursTable() {
  return (
    <Card className="bg-[#0f1f3a] border-[#1a2f4a]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">1 Aug 2023 - 28 Aug 2023</p>
            <CardTitle className="text-white mt-1">Billable Hours This Month</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-400">Billable hours</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-4 text-xs text-gray-400 pb-2 border-b border-[#1a2f4a]">
            <div></div>
            <div className="text-right">Actual</div>
            <div className="text-right">Target</div>
            <div className="text-right">Target %</div>
            <div className="text-right">Trend</div>
          </div>
          {data.map((item) => (
            <div key={item.rank} className="grid grid-cols-5 gap-4 items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{item.rank}</span>
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-xs text-white">{item.name[0]}</span>
                </div>
                <span className="text-white">{item.name}</span>
              </div>
              <div className="text-right text-white">{item.actual}</div>
              <div className="text-right text-white">{item.target}</div>
              <div className="text-right">
                <span className={item.percentage > 0 ? "text-green-500" : "text-gray-400"}>
                  {item.percentage > 0 ? "+" : ""}
                  {item.percentage}%
                </span>
              </div>
              <div className="flex justify-end">
                {item.percentage > 0 && <TrendingUp className="w-4 h-4 text-green-500" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
