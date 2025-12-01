# Deploying Maddy Website to cPanel

## Prerequisites
- cPanel account with Node.js support
- SSH access (recommended) or File Manager access
- Domain configured in cPanel

## Step 1: Build the Production Application

Run these commands locally:

```bash
cd /Users/jace/Desktop/Maddy/landing-page

# Install dependencies (if not already done)
npm install

# Build the production version
npm run build
```

This creates an optimized production build in the `.next` folder.

## Step 2: Prepare Environment Variables

Create a `.env.production` file in your project root with:

```env
SMTP_HOST=syn232.syd4.hostyourservices.net
SMTP_PORT=465
SMTP_USER=hello@callmaddy.au
SMTP_PASS=$]c[v^bLSnOH
SMTP_FROM=hello@callmaddy.au
```

**Important**: Do NOT commit this file to Git. Add it to `.gitignore`.

## Step 3: Upload Files to cPanel

### Option A: Using SSH (Recommended)

1. Connect to your cPanel via SSH:
   ```bash
   ssh username@yourdomain.com
   ```

2. Navigate to your web directory:
   ```bash
   cd public_html  # or your domain's directory
   ```

3. From your local machine, upload files using rsync or scp:
   ```bash
   rsync -avz --exclude 'node_modules' --exclude '.git' \
     /Users/jace/Desktop/Maddy/landing-page/ \
     username@yourdomain.com:~/public_html/
   ```

### Option B: Using cPanel File Manager

1. Compress your project locally (excluding `node_modules` and `.git`):
   ```bash
   cd /Users/jace/Desktop/Maddy/landing-page
   tar -czf maddy-website.tar.gz \
     --exclude='node_modules' \
     --exclude='.git' \
     --exclude='.next' \
     .
   ```

2. Upload `maddy-website.tar.gz` via cPanel File Manager
3. Extract the archive in your web directory

## Step 4: Set Up Node.js in cPanel

1. Log into cPanel
2. Go to **"Setup Node.js App"** (or "Application Manager")
3. Click **"Create Application"**
4. Configure:
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: `/home/username/public_html` (or your directory)
   - **Application URL**: Your domain
   - **Application startup file**: `server.js` (we'll create this)

## Step 5: Create Custom Server File

Create `server.js` in your project root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
```

## Step 6: Install Dependencies on Server

Via SSH or cPanel Terminal:

```bash
cd ~/public_html  # your application directory
npm install --production
```

## Step 7: Set Environment Variables in cPanel

1. In the Node.js App setup, add environment variables:
   - `SMTP_HOST`: syn232.syd4.hostyourservices.net
   - `SMTP_PORT`: 465
   - `SMTP_USER`: hello@callmaddy.au
   - `SMTP_PASS`: $]c[v^bLSnOH
   - `SMTP_FROM`: hello@callmaddy.au
   - `NODE_ENV`: production

## Step 8: Start the Application

1. In cPanel Node.js App interface, click **"Start App"**
2. The app should now be running

## Step 9: Configure .htaccess (if needed)

If using a subdirectory or need to proxy requests, create/edit `.htaccess`:

```apache
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:PORT_NUMBER/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:PORT_NUMBER/$1 [P,L]
```

Replace `PORT_NUMBER` with the port assigned by cPanel.

## Step 10: Verify Deployment

1. Visit your domain
2. Test the waitlist form
3. Check that emails are being sent

## Troubleshooting

### Application won't start
- Check Node.js version (needs 18+)
- Verify all dependencies installed
- Check error logs in cPanel

### Emails not sending
- Verify environment variables are set correctly
- Check SMTP credentials
- Review application logs

### 404 errors
- Ensure `.htaccess` is configured correctly
- Verify application is running
- Check file permissions (755 for directories, 644 for files)

## Alternative: Static Export (Simpler but no API routes)

If you don't need the email functionality server-side, you can export as static HTML:

```bash
# Add to next.config.js
output: 'export'

# Build
npm run build

# Upload only the 'out' folder to cPanel
```

**Note**: This won't work with the `/api/waitlist` endpoint. You'd need to use a third-party form service.

## Recommended Approach for cPanel

Since cPanel can be tricky with Node.js apps, consider:
1. Use Vercel (free, optimized for Next.js)
2. Use Netlify (free tier available)
3. Use a VPS with better Node.js support

These platforms handle Next.js deployment automatically and are more reliable than cPanel for Node.js applications.
