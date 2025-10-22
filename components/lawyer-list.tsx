"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useData } from "@/lib/data-context"
import { useState } from "react"
import { LawyerForm } from "@/components/forms/lawyer-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Mail, Phone, Briefcase, DollarSign, UserCog } from "lucide-react"

export function LawyerList() {
  const { data, dispatch } = useData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingLawyer, setEditingLawyer] = useState<string | null>(null)

  const handleEdit = (lawyerId: string) => {
    setEditingLawyer(lawyerId)
    setIsFormOpen(true)
  }

  const handleDelete = (lawyerId: string) => {
    const lawyer = data.lawyers.find(l => l.id === lawyerId)
    if (confirm(`Are you sure you want to delete ${lawyer?.name}?`)) {
      dispatch({ type: 'DELETE_LAWYER', payload: lawyerId })
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingLawyer(null)
  }

  const activeLawyers = data.lawyers.filter(l => l.active).length

  return (
    <>
      <Card className="bg-[#1a1a1a] border-[#2d2d2d]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Team Management</p>
              <CardTitle className="text-white mt-1">Lawyers & Partners</CardTitle>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 hover:from-[#D4AF37] hover:to-[#B8941F] border border-gray-300 hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/30 text-gray-800 hover:text-black"
                  onClick={() => setEditingLawyer(null)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Lawyer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-[#1a1a1a] border-[#2d2d2d] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingLawyer ? 'Edit Lawyer' : 'Add New Lawyer'}
                  </DialogTitle>
                </DialogHeader>
                <LawyerForm
                  onClose={handleCloseForm}
                  editLawyer={editingLawyer ? data.lawyers.find(l => l.id === editingLawyer) : undefined}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-400">Total: {data.lawyers.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Active: {activeLawyers}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.lawyers.length > 0 ? (
              <div className="space-y-2">
                {data.lawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className={`bg-[#2d2d2d] rounded-lg p-4 hover:bg-[#1e3550] transition-colors ${
                      !lawyer.active ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            lawyer.active ? 'bg-green-600' : 'bg-gray-600'
                          }`}>
                            <span className="text-sm font-semibold text-white">
                              {lawyer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-medium">{lawyer.name}</h4>
                              {!lawyer.active && (
                                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <UserCog className="w-3 h-3" />
                              {lawyer.title}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 ml-13">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="truncate">{lawyer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{lawyer.phone}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-3 ml-13">
                          <div className="text-sm flex items-center gap-1">
                            <Briefcase className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-400">Specialization: </span>
                            <span className="text-white">{lawyer.specialization}</span>
                          </div>
                          <div className="text-sm flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-400">Rate: </span>
                            <span className="text-white font-medium">${lawyer.billableRate}/hr</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Since: </span>
                            <span className="text-white">
                              {new Date(lawyer.startDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(lawyer.id)}
                          className="hover:bg-[#2a3f5a]"
                          aria-label={`Edit ${lawyer.name}`}
                        >
                          <Edit className="w-4 h-4 text-[#D4AF37] hover:text-[#B8941F] transition-colors" aria-hidden="true" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(lawyer.id)}
                          className="hover:bg-[#2a3f5a]"
                          aria-label={`Delete ${lawyer.name}`}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <UserCog className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg mb-1">No lawyers yet</p>
                <p className="text-sm">Click "Add Lawyer" to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
