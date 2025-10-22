"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useData } from "@/lib/data-context"
import { useState } from "react"
import { ClientForm } from "@/components/forms/client-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Mail, Phone, Users } from "lucide-react"

export function ClientList() {
  const { data, dispatch } = useData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<string | null>(null)

  const handleEdit = (clientId: string) => {
    setEditingClient(clientId)
    setIsFormOpen(true)
  }

  const handleDelete = (clientId: string) => {
    const client = data.clients.find(c => c.id === clientId)
    if (confirm(`Are you sure you want to delete ${client?.name}?`)) {
      dispatch({ type: 'DELETE_CLIENT', payload: clientId })
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingClient(null)
  }

  return (
    <>
      <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Client Management</p>
              <CardTitle className="text-white mt-1">Clients</CardTitle>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#D4AF37] hover:to-[#B8941F] border border-gray-600 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20"
                  onClick={() => setEditingClient(null)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#1a1a1a] border-[#2d2d2d] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingClient ? 'Edit Client' : 'Add New Client'}
                  </DialogTitle>
                </DialogHeader>
                <ClientForm
                  onClose={handleCloseForm}
                  editClient={editingClient ? data.clients.find(c => c.id === editingClient) : undefined}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-400">Total Clients: {data.clients.length}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.clients.length > 0 ? (
              <div className="space-y-2">
                {data.clients.map((client) => (
                  <div
                    key={client.id}
                    className="bg-[#2d2d2d] rounded-lg p-4 hover:bg-[#1e3550] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                              {client.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{client.name}</h4>
                            <p className="text-xs text-gray-400">
                              Client since {new Date(client.acquisitionDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3 ml-13">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="truncate">{client.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{client.phone}</span>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-3 ml-13">
                          <div className="text-sm">
                            <span className="text-gray-400">Satisfaction: </span>
                            <span className="text-white font-medium">{client.satisfaction}/10</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Status: </span>
                            <span className={`font-medium ${client.retention ? 'text-green-400' : 'text-yellow-400'}`}>
                              {client.retention ? 'Retained' : 'At Risk'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(client.id)}
                          className="hover:bg-[#2a3f5a]"
                        >
                          <Edit className="w-4 h-4 text-[#D4AF37] hover:text-[#B8941F] transition-colors" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(client.id)}
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
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg mb-1">No clients yet</p>
                <p className="text-sm">Click "Add Client" to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
