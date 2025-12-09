# Deploying Maddy Website to DigitalOcean App Platform

## Prerequisites
- DigitalOcean account
- GitHub repository connected to DigitalOcean
- SMTP2GO account with API key
- HubSpot account with API key
- Google reCAPTCHA v3 keys

## Environment Variables Required

Set these in your DigitalOcean App Platform settings:

```env
# SMTP2GO API (for sending emails)
SMTP2GO_API_KEY=api-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# HubSpot CRM (for lead management)
HUBSPOT_API_KEY=pat-xx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# reCAPTCHA v3 (for spam protection)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Node environment
NODE_ENV=production
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy changes"
git push origin main
```

### 2. DigitalOcean Auto-Deploy
If connected to GitHub, DigitalOcean will automatically:
1. Detect the push
2. Run `npm install`
3. Run `npm run build`
4. Deploy the application

### 3. Manual Deploy (if needed)
1. Go to DigitalOcean App Platform
2. Select your app
3. Click "Deploy" or "Force Rebuild & Deploy"

## Setting Up Environment Variables in DigitalOcean

1. Go to your App in DigitalOcean
2. Click "Settings"
3. Scroll to "App-Level Environment Variables"
4. Add each variable listed above
5. Save and redeploy

## Verifying Deployment

1. Visit your domain
2. Test the waitlist form submission
3. Verify emails are received:
   - User confirmation email (via SMTP2GO template)
   - Sales notification email (via SMTP2GO)
4. Check HubSpot for new contact creation
5. Verify reCAPTCHA is working (check Google reCAPTCHA admin console)

## Troubleshooting

### Emails not sending
- Verify SMTP2GO_API_KEY is correct (format: `api-XXXXXXXX...`)
- Check SMTP2GO dashboard for delivery status
- Verify sender domain is verified in SMTP2GO

### HubSpot not receiving leads
- Verify HUBSPOT_API_KEY is a Private App token
- Check HubSpot has required contact properties
- Review API logs in HubSpot

### reCAPTCHA failing
- Ensure your production domain is added to reCAPTCHA settings
- Verify both site key and secret key are set
- Check reCAPTCHA admin console for error details

### Build failures
- Check DigitalOcean build logs
- Ensure Node.js version is 18+
- Verify all dependencies are in package.json
