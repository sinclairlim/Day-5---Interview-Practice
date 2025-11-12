# Deployment Guide - Vercel

## Quick Deploy (Recommended)

### Method 1: Deploy from GitHub (Easiest)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Done!** Your app will be live at `your-project-name.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - Project name? (Press enter for default)
   - In which directory is your code? ./
   - Auto-detected settings? Yes

5. **Production Deploy**:
   ```bash
   vercel --prod
   ```

## Configuration

The project includes `vercel.json` with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Environment Variables

If you need environment variables:

1. Create `.env` file locally (already in .gitignore)
2. Add variables in Vercel Dashboard:
   - Project Settings → Environment Variables
   - Add your variables
   - Redeploy

## Custom Domain

1. Go to your project in Vercel
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as shown
5. Wait for propagation (usually instant)

## Automatic Deployments

Once connected to GitHub:
- **Push to main branch** → Automatic production deploy
- **Push to other branches** → Preview deployment
- **Pull requests** → Automatic preview URLs

## Build Logs

View build logs in Vercel dashboard:
- Deployments tab
- Click on any deployment
- See real-time build logs

## Rollback

If something breaks:
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

## Performance

Vercel provides automatic:
- CDN distribution
- SSL certificates
- Compression
- Edge caching
- DDoS protection

## Monitoring

Check your app's performance:
- Analytics tab in Vercel dashboard
- Real-time visitor stats
- Web vitals metrics
- Geographic distribution

## Troubleshooting

### Build Fails

Check:
- `npm run build` works locally
- All dependencies in package.json
- TypeScript errors resolved
- Review build logs in Vercel

### 404 Errors

- Ensure `dist` folder is being deployed
- Check outputDirectory in vercel.json
- Verify index.html exists in dist

### Environment Variables Not Working

- Prefix with `VITE_` for Vite apps
- Redeploy after adding variables
- Check spelling and casing

## Cost

- **Free tier** includes:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Custom domains
  - SSL certificates
  - Perfect for this project!

## Next Steps After Deploy

1. Test your production URL
2. Share with friends
3. Add to your portfolio
4. Consider adding analytics
5. Monitor performance

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/vercel/vercel/discussions)

---

Your Interview Practice app is now live and ready to help you prepare for technical interviews!
