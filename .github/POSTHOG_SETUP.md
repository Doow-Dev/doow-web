# PostHog Environment Variables Setup for GitHub Actions

## Required GitHub Secrets

To enable PostHog tracking in your Azure Static Web Apps deployment, you need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Required Secrets:

- **Name**: `NEXT_PUBLIC_POSTHOG_KEY`
  - **Value**: `phc_V6I6bimhG3mzVQpzbmFtiqSaoLuFuTvrASUDNYNJXnC`
  - This is your PostHog Project API Key

- **Name**: `NEXT_PUBLIC_POSTHOG_HOST`
  - **Value**: `https://us.i.posthog.com`
  - This is your PostHog API host URL

## How It Works

The GitHub Actions workflow (`azure-static-web-apps-orange-flower-0fdd6820f.yml`) has been configured to:

1. Set up Node.js environment
2. Install dependencies
3. Build the Next.js app with PostHog environment variables
4. Deploy to Azure Static Web Apps

The environment variables are injected during the build step, which is necessary because Next.js embeds `NEXT_PUBLIC_*` variables into the static files at build time.

## Verification

After adding the secrets and pushing to the `main` branch:

1. Check the GitHub Actions workflow run
2. Verify the build step completes successfully
3. Check your PostHog dashboard to see if events are being tracked

## Notes

- These secrets are only used during the build process and are not exposed in the deployed application
- The PostHog key is write-only and safe to use in public repositories
- Make sure to add these secrets before deploying, otherwise PostHog tracking won't work in production

