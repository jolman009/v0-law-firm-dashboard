# Authentication Setup Guide

This guide explains how to set up authentication for the Law Firm Dashboard using Supabase.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details:
   - Name: e.g., "Law Firm Dashboard"
   - Database Password: Choose a strong password
   - Region: Select the closest region to your users
4. Wait for the project to be created (takes about 2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project, go to **Settings** > **API**
2. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your actual Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-actual-key-here
   ```

3. Save the file. **Important:** `.env.local` is already in `.gitignore` and should never be committed to version control.

## Step 4: Set Up Authentication in Supabase

1. In your Supabase project, go to **Authentication** > **Settings**
2. Configure the following:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000` (for development)
3. For production, update these URLs to your actual domain

### Email Configuration (Optional but Recommended)

By default, Supabase uses a rate-limited development email service. For production:

1. Go to **Authentication** > **Email Templates**
2. Customize the email templates (optional)
3. Go to **Settings** > **Authentication** > **SMTP Settings**
4. Configure your own SMTP provider (e.g., SendGrid, Amazon SES, etc.)

## Step 5: Enable Email Confirmation (Optional)

By default, users can sign in immediately after signup. To require email confirmation:

1. Go to **Authentication** > **Settings**
2. Find "Enable email confirmations"
3. Toggle it on

## Step 6: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000 in your browser
3. You should see the login page
4. Click "Sign up" and create a test account
5. Check your email for the confirmation link (if email confirmation is enabled)
6. Sign in with your new account

## Step 7: Verify Users in Supabase

1. Go to **Authentication** > **Users** in your Supabase dashboard
2. You should see your newly created user account
3. You can manually verify emails, delete users, or manage user metadata here

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add your environment variables to your hosting platform:
   - Vercel: Go to Project Settings > Environment Variables
   - Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Update Supabase settings:
   - Go to **Authentication** > **Settings**
   - Update **Site URL** to your production domain (e.g., `https://yourdomain.com`)
   - Add your production domain to **Redirect URLs**

## Security Best Practices

1. **Never commit** your `.env.local` file to version control
2. **Use Row Level Security (RLS)** in Supabase to protect your data (see SUPABASE_INTEGRATION.md for details)
3. **Rotate your keys** if they're ever exposed
4. **Use SMTP** for production email instead of the development service
5. **Enable email confirmation** for production to prevent spam accounts

## Troubleshooting

### "Invalid credentials" error when signing in
- Double-check your email and password
- If using email confirmation, make sure you've clicked the confirmation link

### "Supabase is not configured" error
- Verify your `.env.local` file exists
- Check that the environment variable names are correct (they must start with `NEXT_PUBLIC_`)
- Restart your development server after adding environment variables

### Email not arriving
- Check your spam folder
- In development, emails can take a few minutes
- Check the Supabase logs: Go to **Authentication** > **Logs**

### Users can't access the dashboard after login
- Make sure the authentication is properly set up
- Check the browser console for errors
- Verify the Supabase URL and key are correct

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Authentication Guide](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
