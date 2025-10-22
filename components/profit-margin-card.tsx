"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown } from "lucide-react"

export function ProfitMarginCard() {
  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">28 Aug 2023 - 4 Sep 2023</p>
            <CardTitle className="text-white mt-1">Profit Margin</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-400">Profit Margin</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-[#06b6d4]">10.50%</span>
          </div>
          <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
            <div className="h-full bg-[#06b6d4]" style={{ width: "10.5%" }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Target</span>
            <span className="text-sm text-white">10.00%</span>
          </div>
          <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
            <div className="h-full bg-[#84cc16]" style={{ width: "10%" }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Compare to</span>
            <span className="text-sm text-white">11.00%</span>
          </div>
          <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
            <div className="h-full bg-[#84cc16]" style={{ width: "11%" }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Target</span>
            <span className="text-sm text-white">10.00%</span>
          </div>
          <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
            <div className="h-full bg-[#84cc16]" style={{ width: "10%" }} />
          </div>
        </div>

        <div className="bg-red-600 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Change</span>
          </div>
          <span className="text-sm font-bold text-white">-3%</span>
        </div>
      </CardContent>
    </Card>
  )
}
