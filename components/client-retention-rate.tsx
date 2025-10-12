"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ClientRetentionRate() {
  return (
    <Card className="bg-[#0f1f3a] border-[#1a2f4a]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">28 Aug 2023 - 4 Sep 2023</p>
            <CardTitle className="text-white mt-1">Client Retention Rate</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-400">Client retention rate</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#06b6d4]">70.00%</span>
          <div className="h-8 w-16 bg-[#06b6d4]/20 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}
