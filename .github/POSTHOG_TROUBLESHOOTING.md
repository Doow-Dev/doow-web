# PostHog Troubleshooting Guide

## Issue: "PostHog key not found" on Azure deployment

### Root Cause
The `NEXT_PUBLIC_*` environment variables must be available **at build time**, not runtime. If Azure Static Web Apps rebuilds your app without these variables, PostHog won't work.

### Step-by-Step Fix

#### 1. Verify GitHub Secrets Are Set ✅

Check your GitHub Actions workflow logs. You should see:
```
✅ NEXT_PUBLIC_POSTHOG_KEY is set
✅ NEXT_PUBLIC_POSTHOG_HOST is set
```

If you see warnings instead:
1. Go to: **GitHub Repository → Settings → Secrets and variables → Actions**
2. Add these secrets:
   - `NEXT_PUBLIC_POSTHOG_KEY` = `phc_V6I6bimhG3mzVQpzbmFtiqSaoLuFuTvrASUDNYNJXnC`
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com`

#### 2. Check Azure Portal Configuration

Azure Static Web Apps might be rebuilding your app. Check:

1. Go to **Azure Portal → Your Static Web App → Configuration**
2. Under **Application settings**, verify if there are any build commands
3. If Azure is configured to build, you may need to:
   - Disable Azure's build (use pre-built output)
   - OR configure Azure's build to use the same environment variables

#### 3. Verify Build Output

After pushing to `main`, check the GitHub Actions logs:
- Look for the "Build Next.js app" step
- Verify it shows: "Building with PostHog environment variables..."
- Check if the build completes successfully

#### 4. Test Locally First

Before deploying, test locally:

```bash
# Set environment variables
export NEXT_PUBLIC_POSTHOG_KEY=phc_V6I6bimhG3mzVQpzbmFtiqSaoLuFuTvrASUDNYNJXnC
export NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Build
npm run build

# Check if PostHog is in the build
grep -r "NEXT_PUBLIC_POSTHOG_KEY" .next/static || echo "Not found in static files"
```

#### 5. Alternative: Use Runtime Configuration (Not Recommended)

If Azure keeps rebuilding, you could use a runtime config file, but this is less secure:

1. Create `public/posthog-config.js`:
```javascript
window.__POSTHOG_CONFIG__ = {
  key: 'phc_V6I6bimhG3mzVQpzbmFtiqSaoLuFuTvrASUDNYNJXnC',
  host: 'https://us.i.posthog.com'
};
```

2. Update PostHogProvider to read from window:
```typescript
const config = typeof window !== 'undefined' ? (window as any).__POSTHOG_CONFIG__ : null;
const posthogKey = config?.key || process.env.NEXT_PUBLIC_POSTHOG_KEY;
```

**Note:** This exposes your key publicly. Only use if necessary.

### Quick Checklist

- [ ] GitHub secrets are set (`NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`)
- [ ] GitHub Actions workflow shows secrets are detected
- [ ] Build step completes successfully
- [ ] Azure Portal doesn't have conflicting build configuration
- [ ] New deployment triggered after adding secrets

### Still Not Working?

1. Check browser console on deployed site
2. Check Network tab for PostHog requests
3. Verify the built JavaScript files contain the PostHog key (check `.next/static` in build artifacts)
4. Ensure you've pushed a new commit after adding secrets (old builds won't have the vars)

