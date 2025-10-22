# Supabase Integration Guide

This guide explains how to migrate from localStorage to Supabase for persistent database storage.

## Prerequisites

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Get your project URL and anon key from Settings > API

## Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 2: Create Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 3: Add Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** Add `.env.local` to your `.gitignore`

## Step 4: Create Database Tables

In Supabase SQL Editor, run:

```sql
-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  acquisition_date DATE NOT NULL,
  satisfaction INTEGER CHECK (satisfaction >= 1 AND satisfaction <= 10),
  retention BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matters table
CREATE TABLE matters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  value NUMERIC(10, 2) NOT NULL,
  status TEXT CHECK (status IN ('active', 'completed', 'on-hold')),
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Billable Hours table
CREATE TABLE billable_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lawyer TEXT NOT NULL,
  date DATE NOT NULL,
  hours NUMERIC(5, 2) NOT NULL,
  matter TEXT NOT NULL,
  client TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE matters ENABLE ROW LEVEL SECURITY;
ALTER TABLE billable_hours ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - customize based on your auth needs)
CREATE POLICY "Enable all operations for clients" ON clients FOR ALL USING (true);
CREATE POLICY "Enable all operations for matters" ON matters FOR ALL USING (true);
CREATE POLICY "Enable all operations for billable_hours" ON billable_hours FOR ALL USING (true);
```

## Step 5: Update Data Context

Replace `lib/data-context.tsx` with Supabase operations:

```typescript
"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from './supabase'

// Keep existing type definitions...
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

export interface DashboardData {
  billableHours: BillableHoursEntry[]
  clients: ClientEntry[]
  matters: MatterEntry[]
}

// ... keep existing action types and reducer ...

const DataContext = createContext<{
  data: DashboardData
  dispatch: React.Dispatch<DataAction>
  loading: boolean
} | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(dataReducer, initialState)
  const [loading, setLoading] = React.useState(true)

  // Load data from Supabase on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      const [clientsRes, mattersRes, hoursRes] = await Promise.all([
        supabase.from('clients').select('*'),
        supabase.from('matters').select('*'),
        supabase.from('billable_hours').select('*')
      ])

      if (clientsRes.error) throw clientsRes.error
      if (mattersRes.error) throw mattersRes.error
      if (hoursRes.error) throw hoursRes.error

      // Transform database format to app format
      const clients = clientsRes.data.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        acquisitionDate: c.acquisition_date,
        satisfaction: c.satisfaction,
        retention: c.retention
      }))

      const matters = mattersRes.data.map(m => ({
        id: m.id,
        clientId: m.client_id,
        title: m.title,
        value: m.value,
        status: m.status,
        startDate: m.start_date,
        endDate: m.end_date
      }))

      const billableHours = hoursRes.data.map(h => ({
        id: h.id,
        lawyer: h.lawyer,
        date: h.date,
        hours: h.hours,
        matter: h.matter,
        client: h.client,
        description: h.description
      }))

      dispatch({
        type: 'LOAD_DATA',
        payload: { clients, matters, billableHours }
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sync operations to Supabase
  useEffect(() => {
    if (loading) return // Don't sync during initial load

    const lastAction = // track last action type
    syncToSupabase(lastAction)
  }, [data])

  return (
    <DataContext.Provider value={{ data, dispatch, loading }}>
      {children}
    </DataContext.Provider>
  )
}

// Helper functions for Supabase operations
export async function addClient(client: Omit<ClientEntry, 'id'>) {
  const { data, error } = await supabase
    .from('clients')
    .insert({
      name: client.name,
      email: client.email,
      phone: client.phone,
      acquisition_date: client.acquisitionDate,
      satisfaction: client.satisfaction,
      retention: client.retention
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateClient(id: string, client: Partial<ClientEntry>) {
  const { error } = await supabase
    .from('clients')
    .update({
      name: client.name,
      email: client.email,
      phone: client.phone,
      acquisition_date: client.acquisitionDate,
      satisfaction: client.satisfaction,
      retention: client.retention
    })
    .eq('id', id)

  if (error) throw error
}

export async function deleteClient(id: string) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Similar functions for matters and billable hours...
```

## Step 6: Update Forms

Modify forms to use async operations:

```typescript
// Example for ClientForm
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    if (editClient) {
      await updateClient(editClient.id, formData)
      dispatch({ type: 'UPDATE_CLIENT', payload: { id: editClient.id, ...formData } })
    } else {
      const newClient = await addClient(formData)
      dispatch({ type: 'ADD_CLIENT', payload: newClient })
    }
    onClose()
  } catch (error) {
    console.error('Error saving client:', error)
    alert('Failed to save client')
  }
}
```

## Step 7: Add Real-time Subscriptions (Optional)

For live updates across tabs/users:

```typescript
useEffect(() => {
  // Subscribe to clients changes
  const clientsSubscription = supabase
    .channel('clients-changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'clients' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          dispatch({ type: 'ADD_CLIENT', payload: transformClient(payload.new) })
        } else if (payload.eventType === 'UPDATE') {
          dispatch({ type: 'UPDATE_CLIENT', payload: transformClient(payload.new) })
        } else if (payload.eventType === 'DELETE') {
          dispatch({ type: 'DELETE_CLIENT', payload: payload.old.id })
        }
      }
    )
    .subscribe()

  return () => {
    clientsSubscription.unsubscribe()
  }
}, [])
```

## Benefits of Supabase Integration

✅ **Persistent Storage** - Data survives browser clears and works across devices
✅ **Real-time Sync** - Multiple users can collaborate simultaneously
✅ **Scalable** - Production-ready PostgreSQL database
✅ **Authentication** - Add user auth with minimal code
✅ **Backup & Recovery** - Automatic backups and point-in-time recovery
✅ **API Ready** - Built-in REST and GraphQL APIs

## Migration Strategy

1. **Dual Storage**: Initially save to both localStorage and Supabase
2. **Data Export**: Export existing localStorage data to JSON
3. **Bulk Import**: Import JSON data to Supabase tables
4. **Remove localStorage**: Once verified, remove localStorage code
5. **Add Auth**: Implement user authentication for multi-user support

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
