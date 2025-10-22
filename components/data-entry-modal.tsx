"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BillableHoursForm } from '@/components/forms/billable-hours-form'
import { ClientForm } from '@/components/forms/client-form'
import { MatterForm } from '@/components/forms/matter-form'
import { LawyerForm } from '@/components/forms/lawyer-form'

export function DataEntryModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'billable-hours' | 'clients' | 'matters' | 'lawyers'>('lawyers')

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-[#0d1b2a] border-[#1a2f4a] text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Add New Data</DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#1a2f4a] pb-2">
          <button
            onClick={() => setActiveTab('lawyers')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'lawyers'
                ? 'bg-[#1a2f4a] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0f1f3a]'
            }`}
          >
            Lawyers
          </button>
          <button
            onClick={() => setActiveTab('billable-hours')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'billable-hours'
                ? 'bg-[#1a2f4a] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0f1f3a]'
            }`}
          >
            Billable Hours
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'clients'
                ? 'bg-[#1a2f4a] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0f1f3a]'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('matters')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'matters'
                ? 'bg-[#1a2f4a] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0f1f3a]'
            }`}
          >
            Matters
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === 'lawyers' && (
            <LawyerForm onClose={handleClose} />
          )}
          {activeTab === 'billable-hours' && (
            <BillableHoursForm onClose={handleClose} />
          )}
          {activeTab === 'clients' && (
            <ClientForm onClose={handleClose} />
          )}
          {activeTab === 'matters' && (
            <MatterForm onClose={handleClose} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
