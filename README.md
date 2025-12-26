# Dehradun Bike Rentals Website

A modern, responsive bike rental website built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Modern React Frontend**: Built with React 18 and TypeScript for type safety
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Bike Catalog**: Comprehensive bike listings with detailed specifications
- **User Authentication**: Secure login/signup system
- **Booking System**: Complete rental booking workflow
- **Review System**: Customer reviews and ratings
- **Admin Features**: Bike management and user administration
- **Database Integration**: Supabase for backend services
- **Email Notifications**: Automated booking confirmations
- **SEO Optimized**: Proper meta tags and structured data

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Deployment**: Netlify

## 📦 Installation

1. **Clone or download the project**:
   ```bash
   git clone <repository-url>
   cd dehradun-bike-rentals-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

The project uses Supabase as the backend. You'll need to:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the migration files in the `supabase/migrations` folder
3. Set up the environment variables

### Database Schema

The database includes the following tables:
- `users` - User authentication and profiles
- `reviews` - Customer reviews and ratings
- `bike_locations` - GPS tracking for bikes
- `geofences` - Geographical boundaries

## 🚀 Deployment

### Netlify (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard
4. Configure redirects for SPA routing

### Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service like Vercel, GitHub Pages, or AWS S3.

## 📁 Project Structure

```
dehradun-bike-rentals-website/
├── public/                 # Static assets
│   ├── images/            # Bike and team photos
│   └── download.html      # Download page
├── src/
│   ├── components/        # React components
│   │   ├── home/         # Homepage components
│   │   ├── layout/       # Layout components
│   │   ├── reviews/      # Review system
│   │   └── ui/           # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── data/             # Static data and bike information
│   ├── pages/            # Page components
│   ├── types/            # TypeScript type definitions
│   └── main.tsx          # Application entry point
├── supabase/
│   └── migrations/       # Database migration files
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## 🎨 Customization

### Adding New Bikes

Edit `src/data/bikes.ts` to add new bike entries:

```typescript
{
  id: 'unique-bike-id',
  name: 'Bike Name',
  type: 'Bike Type',
  category: BikeCategory.URBAN, // or TOURING, MOUNTAIN, PREMIUM
  imageUrl: '/images/bike-image.jpg',
  dailyRate: 500,
  monthlyRate: 8000,
  unlimitedRate: 10000,
  // ... other properties
}
```

### Styling

The project uses Tailwind CSS. Customize colors and styling in:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Global styles and custom components

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/layout/Header.tsx`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Explained

### Bike Categories

The website organizes bikes into four main categories:
- **Urban Commuters**: Scooters and bikes for city riding
- **Touring Bikes**: Long-distance and highway bikes
- **Mountain & Off-Road**: Adventure and off-road capable bikes
- **Premium & Performance**: High-end sports and performance bikes

### Booking System

Complete booking workflow including:
- Date selection and pricing calculation
- Document upload (driving license, ID proof)
- Payment method selection
- Email confirmations

### Review System

Integrated review system with:
- Star ratings (1-5)
- Written reviews
- User authentication
- Bike-specific reviews

### Responsive Design

Mobile-first design with breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1280px+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📞 Support

For support or questions:
- Email: support@dehradunbikerentals.com
- Phone: +91 92590 33669
- Website: [Dehradun Bike Rentals](https://statuesque-begonia-5280a1.netlify.app)

## 🙏 Acknowledgments

- Built with ❤️ for Dehradun Bike Rentals
- Images from Pexels and team photos
- Icons from Lucide React
- Fonts from Google Fonts

---

**Note**: This is a complete, production-ready website. All features are fully functional and the code is well-documented and organized for easy maintenance and extension.