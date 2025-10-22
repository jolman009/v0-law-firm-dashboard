"use client"

import { useState } from 'react'
import { useData, ClientEntry } from '@/lib/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

interface ClientFormProps {
  onClose: () => void
  editClient?: ClientEntry
}

export function ClientForm({ onClose, editClient }: ClientFormProps) {
  const { dispatch } = useData()
  const [formData, setFormData] = useState({
    name: editClient?.name || '',
    email: editClient?.email || '',
    phone: editClient?.phone || '',
    acquisitionDate: editClient?.acquisitionDate || new Date().toISOString().split('T')[0],
    satisfaction: editClient?.satisfaction || 5,
    retention: editClient?.retention || true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const client: ClientEntry = {
      id: editClient?.id || Date.now().toString(),
      ...formData,
      satisfaction: Number(formData.satisfaction)
    }

    if (editClient) {
      dispatch({ type: 'UPDATE_CLIENT', payload: client })
    } else {
      dispatch({ type: 'ADD_CLIENT', payload: client })
    }
    
    onClose()
  }

  return (
    <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
      <CardHeader>
        <CardTitle className="text-white">
          {editClient ? 'Edit Client' : 'Add New Client'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">Client Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="acquisitionDate" className="text-gray-300">Acquisition Date</Label>
              <Input
                id="acquisitionDate"
                type="date"
                value={formData.acquisitionDate}
                onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="satisfaction" className="text-gray-300">Satisfaction (1-10)</Label>
              <Input
                id="satisfaction"
                type="number"
                min="1"
                max="10"
                value={formData.satisfaction}
                onChange={(e) => setFormData({ ...formData, satisfaction: Number(e.target.value) })}
                className="bg-[#2d2d2d] border-[#2a3f5a] text-white"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="retention" className="text-gray-300">Retained Client</Label>
              <Switch
                id="retention"
                checked={formData.retention}
                onCheckedChange={(checked) => setFormData({ ...formData, retention: checked })}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#D4AF37] hover:to-[#B8941F] border border-gray-600 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20">
              {editClient ? 'Update' : 'Add'} Client
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

