"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useData, calculateTotalBillableHours } from "@/lib/data-context"
import { useState } from "react"
import { BillableHoursForm } from "@/components/forms/billable-hours-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

export function BillableHoursTable() {
  const { data, dispatch } = useData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<string | null>(null)

  // Calculate billable hours by lawyer
  const lawyerHours = data.billableHours.reduce((acc, entry) => {
    if (!acc[entry.lawyer]) {
      acc[entry.lawyer] = 0
    }
    acc[entry.lawyer] += entry.hours
    return acc
  }, {} as Record<string, number>)

  // Convert to array and sort by hours
  const lawyerData = Object.entries(lawyerHours)
    .map(([lawyer, actual], index) => ({
      rank: index + 1,
      name: lawyer,
      actual,
      target: 200, // Default target
      percentage: ((actual - 200) / 200) * 100,
      trend: actual > 200 ? "up" : actual === 200 ? "neutral" : "down"
    }))
    .sort((a, b) => b.actual - a.actual)

  const handleEdit = (entryId: string) => {
    setEditingEntry(entryId)
    setIsFormOpen(true)
  }

  const handleDelete = (entryId: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      dispatch({ type: 'DELETE_BILLABLE_HOURS', payload: entryId })
    }
  }
  return (
    <>
      <Card className="bg-[#0f1f3a] border-[#1a2f4a]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Current Period</p>
              <CardTitle className="text-white mt-1">Billable Hours</CardTitle>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Hours
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#0f1f3a] border-[#1a2f4a] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingEntry ? 'Edit Billable Hours' : 'Add Billable Hours'}
                  </DialogTitle>
                </DialogHeader>
                <BillableHoursForm 
                  onClose={() => {
                    setIsFormOpen(false)
                    setEditingEntry(null)
                  }}
                  editEntry={editingEntry ? data.billableHours.find(e => e.id === editingEntry) : undefined}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs text-gray-400">Billable hours</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4 text-xs text-gray-400 pb-2 border-b border-[#1a2f4a]">
              <div></div>
              <div className="text-right">Actual</div>
              <div className="text-right">Target</div>
              <div className="text-right">Target %</div>
              <div className="text-right">Trend</div>
              <div className="text-right">Actions</div>
            </div>
            {lawyerData.length > 0 ? (
              lawyerData.map((item) => (
                <div key={item.rank} className="grid grid-cols-6 gap-4 items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{item.rank}</span>
                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white">{item.name[0]}</span>
                    </div>
                    <span className="text-white">{item.name}</span>
                  </div>
                  <div className="text-right text-white">{item.actual.toFixed(1)}</div>
                  <div className="text-right text-white">{item.target}</div>
                  <div className="text-right">
                    <span className={item.percentage > 0 ? "text-green-500" : "text-gray-400"}>
                      {item.percentage > 0 ? "+" : ""}
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-end">
                    {item.percentage > 0 && <TrendingUp className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(item.name)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(item.name)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                No billable hours data yet. Click "Add Hours" to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
