"use client"

import { useState } from 'react'
import { useData, BillableHoursEntry } from '@/lib/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BillableHoursFormProps {
  onClose: () => void
  editEntry?: BillableHoursEntry
}

export function BillableHoursForm({ onClose, editEntry }: BillableHoursFormProps) {
  const { data, dispatch } = useData()
  const [formData, setFormData] = useState({
    lawyer: editEntry?.lawyer || '',
    date: editEntry?.date || new Date().toISOString().split('T')[0],
    hours: editEntry?.hours || 0,
    matter: editEntry?.matter || '',
    client: editEntry?.client || '',
    description: editEntry?.description || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const entry: BillableHoursEntry = {
      id: editEntry?.id || Date.now().toString(),
      ...formData,
      hours: Number(formData.hours)
    }

    if (editEntry) {
      dispatch({ type: 'UPDATE_BILLABLE_HOURS', payload: entry })
    } else {
      dispatch({ type: 'ADD_BILLABLE_HOURS', payload: entry })
    }
    
    onClose()
  }

  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <CardTitle className="text-white">
          {editEntry ? 'Edit Billable Hours' : 'Add Billable Hours'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lawyer" className="text-gray-300">Lawyer</Label>
              <Input
                id="lawyer"
                value={formData.lawyer}
                onChange={(e) => setFormData({ ...formData, lawyer: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-gray-300">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hours" className="text-gray-300">Hours</Label>
              <Input
                id="hours"
                type="number"
                step="0.25"
                min="0"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: Number(e.target.value) })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="client" className="text-gray-300">Client</Label>
              <Select value={formData.client} onValueChange={(value) => setFormData({ ...formData, client: value })}>
                <SelectTrigger className="bg-[#2d2d2d] border-[#2a3f5a] text-white">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {data.clients.map((client) => (
                    <SelectItem key={client.id} value={client.name}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="matter" className="text-gray-300">Matter</Label>
            <Input
              id="matter"
              value={formData.matter}
              onChange={(e) => setFormData({ ...formData, matter: e.target.value })}
              className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {editEntry ? 'Update' : 'Add'} Entry
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

