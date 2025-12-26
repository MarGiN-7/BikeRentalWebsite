# Complete Setup Guide - Dehradun Bike Rentals Website

This guide will walk you through setting up the complete Dehradun Bike Rentals website from scratch.

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (version 16 or higher)
- npm or yarn package manager
- A Supabase account (free tier available)
- A code editor (VS Code recommended)

## 🚀 Quick Start

### 1. Get the Project

```bash
# Clone the repository
git clone <repository-url>
cd dehradun-bike-rentals-website

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For development
VITE_APP_ENV=development
```

### 3. Database Setup

#### Option A: Use Existing Supabase Project
If you have the original Supabase project:
1. Get your project URL and anon key from Supabase dashboard
2. Add them to your `.env` file
3. Skip to step 4

#### Option B: Create New Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings > API to get your URL and anon key
4. Run the migration files:

```sql
-- Run these in your Supabase SQL editor

-- Create users table (if not exists from auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  bike_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_name TEXT NOT NULL,
  user_avatar TEXT
);

-- Create bike_locations table
CREATE TABLE IF NOT EXISTS public.bike_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_id TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
  longitude DOUBLE PRECISION NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  is_within_fence BOOLEAN DEFAULT TRUE
);

-- Create geofences table
CREATE TABLE IF NOT EXISTS public.geofences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  coordinates POINT[] NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bike_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geofences ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Create policies for bike_locations
CREATE POLICY "Anyone can read bike locations" ON public.bike_locations FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can insert bike locations" ON public.bike_locations FOR INSERT TO authenticated WITH CHECK (true);

-- Create policies for geofences
CREATE POLICY "Anyone can read geofences" ON public.geofences FOR SELECT TO public USING (true);
CREATE POLICY "Only admins can modify geofences" ON public.geofences FOR ALL TO authenticated 
USING (auth.uid() IN (SELECT id FROM public.users WHERE email = 'admin@dehradunbikerentals.com'))
WITH CHECK (auth.uid() IN (SELECT id FROM public.users WHERE email = 'admin@dehradunbikerentals.com'));
```

### 4. Start Development Server

```bash
npm run dev
```

Your website will be available at `http://localhost:5173`

## 🔧 Configuration Options

### Authentication Setup

The website uses Supabase Auth. To configure:

1. In Supabase dashboard, go to Authentication > Settings
2. Configure your site URL: `http://localhost:5173` (for development)
3. Add production URL when deploying
4. Configure email templates if needed

### Email Configuration (Optional)

For booking confirmations and contact forms:

1. Set up email service in Supabase
2. Configure SMTP settings
3. Customize email templates

### Image Management

Bike images are stored in the `public/images/` folder. To add new bikes:

1. Add bike image to `public/images/`
2. Update `src/data/bikes.ts` with new bike data
3. Reference image as `/images/your-image.jpg`

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your Git repository for automatic deployments

3. **Configure environment variables**:
   - Go to Site settings > Environment variables
   - Add your Supabase URL and anon key

4. **Configure redirects**:
   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

### Manual Deployment

1. Build: `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server for SPA routing

## 🛠️ Development Tips

### Adding New Features

1. **New Pages**: Add to `src/pages/` and update routing in `src/App.tsx`
2. **New Components**: Follow the existing structure in `src/components/`
3. **Styling**: Use Tailwind classes, custom styles in `src/index.css`

### Database Changes

1. Always create new migration files
2. Test migrations on development database first
3. Backup production data before applying migrations

### Code Organization

- Keep components small and focused
- Use TypeScript for type safety
- Follow the existing naming conventions
- Add comments for complex logic

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**:
   - Check image paths in `src/data/bikes.ts`
   - Ensure images are in `public/images/` folder

2. **Supabase connection errors**:
   - Verify environment variables
   - Check Supabase project status
   - Ensure correct URL format

3. **Build errors**:
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run lint`

4. **Deployment issues**:
   - Ensure all environment variables are set
   - Check build output in `dist` folder
   - Verify redirect configuration

### Getting Help

- Check the browser console for errors
- Review Supabase logs for database issues
- Ensure all dependencies are installed
- Verify Node.js version compatibility

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🔄 Updates and Maintenance

### Regular Maintenance

1. **Update dependencies**: `npm update`
2. **Security updates**: `npm audit fix`
3. **Database backups**: Regular Supabase backups
4. **Monitor performance**: Check Core Web Vitals

### Adding New Bikes

1. Add bike data to `src/data/bikes.ts`
2. Add bike images to `public/images/`
3. Test the new bike appears correctly
4. Deploy changes

### Content Updates

- Bike information: `src/data/bikes.ts`
- Team information: `src/pages/AboutPage.tsx`
- Contact details: `src/components/layout/Footer.tsx`
- Pricing: Update in bike data

---

This setup guide should get you up and running with the complete Dehradun Bike Rentals website. The codebase is well-organized and documented for easy maintenance and extension.