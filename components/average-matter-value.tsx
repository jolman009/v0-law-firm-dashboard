"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AverageMatterValue() {
  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">28 Aug 2023 - 4 Sep 2023</p>
            <CardTitle className="text-white mt-1">Average Matter Value</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-xs text-gray-400">Average matter value</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="relative w-48 h-24">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#2d2d2d"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#a855f7"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">$11,000.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
