"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ClientSatisfactionRate() {
  return (
    <Card className="bg-[#0f1f3a] border-[#1a2f4a]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">1 May 2025 - 30 May 2025</p>
            <CardTitle className="text-white mt-1">Client Satisfaction Rate</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-400">Client satisfaction LP</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold text-white">5</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Target</span>
            <span className="text-white">5</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400"></span>
            <span className="text-white">0%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
