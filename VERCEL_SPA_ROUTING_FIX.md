# Vercel SPA Routing Fix

## Problem
When deploying a React Single Page Application (SPA) to Vercel, you get **404 errors** when:
- Opening the app in incognito mode
- Opening the app in a different browser
- Directly accessing routes like `/users`, `/users/add`, etc.
- Refreshing the page on any route other than `/`

## Why This Happens
- **In development**: Vite dev server automatically handles client-side routing
- **In production**: Vercel looks for actual files/folders matching the route
- **Example**: When you visit `/users`, Vercel looks for `/users/index.html` (doesn't exist) → 404 error
- **React Router** expects to handle routing on the client side, but never gets the chance

## Solution
Create a `vercel.json` file in the **root of your frontend project** (same level as `package.json`):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Alternative Solution
Create a `_redirects` file in the `public/` folder:

```
/*    /index.html   200
```

## What This Does
- **Tells Vercel**: For ANY route (`/(.*)`), serve the `index.html` file
- **Lets React Router**: Handle the routing on the client side
- **Result**: All routes work correctly in production

## File Placement
- ✅ `vercel.json` → Root of frontend project
- ✅ `public/_redirects` → Inside public folder
- ❌ Don't put in backend folder (backend uses different hosting)

## After Adding These Files
1. Commit and push to GitHub
2. Vercel automatically redeploys
3. All routes work in any browser/mode

## Remember
This is needed for **ANY React SPA** deployed to Vercel that uses client-side routing (React Router, Next.js App Router, etc.).