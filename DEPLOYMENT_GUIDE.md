# Deployment Guide - Dehradun Bike Rentals Website

This guide covers different deployment options for your bike rental website.

## 🌐 Deployment Options

### 1. Netlify (Recommended)

Netlify is the easiest and most reliable option for deploying React applications.

#### Quick Deploy

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Manual Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to the deploy area
   - Your site will be live instantly

3. **Configure Environment Variables**:
   - Go to Site settings > Environment variables
   - Add:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Configure Redirects**:
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

#### Git-based Deploy (Recommended for updates)

1. **Connect Repository**:
   - Push your code to GitHub/GitLab
   - Connect repository in Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Automatic Deployments**:
   - Every push to main branch triggers deployment
   - Preview deployments for pull requests

### 2. Vercel

Great alternative with excellent performance.

#### Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure**:
   - Follow prompts
   - Add environment variables in dashboard

#### Deploy with Git

1. **Connect Repository**:
   - Import project from GitHub
   - Configure build settings
   - Add environment variables

### 3. GitHub Pages

Free hosting for public repositories.

#### Setup

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### 4. AWS S3 + CloudFront

For enterprise-level hosting.

#### Setup S3 Bucket

1. **Create S3 Bucket**:
   - Enable static website hosting
   - Set index document: `index.html`
   - Set error document: `index.html`

2. **Upload Files**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront**:
   - Create distribution
   - Set origin to S3 bucket
   - Configure custom error pages

### 5. Firebase Hosting

Google's hosting solution.

#### Setup

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize**:
   ```bash
   firebase init hosting
   ```

3. **Configure firebase.json**:
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Environment Configuration

### Production Environment Variables

For production deployment, you'll need:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key

# Optional
VITE_APP_ENV=production
VITE_ANALYTICS_ID=your-analytics-id
```

### Security Considerations

1. **Environment Variables**:
   - Never commit `.env` files
   - Use platform-specific environment variable settings
   - Rotate keys regularly

2. **Supabase Security**:
   - Configure Row Level Security (RLS)
   - Set up proper authentication policies
   - Use anon key (not service role key) in frontend

3. **Domain Security**:
   - Configure CORS in Supabase
   - Set up proper redirect URLs
   - Use HTTPS in production

## 🚀 Performance Optimization

### Build Optimization

1. **Analyze Bundle Size**:
   ```bash
   npm run build
   npx vite-bundle-analyzer dist
   ```

2. **Optimize Images**:
   - Compress images before adding to `public/images/`
   - Use WebP format when possible
   - Implement lazy loading

3. **Code Splitting**:
   - Already implemented with React.lazy()
   - Routes are automatically code-split

### CDN Configuration

1. **Static Assets**:
   - Serve images from CDN
   - Cache static files with long expiry

2. **Caching Headers**:
   ```
   # Netlify _headers file
   /*
     Cache-Control: public, max-age=31536000
   
   /index.html
     Cache-Control: public, max-age=0, must-revalidate
   ```

## 📊 Monitoring and Analytics

### Google Analytics

1. **Add to index.html**:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

### Error Monitoring

1. **Sentry Integration**:
   ```bash
   npm install @sentry/react
   ```

2. **Configure in main.tsx**:
   ```typescript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
   });
   ```

### Performance Monitoring

1. **Web Vitals**:
   - Monitor Core Web Vitals
   - Use Lighthouse for audits
   - Set up performance budgets

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=dist
      env:
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

## 🐛 Troubleshooting Deployment

### Common Issues

1. **Build Failures**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variable Issues**:
   - Check variable names (must start with VITE_)
   - Verify values in deployment platform
   - Restart deployment after changes

3. **Routing Issues**:
   - Ensure SPA redirects are configured
   - Check for 404 errors on direct URL access

4. **Supabase Connection**:
   - Verify URL format
   - Check CORS settings
   - Ensure RLS policies are correct

### Performance Issues

1. **Slow Loading**:
   - Enable gzip compression
   - Optimize images
   - Use CDN for static assets

2. **Large Bundle Size**:
   - Analyze bundle with tools
   - Remove unused dependencies
   - Implement code splitting

## 📋 Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] Build completes without errors
- [ ] All images load correctly
- [ ] Authentication works
- [ ] Database connections established
- [ ] Forms submit successfully
- [ ] Mobile responsiveness tested
- [ ] SEO meta tags in place
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] HTTPS enabled
- [ ] Domain configured
- [ ] Backup strategy in place

## 🔄 Post-Deployment

### Monitoring

1. **Check Core Web Vitals**
2. **Monitor error rates**
3. **Track user engagement**
4. **Monitor database performance**

### Maintenance

1. **Regular dependency updates**
2. **Security patches**
3. **Database backups**
4. **Performance monitoring**

---

Your Dehradun Bike Rentals website is now ready for production deployment! Choose the platform that best fits your needs and follow the respective guide above.