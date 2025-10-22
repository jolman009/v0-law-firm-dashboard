# Netlify Deployment Guide

This guide will help you deploy your Law Firm Dashboard to Netlify.

## Prerequisites

- A Netlify account (sign up at https://netlify.com)
- Your GitHub repository connected to Netlify
- Supabase project set up (see AUTH_SETUP.md)

## Quick Deploy Steps

### 1. Import Your Repository to Netlify

1. Log in to your Netlify account
2. Click **"Add new site"** > **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository: `jolman009/v0-law-firm-dashboard`

### 2. Configure Build Settings

Netlify should auto-detect your Next.js project. Verify these settings:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`

Click **"Show advanced"** and add environment variables (see step 3).

### 3. Add Environment Variables

Add these environment variables in the "Environment variables" section:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Your Supabase anon/public key

You can find these values in your Supabase project:
- Go to https://app.supabase.com
- Select your project
- Settings > API
- Copy "Project URL" and "anon public" key

### 4. Deploy

Click **"Deploy site"** and wait for the build to complete (usually 2-3 minutes).

## Post-Deployment Steps

### 1. Update Supabase Settings

Once your site is deployed, update your Supabase authentication settings:

1. Go to your Supabase project
2. Navigate to **Authentication** > **URL Configuration**
3. Update the following:
   - **Site URL**: `https://your-site-name.netlify.app` (your Netlify URL)
   - **Redirect URLs**: Add `https://your-site-name.netlify.app/**`

### 2. Configure Custom Domain (Optional)

If you want to use a custom domain:

1. In Netlify, go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow the instructions to configure DNS
4. Don't forget to update Supabase settings with your custom domain!

## Troubleshooting

### Build Fails with Dependency Errors

If you see errors about peer dependencies:
- The `.npmrc` file should resolve this automatically
- Make sure both `.npmrc` and `netlify.toml` are in your repository

### Environment Variables Not Working

- Make sure variable names start with `NEXT_PUBLIC_` (required for Next.js)
- Redeploy after adding environment variables
- Check spelling and ensure no extra spaces

### Authentication Not Working After Deployment

1. Verify environment variables are set correctly in Netlify
2. Check that Supabase Site URL and Redirect URLs match your Netlify domain
3. Clear browser cache and try again

### 404 Errors on Page Refresh

This should be handled by the Next.js plugin. If you still see 404s:
- Verify `@netlify/plugin-nextjs` is in your `netlify.toml`
- Check that Next.js version is compatible (you're using Next.js 15)

## Manual Redeploy

To trigger a new deployment:

1. Go to your Netlify site dashboard
2. Click **"Deploys"** tab
3. Click **"Trigger deploy"** > **"Deploy site"**

Or simply push changes to your GitHub repository - Netlify will auto-deploy!

## Monitoring

Monitor your deployment:
- **Build logs**: Deploys tab > Click on a deploy
- **Function logs**: Functions tab
- **Analytics**: Analytics tab (requires enabling)

## Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] Supabase URLs updated with production domain
- [ ] Email confirmation enabled in Supabase (recommended)
- [ ] SMTP configured for production emails
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Netlify)
- [ ] Test authentication flow completely
- [ ] Test all CRUD operations

## Additional Resources

- [Netlify Next.js Documentation](https://docs.netlify.com/frameworks/next-js/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Support

If you encounter issues:
- Check Netlify build logs for specific errors
- Review Supabase auth logs
- Ensure all environment variables are set correctly
