"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useData } from "@/lib/data-context"
import { useState } from "react"
import { MatterForm } from "@/components/forms/matter-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Briefcase, DollarSign } from "lucide-react"

export function MatterList() {
  const { data, dispatch } = useData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMatter, setEditingMatter] = useState<string | null>(null)

  const handleEdit = (matterId: string) => {
    setEditingMatter(matterId)
    setIsFormOpen(true)
  }

  const handleDelete = (matterId: string) => {
    const matter = data.matters.find(m => m.id === matterId)
    if (confirm(`Are you sure you want to delete "${matter?.title}"?`)) {
      dispatch({ type: 'DELETE_MATTER', payload: matterId })
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingMatter(null)
  }

  const getClientName = (clientId: string) => {
    const client = data.clients.find(c => c.id === clientId)
    return client?.name || 'Unknown Client'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'completed':
        return 'bg-blue-500'
      case 'on-hold':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'completed':
        return 'Completed'
      case 'on-hold':
        return 'On Hold'
      default:
        return status
    }
  }

  return (
    <>
      <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Matter Management</p>
              <CardTitle className="text-white mt-1">Matters</CardTitle>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#D4AF37] hover:to-[#B8941F] border border-gray-600 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                  onClick={() => setEditingMatter(null)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Matter
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#1a1a1a] border-[#2d2d2d] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingMatter ? 'Edit Matter' : 'Add New Matter'}
                  </DialogTitle>
                </DialogHeader>
                <MatterForm
                  onClose={handleCloseForm}
                  editMatter={editingMatter ? data.matters.find(m => m.id === editingMatter) : undefined}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-xs text-gray-400">Total Matters: {data.matters.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                Active: {data.matters.filter(m => m.status === 'active').length}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.matters.length > 0 ? (
              <div className="space-y-2">
                {data.matters.map((matter) => (
                  <div
                    key={matter.id}
                    className="bg-[#2d2d2d] rounded-lg p-4 hover:bg-[#1e3550] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{matter.title}</h4>
                            <p className="text-xs text-gray-400">{getClientName(matter.clientId)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(matter.status)}`} />
                            <span className="text-xs text-gray-300">{getStatusLabel(matter.status)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-3 ml-13">
                          <div className="text-sm">
                            <span className="text-gray-400">Value: </span>
                            <span className="text-white font-medium flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {matter.value.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Start: </span>
                            <span className="text-white">
                              {new Date(matter.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          {matter.endDate && (
                            <div className="text-sm">
                              <span className="text-gray-400">End: </span>
                              <span className="text-white">
                                {new Date(matter.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-1 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(matter.id)}
                          className="hover:bg-[#2a3f5a]"
                        >
                          <Edit className="w-4 h-4 text-[#D4AF37] hover:text-[#B8941F] transition-colors" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(matter.id)}
                          className="hover:bg-[#2a3f5a]"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg mb-1">No matters yet</p>
                <p className="text-sm">Click "Add Matter" to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
