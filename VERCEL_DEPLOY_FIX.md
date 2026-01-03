# Fix 404 Error on Vercel Deployment

## Problem
Website returns 404 NOT_FOUND on Vercel production.

## Solution - Follow These Steps:

### Step 1: Check Vercel Project Settings
Go to your Vercel Dashboard → Your Project → Settings → General

Make sure:
- **Framework Preset**: `Astro`
- **Build Command**: `npm run build` (or leave empty for auto-detect)
- **Output Directory**: Leave empty (Astro adapter handles this)
- **Install Command**: `npm install`

### Step 2: Set Environment Variables
Go to Settings → Environment Variables and add:

```
CONTENTFUL_SPACE_ID = hbrrn0bf99r5
CONTENTFUL_ACCESS_TOKEN = EbDxRUiUgumNFLj_fyLC40Fn5z0wQwtaDzEeBBfX8So
CONTENTFUL_PREVIEW_TOKEN = P1MbEa9EjwdeEzQMLZze_cN1VkBSQXaynehvAJzqzFI
CONTENTFUL_ENVIRONMENT = master
SITE_URL = https://muhamadaliridho.me
```

Make sure to select "Production", "Preview", and "Development" for each variable.

### Step 3: Redeploy
1. Go to Deployments tab
2. Click on the latest deployment
3. Click "..." menu → "Redeploy"
4. Check "Use existing Build Cache" = OFF (uncheck it)
5. Click "Redeploy"

### Step 4: If Still 404
Try deleting the project and re-importing:
1. Go to Settings → Advanced → Delete Project
2. Go to Vercel Dashboard → Add New → Project
3. Import your GitHub repo
4. Vercel should auto-detect Astro
5. Add environment variables before deploying
6. Deploy

## Alternative: Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (will prompt for settings)
vercel --prod
```

## Contentful Webhook Setup (for instant updates)
After deployment works, set up webhook in Contentful:
1. Go to Contentful → Settings → Webhooks
2. Add webhook URL: `https://muhamadaliridho.me/api/webhook/contentful`
3. Trigger on: Entry publish, unpublish, delete
