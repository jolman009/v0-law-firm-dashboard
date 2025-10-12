"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TimekeeperUtilization() {
  return (
    <Card className="bg-[#0f1f3a] border-[#1a2f4a]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">1 May 2025 - 30 May 2025</p>
            <CardTitle className="text-white mt-1">Timekeeper Utilization Rate</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-400">Timekeeper utilization rate</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Target</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
