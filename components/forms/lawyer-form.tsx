"use client"

import { useState } from 'react'
import { useData, LawyerEntry } from '@/lib/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

interface LawyerFormProps {
  onClose: () => void
  editLawyer?: LawyerEntry
}

export function LawyerForm({ onClose, editLawyer }: LawyerFormProps) {
  const { dispatch } = useData()
  const [formData, setFormData] = useState({
    name: editLawyer?.name || '',
    email: editLawyer?.email || '',
    phone: editLawyer?.phone || '',
    title: editLawyer?.title || 'Associate',
    specialization: editLawyer?.specialization || '',
    billableRate: editLawyer?.billableRate || 0,
    startDate: editLawyer?.startDate || new Date().toISOString().split('T')[0],
    active: editLawyer?.active ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const lawyer: LawyerEntry = {
      id: editLawyer?.id || Date.now().toString(),
      ...formData,
      billableRate: Number(formData.billableRate)
    }

    if (editLawyer) {
      dispatch({ type: 'UPDATE_LAWYER', payload: lawyer })
    } else {
      dispatch({ type: 'ADD_LAWYER', payload: lawyer })
    }

    onClose()
  }

  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <CardTitle className="text-white">
          {editLawyer ? 'Edit Lawyer' : 'Add New Lawyer'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="title" className="text-gray-300">Title/Position</Label>
              <Select value={formData.title} onValueChange={(value) => setFormData({ ...formData, title: value })}>
                <SelectTrigger className="bg-[#2d2d2d] border-[#2a3f5a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Senior Partner">Senior Partner</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                  <SelectItem value="Senior Associate">Senior Associate</SelectItem>
                  <SelectItem value="Junior Associate">Junior Associate</SelectItem>
                  <SelectItem value="Of Counsel">Of Counsel</SelectItem>
                  <SelectItem value="Paralegal">Paralegal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="specialization" className="text-gray-300">Specialization/Practice Area</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                placeholder="e.g., Corporate Law, Litigation"
                required
              />
            </div>
            <div>
              <Label htmlFor="billableRate" className="text-gray-300">Billable Rate ($/hr)</Label>
              <Input
                id="billableRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.billableRate}
                onChange={(e) => setFormData({ ...formData, billableRate: Number(e.target.value) })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="text-gray-300">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Label htmlFor="active" className="text-gray-300">Active Status</Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {editLawyer ? 'Update' : 'Add'} Lawyer
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="border-[#2a3f5a] text-gray-300">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
