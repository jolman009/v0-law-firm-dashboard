# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Law Firm Dashboard** application built with Next.js 15, React 19, and TypeScript. Originally generated with v0.app, it provides analytics and data management for law firm operations including billable hours tracking, client management, and matter tracking.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Key Architecture Patterns

### Authentication - Supabase Auth

The application uses **Supabase Authentication** for user management (`lib/auth-context.tsx`):

- **AuthProvider**: Wraps the entire application to provide authentication state
- **useAuth() hook**: Access user, session, and auth functions from any component
- **ProtectedRoute**: Component wrapper that requires authentication
- **Auth pages**: Login and signup forms in `components/auth/`

Authentication flow:
1. User visits app and sees login/signup page (if not authenticated)
2. User signs in or creates account via Supabase
3. AuthProvider manages session state
4. ProtectedRoute grants access to dashboard
5. Logout button in navigation sidebar

Setup requirements:
- Supabase project with authentication enabled
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- See `AUTH_SETUP.md` for detailed setup instructions

### State Management - Data Context Pattern

The application uses a **centralized React Context with useReducer** for all data management (`lib/data-context.tsx`):

- **DataProvider**: Wraps the entire application at the root level (app/page.tsx)
- **useData() hook**: Access data and dispatch actions from any component
- **localStorage persistence**: All data automatically syncs to localStorage on changes
- **Reducer actions**: ADD, UPDATE, DELETE for three entity types: billableHours, clients, matters

Key data types:
- `BillableHoursEntry`: Tracks lawyer time entries
- `ClientEntry`: Client information with satisfaction/retention metrics
- `MatterEntry`: Legal matters linked to clients via clientId

Usage pattern in components:
```typescript
const { data, dispatch } = useData()
dispatch({ type: 'ADD_CLIENT', payload: newClient })
```

### Component Structure

**Dashboard Layout** (app/page.tsx):
- Left sidebar: Fixed navigation panel with scroll-to links
- Main content: 3-column grid of metric cards/charts
- All sections wrapped in DataProvider

**UI Components**:
- Based on shadcn/ui (Radix UI primitives)
- Custom styled with dark theme (`bg-[#0f1f3a]`, `border-[#1a2f4a]`)
- Located in `components/ui/`

**Feature Components**:
- Each metric has its own component (e.g., `billable-hours-table.tsx`)
- Forms in `components/forms/` use Dialog components for modal editing
- All components are client components (`"use client"`)

### Forms and CRUD Operations

Forms follow this pattern:
1. Dialog wrapper for modal UI
2. Form component accepts `onClose` and optional `editEntry` props
3. Uses useData hook to dispatch ADD/UPDATE actions
4. Client/Matter dropdowns populated from context data

## Styling

- **Tailwind CSS v4** with custom dark theme
- **Geist Font** (sans and mono variants)
- Color scheme: Dark blues (`#0a1628`, `#0f1f3a`, `#1a2f4a`)
- Uses `tailwind-merge` for className composition

## Data Flow

1. User opens form (via Dialog trigger button)
2. Form submission dispatches action to reducer
3. Reducer updates state immutably
4. useEffect in DataProvider persists to localStorage
5. Components re-render with new data via context

## Build Configuration

- TypeScript strict mode enabled
- ESLint and TypeScript errors ignored during builds (next.config.mjs)
- Images unoptimized for static export compatibility
- Path alias: `@/*` maps to project root

## Important Notes

- This project syncs with v0.app - changes from v0 will be automatically pushed
- **Authentication required**: Users must sign in via Supabase to access the dashboard
- Currently using localStorage for data (can be migrated to Supabase database - see `SUPABASE_INTEGRATION.md`)
- Vercel Analytics integrated in root layout
- All components must be client-side due to state management
- Supabase client (`@supabase/supabase-js`) installed and configured in `lib/supabase.ts`
