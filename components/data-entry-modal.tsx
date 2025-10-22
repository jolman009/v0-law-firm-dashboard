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
        <Button className="bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 hover:from-[#D4AF37] hover:to-[#B8941F] border border-gray-300 hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/30 text-gray-800 hover:text-black">
          <Plus className="w-4 h-4 mr-2" />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-[#0d0d0d] border-[#2d2d2d] text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Add New Data</DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#2d2d2d] pb-2">
          <button
            onClick={() => setActiveTab('lawyers')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'lawyers'
                ? 'bg-[#2d2d2d] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            Lawyers
          </button>
          <button
            onClick={() => setActiveTab('billable-hours')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'billable-hours'
                ? 'bg-[#2d2d2d] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            Billable Hours
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'clients'
                ? 'bg-[#2d2d2d] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('matters')}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === 'matters'
                ? 'bg-[#2d2d2d] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
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
