"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CollectionRate() {
  return (
    <Card className="bg-[#0f1f3a] border-[#1a2f4a]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">28 Aug 2023 - 4 Sep 2023</p>
            <CardTitle className="text-white mt-1">Collection Rate</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
          <span className="text-xs text-gray-400">Collection rate</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">for 30 days (recurring)</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="relative w-48 h-24">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#1a2f4a"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="23.8"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">90.50%</span>
          </div>
        </div>
        <div className="flex items-center gap-8 mt-4 text-xs text-gray-400">
          <span>0.00%</span>
          <span>50.00%</span>
          <span>100.00%</span>
        </div>
      </CardContent>
    </Card>
  )
}
