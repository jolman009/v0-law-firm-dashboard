"use client"

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { supabase } from './supabase'

// Data types
export interface BillableHoursEntry {
  id: string
  lawyer: string
  date: string
  hours: number
  matter: string
  client: string
  description: string
}

export interface ClientEntry {
  id: string
  name: string
  email: string
  phone: string
  acquisitionDate: string
  satisfaction: number
  retention: boolean
}

export interface MatterEntry {
  id: string
  clientId: string
  title: string
  value: number
  status: 'active' | 'completed' | 'on-hold'
  startDate: string
  endDate?: string
}

export interface LawyerEntry {
  id: string
  name: string
  email: string
  phone: string
  title: string
  specialization: string
  billableRate: number
  billableHoursTarget: number
  startDate: string
  active: boolean
}

export interface DashboardData {
  billableHours: BillableHoursEntry[]
  clients: ClientEntry[]
  matters: MatterEntry[]
  lawyers: LawyerEntry[]
}

// Action types
type DataAction =
  | { type: 'ADD_BILLABLE_HOURS'; payload: BillableHoursEntry }
  | { type: 'ADD_CLIENT'; payload: ClientEntry }
  | { type: 'ADD_MATTER'; payload: MatterEntry }
  | { type: 'ADD_LAWYER'; payload: LawyerEntry }
  | { type: 'UPDATE_BILLABLE_HOURS'; payload: BillableHoursEntry }
  | { type: 'UPDATE_CLIENT'; payload: ClientEntry }
  | { type: 'UPDATE_MATTER'; payload: MatterEntry }
  | { type: 'UPDATE_LAWYER'; payload: LawyerEntry }
  | { type: 'DELETE_BILLABLE_HOURS'; payload: string }
  | { type: 'DELETE_CLIENT'; payload: string }
  | { type: 'DELETE_MATTER'; payload: string }
  | { type: 'DELETE_LAWYER'; payload: string }
  | { type: 'LOAD_DATA'; payload: DashboardData }

// Initial state
const initialState: DashboardData = {
  billableHours: [],
  clients: [],
  matters: [],
  lawyers: []
}

// Reducer
function dataReducer(state: DashboardData, action: DataAction): DashboardData {
  switch (action.type) {
    case 'ADD_BILLABLE_HOURS':
      return {
        ...state,
        billableHours: [...state.billableHours, action.payload]
      }
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.payload]
      }
    case 'ADD_MATTER':
      return {
        ...state,
        matters: [...state.matters, action.payload]
      }
    case 'ADD_LAWYER':
      return {
        ...state,
        lawyers: [...state.lawyers, action.payload]
      }
    case 'UPDATE_BILLABLE_HOURS':
      return {
        ...state,
        billableHours: state.billableHours.map((item: BillableHoursEntry) =>
          item.id === action.payload.id ? action.payload : item
        )
      }
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map((item: ClientEntry) =>
          item.id === action.payload.id ? action.payload : item
        )
      }
    case 'UPDATE_MATTER':
      return {
        ...state,
        matters: state.matters.map((item: MatterEntry) =>
          item.id === action.payload.id ? action.payload : item
        )
      }
    case 'UPDATE_LAWYER':
      return {
        ...state,
        lawyers: state.lawyers.map((item: LawyerEntry) =>
          item.id === action.payload.id ? action.payload : item
        )
      }
    case 'DELETE_BILLABLE_HOURS':
      return {
        ...state,
        billableHours: state.billableHours.filter((item: BillableHoursEntry) => item.id !== action.payload)
      }
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter((item: ClientEntry) => item.id !== action.payload)
      }
    case 'DELETE_MATTER':
      return {
        ...state,
        matters: state.matters.filter((item: MatterEntry) => item.id !== action.payload)
      }
    case 'DELETE_LAWYER':
      return {
        ...state,
        lawyers: state.lawyers.filter((item: LawyerEntry) => item.id !== action.payload)
      }
    case 'LOAD_DATA':
      return {
        ...initialState,
        ...action.payload,
        // Ensure lawyers array exists for backward compatibility
        lawyers: action.payload.lawyers || []
      }
    default:
      return state
  }
}

// Context
const DataContext = createContext<{
  data: DashboardData
  dispatch: React.Dispatch<DataAction>
  loading: boolean
} | null>(null)

// Provider component
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(dataReducer, initialState)
  const [loading, setLoading] = useState(true)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('lawfirm-dashboard-data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_DATA', payload: parsedData })
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
    setLoading(false)
  }, [])

  // Save data to localStorage whenever data changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('lawfirm-dashboard-data', JSON.stringify(data))
    }
  }, [data, loading])

  return (
    <DataContext.Provider value={{ data, dispatch, loading }}>
      {children}
    </DataContext.Provider>
  )
}

// Hook to use the context
export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

// Utility functions for calculations
export function calculateTotalBillableHours(data: DashboardData, lawyer?: string) {
  return data.billableHours
    .filter(entry => !lawyer || entry.lawyer === lawyer)
    .reduce((total, entry) => total + entry.hours, 0)
}

export function calculateRevenue(data: DashboardData) {
  return data.matters
    .filter(matter => matter.status === 'completed')
    .reduce((total, matter) => total + matter.value, 0)
}

export function getClientCount(data: DashboardData) {
  return data.clients.length
}

export function getActiveMattersCount(data: DashboardData) {
  return data.matters.filter(matter => matter.status === 'active').length
}
