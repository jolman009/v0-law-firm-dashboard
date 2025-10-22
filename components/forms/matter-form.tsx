"use client"

import { useState } from 'react'
import { useData, MatterEntry } from '@/lib/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MatterFormProps {
  onClose: () => void
  editMatter?: MatterEntry
}

export function MatterForm({ onClose, editMatter }: MatterFormProps) {
  const { data, dispatch } = useData()
  const [formData, setFormData] = useState({
    clientId: editMatter?.clientId || '',
    title: editMatter?.title || '',
    value: editMatter?.value || 0,
    status: editMatter?.status || 'active' as 'active' | 'completed' | 'on-hold',
    startDate: editMatter?.startDate || new Date().toISOString().split('T')[0],
    endDate: editMatter?.endDate || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const matter: MatterEntry = {
      id: editMatter?.id || Date.now().toString(),
      ...formData,
      value: Number(formData.value),
      endDate: formData.status === 'completed' ? formData.endDate : undefined
    }

    if (editMatter) {
      dispatch({ type: 'UPDATE_MATTER', payload: matter })
    } else {
      dispatch({ type: 'ADD_MATTER', payload: matter })
    }
    
    onClose()
  }

  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <CardTitle className="text-white">
          {editMatter ? 'Edit Matter' : 'Add New Matter'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="clientId" className="text-gray-300">Client</Label>
            <Select value={formData.clientId} onValueChange={(value) => setFormData({ ...formData, clientId: value })}>
              <SelectTrigger className="bg-[#2d2d2d] border-[#2a3f5a] text-white">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {data.clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title" className="text-gray-300">Matter Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value" className="text-gray-300">Matter Value ($)</Label>
              <Input
                id="value"
                type="number"
                min="0"
                step="0.01"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'completed' | 'on-hold') => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-[#2d2d2d] border-[#2a3f5a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
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
            {formData.status === 'completed' && (
              <div>
                <Label htmlFor="endDate" className="text-gray-300">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 hover:from-[#D4AF37] hover:to-[#B8941F] border border-gray-300 hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/30 text-gray-800 hover:text-black">
              {editMatter ? 'Update' : 'Add'} Matter
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

